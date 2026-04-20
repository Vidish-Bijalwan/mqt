import urllib.request
import json
import re

def search_ddg_image(query):
    # This is a very simple scraper that might get blocked, but let's try.
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # We need an image URL. It's usually in src=""
        images = re.findall(r'src="//(external-content.duckduckgo.com/iu/\?u=[^"]+)"', html)
        if images:
            # Get the actual image URL by unquoting the 'u' param
            u = urllib.parse.unquote(images[0].split('u=')[1].split('&')[0])
            print("Found image:", u)
            return u
    except Exception as e:
        print("Error:", e)
    return None

img_url = search_ddg_image("uttarakhand high altitude mountain valley")
if img_url:
    urllib.request.urlretrieve(img_url, "/home/zerosirus/Desktop/MQT/public/tourism/refined/dest-nelong.jpg")
    print("Downloaded!")
