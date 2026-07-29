"""Direct evaluation of Euler's formula and Euler's identity."""

from __future__ import annotations

import cmath
import math


def euler_formula(theta: float) -> complex:
    """Return e^(i*theta) for a real angle measured in radians."""
    return cmath.exp(1j * float(theta))


def eulers_identity() -> complex:
    """Return the floating-point evaluation of e^(i*pi) + 1."""
    return euler_formula(math.pi) + 1
