@echo off
REM ZeroMaintenance Uptime Monitor for Windows
REM Monitors multiple endpoints and logs status

REM Configuration
set DOMAIN=zeromaintenance.com
set GITHUB_REPO=xcgar0/ZeroMaintenance
set GITLAB_REPO=xcgar0/ZeroMaintenance
set LOG_FILE=uptime.log
set ALERT_EMAIL=contact.zeromaintenance@gmail.com

REM Colors
color 0A

echo 🔍 ZeroMaintenance Uptime Check %date% %time%
echo ================================================

REM Create log file if it doesn't exist
if not exist "%LOG_FILE%" echo. > "%LOG_FILE%"

echo ================================================ >> "%LOG_FILE%"
echo %date% %time%: Starting uptime check >> "%LOG_FILE%"

set FAILED_CHECKS=0

REM Function to check site
:check_site
set url=%~1
set name=%~2

curl -s --max-time 10 --head "%url%" | findstr /C:"200 OK" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ %name%: UP
    echo %date% %time%: %name% - UP - %url% >> "%LOG_FILE%"
) else (
    echo ❌ %name%: DOWN
    echo %date% %time%: %name% - DOWN - %url% >> "%LOG_FILE%"
    set /a FAILED_CHECKS+=1
)
goto :eof

REM Check all endpoints
call :check_site "https://%DOMAIN%" "Primary Domain"
call :check_site "https://www.%DOMAIN%" "WWW Domain"
call :check_site "https://%GITHUB_REPO%.github.io" "GitHub Pages"
call :check_site "https://%GITLAB_REPO%.gitlab.io" "GitLab Pages"

REM DNS check
nslookup %DOMAIN% >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ DNS: %DOMAIN% resolves
    echo %date% %time%: DNS - OK - %DOMAIN% resolves >> "%LOG_FILE%"
) else (
    echo ❌ DNS: %DOMAIN% not resolving
    echo %date% %time%: DNS - FAIL - %DOMAIN% not resolving >> "%LOG_FILE%"
    set /a FAILED_CHECKS+=1
)

echo ================================================ >> "%LOG_FILE%"

if %FAILED_CHECKS% equ 0 (
    echo 🎉 All systems operational!
    echo %date% %time%: SUMMARY - All systems UP >> "%LOG_FILE%"
) else (
    echo ⚠️  %FAILED_CHECKS% system(s) experiencing issues
    echo %date% %time%: SUMMARY - %FAILED_CHECKS% systems DOWN >> "%LOG_FILE%"
)

echo 📊 Logs saved to: %LOG_FILE%
echo.

REM Show recent log entries
echo 📋 Recent Log Entries:
echo.
type "%LOG_FILE%" | findstr /C:"SUMMARY" | findstr /v "Starting" | tail -5 2>nul
if %errorlevel% neq 0 (
    REM If tail doesn't work, show last 10 lines
    powershell -command "Get-Content '%LOG_FILE%' | Select-Object -Last 10"
)

pause</content>
<parameter name="filePath">c:\Projects\zeromaintenence\monitor.bat