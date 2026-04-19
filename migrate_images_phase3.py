#!/usr/bin/env python3
"""MQT Image Migration — Phase 3 Final Cleanup"""
import os, re

BASE = "/home/zerosirus/Desktop/MQT"
P = "/tourism"

IMGS = {
    "kerala":       f"{P}/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "rajasthan":    f"{P}/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "goa":          f"{P}/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    "andaman":      f"{P}/Andaman_Nicobar/Destinations/003_image_govt.jpg",
    "ladakh":       f"{P}/India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    "kashmir":      f"{P}/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "himachal":     f"{P}/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    "uttarakhand":  f"{P}/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "wildlife":     f"{P}/India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    "heritage":     f"{P}/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    "luxury":       f"{P}/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    "pilgrimage":   f"{P}/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    "honeymoon":    f"{P}/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    "default":      f"{P}/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",
}

total = 0

# ── destinations.ts  (heroImage + gallery srcs) ───────────────────────────
def fix_destinations():
    path = os.path.join(BASE, "src/data/destinations.ts")
    with open(path) as f: text = f.read()
    orig = text

    dest_map = {
        # jaipur block
        r'photo-1599661046289': IMGS["rajasthan"],
        r'photo-1524492412937': IMGS["rajasthan"],
        r'photo-1603262110263': IMGS["rajasthan"],
        r'photo-1606132474149': IMGS["rajasthan"],
        # munnar block
        r'photo-1590496793907': IMGS["kerala"],
        r'photo-1597583681729': IMGS["kerala"],
        r'photo-1602216056096': IMGS["kerala"],
        r'photo-1540611025311': IMGS["kerala"],
        # goa block
        r'photo-1512343879784': IMGS["goa"],
        r'photo-1473081556163': IMGS["goa"],
        r'photo-1571536802807': IMGS["goa"],
        r'photo-1647895055375': IMGS["goa"],
        # andaman block
        r'photo-1589136140034': IMGS["andaman"],
        r'photo-1621213340539': IMGS["andaman"],
        r'photo-1605436247078': IMGS["andaman"],
        r'photo-1579737482598': IMGS["andaman"],
    }
    c = 0
    for pid, url in dest_map.items():
        new = re.sub(r'https://images\.unsplash\.com/' + pid + r'[^"\']*', url, text)
        if new != text: c += 1; text = new
    with open(path,'w') as f: f.write(text)
    global total; total += c
    print(f"  ✓ destinations.ts: {c} replaced")

# ── experiences.ts  (heroImage by experience type) ────────────────────────
def fix_experiences():
    path = os.path.join(BASE, "src/data/experiences.ts")
    with open(path) as f: text = f.read()

    exp_map = {
        r'photo-1602216056096': IMGS["honeymoon"],   # Kerala honeymoon
        r'photo-1593693397690': IMGS["goa"],         # Beach escapes
        r'photo-1512343879784': IMGS["goa"],         # Beach
        r'photo-1477587458883': IMGS["heritage"],    # Heritage trail (Jodhpur)
        r'photo-1588863024976': IMGS["wildlife"],    # Wildlife safari
        r'photo-1542314831': IMGS["luxury"],         # Luxury hotel pool
        r'photo-1561361513': IMGS["pilgrimage"],     # Varanasi / pilgrimage
        r'photo-1626621341517': IMGS["uttarakhand"], # Mountain adventure
    }
    c = 0
    for pid, url in exp_map.items():
        new = re.sub(r'https://images\.unsplash\.com/' + pid + r'[^"\']*', url, text)
        if new != text: c += 1; text = new
    with open(path,'w') as f: f.write(text)
    global total; total += c
    print(f"  ✓ experiences.ts: {c} replaced")

# ── DomesticInternational.tsx inline JSX fallback template literal ─────────
def fix_domestic_intl():
    path = os.path.join(BASE, "src/components/DomesticInternational.tsx")
    with open(path) as f: text = f.read()

    # Replace the inline template literal fallback completely
    new = re.sub(
        r'`https://images\.unsplash\.com/photo-\$\{[^`]+\}`',
        f'"{IMGS["default"]}"',
        text
    )
    # Also any remaining simple URL
    new = re.sub(r'https://images\.unsplash\.com/[^"\'`\s]+', IMGS["default"], new)
    c = 1 if new != text else 0
    with open(path,'w') as f: f.write(new)
    global total; total += c
    print(f"  ✓ DomesticInternational.tsx: {c} template literal fixed")

# ── ExclusiveAlertModal.tsx  (already has good image, just re-confirm) ────
def fix_exclusive_modal():
    path = os.path.join(BASE, "src/components/ExclusiveAlertModal.tsx")
    with open(path) as f: text = f.read()
    new = re.sub(r'https://images\.unsplash\.com/[^"\']+', IMGS["uttarakhand"], text)
    c = 1 if new != text else 0
    with open(path,'w') as f: f.write(new)
    global total; total += c
    print(f"  ✓ ExclusiveAlertModal.tsx: {c} replaced")

# ── Remaining data files: packages, megamenu, packageMenuData, india-states ─
def fix_remaining_data_files():
    files = [
        "src/data/packages.ts",
        "src/data/destinationsMegaMenu.ts",
        "src/data/packageMenuData.ts",
        "src/data/india-states.ts",
    ]
    for rel in files:
        path = os.path.join(BASE, rel)
        with open(path) as f: text = f.read()
        # Any remaining unsplash URL that the phase 1 script missed
        c = 0
        lines = text.split('\n')
        new_lines = []
        ctx = ""
        for line in lines:
            for field in ['destination','name','state','title','city','slug']:
                m = re.search(rf'{field}:\s*["\']([^"\']+)["\']', line)
                if m: ctx += " " + m.group(1).lower()
            img_m = re.search(r'((?:image|src|heroImage|bg_image_url):\s*["\'])https://images\.unsplash\.com/[^"\']+(["\'])', line)
            if img_m:
                # Pick by context
                best = IMGS["default"]
                for k in ["kerala","rajasthan","goa","andaman","ladakh","kashmir",
                          "himachal","uttarakhand","wildlife","pilgrimage","heritage"]:
                    if k in ctx:
                        best = IMGS[k]; break
                line = re.sub(r'((?:image|src|heroImage|bg_image_url):\s*["\'])https://images\.unsplash\.com/[^"\']+(["\'])',
                              lambda m, u=best: m.group(1)+u+m.group(2), line)
                c += 1
            new_lines.append(line)
        with open(path,'w') as f: f.write('\n'.join(new_lines))
        global total; total += c
        print(f"  ✓ {rel}: {c} replaced")

print("\n🚀 Phase 3 — Final Cleanup\n" + "="*50)
fix_destinations()
fix_experiences()
fix_domestic_intl()
fix_exclusive_modal()
fix_remaining_data_files()
print(f"\n✅ Done — {total} images replaced total")
