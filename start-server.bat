@echo off
cd /d "%~dp0"
echo Starting dev server on http://localhost:8080 ...
echo.
node node_modules/vite/bin/vite.js --port 8080 --host 127.0.0.1
pause
