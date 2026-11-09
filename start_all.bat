@echo off
echo =======================================================================
echo Intelligent Crop Disease Diagnosis and Management System Using AI
echo =======================================================================
echo Launching Backend and Frontend services...
start "AgriAI Backend Server" cmd /k "run_backend.bat"
start "AgriAI Frontend Server" cmd /k "run_frontend.bat"
echo Services launching!
echo Backend API:  http://127.0.0.1:8000/docs
echo Web App:      http://127.0.0.1:5173
echo =======================================================================
pause
