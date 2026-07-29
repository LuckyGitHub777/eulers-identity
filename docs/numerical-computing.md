# Numerical Computing

The mathematical identity is exact:

$$
e^{i\pi}+1=0.
$$

A computer may print a value such as:

```text
1.2246467991473532e-16j
```

That number is extremely close to zero, but it is not stored as exact zero.

## Why the residual appears

Computers represent ordinary floating-point numbers with a finite number of
binary digits. Neither $\pi$ nor the transcendental evaluation of the
exponential can generally be represented exactly in that finite format.

The computation therefore evaluates approximations to $\pi$, sine, cosine,
and the exponential. The accumulated rounding appears as a tiny residual.

## Why formatting is not proof

Formatting to twelve decimal places may display:

```text
0.000000000000+0.000000000000j
```

The formatter has rounded the output for display. It has not changed the
internal value.

## Comparing with zero

Near zero, use an explicit absolute tolerance:

```python
cmath.isclose(
    result,
    0j,
    rel_tol=0.0,
    abs_tol=1e-12,
)
```

A relative tolerance is not useful when the reference value is exactly zero.

## Exact and numerical roles

- The derivation proves the identity.
- The computation illustrates the identity.
- The tolerance explains whether the numerical residual is consistent with the
  expected exact result.
