import os

main_path = r'd:\Yarik\Antigravity projects\flowdesk\electron\main.ts'
typer_path = r'd:\Yarik\Antigravity projects\flowdesk\typer.txt'

with open(typer_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# extract the logic correctly
# lines 3 to 160 = HUMAN TYPER
# lines 168 to 392 = SUPER HUMANIZER

typer_logic = "".join(lines[3:161])
humanizer_logic = "".join(lines[168:393])

with open(main_path, 'r', encoding='utf-8') as f:
    main_content = f.read()

# Add imports right after the first line or so
imports = "import robot from 'robotjs';\nimport { GoogleGenAI } from '@google/genai';\n"
if "import robot from" not in main_content:
    main_content = main_content.replace("import updaterPkg from 'electron-updater'\n", "import updaterPkg from 'electron-updater'\n" + imports)

# Add logic at the end
if "SUPER HUMANIZER (AI)" not in main_content:
    main_content += "\n" + typer_logic + "\n" + humanizer_logic + "\n"

with open(main_path, 'w', encoding='utf-8') as f:
    f.write(main_content)

print("Appended logic to main.ts")
