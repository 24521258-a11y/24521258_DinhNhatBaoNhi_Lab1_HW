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
  
  
  const countdownElement = document.querySelector("#countdown");
  
  /*
   * UTC ISO 8601 event timestamp.
   * The "Z" suffix explicitly indicates UTC.
   */
  const eventTargetTimestamp = "2026-12-31T23:59:59Z";
  
  const countdownEngine = new CountdownEngine(
    eventTargetTimestamp,
    countdownElement
  );
  
  countdownEngine.start();