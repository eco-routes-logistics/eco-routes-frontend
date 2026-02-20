# Backend Repository Setup Script

Write-Host "=== EcoRoutes Backend Setup ===" -ForegroundColor Cyan
Write-Host ""

# Navigate to Desktop
Write-Host "Step 1: Navigating to Desktop..." -ForegroundColor Yellow
cd C:\Users\Hp\Desktop

# Clone backend repository
Write-Host ""
Write-Host "Step 2: Cloning backend repository..." -ForegroundColor Yellow
git clone https://github.com/eco-routes-logistics/eco-routes-backend.git

# Navigate into the cloned repository
Write-Host ""
Write-Host "Step 3: Setting up project..." -ForegroundColor Yellow
cd eco-routes-backend

# Initialize npm project
Write-Host ""
Write-Host "Step 4: Initializing Node.js project..." -ForegroundColor Yellow
npm init -y

Write-Host ""
Write-Host "Step 5: Installing dependencies..." -ForegroundColor Yellow
Write-Host "Installing Express, TypeScript, and other dependencies..." -ForegroundColor Gray
npm install express cors dotenv
npm install -D typescript @types/node @types/express @types/cors ts-node nodemon

Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next: I'll create the project structure and files" -ForegroundColor Cyan
Write-Host "Location: C:\Users\Hp\Desktop\eco-routes-backend" -ForegroundColor White
