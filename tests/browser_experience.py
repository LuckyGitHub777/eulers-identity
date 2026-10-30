"""Cross-browser UAT smoke checks for the static Euler's Identity experience."""

from __future__ import annotations

import argparse
import os
import threading
from contextlib import contextmanager
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import Browser, Page, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
EXPERIENCE = ROOT / "experience"


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: object) -> None:  # noqa: A002
        pass


@contextmanager
def local_site():
    handler = partial(QuietHandler, directory=str(EXPERIENCE))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_port}/"
    finally:
        server.shutdown()
        thread.join(timeout=5)
        server.server_close()


def assert_clean_runtime(page: Page, errors: list[str]) -> None:
    assert not errors, "Browser runtime errors: " + " | ".join(errors)
    assert page.locator("#magnitude-value").inner_text() == "1.000"


def exercise_page(page: Page, url: str) -> None:
    errors: list[str] = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on(
        "console",
        lambda message: (
            errors.append(message.text) if message.type == "error" else None
        ),
    )

    response = page.goto(url, wait_until="networkidle")
    assert response is not None and response.ok
    assert page.title() == "Euler’s Identity — Interactive Unit Circle"
    assert (
        page.locator('link[rel="canonical"]').get_attribute("href")
        == "https://eulers.id/"
    )

    status = page.locator("#status-message")
    assert status.get_attribute("role") == "status"
    assert status.get_attribute("aria-live") == "polite"
    assert page.locator(".explanation").get_attribute("role") is None

    slider = page.locator("#angle-slider")
    assert not slider.is_disabled()
    assert not page.locator("#play-button").is_disabled()
    assert not page.locator("#reset-button").is_disabled()
    assert not page.locator("#explain-button").is_disabled()

    slider.press("End")
    assert page.locator("#angle-value").inner_text().startswith("2π rad")
    slider.press("Home")
    assert page.locator("#angle-value").inner_text() == "0 rad"
    slider.evaluate(
        """el => {
          el.value = '3.14';
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }"""
    )
    assert "≈" in page.locator("#angle-value").inner_text()
    near_pi_equation = page.locator("#equation-text").inner_text()
    assert "≈" in near_pi_equation
    assert "iπ" not in near_pi_equation

    pi_button = page.locator('button[data-angle="3.141592653589793"]')
    pi_button.click()
    assert abs(float(slider.input_value()) - 3.141592653589793) < 1e-12
    assert pi_button.get_attribute("aria-pressed") == "true"
    assert "π rad (≈ 3.142)" == page.locator("#angle-value").inner_text()
    exact_spoken = slider.get_attribute("aria-valuetext") or ""
    assert "exactly pi radians" in exact_spoken
    assert "approximately 3.142 radians numerically" in exact_spoken
    assert "3.142 radians, exactly" not in exact_spoken
    exact_pi_equation = page.locator("#equation-text").inner_text()
    assert "=" in exact_pi_equation
    assert "≈" not in exact_pi_equation
    assert "iπ" in exact_pi_equation
    assert page.locator("#real-value").inner_text() == "-1.000"
    assert page.locator("#imag-value").inner_text() == "0.000"

    slider.press("ArrowRight")
    assert "≈" in page.locator("#angle-value").inner_text()
    assert pi_button.get_attribute("aria-pressed") == "false"
    assert abs(float(slider.input_value()) - (3.141592653589793 + 0.001)) < 1e-12

    page.locator("#reset-button").click()
    page.locator("#play-button").click()
    page.wait_for_timeout(120)
    assert page.locator("#play-button").inner_text() == "Pause"
    assert page.locator("#play-button").get_attribute("aria-pressed") == "true"
    page.locator("#play-button").click()
    assert page.locator("#play-button").inner_text() == "Play"
    assert "Animation paused at" in page.locator("#explanation-text").inner_text()

    page.locator("#reset-button").click()
    page.locator("#play-button").click()
    page.wait_for_timeout(80)
    page.evaluate(
        """() => {
          Object.defineProperty(document, 'hidden', {
            configurable: true,
            get: () => true,
          });
          document.dispatchEvent(new Event('visibilitychange'));
        }"""
    )
    assert page.locator("#play-button").inner_text() == "Play"
    assert page.locator("#play-button").get_attribute("aria-pressed") == "false"
    assert "tab became inactive" in page.locator("#explanation-text").inner_text()

    page.locator("#reset-button").click()
    for _ in range(3):
        page.locator("#explain-button").click()
    assert "= −1 + 1 = 0" in page.locator("#equation-text").inner_text()
    assert "exactly zero" in page.locator("#explanation-text").inner_text()
    addition_is_hidden = page.locator("#addition-vector").evaluate(
        "el => el.classList.contains('hidden')"
    )
    assert not addition_is_hidden
    radius_opacity = float(
        page.locator("#radius-vector").evaluate("el => getComputedStyle(el).opacity")
    )
    assert radius_opacity < 0.5

    page.locator(".skip-link").click()
    page.wait_for_timeout(50)
    assert page.evaluate("document.activeElement.id") == "experience"

    for viewport in ({"width": 390, "height": 844}, {"width": 320, "height": 720}):
        page.set_viewport_size(viewport)
        assert page.evaluate(
            "document.documentElement.scrollWidth <= window.innerWidth"
        )
    assert_clean_runtime(page, errors)


def exercise_development_labs(page: Page, base_url: str) -> None:
    errors: list[str] = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on(
        "console",
        lambda message: (errors.append(message.text) if message.type == "error" else None),
    )

    cases = (
        ("matrix.html", "Euler’s Identity — Matrix Rotation Laboratory", "https://eulers.id/matrix.html"),
        ("phase.html", "Euler’s Identity — Relative Phase Laboratory", "https://eulers.id/phase.html"),
    )
    for path, title, canonical in cases:
        response = page.goto(base_url + path, wait_until="networkidle")
        assert response is not None and response.ok
        assert page.title() == title
        assert page.locator('link[rel="canonical"]').get_attribute("href") == canonical
        assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")

    assert not errors, "Development-lab runtime errors: " + " | ".join(errors)


def exercise_reduced_motion(browser: Browser, url: str) -> None:
    context = browser.new_context(
        reduced_motion="reduce", viewport={"width": 390, "height": 844}
    )
    try:
        page = context.new_page()
        page.goto(url, wait_until="networkidle")
        play_button = page.locator("#play-button")
        assert play_button.inner_text() == "Step ¼ turn"
        assert play_button.get_attribute("aria-pressed") is None
        before = page.locator("#angle-value").inner_text()
        play_button.click()
        after = page.locator("#angle-value").inner_text()
        assert before != after
        assert "Reduced-motion mode" in page.locator("#explanation-text").inner_text()
    finally:
        context.close()


def exercise_no_javascript(browser: Browser, url: str) -> None:
    context = browser.new_context(
        java_script_enabled=False, viewport={"width": 390, "height": 844}
    )
    try:
        page = context.new_page()
        response = page.goto(url, wait_until="networkidle")
        assert response is not None and response.ok
        fallback = page.locator(".noscript-note")
        assert fallback.is_visible()
        assert "requires JavaScript" in fallback.inner_text()
        assert page.locator("#angle-slider").is_disabled()
        assert page.locator("#play-button").is_disabled()
        assert page.locator("#reset-button").is_disabled()
        assert page.locator("#explain-button").is_disabled()
        assert page.evaluate(
            "document.documentElement.scrollWidth <= window.innerWidth"
        )
    finally:
        context.close()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--browser",
        choices=("chromium", "firefox", "webkit"),
        default="chromium",
    )
    args = parser.parse_args()

    with local_site() as url, sync_playwright() as playwright:
        browser_type = getattr(playwright, args.browser)
        launch_kwargs: dict[str, object] = {"headless": True}
        executable = os.environ.get("PLAYWRIGHT_BROWSER_EXECUTABLE")
        if executable and args.browser == "chromium":
            launch_kwargs["executable_path"] = executable
        browser = browser_type.launch(**launch_kwargs)
        try:
            context = browser.new_context(viewport={"width": 1280, "height": 900})
            try:
                page = context.new_page()
                exercise_page(page, url)
                exercise_development_labs(page, url)
            finally:
                context.close()
            exercise_reduced_motion(browser, url)
            exercise_no_javascript(browser, url)
        finally:
            browser.close()

    print(f"browser_experience: PASS ({args.browser})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
