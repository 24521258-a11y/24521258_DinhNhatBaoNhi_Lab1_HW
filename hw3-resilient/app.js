/**
 * Drift-free countdown engine.
 *
 * The countdown is calculated from an absolute UTC timestamp
 * instead of decrementing a local counter.
 */
class CountdownEngine {
    constructor(targetTimestamp, displayElement) {
      this.targetTimestamp = targetTimestamp;
      this.displayElement = displayElement;
      this.timerId = null;
    }
  
    getRemainingTime() {
      const targetTime = Date.parse(this.targetTimestamp);
      const currentTime = Date.now();
  
      const remainingMilliseconds = targetTime - currentTime;
  
      if (remainingMilliseconds <= 0) {
        return {
          total: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
  
      const totalSeconds = Math.floor(
        remainingMilliseconds / 1000
      );
  
      const days = Math.floor(totalSeconds / 86400);
  
      const hours = Math.floor(
        (totalSeconds % 86400) / 3600
      );
  
      const minutes = Math.floor(
        (totalSeconds % 3600) / 60
      );
  
      const seconds = totalSeconds % 60;
  
      return {
        total: remainingMilliseconds,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }
  
    render() {
      const remaining = this.getRemainingTime();
  
      if (remaining.total <= 0) {
        this.displayElement.textContent = "Event has started.";
        return false;
      }
  
      this.displayElement.textContent =
        `${remaining.days}d ` +
        `${remaining.hours}h ` +
        `${remaining.minutes}m ` +
        `${remaining.seconds}s`;
  
      return true;
    }
  
    start() {
      this.render();
  
      this.timerId = window.setInterval(() => {
        const isActive = this.render();
  
        if (!isActive) {
          this.stop();
        }
      }, 1000);
    }
  
    stop() {
      if (this.timerId !== null) {
        window.clearInterval(this.timerId);
        this.timerId = null;
      }
    }
  }
  
  
  /*
   * Countdown setup.
   *
   * The "Z" suffix explicitly indicates UTC.
   */
  const countdownElement = document.querySelector("#countdown");
  
  const eventTargetTimestamp = "2026-12-31T23:59:59Z";
  
  const countdownEngine = new CountdownEngine(
    eventTargetTimestamp,
    countdownElement
  );
  
  countdownEngine.start();
  
  
  /**
   * Explicit form state machine.
   *
   * Allowed states:
   *
   * Idle -> Submitting -> Success
   * Idle -> Submitting -> Error
   */
  class FormStateMachine {
    constructor(form, submitButton, statusElement) {
      this.form = form;
      this.submitButton = submitButton;
      this.statusElement = statusElement;
  
      this.state = "Idle";
      this.userName = "";
    }
  
    setState(nextState) {
      this.state = nextState;
      this.render();
    }
  
    render() {
      switch (this.state) {
        case "Idle":
          this.submitButton.disabled = false;
          this.statusElement.textContent = "";
          break;
  
        case "Submitting":
          this.submitButton.disabled = true;
          this.statusElement.textContent = "Submitting...";
          break;
  
        case "Success":
          this.submitButton.disabled = false;
  
          this.statusElement.textContent =
            `Registration submitted successfully for ${this.userName}.`;
  
          break;
  
        case "Error":
          this.submitButton.disabled = false;
          this.statusElement.textContent =
            "Submission failed. Please try again.";
          break;
  
        default:
          throw new Error(
            `Unknown form state: ${this.state}`
          );
      }
    }
  
    async submit(name, email) {
      /*
       * Prevent duplicate submissions while a request
       * is already being processed.
       */
      if (this.state === "Submitting") {
        return;
      }
  
      this.userName = name;
  
      this.setState("Submitting");
  
      try {
        await this.sendRequest(name, email);
  
        this.setState("Success");
      } catch (error) {
        console.error("Form submission failed:", error);
  
        this.setState("Error");
      }
    }
  
    sendRequest(name, email) {
      return new Promise((resolve) => {
        window.setTimeout(() => {
          console.log("Submitted:", {
            name: name,
            email: email
          });
  
          resolve();
        }, 1000);
      });
    }
  }
  
  
  /*
   * Form setup.
   */
  const eventForm = document.querySelector("#event-form");
  const submitButton = document.querySelector("#submit-button");
  const formStatus = document.querySelector("#form-status");
  
  const formStateMachine = new FormStateMachine(
    eventForm,
    submitButton,
    formStatus
  );
  
  
  /**
   * Handles form submission.
   *
   * FormData retrieves user input without inserting
   * it into the page as HTML.
   */
  eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const formData = new FormData(eventForm);
  
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
  
    formStateMachine.submit(name, email);
  });