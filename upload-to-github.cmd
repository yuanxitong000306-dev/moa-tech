@echo off
setlocal

set "PROJECT_DIR=C:\Users\Administrator\Documents\Codex\2026-06-01\next-js-typescript-tailwind-css-1"
set "GIT_EXE=C:\Program Files\Git\cmd\git.exe"

cd /d "%PROJECT_DIR%"

echo.
echo MOA TECH GitHub upload helper
echo Project:
echo %PROJECT_DIR%
echo.

if not exist "%GIT_EXE%" (
  echo Git not found at:
  echo %GIT_EXE%
  echo Please install Git for Windows first.
  pause
  exit /b 1
)

echo Please create an empty GitHub repository named moa-tech first:
echo https://github.com/new
echo.
set /p REPO_URL=Paste your GitHub repository HTTPS URL here, then press Enter: 

if "%REPO_URL%"=="" (
  echo Repository URL is required.
  pause
  exit /b 1
)

echo.
echo Resetting local Git folder if needed...
if exist ".git" rmdir /s /q ".git"

"%GIT_EXE%" init
"%GIT_EXE%" branch -M main
"%GIT_EXE%" config user.name "MOA TECH"
"%GIT_EXE%" config user.email "yuanxitong000306@gmail.com"

echo.
echo Adding project files...
"%GIT_EXE%" add .
if errorlevel 1 (
  echo Failed to add files.
  pause
  exit /b 1
)

echo.
echo Creating first commit...
"%GIT_EXE%" commit -m "Initial MOA TECH storefront"
if errorlevel 1 (
  echo Failed to commit files.
  pause
  exit /b 1
)

echo.
echo Connecting remote repository...
"%GIT_EXE%" remote add origin "%REPO_URL%"

echo.
echo Pushing to GitHub...
echo If a GitHub login window opens, please sign in and authorize.
"%GIT_EXE%" push -u origin main
if errorlevel 1 (
  echo.
  echo Push failed. Please check the repository URL and GitHub login authorization.
  pause
  exit /b 1
)

echo.
echo Upload complete:
echo %REPO_URL%
echo.
pause
