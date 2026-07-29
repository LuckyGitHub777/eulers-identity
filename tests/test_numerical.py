import pytest

from eulers_identity import is_effectively_zero


def test_zero_and_small_residual_are_effectively_zero() -> None:
    assert is_effectively_zero(0j)
    assert is_effectively_zero(1e-16j)


def test_larger_value_is_not_effectively_zero() -> None:
    assert not is_effectively_zero(1e-6 + 0j)


@pytest.mark.parametrize("tolerance", [0.0, -1e-12])
def test_tolerance_must_be_positive(tolerance: float) -> None:
    with pytest.raises(ValueError):
        is_effectively_zero(0j, tolerance)
