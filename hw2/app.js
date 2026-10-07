class PolyphonicAudioEngine {
  constructor(pads) {
    this.audioTemplates = new Map();

    pads.forEach((pad) => {
      const soundPath = pad.dataset.sound;

      const audio = new Audio(soundPath);
      audio.preload = "auto";

      this.audioTemplates.set(soundPath, audio);
    });
  }

  play(soundPath) {
    const template = this.audioTemplates.get(soundPath);

    if (!template) {
      return;
    }

    const audioInstance = template.cloneNode();

    audioInstance.currentTime = 0;

    audioInstance
      .play()
      .catch((error) => {
        console.error("Audio playback failed:", error);
      });
  }
}


/**
 * Records keyboard beats in FIFO order.
 */
class BeatRecorder {
  constructor() {
    this.events = [];
    this.startTime = null;
  }

  record(key) {
    if (this.startTime === null) {
      this.startTime = performance.now();
    }

    const timestamp = performance.now() - this.startTime;

    this.events.push({
      key: key,
      timestamp: timestamp
    });
  }

  clear() {
    this.events = [];
    this.startTime = null;
  }

  getEvents() {
    return [...this.events];
  }
}


const drumPads = [
  ...document.querySelectorAll(".drum-pad")
];

const audioEngine = new PolyphonicAudioEngine(drumPads);

const beatRecorder = new BeatRecorder();


/**
 * Plays a drum sound and gives visual feedback.
 */
function triggerPad(pad) {
  if (!pad) {
    return;
  }

  const soundPath = pad.dataset.sound;

  audioEngine.play(soundPath);

  pad.classList.add("is-playing");

  window.setTimeout(() => {
    pad.classList.remove("is-playing");
  }, 120);
}


/**
 * Handles mouse interaction.
 */
drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    triggerPad(pad);
  });
});


/**
 * Handles keyboard interaction.
 * Repeated keydown events are ignored.
 */
function handleKeydown(event) {
  if (event.repeat) {
    return;
  }

  const key = event.key.toLowerCase();

  const pad = drumPads.find(
    (drumPad) => drumPad.dataset.key === key
  );

  if (!pad) {
    return;
  }

  beatRecorder.record(key);

  triggerPad(pad);
}

document.addEventListener("keydown", handleKeydown);