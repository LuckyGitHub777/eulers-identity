# Power-Series Derivation

The complex exponential is defined by an absolutely convergent series:

$$
e^z=\sum_{n=0}^{\infty}\frac{z^n}{n!}.
$$

Set $z=i\theta$:

$$
e^{i\theta}
=
1+i\theta+\frac{(i\theta)^2}{2!}
+\frac{(i\theta)^3}{3!}
+\cdots.
$$

Using:

$$
i^0=1,\quad i^1=i,\quad i^2=-1,\quad i^3=-i,\quad i^4=1,
$$

the series becomes:

$$
e^{i\theta}
=
1+i\theta-\frac{\theta^2}{2!}
-i\frac{\theta^3}{3!}
+\frac{\theta^4}{4!}
+\cdots.
$$

Group the even and odd powers:

$$
e^{i\theta}
=
\left(
1-\frac{\theta^2}{2!}+\frac{\theta^4}{4!}-\cdots
\right)
+
i\left(
\theta-\frac{\theta^3}{3!}+\frac{\theta^5}{5!}-\cdots
\right).
$$

The first parenthesis is the Maclaurin series for $\cos\theta$. The second is
the Maclaurin series for $\sin\theta$. Therefore:

$$
e^{i\theta}=\cos\theta+i\sin\theta.
$$

Set $\theta=\pi$ to obtain Euler’s identity.

## Why regrouping is valid

The exponential series converges absolutely:

$$
\sum_{n=0}^{\infty}
\left|
\frac{(i\theta)^n}{n!}
\right|
=
\sum_{n=0}^{\infty}
\frac{|\theta|^n}{n!}
=
e^{|\theta|}
<\infty.
$$

Absolute convergence permits the even and odd terms to be regrouped without
changing the value of the series.

## Computational experiment

Run:

```bash
python examples/series_convergence.py
```

The approximations are numerical. The derivation above is mathematical.

The finite helper is tested on the intended $i\pi$ demonstration and on
representative moderate complex inputs. Numerical accuracy for arbitrary inputs
depends on the input magnitude, number of retained terms, and floating-point
behavior; the finite helper is not an error-bound certificate for all complex
values.
