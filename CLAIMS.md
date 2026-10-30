# Claims Register

This register controls the project's evidence boundaries.

## Classifications

- **Proven mathematics** — established through mathematical definition or proof
- **Standard application** — recognized use in mathematics, science, or engineering
- **Philosophical interpretation** — a proposed meaning for contemplation
- **Spiritual contemplation** — an individual or tradition-sensitive symbolic reading
- **Speculative** — requires independent theoretical or empirical support
- **Excluded** — a claim this project does not make

## Release coverage

Registration records a claim's evidence classification; it does not mean every
registered topic is implemented as a lesson in the current release. The
`0.1.0` foundation teaches the identity, complex-plane rotation, power-series
derivation, and numerical behavior. Matrix, phasor, interference, Fourier, and
quantum teaching modules may exist on later development paths, but they remain
governed by the [roadmap](ROADMAP.md) and are not released until their stated
review gates are completed.

## Registered claims

| ID | Claim | Classification | Basis or boundary |
|---|---|---|---|
| MATH-001 | $e^{i\pi}+1=0$ | Proven mathematics | Follows from Euler's formula at $\theta=\pi$ |
| MATH-002 | $e^{i\theta}=\cos\theta+i\sin\theta$ | Proven mathematics | Euler's formula |
| MATH-003 | $e^{i\theta}$ lies on the unit circle for real $\theta$ | Proven mathematics | Its magnitude is $\sqrt{\cos^2\theta+\sin^2\theta}=1$ |
| MATH-004 | Multiplication by $i$ rotates a complex number counterclockwise by $\pi/2$ | Proven mathematics | Coordinate mapping $(x,y)\mapsto(-y,x)$ |
| MATH-005 | $e^{\pi J}=-I$ for $J=\begin{pmatrix}0&-1\\\\1&0\end{pmatrix}$ | Proven mathematics | Matrix exponential and rotation identity |
| NUM-001 | Python may return a tiny nonzero residual for $e^{i\pi}+1$ | Standard application | Finite floating-point evaluation |
| NUM-002 | An absolute tolerance is appropriate when comparing this residual with zero | Standard application | Relative error is not meaningful near zero |
| APP-001 | Complex exponentials are used to represent phasors | Standard application | Electrical engineering and signal analysis |
| APP-002 | Relative phase affects interference | Standard application | Superposition of complex amplitudes |
| APP-003 | Equal-magnitude amplitudes separated by phase $\pi$ cancel when added | Standard application | $A+Ae^{i\pi}=A-A=0$ |
| APP-004 | Periodic signals may be represented by harmonically related complex exponentials through Fourier series | Standard application | Standard signals-and-systems formulation |
| APP-005 | Fourier-transform conventions use complex exponentials to represent frequency content | Standard application | Sign and normalization conventions vary but must remain internally consistent |
| APP-006 | A global quantum phase does not by itself change standard measurement probabilities | Standard application | States differing only by one common phase represent the same physical ray |
| APP-007 | Relative quantum phase can affect interference when amplitudes are recombined | Standard application | Depends on state, basis, dynamics, and measurement context |
| INT-001 | Euler's identity may symbolize unity, opposition, and return | Philosophical interpretation | Clearly labeled contemplative reading |
| CONT-001 | Euler's identity may inspire spiritual contemplation | Spiritual contemplation | Individual or tradition-sensitive interpretation |
| SPEC-001 | Euler's identity may inspire separately formulated hypotheses involving rotation or phase | Speculative | Any physical theory requires independent variables, dynamics, predictions, and evidence |
| EXC-004 | Euler's identity independently establishes a new theory of gravity | Excluded | Not established by the identity alone |
| EXC-001 | Euler's identity proves God | Excluded | Not established by the mathematics |
| EXC-002 | Euler's identity proves consciousness is a physical field | Excluded | Not established by the mathematics |
| EXC-003 | Quantum mechanics proves the project's spiritual interpretations | Excluded | Connection does not erase classification |

## Usage rule

Any public claim that extends beyond the registered foundation must be assigned
a classification and supported with an appropriate source or explicit boundary.
