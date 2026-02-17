# EcoRoutes Logistics Management System

A modern, professional logistics management platform built with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6 (Lightning-fast HMR)
- **Styling**: TailwindCSS 3
- **State Management**: Zustand (lightweight & fast)
- **Data Fetching**: TanStack Query (React Query v5)
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router v7
- **UI Components**: Custom + Headless UI
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios

## 📁 Project Structure

```
src/
├── app/                    # App initialization & providers
├── features/               # Feature-based modules
│   ├── auth/              # Authentication
│   ├── orders/            # Order management
│   ├── riders/            # Rider/Driver management
│   ├── clients/           # Business clients
│   └── ...
├── components/            # Shared components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   └── common/           # Common components
├── hooks/                 # Custom React hooks
├── lib/                   # Third-party lib configs
├── services/              # API services
├── stores/                # Zustand stores
├── types/                 # TypeScript types
├── utils/                 # Utility functions
├── styles/                # Global styles
└── config/                # App configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Eco-routes
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local`

### Development

Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🎨 UI Components

All UI components are located in `src/components/ui/`:

- **Button** - Multiple variants (primary, secondary, danger, ghost, success)
- **Input** - With label, error states, and icons
- **Card** - Flexible card system with header, content, footer
- **Badge** - Status badges with color variants
- **Modal** - Center and slide-in modals with animations

### Usage Example

```tsx
import { Button, Input, Card } from '@/components/ui';

function MyComponent() {
  return (
    <Card>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## 🔧 Custom Hooks

- `useDebounce` - Debounce values for search inputs
- `useLocalStorage` - Sync state with localStorage
- `useMediaQuery` - Detect responsive breakpoints
- `useIsMobile` - Check if mobile device
- `useIsTablet` - Check if tablet device
- `useIsDesktop` - Check if desktop device

## 🗄️ State Management

### Authentication Store

```tsx
import { useAuthStore } from '@/stores/authStore';

function MyComponent() {
  const { user, login, logout } = useAuthStore();
  
  // Use authentication state
}
```

### UI Store

```tsx
import { useUIStore } from '@/stores/uiStore';

function MyComponent() {
  const { theme, toggleTheme } = useUIStore();
  
  // Toggle dark/light theme
}
```

## 🌐 API Integration

All API calls use Axios with interceptors for authentication:

```tsx
import { api } from '@/lib/axios';

// Automatically includes auth token
const response = await api.get('/orders');
```

## 📝 TypeScript Types

All types are centralized in `src/types/`:

```tsx
import type { Order, Rider, User } from '@/types';
```

## 🎯 Path Aliases

Use `@/` to import from `src/`:

```tsx
import { Button } from '@/components/ui';
import { formatCurrency } from '@/utils/format';
import { ROUTES } from '@/config/routes';
```

## 🚦 Routing

Routes are defined in `src/config/routes.ts`:

```tsx
import { ROUTES } from '@/config/routes';

// Navigate to orders page
navigate(ROUTES.ORDERS);
```

## 🎨 Styling

TailwindCSS is configured with custom colors:

- `primary` - #135bec
- `primary-dark` - #0e45b5
- `background-light` - #f6f6f8
- `background-dark` - #101622

Use the `cn()` utility to merge classes:

```tsx
import { cn } from '@/utils/cn';

<div className={cn('base-class', isActive && 'active-class')} />
```

## 📦 Build Optimization

- Code splitting with React.lazy()
- Tree shaking for smaller bundles
- Automatic chunk splitting
- Fast refresh in development

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Proprietary - All rights reserved

## 👥 Team

Built with ❤️ by the EcoRoutes team
