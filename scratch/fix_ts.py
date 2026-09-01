import os

def replace_in_file(path, old, new):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base_dir = r'd:\Yarik\Antigravity projects\flowdesk\src'

# HumanTyper.tsx
ht_path = os.path.join(base_dir, 'components', 'dlc', 'HumanTyper.tsx')
replace_in_file(ht_path, "const { settings, updateSettings } = useSettings();", "const { updateSettings, humanTyperSpeed, humanTyperErrors, humanTyperThinkPct, humanTyperStartHotkey, humanTyperStopHotkey } = useSettings();")
replace_in_file(ht_path, "settings.humanTyperSpeed", "humanTyperSpeed")
replace_in_file(ht_path, "settings.humanTyperErrors", "humanTyperErrors")
replace_in_file(ht_path, "settings.humanTyperThinkPct", "humanTyperThinkPct")
replace_in_file(ht_path, "settings.humanTyperStartHotkey", "humanTyperStartHotkey")
replace_in_file(ht_path, "settings.humanTyperStopHotkey", "humanTyperStopHotkey")
replace_in_file(ht_path, "settings.humanTyperThinkMin", "350")
replace_in_file(ht_path, "settings.humanTyperThinkMax", "1400")

# SuperHumanizer.tsx
sh_path = os.path.join(base_dir, 'components', 'dlc', 'SuperHumanizer.tsx')
replace_in_file(sh_path, "const { settings, updateSettings } = useSettings();", "const { updateSettings, geminiApiKey, geminiModel, superHumanizerLanguage, panicHotkey } = useSettings();")
replace_in_file(sh_path, "settings.geminiApiKey || ''", "geminiApiKey || ''")
replace_in_file(sh_path, "settings.geminiModel || 'gemini-3.6-flash'", "geminiModel || 'gemini-3.6-flash'")
replace_in_file(sh_path, "settings.superHumanizerLanguage || 'ru'", "superHumanizerLanguage || 'ru'")
replace_in_file(sh_path, "settings.panicHotkey", "panicHotkey")

# App.tsx
app_path = os.path.join(base_dir, 'App.tsx')
replace_in_file(app_path, "onDragLeave={(e) => {", "onDragLeave={() => {")

# Library.tsx
lib_path = os.path.join(base_dir, 'components', 'Library.tsx')
replace_in_file(lib_path, "import React, { useState, useEffect } from 'react';", "import React, { useEffect } from 'react';")
replace_in_file(lib_path, "import { LayoutGrid, AlertCircle, X, Search, Trash2 } from 'lucide-react';", "import { LayoutGrid, AlertCircle, X, Search } from 'lucide-react';")

# InfoButton.tsx
info_path = os.path.join(base_dir, 'components', 'InfoButton.tsx')
replace_in_file(info_path, "import React, { useState, useRef, useEffect } from 'react';", "import { useState, useRef, useEffect } from 'react';")

# Settings.tsx
settings_path = os.path.join(base_dir, 'components', 'Settings.tsx')
replace_in_file(settings_path, "numismatics: false", "numismatics: false, humanTyper: false, superHumanizer: false")

print("Fixed TS errors")
