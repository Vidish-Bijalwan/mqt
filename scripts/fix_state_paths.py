#!/usr/bin/env python3
"""
Fix state SVG paths: For MultiPolygon states, keep only the OUTER ring
of each polygon (ring index 0 within each polygon), discarding hole rings.
This prevents the evenodd fill rule from creating ghost shadow outlines.
Also use nonzero winding to avoid any fill-rule artifacts.
"""

import json
import math
import re
import time
import urllib.request
import urllib.error
import sys
import os

CACHE_DIR = "scripts/geojson_cache"
OUTPUT_FILE = "StateSvgPaths_temp2.ts"

# All 36 states/UTs
STATES = {
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

def simplify_coords(coords, tolerance):
    """Ramer-Douglas-Peucker simplification."""
    if len(coords) <= 2:
        return coords
    
    # Find the point with the maximum distance from the line between first and last
    dmax = 0
    index = 0
    end = len(coords) - 1
    
    for i in range(1, end):
        d = perpendicular_distance(coords[i], coords[0], coords[end])
        if d > dmax:
            index = i
            dmax = d
    
    if dmax > tolerance:
        left = simplify_coords(coords[:index+1], tolerance)
        right = simplify_coords(coords[index:], tolerance)
        return left[:-1] + right
    else:
        return [coords[0], coords[end]]

def perpendicular_distance(point, line_start, line_end):
    dx = line_end[0] - line_start[0]
    dy = line_end[1] - line_start[1]
    
    if dx == 0 and dy == 0:
        return math.sqrt((point[0] - line_start[0])**2 + (point[1] - line_start[1])**2)
    
    t = ((point[0] - line_start[0]) * dx + (point[1] - line_start[1]) * dy) / (dx * dx + dy * dy)
    t = max(0, min(1, t))
    
    proj_x = line_start[0] + t * dx
    proj_y = line_start[1] + t * dy
    
    return math.sqrt((point[0] - proj_x)**2 + (point[1] - proj_y)**2)

def ring_area(ring):
    """Calculate the signed area of a ring (shoelace formula)."""
    area = 0
    n = len(ring)
    for i in range(n):
        j = (i + 1) % n
        area += ring[i][0] * ring[j][1]
        area -= ring[j][0] * ring[i][1]
    return area / 2.0

def fetch_geojson(slug, query):
    """Fetch GeoJSON for a state, with caching."""
    os.makedirs(CACHE_DIR, exist_ok=True)
    cache_file = os.path.join(CACHE_DIR, f"{slug}.json")
    
    if os.path.exists(cache_file):
        with open(cache_file) as f:
            return json.load(f)
    
    url = f"https://nominatim.openstreetmap.org/search?q={urllib.request.quote(query)}&format=json&polygon_geojson=1&limit=1"
    req = urllib.request.Request(url, headers={"User-Agent": "MQT-MapGen/2.0"})
    
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            if data and data[0].get("geojson"):
                with open(cache_file, "w") as f:
                    json.dump(data[0]["geojson"], f)
                return data[0]["geojson"]
    except Exception as e:
        print(f"  ERROR fetching {slug}: {e}")
    
    return None

def process_state(slug, query):
    """Process a single state and return its SVG path data."""
    geom = fetch_geojson(slug, query)
    if not geom:
        return None
    
    # Extract ONLY outer rings from each polygon (skip holes)
    outer_rings = []
    
    if geom["type"] == "Polygon":
        # Only take ring[0] (the outer ring), skip ring[1+] (holes)
        outer_rings.append(geom["coordinates"][0])
    elif geom["type"] == "MultiPolygon":
        for polygon in geom["coordinates"]:
            # Only take ring[0] of each polygon (outer ring), skip holes
            outer_rings.append(polygon[0])
    else:
        print(f"  Unknown geometry type: {geom['type']}")
        return None
    
    # Compute bounds from all outer rings
    all_lons = []
    all_lats = []
    for ring in outer_rings:
        for c in ring:
            all_lons.append(c[0])
            all_lats.append(c[1])
    
    west, east = min(all_lons), max(all_lons)
    south, north = min(all_lats), max(all_lats)
    
    # Cosine correction for mercator-like projection
    mid_lat = (north + south) / 2
    cos_factor = math.cos(math.radians(mid_lat))
    
    # Simplify and convert to SVG path
    # Use a tolerance proportional to the state size
    span = max(east - west, north - south)
    tol = span * 0.002  # Slightly more aggressive to keep paths reasonable
    
    # For small states/UTs, use finer tolerance
    if span < 2:
        tol = span * 0.001
    
    # viewBox: x_min, y_min, width, height (with padding)
    pad = span * 0.05
    vb_x = (west * cos_factor) - pad
    vb_y = -(north) - pad
    vb_w = ((east - west) * cos_factor) + 2 * pad
    vb_h = (north - south) + 2 * pad
    viewBox = f"{vb_x:.3f} {vb_y:.3f} {vb_w:.3f} {vb_h:.3f}"
    
    path_parts = []
    for ring in outer_rings:
        simplified = simplify_coords(ring, tol)
        if len(simplified) < 3:
            continue
        
        pts = []
        for c in simplified:
            x = c[0] * cos_factor
            y = -c[1]
            pts.append(f"{x:.3f},{y:.3f}")
        path_parts.append("M" + "L".join(pts) + "Z")
    
    if not path_parts:
        return None
    
    return {
        "path": "".join(path_parts),
        "bounds": {"north": round(north, 3), "south": round(south, 3), "east": round(east, 3), "west": round(west, 3)},
        "viewBox": viewBox,
        "cosFactor": round(cos_factor, 4)
    }

def main():
    results = {}
    
    for i, (slug, query) in enumerate(STATES.items()):
        print(f"[{i+1}/{len(STATES)}] Processing {slug}...")
        result = process_state(slug, query)
        if result:
            results[slug] = result
            print(f"  OK: {len(result['path'])} chars, bounds N={result['bounds']['north']}")
        else:
            print(f"  FAILED")
        
        # Rate limit for uncached requests
        cache_file = os.path.join(CACHE_DIR, f"{slug}.json")
        if not os.path.exists(cache_file):
            time.sleep(1.1)
    
    # Write the TypeScript file
    ts_lines = [
        '// Auto-generated SVG paths for Indian states and UTs',
        '// Generated from OpenStreetMap Nominatim GeoJSON boundaries',
        '// Only outer rings are included (no holes/enclaves) to prevent fill artifacts',
        '',
        'export interface StateMapConfig {',
        '  slug: string;',
        '  bounds: { north: number; south: number; east: number; west: number };',
        '  viewBox: string;',
        '  path: string;',
        '  cosFactor: number;',
        '}',
        '',
        'export const STATE_MAP_CONFIGS: Record<string, StateMapConfig> = {',
    ]
    
    for slug, data in sorted(results.items()):
        bounds_str = f"{{'north': {data['bounds']['north']}, 'south': {data['bounds']['south']}, 'east': {data['bounds']['east']}, 'west': {data['bounds']['west']}}}"
        ts_lines.append(f'  "{slug}": {{ slug: "{slug}", bounds: {bounds_str}, viewBox: "{data["viewBox"]}", path: "{data["path"]}", cosFactor: {data["cosFactor"]} }},')
    
    ts_lines.append('};')
    ts_lines.append('')
    
    with open(OUTPUT_FILE, "w") as f:
        f.write("\n".join(ts_lines))
    
    print(f"\nDone! Wrote {len(results)} states to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
