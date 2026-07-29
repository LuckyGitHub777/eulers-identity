# The Complex Plane

A complex number has the form:

$$
z=x+iy,
$$

where $x$ is the real coordinate and $y$ is the imaginary coordinate.

## Axes

- The horizontal axis is the real axis.
- The vertical axis is the imaginary axis.
- The number $1$ is the point $(1,0)$.
- The number $i$ is the point $(0,1)$.
- The number $-1$ is the point $(-1,0)$.
- The number $-i$ is the point $(0,-1)$.

## Multiplication by \(i\)

For $z=x+iy$:

$$
iz=i(x+iy)=-y+ix.
$$

The coordinate mapping is:

$$
(x,y)\mapsto(-y,x).
$$

That is a counterclockwise quarter-turn. The careful statement is:

> Multiplication by $i$ rotates a complex number counterclockwise by
> $\pi/2$ radians.

The number $i$ is a point. Multiplying by $i$ is the rotation operation.

## The unit circle

Euler’s formula gives:

$$
e^{i\theta}=\cos\theta+i\sin\theta.
$$

Its magnitude is:

$$
\left|e^{i\theta}\right|
=
\sqrt{\cos^2\theta+\sin^2\theta}
=
1.
$$

The magnitude remains fixed while the angle changes, so the point traces the
unit circle.

## Matrix form

Define the rotation generator:

$$
J=
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}.
$$

Then:

$$
e^{\theta J}
=
\begin{pmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{pmatrix}.
$$

At $\theta=\pi$:

$$
e^{\pi J}=-I.
$$

Every vector is mapped to its negative. A full matrix derivation is scheduled
for version 0.2.0.
