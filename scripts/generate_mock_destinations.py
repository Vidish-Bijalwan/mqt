import json
import random

# Base bounds for Gujarat roughly:
lat_min, lat_max = 20.2, 24.5
lng_min, lng_max = 68.3, 74.3

categories = ["temple", "wildlife", "heritage", "adventure", "nature", "beach", "cultural", "hill_station", "camping", "trekking"]

cities = [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", 
    "Jamnagar", "Junagadh", "Gandhinagar", "Gandhidham", "Anand",
    "Navsari", "Morbi", "Nadiad", "Surendranagar", "Bharuch",
    "Mehsana", "Bhuj", "Porbandar", "Palanpur", "Valsad",
    "Vapi", "Gondal", "Veraval", "Godhra", "Patan",
    "Kalol", "Dahod", "Botad", "Amreli", "Deesa"
]

destinations = []
for i, city in enumerate(cities):
    cat = random.choice(categories)
    dest = {
        "id": f"gujarat-mock-{i}",
        "name": f"{city} {cat.replace('_', ' ').title()} Attraction",
        "slug": f"{city.lower()}-{cat.replace('_', '-')}-attraction",
        "stateId": "gujarat",
        "stateSlug": "gujarat",
        "type": cat,
        "shortDescription": f"A beautiful {cat.replace('_', ' ')} destination located in {city}, Gujarat. Explore the scenic beauty and cultural richness.",
        "description": f"Detailed description for {city} {cat.replace('_', ' ')} attraction...",
        "image": f"https://images.unsplash.com/photo-{random.randint(10000000, 99999999)}?auto=format&fit=crop&w=800&q=80",
        "coordinates": {
            "lat": round(random.uniform(lat_min, lat_max), 4),
            "lng": round(random.uniform(lng_min, lng_max), 4)
        },
        "mapPosition": {"x": 0, "y": 0}
    }
    destinations.append(dest)

import sys
# Read the current destinations file
with open("src/data/destinations.ts", "r") as f:
    content = f.read()

# We can just insert these into the file
import re
match = re.search(r'export const destinationsData:\s*DestinationModel\[\]\s*=\s*\[', content)
if match:
    insert_pos = match.end()
    # format new destinations
    dests_str = json.dumps(destinations, indent=2)
    # remove brackets
    dests_str = dests_str[1:-1] + ","
    
    new_content = content[:insert_pos] + "\n" + dests_str + content[insert_pos:]
    with open("src/data/destinations.ts", "w") as f:
        f.write(new_content)
    print("Injected 30 new destinations into destinations.ts!")
else:
    print("Could not find the insertion point.")
