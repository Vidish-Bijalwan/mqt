import json
import math
import os
import re

OVERPASS_FILE = "scripts/geojson_cache/gujarat_districts_overpass.json"
STATE_FILE = "src/components/ui/Map/StateSvgPaths.ts"

with open(OVERPASS_FILE, "r") as f:
    data = json.load(f)

districts = []

def simplify_coords(coords, tolerance):
    if len(coords) <= 2: return coords
    dmax = 0
    index = 0
    end = len(coords) - 1
    for i in range(1, end):
        dx = coords[end][0] - coords[0][0]
        dy = coords[end][1] - coords[0][1]
        if dx == 0 and dy == 0:
            d = math.sqrt((coords[i][0] - coords[0][0])**2 + (coords[i][1] - coords[0][1])**2)
        else:
            t = ((coords[i][0] - coords[0][0]) * dx + (coords[i][1] - coords[0][1]) * dy) / (dx * dx + dy * dy)
            t = max(0, min(1, t))
            px = coords[0][0] + t * dx
            py = coords[0][1] + t * dy
            d = math.sqrt((coords[i][0] - px)**2 + (coords[i][1] - py)**2)
        if d > dmax:
            index = i
            dmax = d
    if dmax > tolerance:
        left = simplify_coords(coords[:index+1], tolerance)
        right = simplify_coords(coords[index:], tolerance)
        return left[:-1] + right
    else:
        return [coords[0], coords[end]]

with open(STATE_FILE, "r") as f:
    state_content = f.read()

m_cos = re.search(r'"gujarat":\s*\{.*?cosFactor:\s*([0-9.]+)', state_content, re.DOTALL)
cos_factor = float(m_cos.group(1))

for element in data.get("elements", []):
    if element["type"] == "relation" and "tags" in element:
        name = element["tags"].get("name:en", element["tags"].get("name", "Unknown"))
        rings = []
        for member in element.get("members", []):
            if member["type"] == "way" and member["role"] == "outer" and "geometry" in member:
                ring_coords = [(pt["lon"], pt["lat"]) for pt in member["geometry"]]
                rings.append(ring_coords)
        
        path_parts = []
        for ring in rings:
            simplified = simplify_coords(ring, 0.005)
            if len(simplified) < 2: continue
            pts = []
            for c in simplified:
                x = c[0] * cos_factor
                y = -c[1]
                pts.append(f"{x:.3f},{y:.3f}")
            path_parts.append("M" + "L".join(pts))
        
        if path_parts:
            districts.append({
                "name": name,
                "path": " ".join(path_parts)
            })

district_ts = ",\n  districts: [\n"
for d in districts:
    district_ts += f'    {{ name: "{d["name"]}", path: "{d["path"]}" }},\n'
district_ts += "  ]"

new_content = re.sub(r'("gujarat":\s*\{.*?)(cosFactor: [0-9.]+)', r'\1' + district_ts.replace('\\', '\\\\') + r',\n  \2', state_content, flags=re.DOTALL)

with open(STATE_FILE, "w") as f:
    f.write(new_content)

print(f"Injected {len(districts)} districts into Gujarat!")
