import cmath
import math

from eulers_identity import rotate_vector, rotation_matrix, unit_circle_point


def test_unit_circle_preserves_magnitude() -> None:
    for angle in (0.0, 0.25, 1.0, math.pi, 2 * math.pi):
        assert math.isclose(
            abs(unit_circle_point(angle)),
            1.0,
            rel_tol=0.0,
            abs_tol=1e-12,
        )


def test_rotation_matrix_at_pi_maps_vector_to_negative() -> None:
    x, y = rotate_vector((3.0, -2.0), math.pi)
    assert math.isclose(x, -3.0, rel_tol=0.0, abs_tol=1e-12)
    assert math.isclose(y, 2.0, rel_tol=0.0, abs_tol=1e-12)


def test_matrix_and_complex_rotation_agree() -> None:
    theta = 0.73
    matrix = rotation_matrix(theta)
    point = unit_circle_point(theta)

    assert math.isclose(matrix[0][0], point.real, abs_tol=1e-12)
    assert math.isclose(matrix[1][0], point.imag, abs_tol=1e-12)
    assert cmath.isclose(point, complex(math.cos(theta), math.sin(theta)))
