#!/usr/bin/env python3
"""
StruXure Media Scraper
======================
Crawls struxure.com and downloads all pergola images and videos.

Usage:
    pip install requests beautifulsoup4
    python3 scrape_struxure.py

Output:
    media/images/   — downloaded images
    media/videos/   — downloaded videos (direct .mp4 only)
    media/index.html — responsive gallery viewer
    media/skipped.txt — assets that failed to download
"""

import os
import re
import time
import hashlib
import urllib.parse
from pathlib import Path
from typing import Set, List, Tuple

import requests
from bs4 import BeautifulSoup

# ── Config ──────────────────────────────────────────────────────────────────
BASE_URL = "https://struxure.com"
DELAY = 1.5          # seconds between requests (polite crawling)
MAX_PAGES = 60        # hard cap — don't crawl forever
REQUEST_TIMEOUT = 20  # seconds
MAX_IMAGE_SIZE = 50 * 1024 * 1024  # 50 MB

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; UndercoverOutdoors-research/1.0; +https://undercoveroutdoors.com)",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

# Pages most likely to have rich media
PRIORITY_PATHS = [
    "/",
    "/products",
    "/products/pergola-x",
    "/products/brise",
    "/products/cabana",
    "/gallery",
    "/gallery/residential",
    "/gallery/commercial",
    "/inspiration",
    "/why-struxure",
    "/struxure-outdoor",
    "/about",
]

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
VIDEO_EXTENSIONS = {".mp4", ".webm", ".mov"}

# ── Setup output dirs ────────────────────────────────────────────────────────
MEDIA_DIR   = Path("media")
IMG_DIR     = MEDIA_DIR / "images"
VID_DIR     = MEDIA_DIR / "videos"
SKIP_FILE   = MEDIA_DIR / "skipped.txt"
INDEX_FILE  = MEDIA_DIR / "index.html"

IMG_DIR.mkdir(parents=True, exist_ok=True)
VID_DIR.mkdir(parents=True, exist_ok=True)

session = requests.Session()
session.headers.update(HEADERS)

# ── State ────────────────────────────────────────────────────────────────────
visited_pages: Set[str] = set()
found_images:  List[str] = []
found_videos:  List[str] = []  # direct .mp4/.webm
found_embeds:  List[dict] = []  # YouTube / Vimeo
downloaded_images: List[str] = []
downloaded_videos: List[str] = []
skipped: List[Tuple[str, str]] = []


def log(msg: str):
    print(msg)


def safe_filename(url: str, ext: str = "") -> str:
    h = hashlib.md5(url.encode()).hexdigest()[:10]
    parsed = urllib.parse.urlparse(url)
    name = Path(parsed.path).stem or "asset"
    name = re.sub(r"[^a-zA-Z0-9_\-]", "_", name)[:40]
    return f"{name}_{h}{ext}"


def check_robots() -> bool:
    """Check robots.txt — return False if crawling is disallowed."""
    try:
        r = session.get(f"{BASE_URL}/robots.txt", timeout=REQUEST_TIMEOUT)
        rules = r.text.lower()
        # Simple check: if Disallow: / for all agents, stop
        if "user-agent: *" in rules:
            for line in rules.split("\n"):
                line = line.strip()
                if line == "disallow: /":
                    log("⚠️  robots.txt disallows all crawling — stopping.")
                    return False
        log("✓ robots.txt checked — crawling is permitted.")
        return True
    except Exception as e:
        log(f"⚠️  Could not fetch robots.txt ({e}) — proceeding cautiously.")
        return True


def fetch_page(url: str) -> BeautifulSoup | None:
    try:
        r = session.get(url, timeout=REQUEST_TIMEOUT)
        if r.status_code != 200:
            log(f"  HTTP {r.status_code}: {url}")
            return None
        return BeautifulSoup(r.text, "html.parser")
    except Exception as e:
        log(f"  Error fetching {url}: {e}")
        return None


def extract_media(soup: BeautifulSoup, page_url: str):
    """Extract all image and video URLs from a parsed page."""

    # ── Images from <img> tags ──
    for tag in soup.find_all("img"):
        for attr in ("src", "data-src", "data-lazy-src", "data-srcset", "srcset"):
            val = tag.get(attr, "")
            if not val:
                continue
            # srcset can have multiple URLs
            for part in val.split(","):
                raw = part.strip().split()[0]
                if raw:
                    add_image(raw, page_url)

    # ── Images from <source> in <picture> ──
    for tag in soup.find_all("source"):
        for attr in ("src", "srcset", "data-srcset"):
            val = tag.get(attr, "")
            for part in val.split(","):
                raw = part.strip().split()[0]
                if raw:
                    add_image(raw, page_url)

    # ── Images from CSS background-image in style attrs ──
    for tag in soup.find_all(style=True):
        urls = re.findall(r'url\(["\']?(https?://[^"\')\s]+)["\']?\)', tag["style"])
        for u in urls:
            add_image(u, page_url)

    # ── Images from inline <style> blocks ──
    for style_tag in soup.find_all("style"):
        urls = re.findall(r'url\(["\']?(https?://[^"\')\s]+)["\']?\)', style_tag.string or "")
        for u in urls:
            add_image(u, page_url)

    # ── Videos: <video> src and <source> ──
    for tag in soup.find_all("video"):
        for attr in ("src", "data-src"):
            val = tag.get(attr, "")
            if val:
                add_video(val, page_url)
        for source in tag.find_all("source"):
            val = source.get("src", "")
            if val:
                add_video(val, page_url)

    # ── YouTube embeds ──
    for tag in soup.find_all("iframe"):
        src = tag.get("src", "") or tag.get("data-src", "")
        if "youtube.com/embed" in src or "youtu.be" in src:
            video_id = re.search(r"embed/([a-zA-Z0-9_\-]+)", src)
            if video_id:
                found_embeds.append({"type": "youtube", "id": video_id.group(1), "url": src})
                log(f"  🎬 YouTube embed: {video_id.group(1)}")
        elif "vimeo.com/video/" in src or "player.vimeo.com" in src:
            video_id = re.search(r"vimeo\.com/(?:video/)?(\d+)", src)
            if video_id:
                found_embeds.append({"type": "vimeo", "id": video_id.group(1), "url": src})
                log(f"  🎬 Vimeo embed: {video_id.group(1)}")

    # ── JSON-LD / structured data image refs ──
    for script in soup.find_all("script", type="application/ld+json"):
        urls = re.findall(r'"(?:image|url|contentUrl)"\s*:\s*"(https?://[^"]+\.(jpg|jpeg|png|webp))"', script.string or "", re.I)
        for u, _ in urls:
            add_image(u, page_url)

    # ── Open Graph images ──
    for meta in soup.find_all("meta", property=re.compile(r"og:image", re.I)):
        val = meta.get("content", "")
        if val:
            add_image(val, page_url)


def normalize_url(raw: str, base: str) -> str | None:
    raw = raw.strip()
    if not raw or raw.startswith("data:"):
        return None
    url = urllib.parse.urljoin(base, raw)
    # Remove query string for deduplication key but keep for downloading
    return url


def add_image(raw: str, base: str):
    url = normalize_url(raw, base)
    if not url:
        return
    # Check extension
    path = urllib.parse.urlparse(url).path.lower()
    ext = Path(path).suffix
    if ext not in IMAGE_EXTENSIONS and not any(fmt in url.lower() for fmt in ["jpg", "jpeg", "png", "webp", "image"]):
        return
    # Skip tiny icons / tracking pixels
    if any(skip in url.lower() for skip in ["pixel", "tracker", "beacon", "favicon", "logo-icon", "1x1", "sprite"]):
        return
    clean = url.split("?")[0]  # dedup key
    if clean not in found_images:
        found_images.append(clean)


def add_video(raw: str, base: str):
    url = normalize_url(raw, base)
    if not url:
        return
    path = urllib.parse.urlparse(url).path.lower()
    ext = Path(path).suffix
    if ext in VIDEO_EXTENSIONS:
        if url not in found_videos:
            found_videos.append(url)


def extract_links(soup: BeautifulSoup, page_url: str) -> List[str]:
    """Get all internal links for further crawling."""
    links = []
    for tag in soup.find_all("a", href=True):
        href = tag["href"].strip()
        if not href or href.startswith("#") or href.startswith("javascript") or href.startswith("mailto"):
            continue
        full = urllib.parse.urljoin(page_url, href)
        parsed = urllib.parse.urlparse(full)
        if parsed.netloc and parsed.netloc not in ("struxure.com", "www.struxure.com"):
            continue
        # Remove fragment
        clean = urllib.parse.urlunparse(parsed._replace(fragment=""))
        if clean not in visited_pages:
            links.append(clean)
    return links


def download_image(url: str) -> str | None:
    """Download image, return local filename or None on failure."""
    ext = Path(urllib.parse.urlparse(url).path).suffix.lower() or ".jpg"
    if ext not in IMAGE_EXTENSIONS:
        ext = ".jpg"
    fname = safe_filename(url, ext)
    dest = IMG_DIR / fname

    if dest.exists():
        return str(dest)

    try:
        r = session.get(url, timeout=REQUEST_TIMEOUT, stream=True)
        if r.status_code != 200:
            skipped.append((url, f"HTTP {r.status_code}"))
            return None

        content_type = r.headers.get("Content-Type", "")
        if "image" not in content_type and "octet-stream" not in content_type:
            skipped.append((url, f"Not an image: {content_type}"))
            return None

        size = 0
        with open(dest, "wb") as f:
            for chunk in r.iter_content(chunk_size=65536):
                size += len(chunk)
                if size > MAX_IMAGE_SIZE:
                    skipped.append((url, "File too large (>50MB)"))
                    dest.unlink(missing_ok=True)
                    return None
                f.write(chunk)

        if size < 2000:  # skip tiny placeholder images
            dest.unlink(missing_ok=True)
            skipped.append((url, f"Too small ({size} bytes) — likely placeholder"))
            return None

        return str(dest)

    except Exception as e:
        skipped.append((url, str(e)))
        return None


def download_video(url: str) -> str | None:
    """Download direct video file."""
    ext = Path(urllib.parse.urlparse(url).path).suffix.lower() or ".mp4"
    fname = safe_filename(url, ext)
    dest = VID_DIR / fname

    if dest.exists():
        return str(dest)

    try:
        r = session.get(url, timeout=60, stream=True)
        if r.status_code != 200:
            skipped.append((url, f"HTTP {r.status_code}"))
            return None

        with open(dest, "wb") as f:
            for chunk in r.iter_content(chunk_size=1024 * 1024):
                f.write(chunk)

        return str(dest)

    except Exception as e:
        skipped.append((url, str(e)))
        return None


def generate_html():
    """Generate a clean, responsive gallery index.html."""

    # Build image cards
    img_cards = ""
    for path in downloaded_images:
        rel = os.path.relpath(path, MEDIA_DIR)
        fname = Path(path).name
        img_cards += f"""
        <div class="card">
          <img src="{rel}" alt="{fname}" loading="lazy" />
          <div class="overlay">
            <a href="{rel}" target="_blank" class="open-link">Open full size ↗</a>
          </div>
        </div>"""

    # Build video cards (direct)
    vid_cards = ""
    for path in downloaded_videos:
        rel = os.path.relpath(path, MEDIA_DIR)
        fname = Path(path).name
        vid_cards += f"""
        <div class="card video-card">
          <video controls preload="metadata" muted playsinline>
            <source src="{rel}" />
          </video>
          <div class="label">{fname}</div>
        </div>"""

    # Build embed cards
    embed_cards = ""
    for emb in found_embeds:
        if emb["type"] == "youtube":
            embed_cards += f"""
        <div class="card embed-card">
          <iframe
            src="https://www.youtube.com/embed/{emb['id']}?rel=0&modestbranding=1"
            title="YouTube video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>"""
        elif emb["type"] == "vimeo":
            embed_cards += f"""
        <div class="card embed-card">
          <iframe
            src="https://player.vimeo.com/video/{emb['id']}?title=0&byline=0"
            title="Vimeo video"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>"""

    has_images = bool(downloaded_images)
    has_videos = bool(downloaded_videos or found_embeds)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>StruXure Media Archive — Undercover Outdoors Research</title>
<style>
  *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}

  :root {{
    --bg: #111;
    --bg2: #1a1a1a;
    --gold: #c9a84c;
    --text: #f5f0e8;
    --muted: rgba(245,240,232,0.5);
  }}

  body {{
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', system-ui, sans-serif;
    min-height: 100vh;
  }}

  header {{
    padding: 2.5rem 2rem 1.5rem;
    border-bottom: 1px solid rgba(201,168,76,0.15);
    max-width: 1400px;
    margin: 0 auto;
  }}

  header h1 {{
    font-size: 2rem;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.02em;
  }}

  header p {{
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--muted);
    line-height: 1.6;
  }}

  .stats {{
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }}

  .stat {{
    background: var(--bg2);
    border: 1px solid rgba(201,168,76,0.15);
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    color: var(--muted);
  }}

  .stat strong {{
    color: var(--gold);
    font-size: 1rem;
    display: block;
  }}

  nav {{
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }}

  nav a {{
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    border: 1px solid transparent;
    transition: 0.2s;
  }}

  nav a:hover, nav a.active {{
    color: var(--gold);
    border-color: rgba(201,168,76,0.3);
  }}

  section {{
    max-width: 1400px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
  }}

  section h2 {{
    font-size: 1.1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }}

  section h2::after {{
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(201,168,76,0.12);
  }}

  /* Masonry grid for images */
  .masonry {{
    columns: 4 280px;
    column-gap: 12px;
  }}

  .masonry .card {{
    break-inside: avoid;
    margin-bottom: 12px;
    position: relative;
    overflow: hidden;
    background: var(--bg2);
    cursor: pointer;
  }}

  .masonry .card img {{
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.35s ease;
  }}

  .masonry .card:hover img {{
    transform: scale(1.03);
  }}

  .card .overlay {{
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.55);
    display: flex;
    align-items: flex-end;
    padding: 0.75rem;
    opacity: 0;
    transition: opacity 0.25s;
  }}

  .card:hover .overlay {{
    opacity: 1;
  }}

  .open-link {{
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
    text-decoration: none;
    border: 1px solid rgba(201,168,76,0.5);
    padding: 0.3rem 0.6rem;
  }}

  /* Video grid */
  .video-grid {{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 16px;
  }}

  .video-card, .embed-card {{
    background: var(--bg2);
    border: 1px solid rgba(201,168,76,0.1);
    overflow: hidden;
    aspect-ratio: 16/9;
    position: relative;
  }}

  .video-card video {{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }}

  .embed-card iframe {{
    width: 100%;
    height: 100%;
    border: none;
  }}

  .label {{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.7);
    padding: 0.4rem 0.6rem;
    font-size: 0.65rem;
    color: var(--muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }}

  .empty {{
    color: var(--muted);
    font-size: 0.875rem;
    padding: 2rem;
    text-align: center;
    border: 1px dashed rgba(201,168,76,0.15);
  }}

  footer {{
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    border-top: 1px solid rgba(255,255,255,0.05);
    font-size: 0.75rem;
    color: rgba(245,240,232,0.2);
  }}
</style>
</head>
<body>

<header>
  <h1>StruXure Media Archive</h1>
  <p>
    Scraped from struxure.com for Undercover Outdoors research.<br />
    All media belongs to StruXure Outdoor Inc. — for internal reference only.
  </p>
  <div class="stats">
    <div class="stat"><strong>{len(downloaded_images)}</strong> Images downloaded</div>
    <div class="stat"><strong>{len(downloaded_videos)}</strong> Videos downloaded</div>
    <div class="stat"><strong>{len(found_embeds)}</strong> Video embeds found</div>
    <div class="stat"><strong>{len(skipped)}</strong> Assets skipped</div>
  </div>
</header>

<nav>
  {"<a href='#images'>Images</a>" if has_images else ""}
  {"<a href='#videos'>Videos</a>" if has_videos else ""}
  <a href="skipped.txt" target="_blank">Skipped assets</a>
  <a href="https://struxure.com" target="_blank">struxure.com ↗</a>
</nav>

{"<section id='images'><h2>Images — " + str(len(downloaded_images)) + " assets</h2>" + ("<div class='masonry'>" + img_cards + "</div>" if img_cards else "<div class='empty'>No images downloaded.</div>") + "</section>" if has_images else ""}

{"<section id='videos'><h2>Videos — " + str(len(downloaded_videos) + len(found_embeds)) + " assets</h2><div class='video-grid'>" + vid_cards + embed_cards + "</div></section>" if has_videos else ""}

<footer>
  © StruXure Outdoor Inc. — media scraped for reference research only. Not for redistribution.
</footer>

</body>
</html>
"""
    INDEX_FILE.write_text(html, encoding="utf-8")
    log(f"\n✓ Gallery written to {INDEX_FILE}")


def crawl():
    if not check_robots():
        return

    # Seed with priority pages
    queue = [urllib.parse.urljoin(BASE_URL, p) for p in PRIORITY_PATHS]
    pages_crawled = 0

    log(f"\n{'='*60}")
    log(f"Starting crawl of {BASE_URL}")
    log(f"{'='*60}\n")

    while queue and pages_crawled < MAX_PAGES:
        url = queue.pop(0)
        if url in visited_pages:
            continue

        visited_pages.add(url)
        pages_crawled += 1

        log(f"[{pages_crawled}/{MAX_PAGES}] Crawling: {url}")
        soup = fetch_page(url)

        if soup:
            img_before = len(found_images)
            vid_before = len(found_videos)

            extract_media(soup, url)

            new_imgs = len(found_images) - img_before
            new_vids = len(found_videos) - vid_before
            if new_imgs or new_vids:
                log(f"  → Found {new_imgs} images, {new_vids} videos")

            # Add new internal links to queue
            for link in extract_links(soup, url):
                if link not in visited_pages and link not in queue:
                    queue.append(link)

        time.sleep(DELAY)

    log(f"\n{'='*60}")
    log(f"Crawl complete: {pages_crawled} pages, {len(found_images)} images found, {len(found_videos)} videos found")
    log(f"{'='*60}\n")

    # Download images
    log("Downloading images…")
    for i, url in enumerate(found_images):
        log(f"  [{i+1}/{len(found_images)}] {url[:80]}…")
        path = download_image(url)
        if path:
            downloaded_images.append(path)
            log(f"    ✓ Saved → {path}")
        else:
            log(f"    ✗ Skipped")
        time.sleep(0.3)

    # Download direct videos
    if found_videos:
        log("\nDownloading videos…")
        for i, url in enumerate(found_videos):
            log(f"  [{i+1}/{len(found_videos)}] {url[:80]}…")
            path = download_video(url)
            if path:
                downloaded_videos.append(path)
                log(f"    ✓ Saved → {path}")
            else:
                log(f"    ✗ Skipped")
            time.sleep(0.5)

    # Write skipped.txt
    if skipped:
        with open(SKIP_FILE, "w", encoding="utf-8") as f:
            f.write(f"Skipped assets — {len(skipped)} total\n")
            f.write("=" * 60 + "\n\n")
            for url, reason in skipped:
                f.write(f"URL:    {url}\n")
                f.write(f"Reason: {reason}\n\n")
        log(f"\n⚠ {len(skipped)} assets skipped → {SKIP_FILE}")
    else:
        SKIP_FILE.write_text("No assets were skipped.\n")

    # Generate gallery
    generate_html()

    log(f"\n{'='*60}")
    log("DONE")
    log(f"  Images:   {len(downloaded_images)} downloaded to {IMG_DIR}/")
    log(f"  Videos:   {len(downloaded_videos)} downloaded to {VID_DIR}/")
    log(f"  Embeds:   {len(found_embeds)} YouTube/Vimeo (in gallery HTML)")
    log(f"  Skipped:  {len(skipped)} (see {SKIP_FILE})")
    log(f"  Gallery:  open {INDEX_FILE} in your browser")
    log(f"{'='*60}\n")


if __name__ == "__main__":
    crawl()
