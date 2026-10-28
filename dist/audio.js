/**
 * ENTROPÍA — MOTOR DE AUDIO PROCEDURAL (WEB AUDIO API)
 * Generación sonora en tiempo real: sin archivos de audio externos protegidos por copyright.
 * Incluye: sonido de paso de página, crujido de cubierta y música ambiental generativa relajante.
 */

class BookAudioManager {
  constructor() {
    this.ctx = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.masterGain = null;
    
    // Estado y persistencia
    this.isMuted = localStorage.getItem('entropia-audio-muted') === 'true';
    this.musicEnabled = localStorage.getItem('entropia-music-enabled') !== 'false';
    this.sfxEnabled = localStorage.getItem('entropia-sfx-enabled') !== 'false';
    this.volume = parseFloat(localStorage.getItem('entropia-volume') || '0.7');
    
    this.isMusicPlaying = false;
    this.ambientOscillators = [];
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

        // Music Gain
        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(this.musicEnabled ? 0.28 : 0, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);

        // SFX Gain
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(this.sfxEnabled ? 0.7 : 0, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sonido realista de apertura de cubierta (thud suave + crujido de bisagra)
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
    osc.frequency.setValueAtTime(95, t);
    osc.frequency.exponentialRampToValueAtTime(32, t + 0.35);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, t);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.35);

    // Ruido suave de fricción de páginas
    this.playPaperFriction(t, 0.45, 800, 0.18);
  }

  // Sonido realista de paso de página (fricción de papel con decaimiento natural)
  playPageFlip() {
    if (!this.sfxEnabled || this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.playPaperFriction(t, 0.28, 1200, 0.25);
  }

  playPaperFriction(startTime, duration, filterFreq, maxGain) {
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Ruido filtrado con variación de grano
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02; // Ruido marrón suave
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq, startTime);
    filter.frequency.exponentialRampToValueAtTime(filterFreq * 0.5, startTime + duration);
    filter.Q.setValueAtTime(1.8, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, startTime);
    gain.gain.linearRampToValueAtTime(maxGain, startTime + duration * 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(startTime);
    noise.stop(startTime + duration);
  }

  // Música ambiental generativa (ondas senoidales 432 Hz y 528 Hz para concentración y estudio)
  startAmbientMusic() {
    if (!this.musicEnabled || this.isMusicPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    this.isMusicPlaying = true;
    const baseFreqs = [108, 216, 324, 432, 540];

    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Modulación lenta de amplitud LFO para respiración sonora
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.05 + idx * 0.02, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      gain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);

      if (panner) {
        panner.pan.setValueAtTime((idx % 2 === 0 ? 0.35 : -0.35), this.ctx.currentTime);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.musicGain);
      } else {
        osc.connect(gain);
        gain.connect(this.musicGain);
      }

      osc.start();
      lfo.start();
      this.ambientOscillators.push(osc, lfo);
    });
  }

  stopAmbientMusic() {
    this.ambientOscillators.forEach(osc => {
      try { osc.stop(); } catch(e){}
    });
    this.ambientOscillators = [];
    this.isMusicPlaying = false;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('entropia-audio-muted', String(this.isMuted));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    localStorage.setItem('entropia-music-enabled', String(this.musicEnabled));
    if (this.musicEnabled) {
      this.startAmbientMusic();
      if (this.musicGain && this.ctx) {
        this.musicGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      }
    } else {
      this.stopAmbientMusic();
      if (this.musicGain && this.ctx) {
        this.musicGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    }
    return this.musicEnabled;
  }

  toggleSfx() {
    this.sfxEnabled = !this.sfxEnabled;
    localStorage.setItem('entropia-sfx-enabled', String(this.sfxEnabled));
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxEnabled ? 0.7 : 0, this.ctx.currentTime);
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
