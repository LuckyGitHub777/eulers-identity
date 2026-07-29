"""Tools for exploring and verifying Euler's identity."""

from .identity import euler_formula, eulers_identity
from .numerical import DEFAULT_TOLERANCE, is_effectively_zero
from .rotation import rotate_vector, rotation_matrix, unit_circle_point
from .series import exponential_series

__all__ = [
    "DEFAULT_TOLERANCE",
    "euler_formula",
    "eulers_identity",
    "exponential_series",
    "is_effectively_zero",
    "rotate_vector",
    "rotation_matrix",
    "unit_circle_point",
]

__version__ = "0.1.0"
