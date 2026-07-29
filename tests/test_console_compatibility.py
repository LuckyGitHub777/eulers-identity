"""Cross-platform checks for console-facing examples."""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

CONSOLE_SCRIPTS = (
    "eulers-id.py",
    "examples/minimal.py",
    "examples/series_convergence.py",
)


def test_console_scripts_support_cp1252_output() -> None:
    """Console examples must run under the legacy Windows encoding."""
    environment = os.environ.copy()
    environment["PYTHONIOENCODING"] = "cp1252"
    environment["PYTHONUTF8"] = "0"

    for script in CONSOLE_SCRIPTS:
        subprocess.run(
            [sys.executable, str(ROOT / script)],
            cwd=ROOT,
            env=environment,
            check=True,
            capture_output=True,
            text=True,
        )
