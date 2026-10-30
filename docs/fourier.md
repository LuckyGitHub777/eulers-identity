# Fourier Foundations

This module explains how Euler's formula supplies the complex-exponential basis
used in Fourier representations.

> **Release status:** Implemented for review on the `0.4.0` development path.
> It is not part of the released `0.1.0` foundation.

## Periodic signals and complex exponentials

Let $x(t)$ be periodic with period $T$, and define the fundamental angular
frequency

$$
\omega_0=\frac{2\pi}{T}.
$$

A common continuous-time Fourier-series convention writes

$$
x(t)
=
\sum_{k=-\infty}^{\infty}
c_k e^{ik\omega_0 t},
$$

with coefficients

$$
c_k
=
\frac{1}{T}
\int_{t_0}^{t_0+T}
x(t)e^{-ik\omega_0 t}\,dt.
$$

The integration interval may begin at any $t_0$ as long as it spans one full
period.

## Why the basis functions separate

The harmonically related complex exponentials are orthogonal over one period:

$$
\int_{t_0}^{t_0+T}
e^{ik\omega_0 t}
e^{-im\omega_0 t}\,dt
=
\begin{cases}
T, & k=m,\\
0, & k\ne m.
\end{cases}
$$

This orthogonality lets the coefficient integral isolate one harmonic at a time.

## Euler's formula is the bridge

Euler's formula

$$
e^{i\theta}=\cos\theta+i\sin\theta
$$

shows why complex exponentials can encode ordinary sinusoidal components.

For real signals, positive and negative frequency coefficients occur in
conjugate-related pairs, producing a real-valued sum.

## Fourier series versus Fourier transform

A Fourier series represents a periodic signal with discrete harmonic
frequencies.

A Fourier transform represents an aperiodic signal through a continuum of
frequencies, subject to the mathematical conditions and generalized
interpretations appropriate to the signal.

One common angular-frequency convention is

$$
X(\omega)
=
\int_{-\infty}^{\infty}
x(t)e^{-i\omega t}\,dt,
$$

with inverse

$$
x(t)
=
\frac{1}{2\pi}
\int_{-\infty}^{\infty}
X(\omega)e^{i\omega t}\,d\omega.
$$

Other sign and normalization conventions are also standard. The forward and
inverse definitions must be used consistently.

## What Fourier analysis adds

Euler's formula links one angle to one complex exponential.

Fourier analysis goes further: it uses families of complex exponentials as
building blocks for representing and analyzing signals.

This is why the same mathematics appears in:

- signal processing,
- communications,
- acoustics,
- control,
- wave analysis,
- many differential-equation methods.

The presence of a Fourier representation does not, by itself, establish a new
physical mechanism.

## Reference boundary

This module follows standard signals-and-systems conventions. The repository's
reference list points to MIT OpenCourseWare material on complex exponentials and
continuous-time Fourier series.

Continue with [Quantum phase](quantum-phase.md).
