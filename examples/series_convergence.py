"""Show convergence of the exponential series at z = i*pi."""

import cmath
import math

from eulers_identity import exponential_series


def main() -> None:
    target = cmath.exp(1j * math.pi)

    print("terms | approximation of e^(i*pi)            | absolute error")
    print("------|---------------------------------------|---------------")

    for terms in (1, 2, 4, 8, 12, 20, 28):
        approximation = exponential_series(1j * math.pi, terms)
        error = abs(approximation - target)
        print(
            f"{terms:>5} | "
            f"{approximation.real:+.12f}{approximation.imag:+.12f}j | "
            f"{error:.3e}"
        )


if __name__ == "__main__":
    main()
