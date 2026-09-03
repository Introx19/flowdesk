@echo off
node .\node_modules\typescript\bin\tsc -b
node .\node_modules\vite\bin\vite.js build
node .\node_modules\electron-builder\out\cli\cli.js