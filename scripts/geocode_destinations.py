import json
import re
import time
import urllib.request
import os

DEST_FILE = "src/data/destinations.ts"

# Extract all destinations
with open(DEST_FILE, "r") as f:
    content = f.read()

# Pattern to find each destination block
pattern = re.compile(
    r'(\{\s*"id":\s*"[^"]+",\s*"slug":\s*"[^"]+",\s*"name":\s*"([^"]+)",\s*"stateId":\s*"[^"]+",\s*"stateSlug":\s*"([^"]+)",.*?)"coordinates":\s*\{\s*"lat":\s*[0-9.]+,\s*"lng":\s*[0-9.]+\s*\}',
    re.DOTALL
)

matches = list(pattern.finditer(content))
print(f"Found {len(matches)} destinations to geocode.")

def get_coords(name, state_slug):
    state_name = state_slug.replace('-', ' ')
    query = f"{name}, {state_name}, India"
    url = f"https://nominatim.openstreetmap.org/search?q={urllib.request.quote(query)}&format=json&limit=1"
    
    req = urllib.request.Request(url, headers={"User-Agent": "MQT-DestinationGeocode/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            if data:
                return float(data[0]["lat"]), float(data[0]["lon"])
            # Fallback 1: Just the name and India
            query = f"{name}, India"
            url = f"https://nominatim.openstreetmap.org/search?q={urllib.request.quote(query)}&format=json&limit=1"
            req = urllib.request.Request(url, headers={"User-Agent": "MQT-DestinationGeocode/1.0"})
            with urllib.request.urlopen(req, timeout=10) as resp2:
                data2 = json.loads(resp2.read().decode())
                if data2:
                    return float(data2[0]["lat"]), float(data2[0]["lon"])
    except Exception as e:
        print(f"Error fetching {query}: {e}")
    return None, None


# To avoid waiting 5 mins, we'll only geocode Haryana and Uttarakhand right now
# We can do the rest in a background task later, or just do these two states for the immediate fix.
TARGET_STATES = ["haryana", "uttarakhand"]
# Or actually, we'll just process the whole file in the background!
new_content = content
count = 0

for m in matches:
    full_match = m.group(0)
    name = m.group(2)
    state_slug = m.group(3)
    
    # Optional: Filter for specific states if we want to run fast
        
    print(f"Geocoding: {name}, {state_slug}...")
    lat, lng = get_coords(name, state_slug)
    
    if lat is not None and lng is not None:
        replacement = full_match.rsplit('"coordinates":', 1)[0] + f'"coordinates": {{\n      "lat": {lat},\n      "lng": {lng}\n    }}'
        new_content = new_content.replace(full_match, replacement)
        count += 1
    else:
        print(f"  -> NOT FOUND")
        
    time.sleep(1.1)

with open(DEST_FILE, "w") as f:
    f.write(new_content)

print(f"Successfully updated {count} destinations in {DEST_FILE}!")
