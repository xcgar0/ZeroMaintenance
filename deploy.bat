@echo off
REM ZeroMaintenance Deployment Script for Windows
REM This script deploys to multiple providers for maximum uptime

echo 🚀 ZeroMaintenance Multi-Provider Deployment
echo ================================================

REM Configuration
set GITHUB_REPO=xcgar0/ZeroMaintenance
set GITLAB_REPO=xcgar0/ZeroMaintenance
set DOMAIN=zeromaintenance.com

REM Colors (using Windows color codes)
color 0A

echo 📋 Checking prerequisites...

REM Check if git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install git first.
    pause
    exit /b 1
)

REM Check if curl is available
curl --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ curl is not installed. Please install curl first.
    pause
    exit /b 1
)

echo ✅ Prerequisites OK

REM Build optimization (add your build steps here)
echo 🔨 Building optimized version...
REM Add your build commands here (npm run build, etc.)

echo ✅ Build complete

REM Deploy to GitHub Pages
echo 📤 Deploying to GitHub Pages...
git add .
git commit -m "Deploy %date% %time%" 2>nul
if %errorlevel% neq 0 (
    echo No changes to commit
) else (
    git push origin main 2>nul
    if %errorlevel% equ 0 (
        echo ✅ GitHub Pages deployment complete
    ) else (
        echo ❌ GitHub Pages deployment failed
    )
)

REM Deploy to GitLab Pages (if configured)
echo 📤 Deploying to GitLab Pages...
git remote get-url gitlab >nul 2>&1
if %errorlevel% equ 0 (
    git push gitlab main 2>nul
    if %errorlevel% equ 0 (
        echo ✅ GitLab Pages deployment complete
    ) else (
        echo ❌ GitLab Pages deployment failed
    )
) else (
    echo ⚠️  GitLab remote not configured (skipping)
)

REM Test deployments
echo 🧪 Testing deployments...

REM Test GitHub Pages
curl -s --max-time 10 https://%GITHUB_REPO%.github.io >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ GitHub Pages: UP
) else (
    echo ❌ GitHub Pages: DOWN
)

REM Test GitLab Pages
curl -s --max-time 10 https://%GITLAB_REPO%.gitlab.io >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ GitLab Pages: UP
) else (
    echo ❌ GitLab Pages: DOWN or not configured
)

REM DNS propagation check
echo 🌐 Checking DNS propagation...
nslookup %DOMAIN% >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ DNS: %DOMAIN% resolves
) else (
    echo ❌ DNS: %DOMAIN% not resolving
)

echo ================================================
echo 🎉 Deployment Complete!
echo ================================================
echo 📊 Status Summary:
echo    🌐 Domain: https://%DOMAIN%
echo    📱 GitHub: https://%GITHUB_REPO%.github.io
echo    🐧 GitLab: https://%GITLAB_REPO%.gitlab.io
echo.
echo ⏱️  DNS propagation may take 5-30 minutes
echo 🔍 Monitor uptime at: https://%DOMAIN%

pause</content>
<parameter name="filePath">c:\Projects\zeromaintenence\deploy.bat