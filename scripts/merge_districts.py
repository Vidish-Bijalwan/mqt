import re

with open("src/components/ui/Map/StateSvgPaths.ts", "r") as f:
    old_content = f.read()

# Extract districts array from old gujarat object
match = re.search(r'districts:\s*\[(.*?)\s*\]\s*\},', old_content, re.DOTALL)
if match:
    districts_str = match.group(0)
    print("Found districts array!")
else:
    print("Could not find districts array!")
    exit(1)

with open("StateSvgPaths_temp2.ts", "r") as f:
    new_content = f.read()

# Replace the gujarat line in new_content to include the districts array
# The gujarat line in StateSvgPaths_temp2.ts ends with ' },'
gujarat_pattern = r'("gujarat": \{ .*?cosFactor: [0-9.]+ )\},'
new_content = re.sub(gujarat_pattern, r'\1, ' + districts_str, new_content)

with open("src/components/ui/Map/StateSvgPaths.ts", "w") as f:
    f.write(new_content)

print("Merged successfully!")
