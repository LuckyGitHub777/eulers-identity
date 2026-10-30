# Validation and UAT Boundary

This document separates what the repository can verify automatically from what
still requires human observation or physical-device testing.

## Automated evidence

The current `main` validation baseline is designed to verify:

- the standard mathematical identity and numerical tolerance behavior
- complex-plane and rotation helpers
- the finite Maclaurin-series implementation and its documented scope
- exact special-angle labeling versus approximate slider values
- JavaScript source contracts for accessibility state handling
- Chromium, Firefox, and WebKit interaction smoke paths
- representative narrow-viewport layout behavior
- reduced-motion behavior without continuous animation
- Play/Pause/Reset and three-step explanation state transitions
- the canonical `https://eulers.id/` production metadata and core assets after deploy
- the static application no-telemetry boundary through same-origin CSP/source guardrails

A green automated run means those encoded checks passed for the tested revision
and environments. It does not establish universal accessibility, universal
browser compatibility, or learner comprehension.

## Human UAT still required

The following remain open until documented human evidence exists:

1. Observe at least one learner unfamiliar with complex numbers.
2. Observe at least one learner comfortable with algebra and trigonometry.
3. Obtain feedback from at least one technically trained reviewer.
4. Complete manual screen-reader review with representative combinations such as
   NVDA/Firefox or NVDA/Chrome, VoiceOver/Safari, and Narrator/Edge where available.
5. Complete physical iOS/Safari and Android/Chrome review, including portrait,
   landscape, touch interaction, text scaling, and zoom behavior.
6. Obtain an independent mathematical review before the complete `1.0.0` mastery gate.

## Acceptance principles

A UAT result should be recorded as evidence, not converted into a stronger claim
than the observation supports.

- **PASS** means the stated acceptance criterion was directly exercised and met.
- **PASS WITH LIMITATION** means the exercised criterion passed but an identified
  environment, population, or condition remains outside the evidence.
- **FAIL** means an acceptance criterion was directly exercised and not met.
- **OPEN** means the criterion has not yet been exercised with sufficient evidence.

## Current release posture

The stable public release remains `v0.1.0`. Current `main` is ahead of that tag:
it contains unreleased corrective `0.1.1` hardening plus the separately unreleased
`0.2.0`–`0.4.0` development modules. Automated evidence on `main` does not
retroactively change the contents or claims of the `v0.1.0` release. Future tags
must be cut only after the relevant review gates for that release boundary are met.

Learner, assistive-technology, physical-device, and complete `1.0.0` UAT gates
remain open until those activities are actually performed.
