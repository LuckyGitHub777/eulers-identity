# Matrix Rotation

This module derives planar rotation from a matrix exponential and connects it
directly to multiplication by complex numbers.

> **Release status:** Implemented for review on the `0.2.0` development path.
> It is not part of the released `0.1.0` foundation.

## The rotation generator

Define

$$
J=
\begin{pmatrix}
0 & -1\\
1 & 0
\end{pmatrix}.
$$

Multiplying $J$ by a vector gives

$$
J
\begin{pmatrix}
x\\
y
\end{pmatrix}
=
\begin{pmatrix}
-y\\
x
\end{pmatrix}.
$$

This is the same coordinate transformation produced by multiplication by $i$:

$$
i(x+i y)=-y+i x.
$$

So $J$ is the real two-dimensional matrix representation of multiplication by
$i$.

## The crucial identity

Multiply $J$ by itself:

$$
J^2
=
\begin{pmatrix}
0 & -1\\
1 & 0
\end{pmatrix}^2
=
-I.
$$

The powers of $J$ therefore repeat in the same four-step pattern as the powers
of $i$:

$$
I,\ J,\ -I,\ -J,\ I,\ldots
$$

## Exponentiating the generator

Define the matrix exponential by its power series:

$$
e^{\theta J}
=
\sum_{n=0}^{\infty}\frac{(\theta J)^n}{n!}.
$$

Separate the even and odd powers:

$$
e^{\theta J}
=
I\left(
1-\frac{\theta^2}{2!}+\frac{\theta^4}{4!}-\cdots
\right)
+
J\left(
\theta-\frac{\theta^3}{3!}+\frac{\theta^5}{5!}-\cdots
\right).
$$

Recognize the cosine and sine series:

$$
e^{\theta J}
=
I\cos\theta+J\sin\theta.
$$

Substituting $I$ and $J$ gives

$$
\boxed{
e^{\theta J}
=
\begin{pmatrix}
\cos\theta & -\sin\theta\\
\sin\theta & \cos\theta
\end{pmatrix}
}.
$$

This is the standard counterclockwise rotation matrix.

## The half-turn

Set $\theta=\pi$:

$$
e^{\pi J}
=
I\cos\pi+J\sin\pi
=
-I.
$$

Therefore every vector is mapped to its negative:

$$
\begin{pmatrix}
x\\
y
\end{pmatrix}
\longmapsto
\begin{pmatrix}
-x\\
-y
\end{pmatrix}.
$$

This is the matrix form of the same half-turn expressed by

$$
e^{i\pi}=-1.
$$

## Complex and matrix descriptions agree

| Complex description | Matrix description |
|---|---|
| $i$ | $J$ |
| $i^2=-1$ | $J^2=-I$ |
| $e^{i\theta}$ | $e^{\theta J}$ |
| multiplication by $e^{i\theta}$ | multiplication by the rotation matrix |
| $e^{i\pi}=-1$ | $e^{\pi J}=-I$ |

The repository's `rotation_matrix()` and `rotate_vector()` helpers implement
the trigonometric rotation matrix directly. The derivation above explains why
that matrix is also a matrix exponential.

## Interactive laboratory

The [matrix-rotation laboratory](https://eulers.id/matrix.html) lets a learner
choose a vector and angle, inspect the rotation matrix, and compare the input and
rotated vectors.

The laboratory is implemented on the `0.2.0` development path and is not a
separate claim of physical or metaphysical significance.

## What this view establishes

The matrix formulation shows that complex rotation and ordinary planar linear
algebra are two representations of the same transformation.

It does not make every matrix exponential a rotation. The special structure
comes from the generator $J$, which satisfies $J^2=-I$.
