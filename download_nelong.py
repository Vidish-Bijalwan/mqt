import urllib.request
import json
import os

req = urllib.request.Request(
    'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=Nelong%20Valley&utf8=&format=json',
    headers={'User-Agent': 'Mozilla/5.0'}
)
try:
    response = urllib.request.urlopen(req)
    data = json.loads(response.read())
    pages = data['query']['search']
    if pages:
        print("Found:", pages[0]['title'])
    else:
        print("No Nelong Valley images found.")

    # Try Gartang Gali
    req2 = urllib.request.Request(
        'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=Gartang%20Gali&utf8=&format=json',
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    response2 = urllib.request.urlopen(req2)
    data2 = json.loads(response2.read())
    pages2 = data2['query']['search']
    if pages2:
        print("Found:", pages2[0]['title'])
    else:
        print("No Gartang Gali images found.")
        
except Exception as e:
    print(e)
