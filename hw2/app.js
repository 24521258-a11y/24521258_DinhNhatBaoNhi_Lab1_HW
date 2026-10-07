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
  
  const drumPads = [
    ...document.querySelectorAll(".drum-pad")
  ];
  
  const audioEngine = new PolyphonicAudioEngine(drumPads);
  
  drumPads.forEach((pad) => {
    pad.addEventListener("click", () => {
      const soundPath = pad.dataset.sound;
  
      audioEngine.play(soundPath);
  
      pad.classList.add("is-playing");
  
      window.setTimeout(() => {
        pad.classList.remove("is-playing");
      }, 120);
    });
  });