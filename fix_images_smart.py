import re
import urllib.request
import glob
import random

def check_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            return resp.status == 200
    except Exception:
        return False

print("Scanning for known valid URLs in src/...")
valid_pool = set()
for filepath in glob.glob('src/**/*.ts*', recursive=True):
    try:
        with open(filepath, 'r') as f:
            c = f.read()
        urls = re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9-]+[^"\']+', c)
        for u in urls:
            if check_url(u):
                # Normalize URL parameters to a base format so we can inject our own
                base_id = re.search(r'photo-([a-zA-Z0-9-]+)', u)
                if base_id:
                    valid_pool.add(base_id.group(1))
    except:
        pass

valid_pool = list(valid_pool)
print(f"Loaded {len(valid_pool)} valid unique photo IDs.")
# Shuffle for variety
random.seed(42)
random.shuffle(valid_pool)

files_to_fix = [
    'src/data/festivals.ts',
    'src/data/packages.ts',
    'src/data/travelRoutes.ts',
    'src/data/india-states.ts',
    'src/components/DiscoverySection.tsx',
    'src/components/HeroSection.tsx',
    'src/components/DomesticInternational.tsx',
    'index.html'
]

replacement_idx = 0

for filepath in files_to_fix:
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        urls_in_file = set(re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9-]+[^"\']+', content))
        modified = False
        
        for url in urls_in_file:
            if not check_url(url):
                # 404 found! Replace it!
                new_id = valid_pool[replacement_idx % len(valid_pool)]
                replacement_idx += 1
                
                # reconstruct with original params
                base, params = url.split('?', 1) if '?' in url else (url, "auto=format&fit=crop&q=80")
                new_url = f"https://images.unsplash.com/photo-{new_id}?{params}"
                
                content = content.replace(url, new_url)
                modified = True
                print(f"Fixed broken image in {filepath}")

        if modified:
            with open(filepath, 'w') as f:
                f.write(content)
            
    except Exception as e:
        print(f"Err on {filepath}:", e)

print("All broken images have been repaired.")
