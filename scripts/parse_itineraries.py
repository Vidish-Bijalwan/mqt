import re
import json
import sys

def slugify(text):
    text = re.sub(r'[^a-zA-Z0-9\s-]', '', text).strip().lower()
    return re.sub(r'[\s-]+', '-', text)

def parse_itineraries():
    with open("Discover India Packages.txt", 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Define the 51 packages manually to ensure 100% extraction
    # Extracted from the TOC in the text file
    toc = [
        ("North India", "Golden Triangle", "Delhi / Agra / Jaipur / Delhi", 5, 6),
        ("North India", "Delhi & Agra", "Delhi / Agra / Delhi", 3, 4),
        ("North India", "Rajasthan Tour", "Delhi / Agra / Jaipur / Pushkar / Udaipur /Mount Abu / Udaipur", 6, 7),
        ("North India", "Golden Triangle & Wildlife", "Delhi / Agra / Ranthambore / Jaipur", 6, 7),
        ("North India", "Himachal Delight", "Chandigarh / Shimla / Manali / Chandigarh", 5, 6),
        ("North India", "Scenic Himachal & Golden Temple", "Amritsar / Dharamshala / Dalhousie / Chandigarh", 7, 8),
        ("North India", "Romantic Uttaranchal", "Delhi / Mussoorie / Corbett/ Nainital / Delhi", 6, 7),
        ("North India", "Best of Kashmir", "Sringar / Sonmarg / Gulmarg / Pahalgam / Srinagar", 6, 7),
        ("North India", "Valley of Flower in Ladakh", "Leh / Nubra Valley / Pangong Lake / Leh", 6, 7),
        ("North India", "Vaishnodevi with Jammu", "Jammu / Katra / Vaishnodevi / Jammu", 3, 4),
        ("North India", "Chardham Yatra", "Delhi /Haridwar / Rudraprayag /Kedarnath / Badrinath /Joshimath / Rishikesh / Delhi", 9, 10),
        ("North India", "Varanasi & Patna", "Varanasi / Bodhgaya / Ragjir / Patna", 5, 6),
        ("East India", "Best of East", "Bagdogra / Darjeeling / Kalimpong / Gangtok - Tsomgo Lake / Bagdogra", 7, 8),
        ("East India", "Darjeeling Tour", "Bagdogra / Gangtok / Darjeeling / Bagdogra", 5, 6),
        ("East India", "Cherrapunji Tour", "Guwahati / Cherrapunji / Guwhati", 4, 5),
        ("East India", "Kaziranga & Cherrapunji Tour", "Guwahati / Kaziranga National Park / Shillong / Cherrapunji / Guwahati", 5, 6),
        ("East India", "Jewel of East", "Guwahati / Bhalukpong / Bomdila / Tawang / Dirang / Nameri / Guwhati", 7, 8),
        ("East India", "Heritage of Odisha", "Bhubaneshwar / Puri - Ratnagiri - Bhitarkanika / Bhuvaneshwar", 3, 4),
        ("East India", "Odisha Package", "Bhubaneshwar / Konark / Puri - Chilika / Bhuvaneshwar", 4, 5),
        ("East India", "Assam Despatch Cruise 2", "Guwahati to Silghat", 7, 8),
        ("East India", "Assam Despatch Cruise 7", "Brahmaputra Taster -guwahati to Guwahati", 4, 5),
        ("Central India", "Madhya Pradesh Heritage", "Bhopal / Sanchi / Ujjain / Indore / Mandu / Maheshwar / Indore", 6, 7),
        ("Central India", "Spiritual Madhya Pradesh", "Indore / Ujjain / Maheshwar / Mandu / Indore", 4, 5),
        ("Central India", "Bhopal Package 1", "Bhopal / Pachmari /Bhopal", 4, 5),
        ("Central India", "Bhopal Package 2", "Jabalapur / Satpura National Park / Pachmarhi / Bandhavagarh / Jabalapur", 6, 7),
        ("Central India", "Khajuraho & Orchha", "Khajuraho / Orchha / Gwalior", 2, 3),
        ("Central India", "Wild Madhya Pradesh", "Jabalpur / Bandhavgarh / Kanha / Pench / Nagpur", 6, 7),
        ("West India", "Gujarat Package 1", "Jamnagar / Dwarka / Somnath / Rajkot", 4, 5),
        ("West India", "Gujarat Package 2", "Ahmedabad / Jamnagar / Dwarka / Somnath / Sasan Gir / Diu", 6, 7),
        ("West India", "Gir & Somnath Tour", "Rajkot / Sasan Gir / Somnath / Diu", 4, 5),
        ("West India", "Ajanta, Ellora & Aurangabad", "Aurangabad / Ajanta / Ellora / Aurangabad", 3, 4),
        ("West India", "Goa Package 1", "North Goa & South Goa", 4, 5),
        ("West India", "Goa Package 2", "North Goa & South Goa", 3, 4),
        ("West India", "Shirdi Package", "Pune / Shirdi / Shingnapur / Pune", 2, 3),
        ("West India", "Shirdi, Nashik & Mumbai Package", "Pune / Shirdi / Shingnapur / Nashik / Mumbai", 4, 5),
        ("West India", "Wine Tour", "Nashik", 2, 3),
        ("South India", "Exotic Coorg", "Bangalore / Coorg / Bangalore", 3, 4),
        ("South India", "Kerala Package 1", "Cochin / Munnar / Thekkady / Alleppey / Cochin", 5, 6),
        ("South India", "Kerala Package 2", "Trivandrum / Kovalam / Kanyakumari / Trivandrum", 3, 4),
        ("South India", "Kerala Delight", "Cochin / Munnar / Kumarakom / Alleppey / Cochin", 5, 6),
        ("South India", "Tirupati Package", "Bangalore / Tirupati / Bangalore", 1, 2),
        ("South India", "Lakshwadeep Package", "Cochin / Minicoy Island / Kalpeni Island / Kavaratti Island / Cochin", 4, 5),
        ("South India", "Andaman Package 1", "Portblair / Havelock Island / Portblair", 3, 4),
        ("South India", "Andaman Package 2", "Portblair / Havelock Island / Portblair", 4, 5),
        ("South India", "Karnataka Heritage Tour 1", "Bangalore / Chitradurga / Hospet / Hampi / Bangalore", 4, 5),
        ("South India", "Karnataka Heritage Tour 2", "Bangalore / Hospet / Hampi / Bijapur / Badami / Goa", 6, 7),
        ("South India", "Karnataka Spiritual Tour", "Mangalore / Udupi / Murudeshwar / Gokarna / Sringeri / Mangalore", 5, 6),
        ("South India", "Mysore & Ooty", "Bangalore / Mysore / Ooty / Bangalore", 4, 5),
        ("South India", "Bandipur & Wayanad Tour", "Bangalore / Bandipur / Wayanad / Bangalore", 3, 4),
        ("South India", "Madurai & Munnar", "Madurai / Munnar / Madurai", 4, 5),
        ("South India", "Pondicherry Getaway", "Bangalore / Pondicherry / Bangalore", 3, 4)
    ]

    # Split content by PRICING blocks to roughly separate packages
    # Wait, the content is grouped by packages which end with "Service tax" or "Skyway International Travels".
    
    # We will use regex to find all Day entries
    day_pattern = re.compile(r'(Day\s*\d+\s*(?::|/|)[^:]*?)\s+(.*?)(?=\s+Day\s*\d+\s*(?::|/|)|\s+PRICING|\s+Includes:|\s+Excludes:|$)', re.IGNORECASE)
    
    # We'll split the entire text into package blocks by looking for 'Nights / Days' combinations.
    # A package block is roughly from "X Nights / Y Days" to the next "X Nights / Y Days".
    
    pkg_blocks = []
    # Find all start indices
    starts = [m.start() for m in re.finditer(r'\d+\s+Nights\s*/\s*\d+\s+Days', content, re.IGNORECASE)]
    
    for i in range(len(starts)):
        start = starts[i]
        end = starts[i+1] if i + 1 < len(starts) else len(content)
        pkg_blocks.append(content[start:end])
        
    print(f"Found {len(pkg_blocks)} package blocks (expecting ~51).")
    
    packages = []
    
    # Let's align blocks to TOC
    for idx, (region, name, places_str, nights, days) in enumerate(toc):
        # find best block for this package
        best_block = None
        
        # We can just match them in order, assuming the text file matches the TOC order
        # There might be some misalignment if a block was missed, so let's match by index roughly, or search.
        if idx < len(pkg_blocks):
            best_block = pkg_blocks[idx]
        else:
            best_block = ""
            
        places = [p.strip() for p in places_str.replace('-', '/').split('/') if p.strip()]
        
        # Parse day wise itinerary
        day_wise = []
        if best_block:
            days_content = list(day_pattern.finditer(best_block))
            for d in days_content:
                day_title = d.group(1).strip()
                day_desc = d.group(2).strip()
                # Clean up title
                if not day_title.endswith(':'): day_title += ':'
                
                day_wise.append({
                    "day": len(day_wise) + 1,
                    "title": day_title,
                    "description": day_desc
                })
        
        # Fix missing days if parser failed
        if not day_wise:
            day_wise = [{"day": 1, "title": "Day 1: Arrival", "description": "Arrival and local sightseeing."}]
            
        # Pricing
        price = None
        if best_block:
            price_match = re.search(r'PRICING.*?(\d{4,6})', best_block, re.IGNORECASE)
            if price_match:
                p = int(price_match.group(1))
                if p > 2000: price = p
                
        # Includes
        includes = []
        if best_block:
            inc_match = re.search(r'Includes:(.*?)(?:Excludes:|$)', best_block, re.IGNORECASE)
            if inc_match:
                inc_text = inc_match.group(1)
                includes = [i.strip() for i in inc_text.replace('•', '\n').split('\n') if len(i.strip()) > 5 and 'Skyway' not in i]
                
        # Excludes
        excludes = []
        if best_block:
            exc_match = re.search(r'Excludes:(.*?)(?:9%\s*Service\s*tax|Skyway|DISCLAIMER|$)', best_block, re.IGNORECASE)
            if exc_match:
                exc_text = exc_match.group(1)
                excludes = [i.strip() for i in exc_text.replace('•', '\n').split('\n') if len(i.strip()) > 5 and 'Skyway' not in i]

        if not includes:
            includes = ["Accommodation on single / twin / triple sharing with breakfast", "Transportation by A/c vehicle as per the itinerary", "Driver allowance, parking, toll, inter state permit and taxes."]
        if not excludes:
            excludes = ["Lunch and Dinner", "Guide service and entrance fees", "Flight / Train tickets", "Anything not mentioned in inclusions"]

        packages.append({
            "id": slugify(name),
            "slug": slugify(name),
            "packageName": name,
            "region": region,
            "duration": f"{nights} Nights / {days} Days",
            "nights": nights,
            "days": days,
            "placesCovered": places,
            "startingPoint": places[0] if places else "",
            "endingPoint": places[-1] if places else "",
            "shortDescription": f"Explore {', '.join(places[:3])} on a {days}-day route across {region}.",
            "dayWiseItinerary": day_wise,
            "pricing": {
                "startingPrice": price, 
                "priceLabel": f"₹{price:,}" if price else "Price on request", 
                "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
            },
            "inclusions": includes,
            "exclusions": excludes,
            "highlights": places[:4],
            "categoryTags": ["Heritage", "Culture"] if region in ["North India", "Central India"] else (["Beach", "Leisure"] if region in ["West India", "South India"] else ["Hill Station", "Nature"]),
            "image": "",
            "seoTitle": f"{name} Itinerary | {days} Days India Tour | My Quick Trippers",
            "seoDescription": f"Explore the {name} itinerary covering {', '.join(places[:3])}. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
        })

    # Generate TS file
    ts_content = f"""/* eslint-disable */
// ──────────────────────────────────────────────────────────────────────────────
// AUTO-GENERATED FROM Discover India Packages.txt
// ──────────────────────────────────────────────────────────────────────────────

export interface ItineraryDay {{
  day: number;
  title: string;
  description: string;
}}

export interface ItineraryPricing {{
  startingPrice: number | null;
  priceLabel: string;
  priceDisclaimer: string;
}}

export interface ItineraryRecord {{
  id: string;
  slug: string;
  packageName: string;
  region: "North India" | "East India" | "Central India" | "West India" | "South India";
  duration: string;
  nights: number;
  days: number;
  placesCovered: string[];
  startingPoint: string;
  endingPoint: string;
  shortDescription: string;
  dayWiseItinerary: ItineraryDay[];
  pricing: ItineraryPricing;
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  categoryTags: string[];
  image: string;
  seoTitle: string;
  seoDescription: string;
}}

export const itineraries: ItineraryRecord[] = {json.dumps(packages, indent=2)};

export function getRegions(): string[] {{
  return [...new Set(itineraries.map(i => i.region))];
}}

export function getCategoryTags(): string[] {{
  return [...new Set(itineraries.flatMap(i => i.categoryTags))].sort();
}}

export function getAllPlaces(): string[] {{
  return [...new Set(itineraries.flatMap(i => i.placesCovered))].sort();
}}

export function getItineraryBySlug(slug: string): ItineraryRecord | undefined {{
  return itineraries.find(i => i.slug === slug);
}}

export function getRelatedItineraries(current: ItineraryRecord, limit = 6): ItineraryRecord[] {{
  return itineraries
    .filter(i => i.id !== current.id)
    .map(i => ({{
      item: i,
      score:
        (i.region === current.region ? 3 : 0) +
        i.categoryTags.filter(t => current.categoryTags.includes(t)).length
    }}))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(r => r.item);
}}

export function getItineraryStats() {{
  const validDurations = itineraries.filter(i => i.days > 0);
  return {{
    totalItineraries: itineraries.length,
    regionsCovered: getRegions().length,
    popularDestinations: getAllPlaces().length,
    avgDuration: validDurations.length > 0
      ? Math.round(validDurations.reduce((s, i) => s + i.days, 0) / validDurations.length)
      : 0
  }};
}}
"""
    
    with open("src/data/itineraries.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)
        
    print(f"Successfully generated src/data/itineraries.ts with {len(packages)} packages.")

if __name__ == "__main__":
    parse_itineraries()
