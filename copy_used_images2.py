import os
import re
import shutil

dirs_to_scan = ["src/data", "src/components", "src/pages"]
india_tourism_dir = "india_tourism"
public_tourism_dir = "public/tourism"

used_images = set()

# Scan TS/TSX files for /tourism/...
for d in dirs_to_scan:
    for root, _, files in os.walk(d):
        for filename in files:
            if filename.endswith(".ts") or filename.endswith(".tsx"):
                with open(os.path.join(root, filename), 'r', encoding='utf-8') as f:
                    content = f.read()
                    matches = re.findall(r'"/tourism/([^"]+)"', content)
                    for m in matches:
                        used_images.add(m)

print(f"Found {len(used_images)} unique images used")

copied_count = 0

for img_path in used_images:
    src_file = os.path.join(india_tourism_dir, img_path)
    dest_file = os.path.join(public_tourism_dir, img_path)
    
    if os.path.exists(src_file):
        os.makedirs(os.path.dirname(dest_file), exist_ok=True)
        shutil.copy2(src_file, dest_file)
        copied_count += 1

print(f"Successfully copied {copied_count} files to {public_tourism_dir}")
