#!/usr/bin/env python3
"""
MQT Image Migration Script
Maps scraped local images from india_tourism/ to all data files.
Outputs URLs as /tourism/<State>/<Subfolder>/<filename> for the Vite public symlink.
"""

import os
import re
import sys

BASE = "/home/zerosirus/Desktop/MQT"
TOURISM_DIR = os.path.join(BASE, "india_tourism")
PUBLIC_PREFIX = "/tourism"   # URL prefix after symlink to public/tourism

# -------------------------------------------------------------------
# DESTINATION → local image mapping
# Each entry = (relative_path_inside_india_tourism_without_leading_slash,)
# Pick the BEST image by filename context. We choose specific filenames.
# -------------------------------------------------------------------

DESTINATION_MAP = {
    # Uttarakhand / Garhwal
    "uttarakhand":   "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "kedarnath":     "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "char dham":     "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "rishikesh":     "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "haridwar":      "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "valley of flowers": "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "harshil valley":    "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "gangotri":          "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "nelang valley":     "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "darang village":    "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "auli":              "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",

    # Jammu & Kashmir / Ladakh
    "kashmir":       "India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "srinagar":      "India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "dal lake":      "India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "gulmarg":       "India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "pahalgam":      "India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "ladakh":        "India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    "leh":           "India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    "nubra valley":  "India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    "pangong":       "India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    "spiti valley":  "India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",

    # Himachal Pradesh
    "manali":        "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    "shimla":        "Himachal_Pradesh/Popular_Destination/001_image_govt.jpg",
    "himachal":      "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    "kullu":         "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    "dharamshala":   "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",

    # Uttar Pradesh
    "varanasi":      "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "agra":          "India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",
    "lucknow":       "India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",
    "mathura":       "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "vrindavan":     "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "khajuraho":     "India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg",
    "prayagraj":     "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "allahabad":     "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",

    # Rajasthan
    "rajasthan":     "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "jaipur":        "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "jodhpur":       "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "udaipur":       "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "jaisalmer":     "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "pushkar":       "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "rann of kutch": "Gujarat/Destinations/001_image_govt.jpg",
    "rann":          "Gujarat/Destinations/001_image_govt.jpg",

    # Delhi & NCR
    "delhi":         "India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",
    "red fort":      "India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",
    "new delhi":     "India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",

    # Punjab / North India
    "amritsar":      "India_Central/Incredible_India/014_1-sri-harmandir-sahib-golden-temple-amritsar-punja_govt.jpg",
    "golden temple": "India_Central/Incredible_India/014_1-sri-harmandir-sahib-golden-temple-amritsar-punja_govt.jpg",

    # Goa
    "goa":           "India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",

    # Maharashtra
    "mumbai":        "India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg",
    "maharashtra":   "India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg",
    "pune":          "India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg",
    "aurangabad":    "India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg",

    # Karnataka
    "hampi":         "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    "bangalore":     "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    "mysore":        "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    "mysuru":        "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    "coorg":         "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",

    # Kerala
    "kerala":        "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "alleppey":      "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "munnar":        "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "kochi":         "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "wayanad":       "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "thrissur":      "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",

    # Tamil Nadu
    "tamil nadu":    "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "rameswaram":    "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "madurai":       "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "ooty":          "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "kodaikanal":    "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "mahabalipuram": "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",

    # Andhra Pradesh / Telangana
    "tirupati":      "India_Central/Incredible_India/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg",
    "hyderabad":     "India_Central/Incredible_India/034_2-charminar_hyderabad_telangana-1-city-herojpg_govt.jpg",

    # Odisha
    "odisha":        "India_Central/Incredible_India/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg",
    "puri":          "India_Central/Incredible_India/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg",
    "bhubaneswar":   "India_Central/Incredible_India/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg",

    # Gujarat
    "gujarat":       "Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg",
    "ahmedabad":     "Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg",
    "somnath":       "Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg",

    # West Bengal / Northeast
    "darjeeling":    "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "kolkata":       "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "sundarbans":    "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "west bengal":   "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",

    # Meghalaya / Northeast
    "meghalaya":     "Manipur/Destinations/001_image_govt.jpg",
    "shillong":      "Manipur/Destinations/001_image_govt.jpg",
    "cherrapunji":   "Manipur/Destinations/001_image_govt.jpg",
    "ziro valley":   "Manipur/Destinations/001_image_govt.jpg",
    "nagaland":      "Manipur/Destinations/001_image_govt.jpg",
    "manipur":       "Manipur/Exclusive_Destination/003_ema_keithel3_govt.jpg",
    "sikkim":        "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "gangtok":       "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "tripura":       "Tripura/Destination/005_destination_govt.jpg",

    # Andaman & Lakshadweep
    "andaman":         "Andaman_Nicobar/Destinations/003_image_govt.jpg",
    "andaman islands": "Andaman_Nicobar/Destinations/003_image_govt.jpg",
    "lakshadweep":   "India_Central/Incredible_India/036_kalpeni-kavaratti-lakshwadeep-3-musthead-hero_govt.jpg",

    # Madhya Pradesh
    "madhya pradesh": "India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg",
    "bhopal":         "India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg",
    "bandhavgarh":    "India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg",
    "kanha":          "India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg",

    # Pondicherry
    "pondicherry":   "India_Central/Incredible_India/039_auroville-puducherry_govt.jpg",
    "puducherry":    "India_Central/Incredible_India/039_auroville-puducherry_govt.jpg",
}

# Verify which paths actually exist and print report
print("\n🔍 Verifying mapped image paths...")
MISSING = []
VALID_MAP = {}
for key, rel_path in DESTINATION_MAP.items():
    abs_path = os.path.join(TOURISM_DIR, rel_path)
    if os.path.isfile(abs_path):
        VALID_MAP[key] = f"{PUBLIC_PREFIX}/{rel_path}"
    else:
        MISSING.append((key, rel_path))

if MISSING:
    print(f"\n⚠️  {len(MISSING)} paths failed, finding alternatives...")
    for key, rel_path in MISSING:
        # Search for any jpg in the state's folder
        parts = rel_path.split("/")
        state_folder = os.path.join(TOURISM_DIR, parts[0])
        found = None
        for root, dirs, files in os.walk(state_folder):
            for f in sorted(files):
                if f.endswith(('.jpg', '.jpeg', '.png')) and 'logo' not in f.lower() and 'icon' not in f.lower():
                    found = os.path.relpath(os.path.join(root, f), TOURISM_DIR)
                    break
            if found:
                break
        if found:
            VALID_MAP[key] = f"{PUBLIC_PREFIX}/{found}"
            print(f"   ✓ Fallback for '{key}': {found}")
        else:
            print(f"   ✗ No fallback found for '{key}'")

print(f"\n✅ {len(VALID_MAP)} destination mappings ready\n")


def find_best_image_for_text(text):
    """Given a destination/location string, find the best local image URL."""
    text_lower = text.lower().strip()
    # Try exact match first
    if text_lower in VALID_MAP:
        return VALID_MAP[text_lower]
    # Try substring match (longest key wins)
    best_key = None
    for key in VALID_MAP:
        if key in text_lower:
            if best_key is None or len(key) > len(best_key):
                best_key = key
    if best_key:
        return VALID_MAP[best_key]
    return None


def replace_image_in_file(filepath, dry_run=False):
    """Replace image URLs in a TypeScript data file with local mappings."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    replacements = 0
    skipped = 0

    # Find all image: "..." lines with their surrounding context
    # Pattern: find image field + nearby destination/name/state fields in same object block
    
    # Strategy: parse objects block by block
    # We'll do a line-by-line scan, tracking current "destination", "name", "state"
    lines = content.split('\n')
    new_lines = []
    
    # Track context window
    context_window = []  # store last N lines to find destination/name/state
    
    current_destination = None
    current_state = None
    current_name = None
    
    for i, line in enumerate(lines):
        # Track location context
        dest_match = re.search(r'destination:\s*["\']([^"\']+)["\']', line)
        state_match = re.search(r'state:\s*["\']([^"\']+)["\']', line)
        name_match  = re.search(r'(?:^|\s)name:\s*["\']([^"\']+)["\']', line)
        city_match  = re.search(r'city:\s*["\']([^"\']+)["\']', line)
        
        if dest_match:
            current_destination = dest_match.group(1)
        if state_match:
            current_state = state_match.group(1)
        if name_match:
            current_name = name_match.group(1)
        if city_match:
            current_name = city_match.group(1)
        
        # Reset context at new object boundaries
        if re.search(r'^\s*\{', line) and i > 0:
            current_destination = None
            current_state = None
            current_name = None
        
        # Process image lines
        img_match = re.search(r'(image:\s*["\'])https?://[^"\']+(["\'])', line)
        if img_match:
            # Find best match using available context
            search_texts = [
                current_destination,
                current_name,
                current_state,
            ]
            
            new_url = None
            for text in search_texts:
                if text:
                    found = find_best_image_for_text(text)
                    if found:
                        new_url = found
                        break
            
            if new_url:
                new_line = re.sub(
                    r'(image:\s*["\'])https?://[^"\']+(["\'])',
                    lambda m: m.group(1) + new_url + m.group(2),
                    line
                )
                new_lines.append(new_line)
                replacements += 1
                context_str = current_destination or current_name or current_state or "?"
                print(f"   ✓ [{context_str}] → {new_url.split('/')[-1]}")
            else:
                new_lines.append(line)
                skipped += 1
                context_str = current_destination or current_name or current_state or "?"
                print(f"   ⚠ Skipped [{context_str}] — no match found")
        else:
            new_lines.append(line)
    
    new_content = '\n'.join(new_lines)
    
    if not dry_run and new_content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
    
    return replacements, skipped


# -------------------------------------------------------------------
# Target data files
# -------------------------------------------------------------------
DATA_FILES = [
    "src/data/packages.ts",
    "src/data/festivals.ts",
    "src/data/destinations.ts",
    "src/data/destinationsMegaMenu.ts",
    "src/data/experiences.ts",
    "src/data/travelRoutes.ts",
    "src/data/packageMenuData.ts",
    "src/data/india-states.ts",
]

total_replaced = 0
total_skipped  = 0

for rel_file in DATA_FILES:
    filepath = os.path.join(BASE, rel_file)
    if not os.path.isfile(filepath):
        print(f"\n📁 Skipping (not found): {rel_file}")
        continue
    
    print(f"\n📄 Processing: {rel_file}")
    r, s = replace_image_in_file(filepath, dry_run=False)
    total_replaced += r
    total_skipped  += s
    print(f"   → {r} replaced, {s} skipped")

print(f"\n{'='*60}")
print(f"✅ DONE  |  Total replaced: {total_replaced}  |  Skipped: {total_skipped}")
print(f"{'='*60}\n")
