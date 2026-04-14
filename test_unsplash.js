const urls = [
  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1590050752117-23a9d7fc2440?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1584181796748-cc4e07476bce?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1567449303183-ae0d6ed1498c?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1544989164-37e4e6e9c74b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=600",
];
const fetch = require('node-fetch'); // we can just use built-in fetch in newer Node
(async () => {
  for (const url of urls) {
    const res = await globalThis.fetch(url, { method: 'HEAD' });
    console.log(res.status, url);
  }
})();
