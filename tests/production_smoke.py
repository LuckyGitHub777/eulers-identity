"""Verify the canonical Euler's Identity surface after a Pages deployment."""

from __future__ import annotations

import argparse
import ssl
import time
from urllib.error import URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

CANONICAL = "https://eulers.id/"
HTML_MARKERS = (
    '<link rel="canonical" href="https://eulers.id/">',
    '<meta property="og:url" content="https://eulers.id/">',
    '<meta name="referrer" content="no-referrer">',
    '<meta name="application-name" content="Euler’s Identity">',
    "connect-src 'none'",
    'src="app.js"',
    'href="styles.css"',
    "Static by design. No accounts, project analytics, or application telemetry.",
)
TEXT_ASSETS = {
    "app.js": ("javascript", "Step ¼ turn"),
    "styles.css": ("text/css", ".sr-only"),
    "modules/unit-circle.js": ("javascript", "Number.EPSILON"),
}
BINARY_ASSETS = {
    "social-preview.png": "image/png",
    "favicon.svg": "image/svg+xml",
}
EXPECTED_SOCIAL_PREVIEW = (1200, 630)
SECONDARY_PAGES = {
    "matrix.html": (
        "Euler’s Identity — Matrix Rotation Laboratory",
        '<link rel="canonical" href="https://eulers.id/matrix.html">',
    ),
    "phase.html": (
        "Euler’s Identity — Relative Phase Laboratory",
        '<link rel="canonical" href="https://eulers.id/phase.html">',
    ),
}


def fetch_once(url: str) -> tuple[str, bytes, str]:
    context = ssl.create_default_context()
    request = Request(
        url,
        headers={
            "User-Agent": "eulers-identity-production-smoke/0.1.1",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
    )
    with urlopen(request, timeout=20, context=context) as response:
        return (
            response.geturl(),
            response.read(),
            response.headers.get("Content-Type", ""),
        )


def same_origin(url: str) -> bool:
    expected = urlparse(CANONICAL)
    actual = urlparse(url)
    return (actual.scheme, actual.netloc) == (expected.scheme, expected.netloc)


def wait_for_html(url: str, attempts: int = 60) -> str:
    last_problem = "deployment did not become ready"
    for attempt in range(1, attempts + 1):
        try:
            final_url, body, content_type = fetch_once(url)
            if final_url.rstrip("/") != CANONICAL.rstrip("/"):
                last_problem = f"unexpected final URL: {final_url}"
            elif "text/html" not in content_type:
                last_problem = f"unexpected content type: {content_type}"
            else:
                html = body.decode("utf-8")
                missing = [marker for marker in HTML_MARKERS if marker not in html]
                legacy = "luckygithub777.github.io/eulers-identity" in html
                if not missing and not legacy:
                    return html
                last_problem = f"stale/missing markers: {missing}; legacy={legacy}"
        except (OSError, RuntimeError, UnicodeDecodeError, URLError) as error:
            last_problem = str(error)

        if attempt < attempts:
            time.sleep(5)

    raise AssertionError(f"Canonical surface did not become ready: {last_problem}")


def wait_for_asset(
    asset: str,
    expected_type: str,
    marker: str | None = None,
    attempts: int = 60,
) -> None:
    asset_url = urljoin(CANONICAL, asset)
    last_problem = "asset did not become ready"

    for attempt in range(1, attempts + 1):
        try:
            resolved, body, content_type = fetch_once(asset_url)
            if not same_origin(resolved):
                last_problem = f"asset escaped canonical origin: {resolved}"
            elif expected_type not in content_type:
                last_problem = f"unexpected content type: {content_type}"
            elif not body:
                last_problem = "empty asset"
            elif marker is not None and marker not in body.decode("utf-8"):
                last_problem = f"stale asset marker: {marker}"
            else:
                if marker is None and asset in BINARY_ASSETS:
                    verify_binary_semantics(asset, body)
                return
        except (OSError, RuntimeError, UnicodeDecodeError, URLError) as error:
            last_problem = str(error)

        if attempt < attempts:
            time.sleep(5)

    raise AssertionError(f"{asset_url} did not become ready: {last_problem}")


def verify_binary_semantics(asset: str, body: bytes) -> None:
    if asset == "social-preview.png":
        if not body.startswith(b"\x89PNG\r\n\x1a\n") or len(body) < 24:
            raise AssertionError("social preview is not a valid PNG header")
        width = int.from_bytes(body[16:20], "big")
        height = int.from_bytes(body[20:24], "big")
        assert (width, height) == EXPECTED_SOCIAL_PREVIEW, (width, height)
    elif asset == "favicon.svg":
        text = body.decode("utf-8")
        assert "<svg" in text and "</svg>" in text
        lowered = text.lower()
        assert "<script" not in lowered
        assert 'href="http://' not in lowered and 'href="https://' not in lowered
        assert 'xlink:href="http://' not in lowered
        assert 'xlink:href="https://' not in lowered


def verify_secondary_page(path: str, title: str, canonical_marker: str) -> None:
    url = urljoin(CANONICAL, path)
    resolved, body, content_type = fetch_once(url)
    assert same_origin(resolved), resolved
    assert "text/html" in content_type, content_type
    html = body.decode("utf-8")
    assert f"<title>{title}</title>" in html
    assert canonical_marker in html
    assert "connect-src 'none'" in html


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default=CANONICAL)
    args = parser.parse_args()

    wait_for_html(args.url)
    for asset, (expected_type, marker) in TEXT_ASSETS.items():
        wait_for_asset(asset, expected_type, marker)
    for asset, expected_type in BINARY_ASSETS.items():
        wait_for_asset(asset, expected_type)
    for path, (title, canonical_marker) in SECONDARY_PAGES.items():
        verify_secondary_page(path, title, canonical_marker)

    total_assets = len(TEXT_ASSETS) + len(BINARY_ASSETS)
    print("production_smoke: PASS")
    print(f"canonical: {CANONICAL}")
    print(f"assets: {total_assets}/{total_assets} current and reachable")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
