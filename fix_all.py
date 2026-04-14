import re
import urllib.request
import json
import glob

def check_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            return resp.status == 200
    except Exception as e:
        return False

def get_unsplash_id(query):
    url = f"https://unsplash.com/napi/search/photos?query={urllib.parse.quote(query)}&per_page=5"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for result in data['results']:
                photo_id = result['id']
                if photo_id:
                    if check_url(f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&q=80&w=600"):
                        return photo_id
    except:
        pass
    return None

fallback_ids = [
    get_unsplash_id("india travel") or "1524492412937-b28074a5d7da",
    get_unsplash_id("jaipur") or "1524492412937-b28074a5d7da",
    get_unsplash_id("kerala") or "1524492412937-b28074a5d7da",
    get_unsplash_id("himalayas") or "1524492412937-b28074a5d7da",
    get_unsplash_id("goa beach") or "1524492412937-b28074a5d7da",
    get_unsplash_id("indian festival") or "1524492412937-b28074a5d7da",
]

def get_random_fallback(idx):
    return fallback_ids[idx % len(fallback_ids)]

print("Fallback pool:", fallback_ids)

files_to_check = [
    '/home/zerosirus/Desktop/MQT/src/data/festivals.ts',
    '/home/zerosirus/Desktop/MQT/src/data/packages.ts',
    '/home/zerosirus/Desktop/MQT/src/data/travelRoutes.ts',
    '/home/zerosirus/Desktop/MQT/src/data/india-states.ts',
    '/home/zerosirus/Desktop/MQT/src/components/DiscoverySection.tsx',
    '/home/zerosirus/Desktop/MQT/src/components/HeroSection.tsx',
    '/home/zerosirus/Desktop/MQT/src/components/DomesticInternational.tsx',
    '/home/zerosirus/Desktop/MQT/index.html'
]

replacement_idx = 0

for filepath in files_to_check:
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        urls = set(re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9-]+[^"\']+', content))
        
        modified = False
        for url in urls:
            if not check_url(url):
                print(f"Fixing 404... {url}")
                new_id = get_random_fallback(replacement_idx)
                # Keep the same query params if possible
                base, params = url.split('?', 1) if '?' in url else (url, "auto=format&fit=crop&q=80&w=800")
                new_url = f"https://images.unsplash.com/photo-{new_id}?{params}"
                content = content.replace(url, new_url)
                replacement_idx += 1
                modified = True
            
        if modified:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

