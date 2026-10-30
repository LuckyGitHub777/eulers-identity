"""Educational power-series approximations for the complex exponential."""

from __future__ import annotations


def exponential_series(z: complex, terms: int = 40) -> complex:
    """Return the first ``terms`` of the Maclaurin series for ``e**z``.

    The recurrence ``term *= z / n`` avoids recomputing powers and factorials.
    This function is intentionally transparent for learning and verification. Its
    numerical accuracy depends on both ``|z|`` and the number of retained terms;
    for large-magnitude inputs, a fixed truncation can be a poor approximation.
    Use :func:`cmath.exp` when a production-quality exponential evaluation is the
    goal rather than inspection of the series itself.

    Args:
        z: A real or complex input to the finite series.
        terms: Number of terms to retain. Must be a positive integer.

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
