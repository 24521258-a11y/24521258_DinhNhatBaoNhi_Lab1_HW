# TASK DECOMPOSITION - HOMEWORK

## Student Information

- Student ID: 24521258
- Name: Dinh Nhat Bao Nhi
- Course: Web Application Development
- Lab: Lab 1 Homework

---

# HW1 - Production Portfolio

## HW1-M1: WCAG 2.2 AA Audit

Requirements:
- Audit semantic landmarks.
- Verify color contrast.
- Verify accessible labels.
- Verify keyboard navigation.

Commit:
fix(a11y): contrast & landmarks


## HW1-M2: Keyboard Focus Audit

Requirements:
- Verify complete Tab navigation.
- Prevent keyboard traps.
- Ensure visible focus indicators.
- Verify Enter/Space interaction where appropriate.

Commit:
fix(nav): keyboard trap prevention


## HW1-M3: Content Security Policy

Requirements:
- Add strict Content Security Policy.
- Zero inline JavaScript handlers.
- No onclick attributes.
- JavaScript must remain in external files.

Commit:
security: enforce CSP and remove inline handlers


## HW1-M4: Performance Audit

Requirements:
- Run Lighthouse.
- Optimize assets.
- Minimize layout shift.
- Target Lighthouse score 100.

Commit:
perf: optimize assets

---

# HW2 - Drum Kit Engine

## HW2-T01: HTML Audio Contract

Requirements:
- Create semantic drum pad controls.
- Define key bindings in HTML.
- Store sound paths in data-sound attributes.
- Do not implement JavaScript audio logic yet.

Commit:
feat(html): define drum pad data-sound contract


## HW2-T02: Polyphonic Audio Engine

Requirements:
- Implement audio playback independently from keyboard handling.
- Allow multiple sounds to play simultaneously.

Commit:
feat(js): implement polyphonic audio engine


## HW2-T03: Keyboard Event Engine

Requirements:
- Use keydown.
- Use event.key.
- Ignore repeated held-key events using event.repeat.
- Do not use keyCode or keypress.

Commit:
feat(js): bind keydown events with repeat throttling


## HW2-T04: FIFO Beat Recorder

Requirements:
- Record played beats.
- Store timestamps.
- Preserve FIFO event order.
- Allow recorded beat playback.

Commit:
feat(js): implement FIFO beat recorder

---

# HW3 - Resilient Landing Page

## HW3-S1: Drift-Free Countdown

Requirements:
- Use UTC ISO 8601 timestamps.
- Avoid countdown drift.
- Recalculate remaining time from absolute timestamps.

Commit:
feat(js): implement drift-free countdown


## HW3-S2: Form State Machine

States:
- idle
- submitting
- success
- error

Requirements:
- Explicit state transitions.
- Accessible status messages.

Commit:
feat(js): implement form state machine


## HW3-S3: Submission Safety

Requirements:
- Prevent double-submit.
- Sanitize user input.
- Zero XSS vulnerabilities.
- Do not use unsafe innerHTML.

Commit:
security: prevent duplicate submit and sanitize input


## HW3-AUDIT: AI Failure Audit

Create:
AI_FAILURE_AUDIT.md

Document three AI-induced defects:
1. Defect description
2. Diagnostic method
3. Refactored solution