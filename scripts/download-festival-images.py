#!/usr/bin/env python3
"""
MQT Festival Image Downloader (Python version)
Downloads free Wikimedia Commons festival images using Special:FilePath redirect API.
"""
import urllib.request
import urllib.error
import os
import sys

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'festivals')

IMAGES = [
    {
        'name': 'holi.jpg',
        'urls': [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Holi-2016-Mathura-India-02.jpg',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Holi_celebrations.jpg',
            'https://live.staticflickr.com/2878/8573386096_71e9e96b4a_b.jpg',
        ]
    },
    {
        'name': 'diwali.jpg',
        'urls': [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Diwali_2012_Broadbeach_Gold_Coast_P1130108.jpg',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Lit_diyas.jpg',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Diwali_Fireworks_2.jpg',
        ]
    },
    {
        'name': 'kumbh-mela.jpg',
        'urls': [
            'https://commons.wikimedia.org/wiki/Special:FilePath/1_kumbh_mela_haridwar_pilgrims_2010.jpg',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Kumbhmela-tripolia.jpg',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Kumbh_Mela_-_Haridwar_2010.jpg',
        ]
    },
    {
        'name': 'hornbill.jpg',
        'urls': [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Hornbill_Festival_Warriors.jpg',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Naga_Warriors_at_Hornbill_Festival.jpg',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Hornbill_Festival_Kohima_2.jpg',
        ]
    },
    {
        'name': 'thrissur-pooram.jpg',
        'urls': [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Thrissur_Pooram_-_2012.jpg',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Elephants_in_Thrissur_Pooram.jpg',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Thrissur_Pooram.jpg',
        ]
    },
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
}

def download_url(url, dest):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as response:
        data = response.read()
    if len(data) < 5000:
        raise ValueError(f'File too small ({len(data)} bytes) — probably not an image')
    with open(dest, 'wb') as f:
        f.write(data)
    return len(data)

def main():
    print('\n🎨 MQT Festival Image Downloader (Python)\n')
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f'📁 Output: {os.path.abspath(OUTPUT_DIR)}\n')

    passed = 0
    failed = 0

    for img in IMAGES:
        dest = os.path.join(OUTPUT_DIR, img['name'])

        if os.path.exists(dest) and os.path.getsize(dest) > 10000:
            print(f"  ✓ SKIP   {img['name']}  (exists, {os.path.getsize(dest)//1024} KB)")
            passed += 1
            continue

        success = False
        for i, url in enumerate(img['urls']):
            label = 'primary' if i == 0 else f'fallback-{i}'
            sys.stdout.write(f"  ↓ {label:<12} {img['name']} ... ")
            sys.stdout.flush()
            try:
                size = download_url(url, dest)
                print(f"✓  ({size//1024} KB)")
                passed += 1
                success = True
                break
            except Exception as e:
                print(f"✗  {e}")

        if not success:
            failed += 1

    print(f'\n📊 Result: {passed} done, {failed} failed')

    if failed > 0:
        print(f'\n⚠  Some images failed. Festivals will use coloured gradient fallbacks (already configured).')
        print(f'   You can manually copy JPGs to:\n   {os.path.abspath(OUTPUT_DIR)}\n')
    else:
        print(f'\n✅ All festival images ready!')
        print(f'\n💡 Next step:\n   git add public/assets/festivals/\n   git commit -m "feat: add festival images [Wikimedia Commons CC-BY-SA]"\n')

if __name__ == '__main__':
    main()
