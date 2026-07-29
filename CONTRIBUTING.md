# Contributing

Thank you for helping improve Euler's Identity.

## Good contributions

- Correct a mathematical error
- Improve an explanation for beginners
- Improve keyboard, screen-reader, contrast, or mobile accessibility
- Add a focused test
- Simplify code without changing behavior
- Repair an internal link or reference
- Clarify the distinction between proof, application, and interpretation

## Before opening a pull request

1. Open or reference an issue for nontrivial changes.
2. Keep the change focused.
3. Do not mix philosophical interpretation into mathematical proof sections.
4. Add or update tests when behavior changes.
5. Keep public documentation focused on the subject; do not add biographical or institution-specific material.
6. Run:

```bash
python -m pip install -e ".[dev]"
python -m pytest
python -m ruff check .
python -m ruff format --check .
python examples/minimal.py
node --check experience/app.js
node --check experience/modules/unit-circle.js
```

## Mathematical corrections

A correction should identify:

- the exact statement being corrected
- why it is incorrect or unclear
- the proposed replacement
- a reliable source or derivation

## Content licensing

By contributing code, you agree that it may be distributed under the MIT
License. By contributing prose or diagrams, you agree that it may be
distributed under CC BY 4.0.

## Conduct and security

Follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Do not disclose suspected
security vulnerabilities in a public issue; follow [SECURITY.md](SECURITY.md).
