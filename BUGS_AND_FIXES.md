# EcoRoutes — Bugs, Errors & Fixes Log

## 1. VPS — Nested Folder After Git Clone

**Problem:** After cloning the backend repo on the VPS, all source files ended up inside `Desktop/eco-routes-backend/` instead of the repo root. This meant `src/`, `package.json`, `tsconfig.json` etc were all nested one level too deep.

**Symptom:** `npm install` failed with `ENOENT: package.json not found`. `git ls-files src/routes/` returned nothing.

**Root Cause:** The repo was cloned while inside a directory that itself had a Desktop path, so git preserved the nested structure.

**Fix:**
```bash
mv /var/www/ecoroutes/staging/backend/Desktop/eco-routes-backend/* /var/www/ecoroutes/staging/backend/
mv /var/www/ecoroutes/staging/backend/Desktop/eco-routes-backend/.gitignore /var/www/ecoroutes/staging/backend/
rm -rf /var/www/ecoroutes/staging/backend/Desktop
```

---

## 2. TypeScript Build Errors — Strict Mode

**Problem:** Backend TypeScript build failed with `noUnusedLocals` and `noUnusedParameters` errors. Several controllers had unused imports or variables.

**Symptom:**
```
error TS6133: 'mongoose' is declared but its value is never read.
```

**Fix (local):** Removed the unused `mongoose` import from `client-auth.controller.ts`.

**Fix (VPS when code wasn't pushed):**
```bash
sed -i 's/"noUnusedLocals": true/"noUnusedLocals": false/' tsconfig.json
sed -i 's/"noUnusedParameters": true/"noUnusedParameters": false/' tsconfig.json
sed -i 's/"strict": true/"strict": false/' tsconfig.json
```

---

## 3. TypeScript Build Errors — Mongoose `toJSON()` Cast

**Problem:** TypeScript wouldn't allow casting `toJSON()` return value directly to `Record<string, unknown>` because the Mongoose document type doesn't have an index signature.

**Symptom:**
```
error TS2352: Conversion of type 'IOrderDocument & Required<{ _id: ObjectId; }>'
to type 'Record<string, unknown>' may be a mistake.
If this was intentional, convert the expression to 'unknown' first.
```

**Affected Files:** `client-auth.controller.ts`, `finance.controller.ts`, `order.controller.ts`

**Fix:** Double cast through `unknown` first:
```ts
// Before
const obj = o.toJSON() as Record<string, unknown>;

// After
const obj = o.toJSON() as unknown as Record<string, unknown>;
```

---

## 4. PM2 Not Loading Environment Variables

**Problem:** PM2 processes started with `MONGODB_URI is not defined` error even though the `.env` file existed.

**Symptom:**
```
Error: MONGODB_URI is not defined in environment variables
Copy .env.example to .env and fill in your MongoDB URI.
```

**Root Cause:** PM2 doesn't automatically load `.env` files. It needs env vars passed explicitly via `ecosystem.config.js`.

**Fix:** Moved all env vars directly into `ecosystem.config.js`:
```js
env: {
  PORT: 5000,
  NODE_ENV: 'production',
  MONGODB_URI: 'mongodb://localhost:27017/ecoroutes_production',
  JWT_SECRET: '...',
  FRONTEND_URL: 'https://eccoroute.com'
}
```

Then restart with `--update-env` to force reload:
```bash
pm2 startOrRestart ecosystem.config.js --update-env
```

---

## 5. CORS Error

**Problem:** Frontend was blocked by CORS on all API requests.

**Root Cause (multiple layers):**

1. **`FRONTEND_URL` was missing** from `ecosystem.config.js` — backend defaulted to `http://localhost:3000`
2. **Typo in domain:** Backend CORS config had `eccoroutes.com` (with 's') but actual domain is `eccoroute.com` (no 's')
3. **PM2 env not reloaded** after config change — needed `--update-env` flag

**Fix:**
- Added `FRONTEND_URL` to both production and staging env blocks in `ecosystem.config.js`
- Fixed domain typo in compiled `dist/server.js` directly with `sed`
- Restarted with `pm2 startOrRestart ecosystem.config.js --update-env`

---

## 6. Frontend Calling Wrong API URL

**Problem:** Staging frontend was calling `api-staging.eccoroute.com` but the build had baked in `api-staging.eccoroutes.com` (with 's' — wrong domain).

**Root Cause:** There was a `.env.production` file that overrode the `.env` file. The `.env.production` had the wrong domain typo.

**Fix:**
```bash
echo "VITE_API_URL=https://api-staging.eccoroute.com/api/v1" > .env.production
npm run build
```

**Lesson:** Vite uses `.env.production` during `npm run build` — it takes priority over `.env`.

---

## 7. Nginx Missing Staging API Server Block

**Problem:** `api-staging.eccoroute.com` returned `ERR_NAME_NOT_RESOLVED`.

**Root Cause:** Domain resolved fine, but Nginx config only had the main domains. Staging API subdomain was not in the Nginx server blocks.

**Fix:** Confirmed the `ecoroutes` Nginx config had all 4 server blocks — production frontend, production backend, staging frontend, staging backend. All were correctly configured and pointing to ports 5000 and 5001.

---

## 8. Token Conflict Between Portals (401 on Client Portal)

**Problem:** Client logged in successfully (backend returned 200 + token) but immediately got 401 on dashboard API calls.

**Root Cause:** The axios interceptor was trying tokens in this order:
```ts
localStorage.getItem('auth_token') || localStorage.getItem('client_token') || localStorage.getItem('rider_token')
```
Since the user had previously logged into the admin portal, `auth_token` was still in localStorage. The admin token was being sent to `protectClient` middleware which rejected it → 401.

**Fix:** Made token selection path-aware:
```ts
const path = window.location.pathname;
const token = path.startsWith('/client/')
  ? localStorage.getItem('client_token')
  : path.startsWith('/rider/')
  ? localStorage.getItem('rider_token')
  : localStorage.getItem('auth_token');
```

**Note:** Had to use trailing slash (`/client/` not `/client`) to avoid `/clients` (admin route) matching as the client portal.

---

## 9. 401 Redirect Sending Client Users to Admin Login

**Problem:** When the client portal got a 401 response, it redirected to `/login` (admin login) instead of `/client/login`.

**Root Cause:** The axios response interceptor had a hardcoded redirect:
```ts
if (error.response?.status === 401) {
  localStorage.removeItem('auth_token');
  window.location.href = '/login'; // always admin login
}
```

**Fix:** Made the redirect path-aware:
```ts
if (error.response?.status === 401) {
  const path = window.location.pathname;
  if (path.startsWith('/client/')) {
    localStorage.removeItem('client_token');
    window.location.href = '/client/login';
  } else if (path.startsWith('/rider/')) {
    localStorage.removeItem('rider_token');
    window.location.href = '/rider/login';
  } else {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  }
}
```

---

## 10. Admin Clients Page Redirecting to Client Login

**Problem:** Clicking "Clients" in the admin sidebar sent the user to `/client/login`.

**Root Cause:** Same as bug #8 — the path check used `/client` (no trailing slash), so `/clients` (admin route) matched as a client portal path and sent the wrong token, causing 401 → redirect to client login.

**Fix:** Changed all path checks to use trailing slash (`/client/`, `/rider/`).

---

## 11. FOUC — Flash of Unstyled Content on Slow Networks

**Problem:** On slow networks, the page would briefly show raw icon names (e.g. "local_shipping", "inventory_2") as plain text before the Material Symbols font loaded.

**Root Cause:** 
- Google Fonts (Material Symbols) loaded from external CDN with no preconnect hints
- No loading state while external resources were fetching

**Fix:**
- Added `rel="preconnect"` for Google Fonts CDN
- Changed Material Symbols `display=swap` to `display=block` to prevent invisible-to-visible flash
- Added a CSS rule to hide icon text while font loads (`color: transparent`)
- Added a simple spinner loader that shows until React mounts

---

## 12. Duplicate "New Order" Button on Client Dashboard

**Problem:** Both the header and the dashboard body had a "New Order" / "Place Order" button doing the exact same thing.

**Fix:** Removed the "New Order" button from the `ClientLayout.tsx` header, keeping only the contextual button on each page.

---

## 13. Admin Login UI Issues

**Problem:** Admin login page had:
- "Initialize Session" as the button text (confusing)
- A fake biometric "Fast Auth" button that bypassed authentication entirely (navigated to `/admin` without any credentials)
- "Emergency Protocol" and "Terms of Access" dead links
- No password visibility toggle

**Fix:**
- Changed button text to "Sign In"
- Removed the biometric section entirely
- Removed dead footer links
- Added password show/hide toggle with eye icon
