"""Complex-plane and matrix representations of planar rotation."""

from __future__ import annotations

import cmath
import math

Matrix2x2 = tuple[tuple[float, float], tuple[float, float]]
Vector2 = tuple[float, float]


def unit_circle_point(theta: float) -> complex:
    """Return the point e^(i*theta) on the unit circle."""
    return cmath.exp(1j * float(theta))


def rotation_matrix(theta: float) -> Matrix2x2:
    """Return the counterclockwise two-dimensional rotation matrix."""
    angle = float(theta)
    cosine = math.cos(angle)
    sine = math.sin(angle)
    return ((cosine, -sine), (sine, cosine))


def rotate_vector(vector: Vector2, theta: float) -> Vector2:
    """Rotate a two-dimensional vector counterclockwise by ``theta`` radians."""
    if len(vector) != 2:
        raise ValueError("vector must contain exactly two coordinates")

    x, y = (float(vector[0]), float(vector[1]))
    matrix = rotation_matrix(theta)
    return (
        matrix[0][0] * x + matrix[0][1] * y,
        matrix[1][0] * x + matrix[1][1] * y,
    )
