# Differential-Equation View

This module explains why the complex exponential traces the unit circle through
a differential equation rather than through geometry alone.

> **Release status:** Implemented for review on the `0.2.0` development path.
> It is not part of the released `0.1.0` foundation.

## The governing equation

Let

$$
f(\theta)=e^{i\theta}.
$$

Differentiating gives

$$
f'(\theta)=i e^{i\theta}=i f(\theta),
$$

with the initial condition

$$
f(0)=1.
$$

The factor (i) is the key. Multiplying a complex number by (i) rotates it
counterclockwise by (\pi/2).

## Real and imaginary components

Write

$$
f(\theta)=x(\theta)+i y(\theta).
$$

Then

$$
f'(\theta)=x'(\theta)+i y'(\theta),
$$

while

$$
i f(\theta)=i(x+i y)=-y+i x.
$$

Matching real and imaginary parts gives the system

$$
x'=-y,
\qquad
y'=x.
$$

The velocity vector is therefore

$$
(x',y')=(-y,x).
$$

That vector is perpendicular to the position vector ((x,y)), because

$$
(x,y)\cdot(-y,x)=-xy+xy=0.
$$

The motion continually turns sideways rather than moving inward or outward.

## Why the radius stays fixed

Differentiate the squared radius:

$$
\frac{d}{d\theta}(x^2+y^2)
=
2xx'+2yy'.
$$

Substitute (x'=-y) and (y'=x):

$$
2x(-y)+2y(x)=0.
$$

So

$$
x^2+y^2
$$

is constant.

Because (f(0)=1), the initial point is ((1,0)), so the constant is (1):

$$
x^2+y^2=1.
$$

The trajectory stays on the unit circle.

## Recovering sine and cosine

Differentiate (x'=-y):

$$
x''=-y'=-x.
$$

Thus

$$
x''+x=0.
$$

The initial conditions are

$$
x(0)=1,
\qquad
x'(0)=0.
$$

The unique solution is

$$
x(\theta)=\cos\theta.
$$

Since (y'=x) and (y(0)=0),

$$
y(\theta)=\sin\theta.
$$

Therefore

$$
f(\theta)=\cos\theta+i\sin\theta.
$$

This recovers Euler's formula from the rotation dynamics:

$$
\boxed{e^{i\theta}=\cos\theta+i\sin\theta}.
$$

At (\theta=\pi),

$$
e^{i\pi}=-1,
$$

and therefore

$$
\boxed{e^{i\pi}+1=0}.
$$

## What this view establishes

The differential equation shows that the unit-circle motion is not merely a
visual analogy. The same function simultaneously satisfies:

- exponential differentiation,
- quarter-turn velocity,
- constant radius,
- sine-and-cosine coordinates.

It does not establish a physical or metaphysical theory beyond the mathematics.

Continue with [Matrix rotation](matrix-rotation.md) to express the same motion
as a matrix exponential.
