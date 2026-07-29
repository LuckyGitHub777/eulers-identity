"""Power-series approximations for the complex exponential."""

from __future__ import annotations


def exponential_series(z: complex, terms: int = 40) -> complex:
    """Approximate e**z with the first ``terms`` exponential-series terms.

    The recurrence ``term *= z / n`` avoids recomputing powers and factorials.

    Args:
        z: A real or complex input.
        terms: Number of terms to include. Must be a positive integer.

    Raises:
        TypeError: If ``terms`` is not an integer.
        ValueError: If ``terms`` is less than one.
    """
    if isinstance(terms, bool) or not isinstance(terms, int):
        raise TypeError("terms must be an integer")
    if terms < 1:
        raise ValueError("terms must be at least 1")

    value = complex(z)
    total = 0j
    term = 1 + 0j

    for n in range(terms):
        if n > 0:
            term *= value / n
        total += term

    return total
