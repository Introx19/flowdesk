import os

def replace_in_file(path, old, new):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base_dir = r'd:\Yarik\Antigravity projects\flowdesk\src'

# Settings.tsx
settings_path = os.path.join(base_dir, 'components', 'Settings.tsx')
replace_in_file(settings_path, "numismatics: activeTools.numismatics", "numismatics: activeTools.numismatics,\n          humanTyper: activeTools.humanTyper,\n          superHumanizer: activeTools.superHumanizer")

# SuperHumanizer.tsx
sh_path = os.path.join(base_dir, 'components', 'dlc', 'SuperHumanizer.tsx')
replace_in_file(sh_path, "import { Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Copy, Check, FileText, Bot, Sliders } from 'lucide-react';", "import { Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Copy, Check, FileText, Bot, Sliders } from 'lucide-react';")
# Actually, the previous replacement missed because Globe, Languages, BookmarkCheck were still there in the original code since it failed? Wait, I didn't replace them correctly. Let's just sed them out properly.
import re
with open(sh_path, 'r', encoding='utf-8') as f:
    sh_content = f.read()
sh_content = re.sub(r"Globe,\s*", "", sh_content)
sh_content = re.sub(r"Languages,\s*", "", sh_content)
sh_content = re.sub(r"BookmarkCheck\s*", "", sh_content)
with open(sh_path, 'w', encoding='utf-8') as f:
    f.write(sh_content)

# InfoButton.tsx
info_path = os.path.join(base_dir, 'components', 'InfoButton.tsx')
replace_in_file(info_path, "import React, { useState", "import { useState")

# Library.tsx
lib_path = os.path.join(base_dir, 'components', 'Library.tsx')
replace_in_file(lib_path, "import React, { useEffect } from 'react';", "import { useEffect } from 'react';")
replace_in_file(lib_path, "import { LayoutGrid, AlertCircle, X, Search } from 'lucide-react';", "import { LayoutGrid, AlertCircle, X, Search } from 'lucide-react';")

# App.tsx
app_path = os.path.join(base_dir, 'App.tsx')
replace_in_file(app_path, "onDragLeave={(e) => {", "onDragLeave={() => {")

print("Fixed TS errors")
