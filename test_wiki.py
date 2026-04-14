import urllib.request
import json
import urllib.parse
import time

def get_wiki_image(query):
    # Get page title
    search_url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&utf8=&format=json&srlimit=1"
    req = urllib.request.Request(search_url, headers={'User-Agent': 'MQT_Bot/1.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if not data['query']['search']: return None
            title = data['query']['search'][0]['title']
            
            # Get main image for page
            img_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=800"
            req2 = urllib.request.Request(img_url, headers={'User-Agent': 'MQT_Bot/1.0'})
            with urllib.request.urlopen(req2) as resp2:
                data2 = json.loads(resp2.read().decode('utf-8'))
                pages = data2['query']['pages']
                for page_id in pages:
                    if 'thumbnail' in pages[page_id]:
                        return pages[page_id]['thumbnail']['source']
    except Exception as e:
        print(e)
    return None

print("Taj Mahal:", get_wiki_image("Taj Mahal"))
print("Diwali:", get_wiki_image("Diwali"))
print("Rishikesh:", get_wiki_image("Rishikesh"))
