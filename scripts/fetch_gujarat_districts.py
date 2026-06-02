import urllib.request
import urllib.parse
import json
import os

query = """
[out:json];
area["name:en"="Gujarat"]["admin_level"="4"]->.a;
relation["admin_level"="5"](area.a);
out geom;
"""

url = "https://overpass-api.de/api/interpreter?data=" + urllib.parse.quote(query.strip())
print("Fetching districts from Overpass API...")
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'MQT-MapGen/2.0'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        # Save raw data
        os.makedirs("scripts/geojson_cache", exist_ok=True)
        with open("scripts/geojson_cache/gujarat_districts_overpass.json", "w") as f:
            json.dump(data, f)
            
        print(f"Found {len(data.get('elements', []))} districts.")
except Exception as e:
    print(f"Error: {e}")
