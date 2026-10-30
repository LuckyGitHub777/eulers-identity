# Quantum Phase

This module connects complex phase with standard quantum-mechanical time
evolution while keeping the physical and interpretive boundaries explicit.

> **Release status:** Implemented for review on the `0.4.0` development path.
> It is not part of the released `0.1.0` foundation.

## Time evolution

For a time-independent Hamiltonian $H$, the Schrödinger equation is

$$
i\hbar\frac{d}{dt}|\psi(t)\rangle
=
H|\psi(t)\rangle.
$$

Its time-evolution operator is

$$
U(t)=e^{-iHt/\hbar},
$$

so

$$
|\psi(t)\rangle
=
e^{-iHt/\hbar}|\psi(0)\rangle.
$$

When $H$ is Hermitian, this evolution is unitary.

## Energy eigenstates

If

$$
H|E\rangle=E|E\rangle,
$$

then

$$
|E(t)\rangle
=
e^{-iEt/\hbar}|E\rangle.
$$

The factor

$$
e^{-iEt/\hbar}
$$

has unit magnitude. It changes the phase of the state.

## Global phase

Multiplying an entire state by one common phase factor does not change ordinary
measurement probabilities:

$$
|\psi\rangle
\quad\text{and}\quad
e^{i\alpha}|\psi\rangle
$$

represent the same physical ray in standard quantum mechanics.

The phase factor is therefore called a global phase.

## Relative phase

Relative phase is different.

Consider

$$
|\psi\rangle
=
\frac{1}{\sqrt{2}}
\left(
|0\rangle+e^{i\phi}|1\rangle
\right).
$$

Changing $\phi$ changes the phase relationship between the two components. In
a measurement basis that recombines those amplitudes, the relative phase can
change interference and therefore observable probabilities.

At

$$
\phi=\pi,
$$

the state becomes

$$
|\psi\rangle
=
\frac{1}{\sqrt{2}}
\left(
|0\rangle-|1\rangle
\right).
$$

That relative minus sign is physically meaningful when amplitudes are later
combined in an appropriate basis.

## The precise connection to Euler's identity

Euler's identity gives

$$
e^{i\pi}=-1.
$$

For two equal complex amplitudes, a relative phase of $\pi$ gives

$$
A + A e^{i\pi}=0.
$$

This is the same complex-amplitude cancellation used in interference
calculations.

It would be an overclaim to say that Euler's identity by itself *is* quantum
interference. Quantum interference depends on quantum states, amplitudes,
measurement context, and the dynamics of the physical system.

## What this module does not claim

This module does not claim that:

- Euler's identity proves consciousness is quantum,
- quantum mechanics proves a spiritual interpretation,
- a global phase by itself changes measurement probabilities,
- the mathematical identity establishes a new physical theory.

The connection is rigorous when it is limited to complex phase, superposition,
and interference.

## Reference boundary

The repository's reference list points to MIT OpenCourseWare quantum notes for
the distinction between global and relative phase and for unitary time
evolution.
