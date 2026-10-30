"""Guardrails for a neutral, subject-focused public repository."""

from __future__ import annotations

import re
from pathlib import Path

try:
    import tomllib
except ModuleNotFoundError:
    import tomli as tomllib

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_SITE_URL = "https://eulers.id/"
SOCIAL_IMAGE_URL = "https://eulers.id/social-preview.png"
SEARCHABLE_SUFFIXES = {
    ".cff",
    ".html",
    ".md",
    ".toml",
    ".yml",
    ".yaml",
}
PAGES_URL_PATTERN = re.compile(
    r'https://[^\s"\')>]+\.github\.io(?:/[^\s"\')>]*)?'
)

ALLOWED_README_HEADINGS = {
    "# Euler’s Identity",
    "## What is Euler’s identity?",
    "## Experience it",
    "## Learn progressively",
    "## Run the code",
    "### Minimal demonstration",
    "### Install the project for development",
    "## Evidence boundaries",
    "## Project status",
    "### Known limitations",
    "## Contributing",
    "## Citation",
    "## Licensing",
}


def read(path: str) -> str:
    """Read a UTF-8 repository file."""
    return (ROOT / path).read_text(encoding="utf-8")


def citation_url() -> str:
    """Read the public URL from the simple CFF metadata."""
    for line in read("CITATION.cff").splitlines():
        if line.startswith("url: "):
            return line.removeprefix("url: ").strip().strip('"')
    raise AssertionError("CITATION.cff must define url")


def homepage_url() -> str:
    """Read the project homepage from pyproject.toml."""
    with (ROOT / "pyproject.toml").open("rb") as handle:
        metadata = tomllib.load(handle)
    return metadata["project"]["urls"]["Homepage"]


def github_pages_urls() -> dict[Path, set[str]]:
    """Collect stale absolute GitHub Pages URLs from public text files."""
    found: dict[Path, set[str]] = {}
    this_file = Path(__file__).resolve()

    for path in ROOT.rglob("*"):
        if (
            not path.is_file()
            or path.resolve() == this_file
            or path.suffix not in SEARCHABLE_SUFFIXES
        ):
            continue

        matches = set(PAGES_URL_PATTERN.findall(path.read_text(encoding="utf-8")))
        if matches:
            found[path.relative_to(ROOT)] = matches

    return found


def test_readme_uses_only_approved_public_sections() -> None:
    """The public gateway must remain focused on the learning experience."""
    headings = {line for line in read("README.md").splitlines() if line.startswith("#")}
    assert headings == ALLOWED_README_HEADINGS


def test_acknowledgments_match_the_neutral_public_copy() -> None:
    """Acknowledgments recognize mathematical work collectively."""
    expected = """# Acknowledgments

This project benefits from generations of mathematical work connecting the
exponential function, trigonometry, complex numbers, geometry, waves, and
linear systems.

Acknowledgment does not imply endorsement of every interpretation or software
decision in this repository.
"""
    assert read("ACKNOWLEDGMENTS.md") == expected


def test_package_metadata_has_no_individual_author() -> None:
    """Package metadata should not publish an individual author identity."""
    assert "authors =" not in read("pyproject.toml")


def test_attribution_is_project_level() -> None:
    """Public attribution should identify contributors collectively."""
    assert "Euler's Identity Project contributors" in read("LICENSE")
    assert "Euler’s Identity Project contributors" in read("LICENSE-CONTENT.md")
    assert 'name: "Euler\'s Identity Project contributors"' in read("CITATION.cff")


def test_conduct_policy_uses_neutral_reporting_routes() -> None:
    """Conduct reporting must use project-level or platform routes."""
    policy = read("CODE_OF_CONDUCT.md")
    assert "Report abuse" in policy
    assert "project-level" in policy


def test_public_urls_use_verified_canonical_domain() -> None:
    """Project metadata must use the verified eulers.id canonical domain."""
    assert homepage_url() == PUBLIC_SITE_URL
    assert citation_url() == PUBLIC_SITE_URL
    assert github_pages_urls() == {}

    readme = read("README.md")
    html = read("experience/index.html")

    assert f"[Open the interactive experience]({PUBLIC_SITE_URL})" in readme
    assert f'<link rel="canonical" href="{PUBLIC_SITE_URL}">' in html
    assert f'content="{PUBLIC_SITE_URL}"' in html
    assert f'content="{SOCIAL_IMAGE_URL}"' in html
    assert '<meta name="referrer" content="no-referrer">' in html
    assert "connect-src 'none'" in html
    assert '<meta name="twitter:card" content="summary_large_image">' in html
