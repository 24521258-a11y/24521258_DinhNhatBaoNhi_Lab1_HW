# HW3 Task Decomposition

## Slice 1 — Drift-Free Countdown Engine

### Goal
Build a countdown engine based on UTC ISO 8601 timestamps.

### Acceptance Criteria
- Use UTC ISO 8601 timestamps.
- Calculate remaining time from an absolute target timestamp.
- Avoid timer drift caused by repeatedly decrementing a counter.
- Handle expired countdown state safely.

### Verification
- Test countdown at normal speed.
- Reload the page and verify the target time remains consistent.
- Test an expired timestamp.

---

## Slice 2 — State-Machine Form

### States

Idle
↓
Submitting
↓
Success

Submitting
↓
Error

### Acceptance Criteria
- Form starts in Idle state.
- Submit changes state to Submitting.
- Success returns the form to a usable state.
- Failure displays an accessible error state.
- Form state is represented explicitly.

### Verification
- Submit valid input.
- Test successful submission.
- Test failed submission.
- Verify the submit button cannot trigger duplicate submissions.

---

## Slice 3 — Double-Submit Prevention & Input Sanitization

### Goal
Prevent duplicate form submissions and eliminate XSS risks.

### Acceptance Criteria
- Multiple rapid submissions are ignored while submitting.
- User input is never inserted using unsafe innerHTML.
- User-provided text is handled safely.
- No unescaped HTML execution is possible.

### Verification
- Rapidly click Submit multiple times.
- Test HTML-like input such as:
  <script>alert("XSS")</script>
- Verify the input is rendered as text rather than executable HTML.

---

## AI Failure Audit

Document three AI-induced defects discovered during implementation.

For each defect:
1. Defect description
2. Diagnostic method
3. Refactored solution