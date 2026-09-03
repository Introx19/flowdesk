@echo off
if exist dist-electron\main.js del /f dist-electron\main.js
if exist dist-electron\preload.mjs del /f dist-electron\preload.mjs
node .\node_modules\vite\bin\vite.js