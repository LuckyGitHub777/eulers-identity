"""Print a transparent numerical verification of Euler's identity."""

from eulers_identity import eulers_identity, is_effectively_zero


def main() -> None:
    result = eulers_identity()

    print("Euler's identity: e^(iπ) + 1 = 0")
    print(f"Computed result: {result.real:.15f}{result.imag:+.15f}j")
    print(f"Residual magnitude: {abs(result):.3e}")
    print(f"Verified within tolerance: {is_effectively_zero(result)}")


if __name__ == "__main__":
    main()
