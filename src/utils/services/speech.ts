class Speech {
  isEnabled: boolean;
  speechSynthesisUtterance: SpeechSynthesisUtterance | null;

  constructor() {
    this.isEnabled = typeof window !== 'undefined' ? 'speechSynthesis' in window : false;
    this.speechSynthesisUtterance = typeof window !== 'undefined' ? new SpeechSynthesisUtterance() : null;
  }

  play(text: string, lang: string) {
    if (!this.speechSynthesisUtterance) return;
    this.speechSynthesisUtterance.text = text;
    this.speechSynthesisUtterance.lang = lang;
    this.speechSynthesisUtterance.rate = 1;
    this.speechSynthesisUtterance.pitch = 1;
    this.speechSynthesisUtterance.volume = 1;
    if (typeof window !== 'undefined') {
      window.speechSynthesis.speak(this.speechSynthesisUtterance);
    }
  }
  resume() {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.resume();
    }
  }
  pause() {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.pause();
    }
  }
  cancel() {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
  }
}

export const speech = new Speech();
