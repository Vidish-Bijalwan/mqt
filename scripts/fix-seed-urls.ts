import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

// All broken URLs from the first run replaced with verified working ones
const fixMap: Record<string, string> = {
  // States (404s replaced)
  'states/chhattisgarh':      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'states/haryana':           'https://images.unsplash.com/photo-1569587112025-0d460e81a126?w=1200&q=80',
  'states/jharkhand':         'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=1200&q=80',
  'states/karnataka':         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  'states/madhya-pradesh':    'https://images.unsplash.com/photo-1564052899-af1bc764c74f?w=1200&q=80',
  'states/manipur':           'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80',
  'states/nagaland':          'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  'states/puducherry':        'https://images.unsplash.com/photo-1583428852744-5f850c15d9be?w=1200&q=80',
  'states/telangana':         'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
  'states/tripura':           'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  'states/ladakh':            'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  'states/lakshadweep':       'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
  'states/chandigarh':        'https://images.unsplash.com/photo-1569587112025-0d460e81a126?w=1200&q=80',
  'states/dadra-nagar-haveli':'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
  'states/jammu-kashmir':     'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
  'states/jammu-and-kashmir': 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
  'states/andaman-nicobar':   'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
  // Cities - Karnataka
  'cities/karnataka/coorg':             'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  'cities/karnataka/hampi':             'https://images.unsplash.com/photo-1564052899-af1bc764c74f?w=1200&q=80',
  'cities/karnataka/chikmagalur':       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  'cities/karnataka/gokarna':           'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
  'cities/karnataka/mysore':            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  'cities/karnataka/kabini':            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  // Cities - Ladakh
  'cities/ladakh/leh':                  'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  'cities/ladakh/ladakh':               'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  'cities/ladakh/nubra-valley':         'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  'cities/ladakh/pangong-lake':         'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  // Cities - Madhya Pradesh
  'cities/madhya-pradesh/khajuraho':    'https://images.unsplash.com/photo-1564052899-af1bc764c74f?w=1200&q=80',
  'cities/madhya-pradesh/orchha':       'https://images.unsplash.com/photo-1564052899-af1bc764c74f?w=1200&q=80',
  'cities/madhya-pradesh/kanha':        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'cities/madhya-pradesh/bandhavgarh':  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'cities/madhya-pradesh/pachmarhi':    'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=1200&q=80',
  // Cities - Maharashtra
  'cities/maharashtra/lonavala':        'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=1200&q=80',
  'cities/maharashtra/mahabaleshwar':   'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=1200&q=80',
  'cities/maharashtra/ajanta':          'https://images.unsplash.com/photo-1564052899-af1bc764c74f?w=1200&q=80',
  'cities/maharashtra/ellora':          'https://images.unsplash.com/photo-1564052899-af1bc764c74f?w=1200&q=80',
  'cities/maharashtra/shirdi':          'https://images.unsplash.com/photo-1583428852744-5f850c15d9be?w=1200&q=80',
  // Cities - Rajasthan (udaipur 404)
  'cities/rajasthan/udaipur':           'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
  // Cities - Jammu Kashmir
  'cities/jammu-and-kashmir/srinagar':  'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
  'cities/jammu-and-kashmir/gulmarg':   'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
  'cities/jammu-and-kashmir/pahalgam':  'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
  'cities/jammu-and-kashmir/sonamarg':  'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
  'cities/jammu-and-kashmir/kashmir':   'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
  'cities/jammu-kashmir/kashmir':       'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
  'cities/jammu-kashmir/srinagar':      'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
  // Packages (404s replaced)
  'packages/ooty-coorg-family-journey': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  'packages/coorg-coffee-romance':      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  'packages/udaipur-couple-retreat':    'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
  'packages/udaipur-palace-experience': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
  'packages/hampi-heritage-trail':      'https://images.unsplash.com/photo-1564052899-af1bc764c74f?w=1200&q=80',
  'packages/jim-corbett-safari':        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'packages/ranthambore-wildlife-tour': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'packages/kanha-wildlife-retreat':    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'packages/kabini-jungle-escape':      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'packages/tiger-safari-expedition':   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'packages/lonavala-quick-break':      'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=1200&q=80',
  'packages/ladakh-adventure-7-nights-8-days':  'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  'packages/ladakh-luxury-8-nights-9-days':     'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  'packages/ladakh-motorbike-expedition':       'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  'packages/himalayan-grand-circuit-12-nights': 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  'packages/golden-triangle-classic':           'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
  'packages/char-dham-yatra-10-nights-11-days': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=1200&q=80',
  // Categories (404s)
  'categories/pilgrimage-tours':  'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
  'categories/adventure':         'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  'categories/adventure-tours':   'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
  'categories/nature':            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  'categories/wildlife-retreats': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'categories/luxury':            'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
  'categories/luxury-getaways':   'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
};

function downloadImage(url: string, maxRedirects = 5): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const requester = isHttps ? https : http;
    const req = requester.get(url, { headers: { 'User-Agent': 'MQT-Asset-Fix/1.0' } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && maxRedirects > 0) {
        const loc = res.headers.location;
        const nextUrl = loc.startsWith('http') ? loc : new URL(loc, url).href;
        return downloadImage(nextUrl, maxRedirects - 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
      const bufs: Buffer[] = [];
      res.on('data', (c) => bufs.push(c));
      res.on('end', () => resolve(Buffer.concat(bufs)));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function run() {
  const rootDir = path.resolve(process.cwd(), 'src/assets/images');
  let ok = 0, fail = 0;
  for (const [basePath, url] of Object.entries(fixMap)) {
    try {
      const buf = await downloadImage(url);
      const variants = basePath.startsWith('cities/') 
        ? ['hero', 'card', 'thumbnail', 'gallery-1', 'gallery-2', 'gallery-3']
        : ['hero', 'card', 'thumbnail'];
      for (const v of variants) {
        const p = path.join(rootDir, ...`${basePath}/${v}.webp`.split('/'));
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, buf);
      }
      console.log(`  ✅ ${basePath} (${buf.length} bytes)`);
      ok++;
    } catch(e: any) {
      console.error(`  ❌ ${basePath}: ${e.message}`);
      fail++;
    }
  }
  console.log(`\n✅ Fix complete: ${ok} ok, ${fail} still failing.`);
}
run();
