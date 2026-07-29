import cmath
import math

import pytest

from eulers_identity import exponential_series


def test_series_approaches_complex_exponential() -> None:
    target = cmath.exp(1j * math.pi)
    errors = [
        abs(exponential_series(1j * math.pi, terms) - target)
        for terms in (4, 8, 12, 28)
    ]

    assert errors == sorted(errors, reverse=True)
    assert errors[-1] < 1e-12


@pytest.mark.parametrize("terms", [0, -1, -10])
def test_series_rejects_nonpositive_term_counts(terms: int) -> None:
    with pytest.raises(ValueError):
        exponential_series(1j, terms)


@pytest.mark.parametrize("terms", [1.5, "10", True])
def test_series_rejects_noninteger_term_counts(terms: object) -> None:
    with pytest.raises(TypeError):
        exponential_series(1j, terms)  # type: ignore[arg-type]
