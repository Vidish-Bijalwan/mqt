import re

STATE_FILE = "src/components/ui/Map/StateSvgPaths.ts"

with open(STATE_FILE, "r") as f:
    content = f.read()

# The incorrect structure is:
# "gujarat": { ..., cosFactor: 0.9244 },
# districts: [
#   ...
# ]

# We want to change it to:
# "gujarat": { ..., cosFactor: 0.9244, districts: [
#   ...
# ] },

# Let's find the districts block.
# We will just read the file line by line and move the `},`

lines = content.split('\n')
out_lines = []
in_districts = False
for i, line in enumerate(lines):
    if '"gujarat":' in line and 'cosFactor: 0.9244 },' in line:
        line = line.replace('cosFactor: 0.9244 },', 'cosFactor: 0.9244,')
    if 'districts: [' in line:
        in_districts = True
    
    # We need to find the end of the districts array.
    if in_districts and line.strip() == ']':
        in_districts = False
        out_lines.append('  ] },')
        continue
    
    out_lines.append(line)

with open(STATE_FILE, "w") as f:
    f.write('\n'.join(out_lines))
