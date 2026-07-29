import cmath
import math

from eulers_identity import euler_formula, eulers_identity, is_effectively_zero


def test_eulers_identity_is_effectively_zero() -> None:
    assert is_effectively_zero(eulers_identity())


def test_cardinal_unit_circle_values() -> None:
    expected = (
        (0.0, 1 + 0j),
        (math.pi / 2, 0 + 1j),
        (math.pi, -1 + 0j),
        (3 * math.pi / 2, 0 - 1j),
        (2 * math.pi, 1 + 0j),
    )

    for angle, target in expected:
        assert cmath.isclose(
            euler_formula(angle),
            target,
            rel_tol=0.0,
            abs_tol=1e-12,
        )
