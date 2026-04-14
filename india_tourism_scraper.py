"""
╔══════════════════════════════════════════════════════════════════════════════╗
║         INDIA TOURISM IMAGE SCRAPER  v2.0  — PRO EDITION                   ║
║                                                                              ║
║  Sources:                                                                    ║
║    1. Central Govt   → tourism.gov.in / incredibleindia.gov.in              ║
║    2. All 36 State / UT Tourism portals                                     ║
║    3. Pixabay API    → high-quality CC0 fill-in images                      ║
║                                                                              ║
║  Folder layout:                                                              ║
║    india_tourism/                                                            ║
║    └── <State>/                                                              ║
║        └── <Location Slug — Readable Name>/                                 ║
║            ├── Hawa_Mahal_Jaipur_pixabay.jpg                               ║
║            ├── Houseboat_Kerala_Backwaters_govt.jpg                        ║
║            └── ...                                                           ║
║                                                                              ║
║  Install:  pip install requests beautifulsoup4 lxml tqdm                    ║
║  Run:      python india_tourism_scraper_v2.py                               ║
╚══════════════════════════════════════════════════════════════════════════════╝
"""

import os, re, time, hashlib, logging, mimetypes, json, sys
from pathlib import Path
from urllib.parse import urljoin, urlparse, urlencode, quote_plus
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

import requests
from bs4 import BeautifulSoup
from tqdm import tqdm

# ──────────────────────────────────────────────────────────────────────────────
# LOGGING
# ──────────────────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s │ %(levelname)-8s │ %(message)s",
    datefmt="%H:%M:%S",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("scraper_v2.log", encoding="utf-8"),
    ],
)
log = logging.getLogger(__name__)

# ──────────────────────────────────────────────────────────────────────────────
# ★  CONFIGURATION  ★
# ──────────────────────────────────────────────────────────────────────────────
BASE_DIR            = Path("india_tourism")
REQUEST_DELAY       = 1.2          # seconds between requests per state
MAX_IMAGES_PER_LOC  = 40           # 0 = unlimited
MAX_LOCATIONS_GOVT  = 25           # per state/UT
MIN_IMG_BYTES       = 8_000        # skip icons / spacers
TIMEOUT             = 22
THREADS             = 4            # parallel image downloads per location
PIXABAY_API_KEY     = ""           # ← PASTE your free key from pixabay.com/api/docs/
PIXABAY_PER_QUERY   = 15           # images per Pixabay search
ENABLE_PIXABAY      = True         # set False if no API key yet

IMG_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
}

# ──────────────────────────────────────────────────────────────────────────────
# STATE / UT TOURISM PORTALS  (36 entries)
# ──────────────────────────────────────────────────────────────────────────────
STATE_SITES = [
    # (display_name,              base_url,                                      pixabay_hint)
    ("Andhra Pradesh",         "https://aptourism.gov.in",                       "Andhra Pradesh tourism"),
    ("Arunachal Pradesh",      "https://www.arunachaltourism.com",               "Arunachal Pradesh tourism"),
    ("Assam",                  "https://assamtourism.gov.in",                    "Assam tourism Kaziranga"),
    ("Bihar",                  "https://bihartourism.gov.in",                    "Bihar Bodh Gaya Patna"),
    ("Chhattisgarh",           "https://www.chhattisgarhtourism.in",             "Chhattisgarh tourism"),
    ("Goa",                    "https://www.goatourism.gov.in",                  "Goa beach India"),
    ("Gujarat",                "https://www.gujarattourism.com",                 "Gujarat Rann of Kutch"),
    ("Haryana",                "https://haryanatourism.gov.in",                  "Haryana Kurukshetra"),
    ("Himachal Pradesh",       "https://himachaltourism.gov.in",                 "Himachal Pradesh mountains"),
    ("Jharkhand",              "https://www.jharkhandtourism.gov.in",            "Jharkhand tourism"),
    ("Karnataka",              "https://karnatakatourism.org",                   "Karnataka Mysore Hampi"),
    ("Kerala",                 "https://www.keralatourism.org",                  "Kerala backwaters houseboat"),
    ("Madhya Pradesh",         "https://www.mptourism.com",                      "Madhya Pradesh Khajuraho"),
    ("Maharashtra",            "https://www.maharashtratourism.gov.in",          "Maharashtra Mumbai Ajanta"),
    ("Manipur",                "https://manipurtourism.gov.in",                  "Manipur tourism"),
    ("Meghalaya",              "https://www.megtourism.gov.in",                  "Meghalaya Cherrapunji"),
    ("Mizoram",                "https://mizoramtourism.org",                     "Mizoram tourism"),
    ("Nagaland",               "https://tourismnagaland.com",                    "Nagaland Hornbill festival"),
    ("Odisha",                 "https://odishatourism.gov.in",                   "Odisha Konark Puri temple"),
    ("Punjab",                 "https://www.punjabtourism.punjab.gov.in",        "Punjab Golden Temple Amritsar"),
    ("Rajasthan",              "https://tourism.rajasthan.gov.in",               "Rajasthan palace fort"),
    ("Sikkim",                 "https://sikkimtourism.gov.in",                   "Sikkim Gangtok Kangchenjunga"),
    ("Tamil Nadu",             "https://www.tamilnadutourism.tn.gov.in",         "Tamil Nadu temple Madurai"),
    ("Telangana",              "https://www.telanganatourism.gov.in",            "Telangana Hyderabad Charminar"),
    ("Tripura",                "https://tripuratourism.gov.in",                  "Tripura Agartala tourism"),
    ("Uttar Pradesh",          "https://uptourism.gov.in",                       "Uttar Pradesh Taj Mahal Agra"),
    ("Uttarakhand",            "https://uttarakhandtourism.gov.in",              "Uttarakhand Rishikesh Haridwar"),
    ("West Bengal",            "https://www.wbtourism.gov.in",                   "West Bengal Darjeeling Kolkata"),
    # UTs
    ("Andaman Nicobar",        "https://www.andamantourism.gov.in",              "Andaman Nicobar island"),
    ("Chandigarh",             "https://chandigarhtourism.gov.in",               "Chandigarh Rock Garden"),
    ("Dadra Nagar Haveli",     "https://www.dnhtourism.gov.in",                  "Dadra Nagar Haveli"),
    ("Daman and Diu",          "https://www.daman.nic.in",                       "Daman Diu beach"),
    ("Delhi",                  "https://www.delhitourism.gov.in",                "Delhi Red Fort India Gate"),
    ("Jammu and Kashmir",      "https://www.jktourism.jk.gov.in",               "Kashmir Dal Lake Srinagar"),
    ("Lakshadweep",            "https://lakshadweeptourism.com",                 "Lakshadweep coral island"),
    ("Puducherry",             "https://www.pondytourism.in",                    "Puducherry Pondicherry beach"),
]

# Central Govt portals scraped separately under "India_Central"
CENTRAL_SITES = [
    ("Incredible India",       "https://www.incredibleindia.gov.in/en",          "India tourism"),
    ("Ministry of Tourism",    "https://tourism.gov.in",                         "India tourism ministry"),
    ("ITDC",                   "https://itdc.co.in",                             "India tourist destinations"),
]

# ──────────────────────────────────────────────────────────────────────────────
# SESSION
# ──────────────────────────────────────────────────────────────────────────────
session = requests.Session()
session.headers.update(HEADERS)
_download_lock = threading.Lock()

# ──────────────────────────────────────────────────────────────────────────────
# UTILITIES
# ──────────────────────────────────────────────────────────────────────────────

def slugify(text: str, max_len: int = 60) -> str:
    text = text.strip()
    text = re.sub(r"[<>:\"/\\|?*\x00-\x1F]", "", text)
    text = re.sub(r"[\s\-]+", "_", text)
    return text[:max_len] or "unnamed"


def clean_name(raw: str) -> str:
    """Make an image filename-friendly pretty name."""
    raw = re.sub(r"\s+", " ", raw).strip()
    raw = re.sub(r"[^\w\s\-\(\)]", "", raw)
    return raw[:80].strip()


def url_ext(url: str) -> str:
    ext = Path(urlparse(url).path).suffix.lower()
    return ext if ext in IMG_EXTENSIONS else ".jpg"


def short_hash(s: str) -> str:
    return hashlib.md5(s.encode()).hexdigest()[:6]


def get_page(url: str, retries: int = 3) -> BeautifulSoup | None:
    for attempt in range(1, retries + 1):
        try:
            r = session.get(url, timeout=TIMEOUT, allow_redirects=True)
            r.raise_for_status()
            ct = r.headers.get("Content-Type", "")
            if "html" not in ct and "xml" not in ct:
                log.debug(f"Non-HTML content type for {url}: {ct}")
                return None
            return BeautifulSoup(r.content, "lxml")
        except requests.exceptions.SSLError:
            try:
                r = session.get(url, timeout=TIMEOUT, allow_redirects=True, verify=False)
                r.raise_for_status()
                return BeautifulSoup(r.content, "lxml")
            except Exception as e:
                log.warning(f"  SSL retry failed: {e}")
        except requests.exceptions.ConnectionError as e:
            log.warning(f"  Connection error ({attempt}/{retries}): {e}")
        except Exception as e:
            log.warning(f"  Fetch error ({attempt}/{retries}): {e}")
        if attempt < retries:
            time.sleep(REQUEST_DELAY * attempt)
    return None


def download_image(img_url: str, dest: Path, source_tag: str = "govt") -> bool:
    """Download one image. dest already includes final filename."""
    if dest.exists():
        return True
    try:
        r = session.get(img_url, timeout=TIMEOUT, stream=True)
        r.raise_for_status()
        data = b""
        for chunk in r.iter_content(16384):
            data += chunk
        if len(data) < MIN_IMG_BYTES:
            return False
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return True
    except Exception:
        return False


# ──────────────────────────────────────────────────────────────────────────────
# IMAGE EXTRACTION FROM A PAGE
# ──────────────────────────────────────────────────────────────────────────────

def extract_images(soup: BeautifulSoup, page_url: str) -> list[dict]:
    """
    Return list of {"url": ..., "name": ..., "source": "govt"}
    Name is derived from alt / title / filename.
    """
    seen, results = set(), []

    def add(url: str, name: str):
        url = url.strip()
        if not url or url.startswith("data:"):
            return
        full = urljoin(page_url, url)
        if full in seen:
            return
        ext = url_ext(full)
        if ext not in IMG_EXTENSIONS:
            return
        seen.add(full)
        results.append({"url": full, "name": clean_name(name) or "image", "source": "govt"})

    # <img> with multiple lazy-load attrs
    for tag in soup.find_all("img"):
        for attr in ("src", "data-src", "data-lazy-src", "data-original",
                     "data-full", "data-large", "data-hi-res", "data-img"):
            val = tag.get(attr, "").strip()
            if val:
                alt_name = tag.get("alt") or tag.get("title") or ""
                add(val, alt_name)
                break

    # CSS background-image
    for tag in soup.find_all(style=True):
        for m in re.findall(r"url\(['\"]?(https?://[^'\")\s]+)['\"]?\)", tag["style"]):
            add(m, "")

    # <source srcset> inside <picture>
    for tag in soup.find_all("source"):
        srcset = tag.get("srcset", "")
        for part in srcset.split(","):
            part = part.strip()
            if not part:
                continue
            tokens = part.split()
            if not tokens:
                continue
            candidate = tokens[0].strip()
            if candidate:
                add(candidate, "")

    # <a href> → direct image link
    for tag in soup.find_all("a", href=True):
        href = tag["href"].strip()
        ext = Path(urlparse(href).path).suffix.lower()
        if ext in IMG_EXTENSIONS:
            add(href, tag.get_text(strip=True))

    return results


# ──────────────────────────────────────────────────────────────────────────────
# LOCATION DISCOVERY
# ──────────────────────────────────────────────────────────────────────────────

DEST_PATTERN = re.compile(
    r"(destination|place|tourism|tourist|location|attraction|spot|heritage|"
    r"temple|fort|beach|hill|lake|park|wildlife|museum|city|town|village|trek|"
    r"waterfall|palace|garden|monument|shrine|cave|valley|island|fort|ruins|"
    r"sanctuary|reserve|falls|ghats?|mandir|dham|kshetra|puri|abad)",
    re.I,
)


def discover_locations(soup: BeautifulSoup, base_url: str) -> list[dict]:
    """Return list of {"name": str, "url": str} for destination sub-pages."""
    base_domain = urlparse(base_url).netloc
    seen, locs = set(), []

    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if not href or href.startswith("#") or "javascript" in href.lower():
            continue
        full = urljoin(base_url, href)
        parsed = urlparse(full)
        if parsed.netloc != base_domain:
            continue
        if full in seen:
            continue

        text = a.get_text(" ", strip=True)
        title = a.get("title", "")
        combined = f"{href} {text} {title}"

        if DEST_PATTERN.search(combined):
            name = (text or title or Path(parsed.path).stem).strip()
            name = re.sub(r"\s+", " ", name)[:80]
            if len(name) < 2:
                name = Path(parsed.path).stem.replace("-", " ").replace("_", " ").title()
            if len(name) < 2:
                continue
            locs.append({"name": name, "url": full})
            seen.add(full)

    # Deduplicate by name (keep first)
    seen_names, unique = set(), []
    for loc in locs:
        key = loc["name"].lower()[:40]
        if key not in seen_names:
            seen_names.add(key)
            unique.append(loc)
    return unique


# ──────────────────────────────────────────────────────────────────────────────
# PIXABAY SOURCE
# ──────────────────────────────────────────────────────────────────────────────

def pixabay_search(query: str, per_page: int = 15) -> list[dict]:
    """Query Pixabay API and return list of {"url": ..., "name": ..., "source": "pixabay"}"""
    if not ENABLE_PIXABAY or not PIXABAY_API_KEY:
        return []
    api = "https://pixabay.com/api/"
    params = {
        "key": PIXABAY_API_KEY,
        "q": query,
        "image_type": "photo",
        "orientation": "horizontal",
        "category": "travel",
        "safesearch": "true",
        "per_page": per_page,
        "order": "popular",
    }
    try:
        r = requests.get(api, params=params, timeout=15)
        r.raise_for_status()
        hits = r.json().get("hits", [])
        results = []
        for h in hits:
            url = h.get("largeImageURL") or h.get("webformatURL")
            if url:
                tags = h.get("tags", "").replace(",", " ").strip()
                results.append({"url": url, "name": tags[:80], "source": "pixabay"})
        return results
    except Exception as e:
        log.debug(f"Pixabay error for '{query}': {e}")
        return []


# ──────────────────────────────────────────────────────────────────────────────
# SAVING IMAGES
# ──────────────────────────────────────────────────────────────────────────────

def make_filename(img: dict, index: int, folder: Path) -> Path:
    """
    Build a human-readable filename:
      001_Hawa_Mahal_Jaipur_govt.jpg
      002_Kerala_Backwaters_pixabay.jpg
    """
    name = re.sub(r"\s+", "_", img["name"])
    name = re.sub(r"[^\w\-]", "", name)[:50] or "image"
    source = img.get("source", "web")
    ext = url_ext(img["url"])
    fname = f"{index:03d}_{name}_{source}{ext}"
    return folder / fname


def save_location_images(folder: Path, images: list[dict]):
    """Download images in parallel threads."""
    if not images:
        return 0

    folder.mkdir(parents=True, exist_ok=True)
    tasks = []
    for idx, img in enumerate(images, 1):
        dest = make_filename(img, idx, folder)
        tasks.append((img["url"], dest, img.get("source", "web")))

    downloaded = 0

    def _dl(args):
        url, dest, src = args
        ok = download_image(url, dest, src)
        return ok

    with ThreadPoolExecutor(max_workers=THREADS) as ex:
        futs = {ex.submit(_dl, t): t for t in tasks}
        for fut in as_completed(futs):
            if fut.result():
                downloaded += 1

    return downloaded


# ──────────────────────────────────────────────────────────────────────────────
# SCRAPE ONE STATE / UT
# ──────────────────────────────────────────────────────────────────────────────

def scrape_state(state_name: str, base_url: str, pix_hint: str):
    log.info(f"{'━'*60}")
    log.info(f"  STATE: {state_name}  →  {base_url}")

    soup = get_page(base_url)
    if soup is None:
        log.error(f"  ✗ Unreachable: {base_url}")
        # Still run Pixabay if enabled
        if ENABLE_PIXABAY and PIXABAY_API_KEY:
            _pixabay_fallback(state_name, pix_hint)
        return

    locations = discover_locations(soup, base_url)
    log.info(f"  Found {len(locations)} candidate locations")

    if not locations:
        # No sub-pages → treat homepage as one location
        _scrape_single_page(state_name, "Overview", base_url, pix_hint)
        return

    if MAX_LOCATIONS_GOVT:
        locations = locations[:MAX_LOCATIONS_GOVT]

    for loc in tqdm(locations, desc=f"  {state_name[:20]:<20}", unit="loc", leave=False):
        loc_name   = loc["name"]
        loc_url    = loc["url"]
        loc_folder = BASE_DIR / slugify(state_name) / slugify(loc_name)

        log.info(f"    ▸ {loc_name}")
        loc_soup = get_page(loc_url)
        images = []

        if loc_soup:
            images = extract_images(loc_soup, loc_url)

        # Pixabay top-up
        if ENABLE_PIXABAY and PIXABAY_API_KEY:
            pix_query = f"{loc_name} {state_name} India tourism"
            pix_imgs  = pixabay_search(pix_query, PIXABAY_PER_QUERY)
            images += pix_imgs

        if MAX_IMAGES_PER_LOC:
            images = images[:MAX_IMAGES_PER_LOC]

        n = save_location_images(loc_folder, images)
        log.info(f"      → {n} image(s) saved in {loc_folder}")
        time.sleep(REQUEST_DELAY)


def _scrape_single_page(state_name, loc_name, url, pix_hint):
    folder = BASE_DIR / slugify(state_name) / slugify(loc_name)
    soup   = get_page(url)
    images = extract_images(soup, url) if soup else []

    if ENABLE_PIXABAY and PIXABAY_API_KEY:
        images += pixabay_search(f"{pix_hint} India tourism", PIXABAY_PER_QUERY)

    if MAX_IMAGES_PER_LOC:
        images = images[:MAX_IMAGES_PER_LOC]

    n = save_location_images(folder, images)
    log.info(f"    → {n} image(s) saved in {folder}")


def _pixabay_fallback(state_name, pix_hint):
    folder = BASE_DIR / slugify(state_name) / "Pixabay_Gallery"
    imgs   = pixabay_search(f"{pix_hint} India", PIXABAY_PER_QUERY)
    if MAX_IMAGES_PER_LOC:
        imgs = imgs[:MAX_IMAGES_PER_LOC]
    n = save_location_images(folder, imgs)
    log.info(f"    Pixabay fallback → {n} image(s) saved in {folder}")


# ──────────────────────────────────────────────────────────────────────────────
# CENTRAL GOVT PORTALS
# ──────────────────────────────────────────────────────────────────────────────

def scrape_central_portals():
    log.info("\n" + "═"*60)
    log.info("  CENTRAL GOVERNMENT TOURISM PORTALS")
    log.info("═"*60)
    for name, url, hint in CENTRAL_SITES:
        log.info(f"  → {name}  ({url})")
        _scrape_single_page("India_Central", name, url, hint)
        time.sleep(REQUEST_DELAY)


# ──────────────────────────────────────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────────────────────────────────────

def main():
    import warnings
    warnings.filterwarnings("ignore")   # suppress SSL warnings cleanly

    BASE_DIR.mkdir(exist_ok=True)
    log.info("╔══════════════════════════════════════════════════╗")
    log.info("║   INDIA TOURISM SCRAPER v2.0  — Starting         ║")
    log.info("╚══════════════════════════════════════════════════╝")
    log.info(f"  Output  : {BASE_DIR.resolve()}")
    log.info(f"  States  : {len(STATE_SITES)}")
    log.info(f"  Pixabay : {'✓ ENABLED' if ENABLE_PIXABAY and PIXABAY_API_KEY else '✗ No API key — set PIXABAY_API_KEY'}")
    log.info("")

    # Central portals first
    scrape_central_portals()

    # All states
    total = len(STATE_SITES)
    for i, (state, url, hint) in enumerate(STATE_SITES, 1):
        log.info(f"\n[{i}/{total}]")
        try:
            scrape_state(state, url, hint)
        except KeyboardInterrupt:
            log.warning("⚠  Interrupted — partial results saved.")
            sys.exit(0)
        except Exception as e:
            log.error(f"  Unexpected error for {state}: {e}", exc_info=True)
        time.sleep(REQUEST_DELAY)

    log.info("\n✅  All done!")
    log.info(f"   Folder: {BASE_DIR.resolve()}")


if __name__ == "__main__":
    main()