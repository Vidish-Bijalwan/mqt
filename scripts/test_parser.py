import re
import json

def parse_itineraries():
    with open("Discover India Packages.txt", 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # First, let's remove the table of contents part (the first ~3000 characters).
    # A safe place to start is looking for the first package: "Golden Triangle Delhi / Agra"
    start_idx = content.find("Golden Triangle Delhi / Agra")
    if start_idx != -1:
        # Step back to include any number if it exists
        content = content[start_idx-10:]
        
    # The file contains multiple packages sequentially. We can try to split by the "Nights / Days" marker 
    # to find package boundaries, but PRICING and Includes/Excludes also act as boundaries.
    
    # Let's try to match the package header: 
    # Optional number, Package Name, Places (separated by /), X Nights / Y Days
    
    # We can use a regex to find all "X Nights / Y Days" instances, which mark the start of the itinerary text.
    pattern = r'(?P<pkg_name>[A-Z][a-zA-Z\s&]+?)\s+(?P<places>[a-zA-Z\s]+(?:\s*/\s*[a-zA-Z\s]+)+)\s+(?P<nights>\d+)\s+Nights\s*/\s*(?P<days>\d+)\s+Days'
    
    headers = list(re.finditer(pattern, content, re.IGNORECASE))
    
    print(f"Found {len(headers)} package headers.")
    for h in headers[:5]:
        print(f"Name: {h.group('pkg_name').strip()} | Places: {h.group('places').strip()} | {h.group('nights')}N/{h.group('days')}D")
        
    # Now extract the content between this header and the next header.
    packages = []
    
    for i in range(len(headers)):
        h = headers[i]
        start_pos = h.end()
        end_pos = headers[i+1].start() if i + 1 < len(headers) else len(content)
        
        pkg_content = content[start_pos:end_pos]
        
        pkg_name = h.group('pkg_name').strip()
        # Clean up package name if it caught previous package's excludes
        if "Service tax" in pkg_name:
            pkg_name = pkg_name.split("Service tax")[-1].strip()
        if "Excludes:" in pkg_name:
            pkg_name = pkg_name.split("Excludes:")[-1].strip()
            
        places = [p.strip() for p in h.group('places').split('/')]
        nights = int(h.group('nights'))
        days = int(h.group('days'))
        
        # Parse day wise itinerary
        day_pattern = r'(Day\s*\d+\s*(?::|/|)[^:]*?)(?=Day\s*\d+\s*(?::|/|)|PRICING|Includes:|Excludes:|$)'
        days_content = re.finditer(day_pattern, pkg_content, re.IGNORECASE | re.DOTALL)
        
        day_wise = []
        for d in days_content:
            day_text = d.group(0).strip()
            # extract day number and description
            day_match = re.match(r'(Day\s*\d+[^:]*:?)\s*(.*)', day_text, re.IGNORECASE | re.DOTALL)
            if day_match:
                title = day_match.group(1).strip()
                desc = day_match.group(2).strip()
                # Clean up if title doesn't have a colon
                if not title.endswith(':'):
                    title += ':'
                
                # sometimes desc might contain pricing if regex didn't catch it
                # if "PRICING" in desc:
                #    desc = desc[:desc.find("PRICING")]
                    
                day_wise.append({
                    "day": len(day_wise) + 1,
                    "title": title,
                    "description": desc
                })
        
        # Parse Pricing
        price_match = re.search(r'PRICING.*?(\d{4,6})', pkg_content, re.IGNORECASE | re.DOTALL)
        price = int(price_match.group(1)) if price_match else None
        
        # Parse Includes/Excludes
        includes = []
        excludes = []
        
        inc_match = re.search(r'Includes:(.*?)(?:Excludes:|$)', pkg_content, re.IGNORECASE | re.DOTALL)
        if inc_match:
            inc_text = inc_match.group(1)
            # bullet points are represented by • or just newlines
            inc_items = [item.strip() for item in inc_text.replace('•', '\n').split('\n') if item.strip()]
            includes = [item for item in inc_items if len(item) > 5]
            
        exc_match = re.search(r'Excludes:(.*?)(?:9%\s*Service\s*tax|Skyway|DISCLAIMER|$)', pkg_content, re.IGNORECASE | re.DOTALL)
        if exc_match:
            exc_text = exc_match.group(1)
            exc_items = [item.strip() for item in exc_text.replace('•', '\n').split('\n') if item.strip()]
            excludes = [item for item in exc_items if len(item) > 5]

        packages.append({
            "packageName": pkg_name,
            "placesCovered": places,
            "nights": nights,
            "days": days,
            "price": price,
            "dayWise": day_wise,
            "includes": includes,
            "excludes": excludes
        })
        
    print(f"Successfully extracted {len(packages)} packages.")
    
    # Save a report
    with open("scripts/parse_report.txt", "w", encoding="utf-8") as f:
        for p in packages:
            f.write(f"=== {p['packageName']} ({p['nights']}N/{p['days']}D) ===\n")
            f.write(f"Places: {', '.join(p['placesCovered'])}\n")
            f.write(f"Price: {p['price']}\n")
            f.write(f"Days: {len(p['dayWise'])}\n")
            for d in p['dayWise']:
                f.write(f"  {d['title']} {d['description'][:50]}...\n")
            f.write(f"Includes: {len(p['includes'])} items\n")
            f.write(f"Excludes: {len(p['excludes'])} items\n\n")

if __name__ == "__main__":
    parse_itineraries()
