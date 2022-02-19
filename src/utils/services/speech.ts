class Speech {
  isEnabled: boolean;
  speechSynthesisUtterance: SpeechSynthesisUtterance;

  constructor() {
    this.isEnabled = 'speechSynthesis' in window;
    this.speechSynthesisUtterance = new SpeechSynthesisUtterance();
  }

  play(text: string, lang: string) {
    this.speechSynthesisUtterance.text = text;
    this.speechSynthesisUtterance.lang = lang;
    this.speechSynthesisUtterance.rate = 1;
    this.speechSynthesisUtterance.pitch = 1;
    this.speechSynthesisUtterance.volume = 1;
    window.speechSynthesis.speak(this.speechSynthesisUtterance);
  }
  resume() {
    window.speechSynthesis.resume();
  }
  pause() {
    window.speechSynthesis.pause();
  }
  cancel() {
    window.speechSynthesis.cancel();
  }
}

export const speech = new Speech();
