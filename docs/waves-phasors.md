# Waves and Phasors

This module connects complex rotation with sinusoidal signals and relative phase.

> **Release status:** Implemented for review on the `0.3.0` development path.
> It is not part of the released `0.1.0` foundation.

## A rotating complex amplitude

A complex sinusoid may be written as

$$
z(t)=A e^{i(\omega t+\phi)},
$$

where:

- $A\ge 0$ is the amplitude,
- $\omega$ is angular frequency in radians per unit time,
- $\phi$ is the phase offset.

Euler's formula gives

$$
A e^{i(\omega t+\phi)}
=
A\cos(\omega t+\phi)
+
iA\sin(\omega t+\phi).
$$

The real sinusoid is the real part:

$$
A\cos(\omega t+\phi)
=
\operatorname{Re}\left\{
A e^{i(\omega t+\phi)}
\right\}.
$$

The complex exponential packages cosine and sine into one rotating quantity.

## What phase means

Two sinusoids with the same angular frequency may differ by a phase offset.

Let

$$
z_1(t)=A e^{i\omega t}
$$

and

$$
z_2(t)=A e^{i(\omega t+\Delta\phi)}.
$$

Their relative phase is $\Delta\phi$.

A relative phase of zero means the two rotating amplitudes point in the same
direction at every instant. A relative phase of $\pi$ means they point in
opposite directions.

## Equal-amplitude cancellation

For equal amplitudes:

$$
A + A e^{i\pi}
=
A-A
=
0.
$$

This is exact cancellation of two equal complex amplitudes separated by a
relative phase of $\pi$.

The condition matters. Opposite phase alone does not imply cancellation if the
magnitudes differ:

$$
A + B e^{i\pi}=A-B.
$$

The result is zero only when $A=B$.

## Phasor notation

In steady-state engineering analysis, a sinusoid at a known common frequency is
often represented by a phasor. The common time factor may be suppressed so that
attention stays on magnitude and phase.

For example,

$$
A e^{i(\omega t+\phi)}
=
\left(Ae^{i\phi}\right)e^{i\omega t}.
$$

The phasor is

$$
\tilde{A}=Ae^{i\phi}.
$$

Conventions differ across fields. Some use $e^{+i\omega t}$ and others use
$e^{-i\omega t}$. A correct derivation must use one convention consistently.

## Why this connects to Euler's identity

Euler's identity is the special half-turn relation

$$
e^{i\pi}=-1.
$$

The same complex exponential used to describe a half-turn also describes phase
in periodic systems. The connection is mathematical: angle on the complex
plane becomes phase in oscillatory representations.

The [phase laboratory](https://eulers.id/phase.html) shows two equal phasors and
their vector sum as the relative phase changes.

## Evidence boundary

Complex exponentials and phasors are standard mathematical and engineering
tools. Their use does not imply that every physical, psychological, or spiritual
phenomenon is governed by a phasor model.

Continue with [Fourier foundations](fourier.md).
