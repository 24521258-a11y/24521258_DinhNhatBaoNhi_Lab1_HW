# AI Failure Audit

## Defect 1 — Countdown Timer Drift

### Defect Description

An initial countdown implementation could use a local counter
that decreases once every second with `setInterval()`.

This approach can drift because `setInterval()` does not guarantee
that the callback executes exactly every 1000 milliseconds.

### Diagnostic Method

I reviewed the countdown logic and checked whether the remaining
time was calculated from an absolute target timestamp or from a
manually decremented counter.

The implementation was tested by observing the countdown over time
and comparing the displayed value with the actual target timestamp.

### Refactored Solution

The countdown was refactored to use an absolute UTC ISO 8601
timestamp:

`2026-12-31T23:59:59Z`

The remaining time is calculated using:

target timestamp - current timestamp

The interval is only responsible for refreshing the display.
It does not control the actual elapsed time.


---

## Defect 2 — Double Submission

### Defect Description

A form submission handler can accidentally allow multiple requests
when the user clicks the Submit button repeatedly before the first
request finishes.

This can result in duplicate submissions.

### Diagnostic Method

I tested the form by clicking the Submit button multiple times
rapidly while the form was in the Submitting state.

I also inspected the form state transition logic.

### Refactored Solution

The form was implemented as an explicit state machine:

Idle -> Submitting -> Success/Error

The submit method checks whether the current state is
`Submitting`.

If the form is already submitting, additional submissions are
ignored.

The Submit button is also disabled during the Submitting state.


---

## Defect 3 — Unsafe HTML Rendering / XSS

### Defect Description

An AI-generated implementation could insert user-provided input
using `innerHTML`.

If untrusted input were inserted as HTML, an attacker could inject
HTML or JavaScript into the page.

### Diagnostic Method

I searched the implementation for unsafe `innerHTML` usage and
tested the form with the following input:

`<script>alert("XSS")</script>`

The expected result was that the input should be displayed as
plain text and should not execute JavaScript.

### Refactored Solution

The implementation uses `textContent` instead of `innerHTML`
when displaying user-provided content.

For example:

```js
this.statusElement.textContent =
  `Registration submitted successfully for ${this.userName}.`;