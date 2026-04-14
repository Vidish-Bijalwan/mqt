import re
import urllib.request
import glob

def check_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            return resp.status == 200
    except Exception:
        return False

urls = set()
for filepath in glob.glob('src/**/*.ts*', recursive=True):
    try:
        with open(filepath, 'r') as f:
            c = f.read()
        urls.update(re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9-]+[^"\']+', c))
    except:
        pass

valid_urls = []
for url in urls:
    if check_url(url):
        valid_urls.append(url)
        print("VALID:", url)

print(f"Found {len(valid_urls)} valid urls.")
