import urllib.request
import json
import re
import urllib.parse
import time

def get_real_unsplash_id(query):
    # sleep 1s to avoid rate limit
    time.sleep(1)
    url = f"https://unsplash.com/napi/search/photos?query={urllib.parse.quote(query)}&per_page=5"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    })
    
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data['results']:
                raw_url = data['results'][0]['urls']['raw']
                m = re.search(r'photo-([\w-]+)', raw_url)
                if m:
                    return m.group(1)
    except Exception as e:
        print(f"Error fetching {query}: {e}")
    return "1524492412937-b28074a5d7da" # Taj fallback

print("Taj Mahal ID:", get_real_unsplash_id("Taj Mahal"))
print("Diwali India ID:", get_real_unsplash_id("Diwali India"))
print("Rishikesh ID:", get_real_unsplash_id("Rishikesh"))
