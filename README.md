# Euler’s Identity

$$
e^{i\pi}+1=0
$$

**See how complex rotation reveals one of mathematics’ most elegant identities.**

[Open the interactive experience](https://eulers.id/) ·
[Read the proof](docs/proof.md) ·
[Run the code](#run-the-code) ·
[Review the claims register](CLAIMS.md)

## What is Euler’s identity?

Euler’s identity brings five celebrated mathematical constants into one exact relationship:

- $e$, the base of the natural exponential
- $i$, the imaginary unit, where $i^2=-1$
- $\pi$, the half-turn angle in radians
- $1$, the multiplicative identity
- $0$, the additive identity

It follows from Euler’s formula:

$$
e^{i\theta}=\cos\theta+i\sin\theta.
$$

Set $\theta=\pi$:

$$
e^{i\pi}=\cos\pi+i\sin\pi=-1,
$$

and therefore:

$$
e^{i\pi}+1=0.
$$

Geometrically, begin at $1$ on the complex plane. Multiplication by
$e^{i\theta}$ rotates through an angle $\theta$. A half-turn, $\theta=\pi$,
takes $1$ to $-1$. Adding $1$ then produces $0$.

## Experience it

The interactive unit circle lets you:

- move $\theta$ from $0$ to $2\pi$
- watch $e^{i\theta}$ rotate around the unit circle
- inspect the real and imaginary coordinates
- jump to the five cardinal angles
- follow the sequence $1\rightarrow-1\rightarrow-1+1=0$
- use the experience with a keyboard, reduced motion, or a small screen

The complete browser source is in [`experience/`](experience/).

The [`0.2.0` matrix-rotation laboratory](https://eulers.id/matrix.html) and
[`0.3.0` relative-phase laboratory](https://eulers.id/phase.html) are implemented
for development review. They are not part of the released `0.1.0` foundation.

The experience uses only static HTML, CSS, JavaScript, and SVG. It has no
backend, accounts, analytics, advertising, or data collection.

Run it locally from the repository root:

```bash
python -m http.server 8000 --directory experience
```

Then open `http://localhost:8000`.

## Learn progressively

| Start here | Purpose |
|---|---|
| [The proof](docs/proof.md) | Derive the identity directly from Euler’s formula |
| [The complex plane](docs/complex-plane.md) | Understand rotation, coordinates, magnitude, and phase |
| [The power-series derivation](docs/power-series.md) | See why the exponential contains sine and cosine |
| [Differential equations](docs/differential-equations.md) | Derive why `f'(θ)=if(θ)` produces unit-circle motion (`0.2.0` development) |
| [Matrix rotation](docs/matrix-rotation.md) | Derive the matrix exponential for planar rotation (`0.2.0` development) |
| [Waves and phasors](docs/waves-phasors.md) | Connect complex rotation to amplitude and relative phase (`0.3.0` development) |
| [Fourier foundations](docs/fourier.md) | See complex exponentials as Fourier building blocks (`0.4.0` development) |
| [Quantum phase](docs/quantum-phase.md) | Distinguish global phase, relative phase, and interference (`0.4.0` development) |
| [Numerical computing](docs/numerical-computing.md) | Explain Python’s tiny floating-point residual |
| [Interpretation](docs/interpretation.md) | Explore meaning without confusing interpretation with proof |
| [Mastery ledger](docs/mastery-ledger.md) | Track what is complete and what remains |

## Run the code

### Minimal demonstration

Run the compact Python example:

```bash
python eulers-id.py
```

### Install the project for development

macOS or Linux:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -e ".[dev]"
python -m pytest
python examples/minimal.py
```

Windows PowerShell:

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -e ".[dev]"
python -m pytest
python examples\minimal.py
```

Expected output includes a residual near machine precision:

```text
Euler's identity: e^(i*pi) + 1 = 0
Computed result: 0.000000000000000+0.000000000000000j
Residual magnitude: approximately 1.225e-16
Verified within tolerance: True
```

The exact mathematical result is zero. The tiny computed residual comes from
finite floating-point representation, not a failure of the identity. See
[Numerical computing](docs/numerical-computing.md).

## Evidence boundaries

This project deliberately separates different kinds of statements.

| Classification | Meaning |
|---|---|
| **Proven mathematics** | Established through definition or proof |
| **Standard application** | Recognized use in mathematics, science, or engineering |
| **Philosophical interpretation** | A proposed meaning for contemplation |
| **Spiritual contemplation** | An individual or tradition-sensitive symbolic reading |
| **Speculative** | Requires independent theoretical or empirical support |
| **Excluded** | A claim this project does not make |

The governing record is [CLAIMS.md](CLAIMS.md).

This project does **not** claim that Euler’s identity proves God, proves that
consciousness is a physical field, or establishes a new theory of gravity.

## Project status

The `0.1.0` foundation release includes:

- direct derivation
- complex-plane explanation
- power-series derivation
- tested Python implementation
- numerical-tolerance explanation
- accessible interactive unit circle
- claims register and source boundaries

Differential-equation and matrix derivations plus the matrix-rotation laboratory
are implemented on the `0.2.0` development path. Waves/phasors and the relative-
phase laboratory are implemented on the `0.3.0` path. Fourier and quantum-phase
foundations are implemented on the `0.4.0` path. Independent technical review
remains required before those development versions may be released.

### Known limitations

- Differential-equation, matrix, phasor, Fourier, and quantum modules are development material and are not part of the released `0.1.0` foundation.
- Learner observation is a declared `0.1.x` validation activity and a required gate for `1.0.0`; it is not a blocker for the technical `0.1.0` foundation release.
- Automated and browser-based accessibility checks are complete. Manual screen-reader testing with NVDA, JAWS, VoiceOver, or Narrator and validation on physical mobile devices remain pending.
- Continuous Play animation suppresses live-region updates and announces one settled status when paused; broader manual assistive-technology validation remains part of the `0.1.x` cycle.

## Contributing

Mathematical corrections, accessibility improvements, documentation fixes, and
small software contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md)
before opening an issue or pull request.

## Citation

Citation metadata is provided in [CITATION.cff](CITATION.cff) and is available
through GitHub’s **Cite this repository** control.

## Licensing

- Source code is licensed under the [MIT License](LICENSE).
- Prose, diagrams, and educational content are licensed under
  [CC BY 4.0](LICENSE-CONTENT.md).

See each license file for scope and attribution terms.
