import os
import re
import urllib.request
import urllib.error

def check_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            return resp.status == 200
    except Exception as e:
        return False

# Example known working unsplash images
# I will use a reliable image for now if 404
FALLBACK_IMG = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find all Unsplash URLs
    urls = re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9-]+[^"\']+', content)
    unique_urls = set(urls)
    
    replacements = 0
    for url in unique_urls:
        if not check_url(url):
            print(f"404: {url}")
            # Replace with a fallback or we need a specific one
            # for now let's just make it visually distinct using a placeholder service that looks okay?
            # actually unsplash source is dead.
            # let's just replace the 404s with a known working ID
            # "1524492412937-b28074a5d7da" (Taj Mahal)
            # wait, having them all be Taj Mahal is bad.
            pass
        else:
            # print(f"200: {url}")
            pass

process_file('/home/zerosirus/Desktop/MQT/src/data/festivals.ts')
process_file('/home/zerosirus/Desktop/MQT/src/data/packages.ts')
process_file('/home/zerosirus/Desktop/MQT/src/data/travelRoutes.ts')
process_file('/home/zerosirus/Desktop/MQT/src/data/india-states.ts')
process_file('/home/zerosirus/Desktop/MQT/src/components/DiscoverySection.tsx')
process_file('/home/zerosirus/Desktop/MQT/src/components/HeroSection.tsx')
