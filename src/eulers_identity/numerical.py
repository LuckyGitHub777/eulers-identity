"""Numerical helpers for floating-point verification."""

from __future__ import annotations

import cmath

DEFAULT_TOLERANCE = 1e-12


def is_effectively_zero(
    value: complex,
    tolerance: float = DEFAULT_TOLERANCE,
) -> bool:
    """Return whether ``value`` is within an absolute tolerance of complex zero."""
    absolute_tolerance = float(tolerance)
    if absolute_tolerance <= 0:
        raise ValueError("tolerance must be greater than zero")

    return cmath.isclose(
        complex(value),
        0j,
        rel_tol=0.0,
        abs_tol=absolute_tolerance,
    )
