# CampusShield — Custom Deployment Script for GitHub Pages
$git = "D:\PortableGit\cmd\git.exe"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Starting CampusShield Deployment Process " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Build the project
Write-Host "`n[1/6] Building the React production bundle..." -ForegroundColor Green
npm run build

# 2. Get current branch name
$currentBranch = (& $git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "`n[2/6] Verifying active branch: $currentBranch" -ForegroundColor Cyan

if ($currentBranch -eq "main") {
    Write-Host "Error: You are currently on the 'main' branch. Switch to 'source' branch to make developer changes." -ForegroundColor Red
    exit 1
}

# 3. Checkout main branch
Write-Host "`n[3/6] Switching to deployment branch (main)..." -ForegroundColor Cyan
& $git checkout main

# 4. Clean root directory except key developer files
Write-Host "`n[4/6] Cleaning main branch root directory..." -ForegroundColor Cyan
Get-ChildItem -Path . -Exclude ".git", ".gitignore", "dist", "node_modules", "deploy.ps1" | Remove-Item -Recurse -Force

# 5. Copy built files from dist to root
Write-Host "`n[5/6] Deploying production assets to root..." -ForegroundColor Cyan
Copy-Item -Path "dist\*" -Destination "." -Recurse -Force
Remove-Item -Path "dist" -Recurse -Force

# 6. Commit and push
Write-Host "`n[6/6] Committing and pushing deployment build to origin/main..." -ForegroundColor Cyan
& $git add -A
& $git commit -m "Deploy latest production build"
& $git push origin main

# 7. Checkout back to original branch
Write-Host "`nChecking back into developer branch: $currentBranch..." -ForegroundColor Green
& $git checkout $currentBranch

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host "   Deployment Completed Successfully!     " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
