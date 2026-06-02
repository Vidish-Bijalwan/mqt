#!/usr/bin/env python3
import json
import urllib.request
import math
import os

STATE_QUERIES = {
    "andaman-and-nicobar-islands": "Andaman and Nicobar Islands, India",
    "andhra-pradesh": "Andhra Pradesh, India",
    "arunachal-pradesh": "Arunachal Pradesh, India",
    "assam": "Assam, India",
    "bihar": "Bihar, India",
    "chandigarh": "Chandigarh, India",
    "chhattisgarh": "Chhattisgarh, India",
    "dadra-and-nagar-haveli-and-daman-and-diu": "Dadra and Nagar Haveli and Daman and Diu, India",
    "delhi": "Delhi, India",
    "goa": "Goa, India",
    "gujarat": "Gujarat, India",
    "haryana": "Haryana, India",
    "himachal-pradesh": "Himachal Pradesh, India",
    "jammu-and-kashmir": "Jammu and Kashmir, India",
    "jharkhand": "Jharkhand, India",
    "karnataka": "Karnataka, India",
    "kerala": "Kerala, India",
    "ladakh": "Ladakh, India",
    "lakshadweep": "Lakshadweep, India",
    "madhya-pradesh": "Madhya Pradesh, India",
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

CACHE_DIR = "geojson_cache"
os.makedirs(CACHE_DIR, exist_ok=True)

def simplify_coords(coords, tolerance):
    if len(coords) <= 2: return coords
    def pld(p, s, e):
        if s[0]==e[0] and s[1]==e[1]: return ((p[0]-s[0])**2 + (p[1]-s[1])**2)**0.5
        dx, dy = e[0]-s[0], e[1]-s[1]
        t = max(0, min(1, ((p[0]-s[0])*dx + (p[1]-s[1])*dy)/(dx*dx+dy*dy)))
        return ((p[0]-(s[0]+t*dx))**2 + (p[1]-(s[1]+t*dy))**2)**0.5
    max_d, max_i = 0, 0
    for i in range(1, len(coords)-1):
        d = pld(coords[i], coords[0], coords[-1])
        if d > max_d: max_d, max_i = d, i
    if max_d > tolerance:
        return simplify_coords(coords[:max_i+1], tolerance)[:-1] + simplify_coords(coords[max_i:], tolerance)
    return [coords[0], coords[-1]]

results = {}
for slug in STATE_QUERIES:
    cache_file = os.path.join(CACHE_DIR, f"{slug}.json")
    if not os.path.exists(cache_file): continue
    
    with open(cache_file) as f:
        data = json.load(f)
    if not data or "geojson" not in data: continue
    
    geom = data["geojson"]
    gtype = geom.get("type", "")
    all_rings = []
    if gtype == "Polygon":
        all_rings = geom["coordinates"]
    elif gtype == "MultiPolygon":
        for poly in geom["coordinates"]: all_rings.extend(poly)
    
    if not all_rings: continue
    
    all_lngs = [c[0] for r in all_rings for c in r]
    all_lats = [c[1] for r in all_rings for c in r]
    
    west, east = min(all_lngs), max(all_lngs)
    south, north = min(all_lats), max(all_lats)
    mid_lat = (north + south) / 2
    
    pad_lng = (east - west) * 0.02
    pad_lat = (north - south) * 0.02
    
    # We map Lng, Lat directly to X, Y but adjust X by cos(mid_lat) to fix aspect ratio
    cos_factor = math.cos(math.radians(mid_lat))
    
    # The SVG viewBox bounds
    v_west = (west - pad_lng) * cos_factor
    v_east = (east + pad_lng) * cos_factor
    v_south = -(north + pad_lat) # SVG Y increases downwards!
    v_north = -(south - pad_lat)
    
    v_width = v_east - v_west
    v_height = v_north - v_south
    
    viewBox = f"{v_west:.3f} {v_south:.3f} {v_width:.3f} {v_height:.3f}"
    
    path_parts = []
    tol = max((east-west), (north-south)) * 0.001
    for ring in all_rings:
        simplified = simplify_coords(ring, tol)
        if len(simplified) < 3: continue
        
        pts = []
        for c in simplified:
            # Map lng/lat to svg x/y
            x = c[0] * cos_factor
            y = -c[1]
            pts.append(f"{x:.3f},{y:.3f}")
        path_parts.append("M" + "L".join(pts) + "Z")
        
    if path_parts:
        results[slug] = {
            "path": "".join(path_parts),
            "bounds": {"north": round(north, 3), "south": round(south, 3), "east": round(east, 3), "west": round(west, 3)},
            "viewBox": viewBox,
            "cosFactor": round(cos_factor, 4)
        }

with open("StateSvgPaths_temp.ts", "w") as f:
    f.write("export interface StateMapConfig {\n  slug: string;\n  bounds: { north: number; south: number; east: number; west: number };\n")
    f.write("  viewBox: string;\n  path: string;\n  cosFactor: number;\n}\n\n")
    f.write("export const STATE_MAP_CONFIGS: Record<string, StateMapConfig> = {\n")
    for s, d in results.items():
        f.write(f'  "{s}": {{ slug: "{s}", bounds: {d["bounds"]}, viewBox: "{d["viewBox"]}", path: "{d["path"]}", cosFactor: {d["cosFactor"]} }},\n')
    f.write("};\n")
print("Done writing StateSvgPaths.ts with true aspect ratios!")
