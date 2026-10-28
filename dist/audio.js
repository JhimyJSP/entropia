/**
 * ENTROPÍA — MOTOR DE AUDIO PROCEDURAL (WEB AUDIO API)
 * Generación sonora de efectos físicos en tiempo real (sin música, sin archivos externos).
 * Efectos: sonido de paso de página de papel y sonido de apertura de cubierta de cuero.
 */

class BookAudioManager {
  constructor() {
    this.ctx = null;
    this.sfxGain = null;
    this.masterGain = null;
    
    // Estado y persistencia
    this.isMuted = localStorage.getItem('entropia-audio-muted') === 'true';
    this.sfxEnabled = localStorage.getItem('entropia-sfx-enabled') !== 'false';
    this.volume = parseFloat(localStorage.getItem('entropia-volume') || '0.7');
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        
        // Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // SFX Gain
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(this.sfxEnabled ? 0.75 : 0, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sonido de apertura de cubierta (impacto sordo de cuero + fricción)
  playCoverOpen() {
    if (!this.sfxEnabled || this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Oscilador de impacto grave suave
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.32);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(130, t);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.32);

    // Fricción suave de hojas
    this.playPaperFriction(t, 0.38, 750, 0.16);
  }

  // Sonido realista de paso de página (fricción de papel natural)
  playPageFlip() {
    if (!this.sfxEnabled || this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.playPaperFriction(t, 0.25, 1100, 0.22);
  }

  playPaperFriction(startTime, duration, filterFreq, maxGain) {
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02; // Ruido marrón suave
      lastOut = data[i];
      data[i] *= 3.0;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq, startTime);
    filter.frequency.exponentialRampToValueAtTime(filterFreq * 0.5, startTime + duration);
    filter.Q.setValueAtTime(1.6, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, startTime);
    gain.gain.linearRampToValueAtTime(maxGain, startTime + duration * 0.18);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(startTime);
    noise.stop(startTime + duration);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('entropia-audio-muted', String(this.isMuted));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  toggleSfx() {
    this.sfxEnabled = !this.sfxEnabled;
    localStorage.setItem('entropia-sfx-enabled', String(this.sfxEnabled));
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxEnabled ? 0.75 : 0, this.ctx.currentTime);
    }
    return this.sfxEnabled;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('entropia-volume', String(this.volume));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }
}

window.bookAudio = new BookAudioManager();
