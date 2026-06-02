#!/usr/bin/env python3
"""Fetch remaining uncached GeoJSON files with proper rate limiting."""
import json, os, time, urllib.request

CACHE_DIR = "scripts/geojson_cache"

MISSING = {
    "maharashtra": "Maharashtra, India",
    "manipur": "Manipur, India",
    "meghalaya": "Meghalaya, India",
    "mizoram": "Mizoram, India",
    "nagaland": "Nagaland, India",
    "odisha": "Odisha, India",
    "puducherry": "Puducherry, India",
    "punjab": "Punjab, India",
    "rajasthan": "Rajasthan, India",
    "sikkim": "Sikkim, India",
    "tamil-nadu": "Tamil Nadu, India",
    "telangana": "Telangana, India",
    "tripura": "Tripura, India",
    "uttar-pradesh": "Uttar Pradesh, India",
    "uttarakhand": "Uttarakhand, India",
    "west-bengal": "West Bengal, India",
}

os.makedirs(CACHE_DIR, exist_ok=True)

for i, (slug, query) in enumerate(MISSING.items()):
    cache_file = os.path.join(CACHE_DIR, f"{slug}.json")
    if os.path.exists(cache_file):
        print(f"[{i+1}/{len(MISSING)}] {slug}: already cached, skipping")
        continue
    
    print(f"[{i+1}/{len(MISSING)}] Fetching {slug}...")
    url = f"https://nominatim.openstreetmap.org/search?q={urllib.request.quote(query)}&format=json&polygon_geojson=1&limit=1"
    req = urllib.request.Request(url, headers={"User-Agent": "MQT-MapGen/2.0"})
    
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            if data and data[0].get("geojson"):
                with open(cache_file, "w") as f:
                    json.dump(data[0]["geojson"], f)
                print(f"  OK")
            else:
                print(f"  No geojson returned")
    except Exception as e:
        print(f"  ERROR: {e}")
    
    # Wait 2 seconds between requests to avoid rate limiting
    time.sleep(2.0)

print("\nAll fetched! Now run: python3 scripts/fix_state_paths.py")
