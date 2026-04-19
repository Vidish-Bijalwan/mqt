#!/usr/bin/env python3
"""
MQT Full-Site Image Migration — Phase 2
Targets all remaining component and data files missed in Phase 1.
"""

import os, re, sys

BASE = "/home/zerosirus/Desktop/MQT"
TOURISM_DIR = os.path.join(BASE, "india_tourism")
PUBLIC_PREFIX = "/tourism"

# Verified local image paths (all confirmed to exist)
LOCAL = {
    # Uttarakhand / Garhwal (haridwar/ganga ghat)
    "uttarakhand": "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "kedarnath":   "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "rishikesh":   "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "haridwar":    "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "char dham":   "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "badrinath":   "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "valley of flowers":"India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "mussoorie":   "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "auli":        "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "gangotri":    "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "harshil valley":"India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "nelang valley":"India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "darang village":"India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",

    # Ladakh & J&K
    "ladakh":      "India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    "leh":         "India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    "pangong":     "India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    "nubra":       "India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    "spiti":       "India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    "kashmir":     "India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "srinagar":    "India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "dal lake":    "India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "gulmarg":     "India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "pahalgam":    "India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",

    # Himachal Pradesh
    "manali":      "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    "shimla":      "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    "himachal":    "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    "kullu":       "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    "dharamshala": "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    "kasol":       "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    "bir billing": "India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",

    # Rajasthan
    "rajasthan":   "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "jaipur":      "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "jodhpur":     "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "udaipur":     "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "jaisalmer":   "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "pushkar":     "India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",

    # Goa
    "goa":         "India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    "vagator":     "India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    "baga":        "India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    "varkala":     "India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    "kovalam":     "India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    "gokarna":     "India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",

    # Kerala
    "kerala":      "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "alleppey":    "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "munnar":      "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "kochi":       "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "wayanad":     "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "thrissur":    "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "thekkady":    "India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",

    # Tamil Nadu
    "tamil":       "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "rameswaram":  "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "madurai":     "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "mahabalipuram":"India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "kanchipuram": "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "ooty":        "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",
    "kodaikanal":  "India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg",

    # Andhra / Telangana
    "tirupati":    "India_Central/Incredible_India/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg",
    "tirupathi":   "India_Central/Incredible_India/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg",
    "hyderabad":   "India_Central/Incredible_India/034_2-charminar_hyderabad_telangana-1-city-herojpg_govt.jpg",
    "charminar":   "India_Central/Incredible_India/034_2-charminar_hyderabad_telangana-1-city-herojpg_govt.jpg",

    # Karnataka
    "hampi":       "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    "mysore":      "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    "mysuru":      "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    "coorg":       "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    "bangalore":   "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    "kabini":      "India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",

    # Odisha
    "odisha":      "India_Central/Incredible_India/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg",
    "puri":        "India_Central/Incredible_India/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg",
    "bhubaneswar": "India_Central/Incredible_India/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg",

    # West Bengal / Northeast
    "darjeeling":  "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "kolkata":     "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "west bengal": "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "sundarbans":  "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "sikkim":      "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "gangtok":     "India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    "meghalaya":   "Manipur/Exclusive_Destination/003_ema_keithel3_govt.jpg",
    "shillong":    "Manipur/Exclusive_Destination/003_ema_keithel3_govt.jpg",
    "kaziranga":   "Manipur/Exclusive_Destination/003_ema_keithel3_govt.jpg",
    "nagaland":    "Manipur/Exclusive_Destination/003_ema_keithel3_govt.jpg",
    "manipur":     "Manipur/Exclusive_Destination/003_ema_keithel3_govt.jpg",
    "ziro":        "Manipur/Exclusive_Destination/003_ema_keithel3_govt.jpg",

    # Gujarat
    "gujarat":     "Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg",
    "ahmedabad":   "Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg",
    "rann of kutch":"Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg",
    "kutch":       "Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg",
    "somnath":     "Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg",
    "dwarka":      "Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg",

    # Maharashtra
    "mumbai":      "India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg",
    "maharashtra": "India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg",
    "lonavala":    "India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg",
    "pune":        "India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg",
    "aurangabad":  "India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg",

    # MP
    "madhya pradesh":"India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg",
    "khajuraho":   "India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg",
    "orchha":      "India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg",
    "bandhavgarh": "India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg",
    "kanha":       "India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg",

    # Delhi
    "delhi":       "India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",
    "agra":        "India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",
    "varanasi":    "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "mathura":     "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "vrindavan":   "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "ayodhya":     "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "prayagraj":   "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",

    # Andaman & Lakshadweep
    "andaman":     "Andaman_Nicobar/Destinations/003_image_govt.jpg",
    "lakshadweep": "India_Central/Incredible_India/036_kalpeni-kavaratti-lakshwadeep-3-musthead-hero_govt.jpg",
    "havelock":    "Andaman_Nicobar/Destinations/003_image_govt.jpg",
    "neil island": "Andaman_Nicobar/Destinations/003_image_govt.jpg",
    "agatti":      "India_Central/Incredible_India/036_kalpeni-kavaratti-lakshwadeep-3-musthead-hero_govt.jpg",

    # Punjab / North
    "amritsar":    "India_Central/Incredible_India/014_1-sri-harmandir-sahib-golden-temple-amritsar-punja_govt.jpg",
    "golden temple":"India_Central/Incredible_India/014_1-sri-harmandir-sahib-golden-temple-amritsar-punja_govt.jpg",

    # Pondicherry
    "pondicherry": "India_Central/Incredible_India/039_auroville-puducherry_govt.jpg",
    "puducherry":  "India_Central/Incredible_India/039_auroville-puducherry_govt.jpg",
    "auroville":   "India_Central/Incredible_India/039_auroville-puducherry_govt.jpg",

    # Tripura
    "tripura":     "Tripura/Destination/005_destination_govt.jpg",

    # Default fallback for generic travel/trekking/adventure
    "trekking":    "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "himalayan":   "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "adventure":   "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "helicopter":  "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "pilgrimage":  "India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "india":       "India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",
    "domestic":    "India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",
    "international":"India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "beach":       "Andaman_Nicobar/Destinations/003_image_govt.jpg",
}

def url_for(key):
    return f"{PUBLIC_PREFIX}/{LOCAL[key]}"

def best_url_for_context(context_str):
    """Given any textual context, find best matching local image."""
    t = context_str.lower()
    best_key = None
    for key in LOCAL:
        if key in t:
            if best_key is None or len(key) > len(best_key):
                best_key = key
    return url_for(best_key) if best_key else None


# ————————————————————————————————————
# 1. data/blog.ts  — match by tags + title
# ————————————————————————————————————
def fix_blog():
    path = os.path.join(BASE, "src/data/blog.ts")
    with open(path) as f:
        content = f.read()

    # Collect all blog objects with their image lines
    blog_tag_map = {
        "kedarnath":        "kedarnath",
        "ladakh":           "ladakh",
        "valley of flowers":"valley of flowers",
        "kashmir":          "kashmir",
        "char dham":        "char dham",
        "manali":           "manali",
        "rishikesh":        "rishikesh",
        "badrinath":        "badrinath",
        "himalayan treks":  "trekking",
    }

    lines = content.split('\n')
    new_lines = []
    current_tags = []
    changed = 0

    for line in lines:
        tag_match = re.search(r'tags:\s*\[([^\]]+)\]', line)
        if tag_match:
            current_tags = [t.strip().strip('"\'').lower() for t in tag_match.group(1).split(',')]

        img_match = re.search(r'(image:\s*["\'])https?://[^"\']+(["\'])', line)
        if img_match and current_tags:
            # Find best match from current tags
            new_url = None
            for tag in current_tags:
                new_url = best_url_for_context(tag)
                if new_url:
                    break
            if new_url:
                line = re.sub(r'(image:\s*["\'])https?://[^"\']+(["\'])',
                              lambda m: m.group(1) + new_url + m.group(2), line)
                changed += 1
        new_lines.append(line)

    with open(path, 'w') as f:
        f.write('\n'.join(new_lines))
    print(f"  ✓ blog.ts: {changed} images replaced")


# ————————————————————————————————————
# 2. data/travelRoutes.ts — match by title string
# ————————————————————————————————————
def fix_travel_routes():
    path = os.path.join(BASE, "src/data/travelRoutes.ts")
    with open(path) as f:
        content = f.read()

    lines = content.split('\n')
    new_lines = []
    changed = 0
    current_title = ""

    for line in lines:
        title_m = re.search(r'(?:title|name|destination|from|to):\s*["\']([^"\']+)["\']', line)
        if title_m:
            current_title += " " + title_m.group(1)

        img_match = re.search(r'((?:image|src|bg|photo|thumbnail):\s*["\'])https?://[^"\']+(["\'])', line)
        if img_match:
            new_url = best_url_for_context(current_title.lower())
            if not new_url:
                new_url = url_for("india")  # fallback
            line = re.sub(r'((?:image|src|bg|photo|thumbnail):\s*["\'])https?://[^"\']+(["\'])',
                          lambda m, u=new_url: m.group(1) + u + m.group(2), line)
            changed += 1
        new_lines.append(line)

    with open(path, 'w') as f:
        f.write('\n'.join(new_lines))
    print(f"  ✓ travelRoutes.ts: {changed} images replaced")


# ————————————————————————————————————
# 3. components/HeroSection.tsx — slide backgrounds
# ————————————————————————————————————
def fix_hero_section():
    path = os.path.join(BASE, "src/components/HeroSection.tsx")
    with open(path) as f:
        content = f.read()

    slide_map = [
        # Replace in order: Taj Agra → Red Fort, Kerala → Kerala, Varanasi ghat → Uttarakhand, Onam → Kerala
        (r'photo-1524492412937', url_for("kashmir")),         # Slide 1 – hero/scenic mountains (use Kashmir)
        (r'photo-1601050690597', url_for("goa")),             # Slide 2 – beach/goa
        (r'photo-1561361513', url_for("varanasi")),           # Slide 3 – Varanasi ghat
        (r'photo-1602216056096', url_for("kerala")),          # Slide 4 – Kerala Onam
    ]

    changed = 0
    for photo_id, new_url in slide_map:
        new_content = re.sub(
            r'(src:\s*["\'])https://images\.unsplash\.com/' + photo_id + r'[^"\']*(["\'])',
            lambda m, u=new_url: m.group(1) + u + m.group(2),
            content
        )
        if new_content != content:
            changed += 1
            content = new_content

    with open(path, 'w') as f:
        f.write(content)
    print(f"  ✓ HeroSection.tsx: {changed} slides replaced")


# ————————————————————————————————————
# 4. components/DiscoverySection.tsx — vibe backgrounds
# ————————————————————————————————————
def fix_discovery_section():
    path = os.path.join(BASE, "src/components/DiscoverySection.tsx")
    with open(path) as f:
        content = f.read()

    # Vibes: Beach/Islands, Mountains/Trek, Heritage, Spiritual, Wildlife
    vibe_map = [
        (r'photo-1507525428034', url_for("andaman")),      # Beach vibe
        (r'photo-1518002171953', url_for("manali")),       # Mountain vibe
        (r'photo-1477587458883', url_for("rajasthan")),    # Heritage vibe (Jodhpur)
        (r'photo-1561361513', url_for("varanasi")),        # Spiritual vibe (Varanasi)
        (r'photo-1595815771614', url_for("kashmir")),      # Wildlife/Nature (Kashmir meadows)
    ]

    changed = 0
    for photo_id, new_url in vibe_map:
        new_content = re.sub(
            r'(bg_image_url:\s*["\']?)https://images\.unsplash\.com/' + photo_id + r'[^"\']*(["\']?)',
            lambda m, u=new_url: m.group(1) + u + m.group(2),
            content
        )
        # Also replace inline fallbacks in JSX
        new_content2 = re.sub(
            r"https://images\.unsplash\.com/" + photo_id + r"[^'\"]*",
            new_url,
            new_content
        )
        if new_content2 != content:
            changed += 1
            content = new_content2

    with open(path, 'w') as f:
        f.write(content)
    print(f"  ✓ DiscoverySection.tsx: {changed} vibes replaced")


# ————————————————————————————————————
# 5. components/DomesticInternational.tsx — fallbacks
# ————————————————————————————————————
def fix_domestic_international():
    path = os.path.join(BASE, "src/components/DomesticInternational.tsx")
    with open(path) as f:
        content = f.read()

    # Replace all unsplash URLs
    # photo-1544735716 → international beach (Andaman)
    # photo-1444858291040 → domestic (India)
    # photo-1512343879784 → fallback (Goa beach)
    replacements = [
        (r'photo-1544735716[^"\']*', url_for("andaman")),
        (r'photo-1444858291040[^"\']*', url_for("india")),
        (r'photo-1512343879784[^"\']*', url_for("goa")),
    ]
    changed = 0
    for pattern, replacement in replacements:
        new = re.sub(r'https://images\.unsplash\.com/' + pattern, replacement, content)
        if new != content:
            changed += 1
            content = new

    with open(path, 'w') as f:
        f.write(content)
    print(f"  ✓ DomesticInternational.tsx: {changed} images replaced")


# ————————————————————————————————————
# 6. pages/ServiceDetail.tsx — services
# ————————————————————————————————————
def fix_service_detail():
    path = os.path.join(BASE, "src/pages/ServiceDetail.tsx")
    with open(path) as f:
        content = f.read()

    lines = content.split('\n')
    new_lines = []
    changed = 0
    current_title = ""

    for line in lines:
        # Track service title for context
        t = re.search(r'title:\s*["\']([^"\']+)["\']', line)
        if t:
            current_title = t.group(1)

        img_m = re.search(r"(image:\s*['\"])https?://[^'\"]+(['\"])", line)
        if img_m:
            ctx = current_title.lower()
            # Map service titles to destinations
            if "tour" in ctx or "package" in ctx or "itinerary" in ctx:
                new_url = url_for("kedarnath")
            elif "flight" in ctx or "air" in ctx:
                new_url = url_for("kashmir")
            elif "hotel" in ctx or "stay" in ctx or "accommodation" in ctx:
                new_url = url_for("manali")
            elif "honeymoon" in ctx or "romance" in ctx or "couple" in ctx:
                new_url = url_for("kashmir")
            elif "adventure" in ctx or "trek" in ctx or "camp" in ctx:
                new_url = url_for("trekking")
            elif "transfer" in ctx or "transport" in ctx or "cab" in ctx or "car" in ctx:
                new_url = url_for("delhi")
            elif "visa" in ctx or "international" in ctx:
                new_url = url_for("international")
            else:
                new_url = url_for("india")

            line = re.sub(r"(image:\s*['\"])https?://[^'\"]+(['\"])",
                          lambda m, u=new_url: m.group(1) + u + m.group(2), line)
            changed += 1
        new_lines.append(line)

    with open(path, 'w') as f:
        f.write('\n'.join(new_lines))
    print(f"  ✓ ServiceDetail.tsx: {changed} images replaced")


# ————————————————————————————————————
# 7. pages/HelicopterPackages.tsx — Gangotri wikimedia fix
# ————————————————————————————————————
def fix_helicopter():
    path = os.path.join(BASE, "src/pages/HelicopterPackages.tsx")
    with open(path) as f:
        content = f.read()

    new = re.sub(
        r'https://upload\.wikimedia\.org/[^"\']+',
        url_for("gangotri"),
        content
    )
    if new != content:
        with open(path, 'w') as f:
            f.write(new)
        print(f"  ✓ HelicopterPackages.tsx: 1 Wikipedia image replaced")
    else:
        print(f"  – HelicopterPackages.tsx: no change needed")


# ————————————————————————————————————
# 8. StepThreeDestination.tsx — planner destination quickpicks
# ————————————————————————————————————
def fix_step_three():
    path = os.path.join(BASE, "src/components/planner/steps/StepThreeDestination.tsx")
    with open(path) as f:
        content = f.read()

    dest_quickmap = {
        "kerala":       url_for("kerala"),
        "rajasthan":    url_for("rajasthan"),
        "goa":          url_for("goa"),
        "andaman":      url_for("andaman"),
        "himachal":     url_for("himachal"),
        "shimla":       url_for("shimla"),
        "uttarakhand":  url_for("uttarakhand"),
        "rishikesh":    url_for("rishikesh"),
    }

    changed = 0
    lines = content.split('\n')
    new_lines = []
    current_name = ""

    for line in lines:
        n = re.search(r"name:\s*['\"]([^'\"]+)['\"]", line)
        if n:
            current_name = n.group(1).lower()

        img_m = re.search(r"(image:\s*['\"])https?://[^'\"]+(['\"])", line)
        if img_m:
            new_url = best_url_for_context(current_name)
            if new_url:
                line = re.sub(r"(image:\s*['\"])https?://[^'\"]+(['\"])",
                              lambda m, u=new_url: m.group(1) + u + m.group(2), line)
                changed += 1
        new_lines.append(line)

    with open(path, 'w') as f:
        f.write('\n'.join(new_lines))
    print(f"  ✓ StepThreeDestination.tsx: {changed} images replaced")


# ————————————————————————————————————
# Run all fixers
# ————————————————————————————————————
print("\n🚀 MQT Full-Site Image Migration — Phase 2\n" + "="*50)
fix_hero_section()
fix_discovery_section()
fix_domestic_international()
fix_service_detail()
fix_helicopter()
fix_step_three()
fix_blog()
fix_travel_routes()
print("\n" + "="*50)
print("✅ All done! Run: git add -A && git commit -m 'fix: replace all remaining external images with local scraped assets'")
