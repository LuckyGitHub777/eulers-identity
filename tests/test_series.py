import cmath
import math

import pytest

from eulers_identity import exponential_series


def test_series_approaches_complex_exponential_at_i_pi() -> None:
    target = cmath.exp(1j * math.pi)
    errors = [
        abs(exponential_series(1j * math.pi, terms) - target)
        for terms in (4, 8, 12, 28)
    ]

    assert errors == sorted(errors, reverse=True)
    assert errors[-1] < 1e-12


def test_series_is_the_requested_maclaurin_partial_sum() -> None:
    z = 1 + 2j
    expected = 1 + z + (z**2) / 2
    assert exponential_series(z, 3) == expected


def test_more_terms_are_needed_for_larger_magnitude_inputs() -> None:
    z = 10j
    target = cmath.exp(z)
    short_error = abs(exponential_series(z, 20) - target)
    long_error = abs(exponential_series(z, 80) - target)

    assert long_error < short_error
    assert long_error < 1e-12


@pytest.mark.parametrize(
    "value",
    [0j, 1 + 0j, -1 + 0j, 1 + 1j, -0.5 + 0.75j],
)
def test_series_matches_cmath_for_moderate_inputs(value: complex) -> None:
    assert exponential_series(value, 60) == pytest.approx(
        cmath.exp(value),
        abs=1e-12,
    )


@pytest.mark.parametrize("terms", [0, -1, -10])
def test_series_rejects_nonpositive_term_counts(terms: int) -> None:
    with pytest.raises(ValueError):
        exponential_series(1j, terms)


@pytest.mark.parametrize("terms", [1.5, "10", True])
def test_series_rejects_noninteger_term_counts(terms: object) -> None:
    with pytest.raises(TypeError):
        exponential_series(1j, terms)  # type: ignore[arg-type]
