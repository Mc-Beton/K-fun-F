@echo off
echo Instalowanie zaleznosci...
call npm install

echo.
echo Uruchamianie serwera deweloperskiego...
call npm run dev
