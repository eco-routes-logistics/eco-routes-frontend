# Migration Script for Eco-Routes Frontend

# This script helps migrate the current repository to the new organization
# Run this after creating the GitHub organization and frontend repository

Write-Host "=== Eco-Routes Frontend Migration ===" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "Error: package.json not found. Please run this script from the Eco-routes directory." -ForegroundColor Red
    exit 1
}

Write-Host "Step 1: Checking git status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "IMPORTANT: You have uncommitted changes!" -ForegroundColor Red
Write-Host "Would you like to commit these changes before migration? (y/n): " -ForegroundColor Yellow -NoNewline
$commit = Read-Host

if ($commit -eq "y") {
    Write-Host ""
    Write-Host "Enter commit message: " -ForegroundColor Yellow -NoNewline
    $message = Read-Host
    
    git add .
    git commit -m "$message"
    Write-Host "Changes committed successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Enter your new organization repository URL" -ForegroundColor Yellow
Write-Host "Default: https://github.com/eco-routes-logistics/eco-routes-frontend.git" -ForegroundColor Gray
Write-Host "Press Enter to use default, or enter custom URL: " -ForegroundColor Yellow -NoNewline
$newRepoUrl = Read-Host

if ([string]::IsNullOrWhiteSpace($newRepoUrl)) {
    $newRepoUrl = "https://github.com/eco-routes-logistics/eco-routes-frontend.git"
    Write-Host "Using default URL: $newRepoUrl" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 3: Backing up current remote..." -ForegroundColor Yellow
git remote rename origin old-origin

Write-Host ""
Write-Host "Step 4: Adding new remote..." -ForegroundColor Yellow
git remote add origin $newRepoUrl

Write-Host ""
Write-Host "Step 5: Pushing to new repository..." -ForegroundColor Yellow
Write-Host "This will push all branches and tags to the new repository" -ForegroundColor Gray
git push -u origin --all
git push -u origin --tags

Write-Host ""
Write-Host "Step 6: Verifying remote..." -ForegroundColor Yellow
git remote -v

Write-Host ""
Write-Host "=== Migration Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Verify the code is visible at: $newRepoUrl" -ForegroundColor White
Write-Host "2. Update package.json repository field" -ForegroundColor White
Write-Host "3. Update README.md with new URLs" -ForegroundColor White
Write-Host ""
Write-Host "Old remote is saved as 'old-origin' if you need to reference it" -ForegroundColor Gray
