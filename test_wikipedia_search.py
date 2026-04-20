import urllib.request
import json

def search_wikipedia(query):
    url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&utf8=&format=json"
    req = urllib.request.urlopen(url)
    data = json.loads(req.read())
    return data['query']['search']

print(search_wikipedia("Nelang Valley"))
