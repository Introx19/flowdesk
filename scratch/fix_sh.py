import os

def replace_in_file(path, old, new):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base_dir = r'd:\Yarik\Antigravity projects\flowdesk\src'

# SuperHumanizer.tsx
sh_path = os.path.join(base_dir, 'components', 'dlc', 'SuperHumanizer.tsx')
replace_in_file(sh_path, "import { Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Copy, Check, Globe, FileText, Bot, Languages, Sliders, BookmarkCheck } from 'lucide-react';", "import { Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Copy, Check, FileText, Bot, Sliders } from 'lucide-react';")
replace_in_file(sh_path, "const [useWebSearch, setUseWebSearch] = useState(false);", "const [useWebSearch] = useState(false);")
replace_in_file(sh_path, "const wordCount = analyzedText.trim().split(/\s+/).length;", "")
replace_in_file(sh_path, "wordCount", "")

print("Fixed SH unused vars")
