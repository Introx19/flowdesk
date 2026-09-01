import json
import os

transcript_path = r'C:\Users\Introx\.gemini\antigravity-ide\brain\3537d902-0f5e-4fd6-8591-d8099fe0b6c4\.system_generated\logs\transcript_full.jsonl'
main_ts_path = r'd:\Yarik\Antigravity projects\flowdesk\electron\main.ts'

# Backup current main.ts
with open(main_ts_path, 'r', encoding='utf-8') as f:
    original_main = f.read()

# We know that in step 9482, there was a multi_replace_file_content tool call that added the AI logic.
# Wait, let's just find the last few tool calls modifying electron/main.ts and print them out.
# Or better, just get the full ReplacementContent from step 9482.

chunks = []

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if 'tool_calls' in data:
                for call in data['tool_calls']:
                    if call['name'] in ['multi_replace_file_content', 'replace_file_content']:
                        args = call['args']
                        if 'main.ts' in args.get('TargetFile', ''):
                            if call['name'] == 'multi_replace_file_content':
                                rc = args.get('ReplacementChunks', [])
                                if isinstance(rc, str):
                                    try:
                                        rc = json.loads(rc)
                                    except:
                                        pass
                                chunks.extend(rc)
                            else:
                                chunks.append({
                                    'StartLine': args.get('StartLine'),
                                    'EndLine': args.get('EndLine'),
                                    'ReplacementContent': args.get('ReplacementContent')
                                })
        except:
            pass

with open('main_all_chunks.json', 'w', encoding='utf-8') as out:
    json.dump(chunks, out, indent=2)
print(f"Dumped {len(chunks)} chunks to main_all_chunks.json")
if chunks:
    # Because we reverted main.ts to v1.7.3, the lines might match exactly what they were before the edit.
    # Let's write the ReplacementContent to a file so I can manually patch it or apply it.
    with open('main_chunks.json', 'w', encoding='utf-8') as out:
        json.dump(chunks, out, indent=2)
    print(f"Dumped {len(chunks)} chunks to main_chunks.json")
else:
    print("Could not find chunks in step 9482")
