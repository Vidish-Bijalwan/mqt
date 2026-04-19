import os
import re
import shutil

src_data_dir = "src/data"
india_tourism_dir = "india_tourism"
public_tourism_dir = "public/tourism"

used_images = set()

# Scan TS files for /tourism/...
for filename in os.listdir(src_data_dir):
    if filename.endswith(".ts"):
        with open(os.path.join(src_data_dir, filename), 'r', encoding='utf-8') as f:
            content = f.read()
            matches = re.findall(r'"/tourism/([^"]+)"', content)
            for m in matches:
                used_images.add(m)

print(f"Found {len(used_images)} unique images used in src/data/")

copied_count = 0

for img_path in used_images:
    src_file = os.path.join(india_tourism_dir, img_path)
    dest_file = os.path.join(public_tourism_dir, img_path)
    
    # print(f"Copying {src_file} to {dest_file}")
    if os.path.exists(src_file):
        os.makedirs(os.path.dirname(dest_file), exist_ok=True)
        shutil.copy2(src_file, dest_file)
        copied_count += 1
    else:
        print(f"Missing source file: {src_file}")

print(f"Successfully copied {copied_count} files to {public_tourism_dir}")
