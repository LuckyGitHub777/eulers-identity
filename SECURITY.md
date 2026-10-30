# Security Policy

## Supported versions

| Version | Supported |
|---|---|
| 0.1.x | Yes |
| Versions earlier than 0.1.0 | No |

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability.

Use the repository's **Security** tab and select **Report a vulnerability**.
Before publishing any public release, verify that GitHub private vulnerability
reporting is enabled and that this route works as intended.

If the control is unavailable, do not disclose the issue publicly. Wait until
private vulnerability reporting is restored or use another private
project-level channel explicitly listed by the repository.

Include:

- the affected file and version
- reproduction steps
- expected and observed behavior
- potential impact
- any proposed mitigation

## Security posture

The `0.1.x` line is a local Python package and a static browser experience. It
has no backend, login, advertising, project analytics, remote API, persistent
storage, or application telemetry or user-data collection code. Development
and browser-test tools are optional and
are not runtime dependencies of the public experience.

The browser experience uses a restrictive same-origin Content Security Policy,
a no-referrer policy, and source guards that fail if runtime collection paths
such as `fetch`, `XMLHttpRequest`, or `sendBeacon` are introduced without an
intentional review.
