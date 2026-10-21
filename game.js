/**
 * ChronoSonic: Zaman ve Işık Rezonansı (Spectrum Weaver)
 * Unprecedented Web Game Engine: Acoustic Raycasting, Temporal Echoes, Flawless Reflections & Gravitational Lensing
 * Pure Vanilla JavaScript - Runs directly in any browser without build tools.
 */

// =============================================================================
// 1. Web Audio Procedural Synthesizer
// =============================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.droneGain = null;
    this.frequencies = {
      SOL: 432.0,      // Sol (Cyan)
      IGNIS: 528.0,    // Ignis (Amber)
      TERRA: 639.0,    // Terra (Emerald)
      AETHER: 852.0    // Aether (Amethyst)
    };
    this.initUserGesture();
  }

  initUserGesture() {
    const resumeAudio = () => {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
          this.startAmbientDrone();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('keydown', resumeAudio);
      window.removeEventListener('touchstart', resumeAudio);
    };

    window.addEventListener('click', resumeAudio);
    window.addEventListener('keydown', resumeAudio);
    window.addEventListener('touchstart', resumeAudio);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  startAmbientDrone() {
    if (!this.ctx || this.droneGain) return;
    try {
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      this.droneGain.connect(this.masterGain);

      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(108, this.ctx.currentTime);

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(162, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.droneGain);

      osc1.start();
      osc2.start();
    } catch (e) {
      console.warn('Drone audio init skipped', e);
    }
  }

  playReflectionChime(freqKey = 'SOL', bounce = 0) {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const baseFreq = this.frequencies[freqKey] || 432;
      const pitchMultiplier = Math.pow(1.059463, (bounce % 12));
      const targetFreq = baseFreq * pitchMultiplier;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = bounce > 2 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(targetFreq, now);

      gain.gain.setValueAtTime(0.08 / (1 + bounce * 0.12), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.33);
    } catch (e) {}
  }

  playCrystalCharge(pitchRatio = 1.0) {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320 + pitchRatio * 380, now);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  playEchoTrigger() {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.45);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.52);
    } catch (e) {}
  }

  playNovaPulse() {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.62);
    } catch (e) {}
  }

  playVictory() {
    if (!this.ctx || this.isMuted) return;
    try {
      const chord = [432, 540, 648, 864, 1080];
      const now = this.ctx.currentTime;

      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(0.15, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 1.3);
      });
    } catch (e) {}
  }
}

// =============================================================================
// 2. Constants & Color Palette
// =============================================================================
const FREQUENCIES = {
  SOL: { name: 'Sol (432Hz)', color: '#00f0ff', glow: 'rgba(0, 240, 255, 0.65)', tone: 432 },
  IGNIS: { name: 'Ignis (528Hz)', color: '#ff9d00', glow: 'rgba(255, 157, 0, 0.65)', tone: 528 },
  TERRA: { name: 'Terra (639Hz)', color: '#10b981', glow: 'rgba(16, 185, 129, 0.65)', tone: 639 },
  AETHER: { name: 'Aether (852Hz)', color: '#c084fc', glow: 'rgba(192, 132, 252, 0.65)', tone: 852 }
};

const ECHO_COLOR = '#f43f5e';

// =============================================================================
// 3. Particle System
// =============================================================================
class ParticleEngine {
  constructor() {
    this.particles = [];
  }

  emit(x, y, color, count = 5, speed = 2, size = 3, life = 0.5) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = (0.5 + Math.random() * 0.8) * speed;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color,
        size: Math.random() * size + 1.5,
        alpha: 1,
        life: 1,
        decay: 1 / (life * 60)
      });
    }
  }

  emitRings(x, y, color, maxRadius = 40) {
    this.particles.push({
      x, y,
      radius: 2,
      maxRadius,
      color,
      isRing: true,
      alpha: 1,
      decay: 0.035
    });
  }

  emitShockwave(x, y, color, maxRadius = 280) {
    this.particles.push({
      x, y,
      radius: 5,
      maxRadius,
      color,
      isRing: true,
      alpha: 1,
      decay: 0.02
    });
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      if (p.isRing) {
        p.radius += (p.maxRadius - p.radius) * 0.12;
        p.alpha -= p.decay;
        if (p.alpha <= 0 || p.radius >= p.maxRadius - 1) {
          this.particles.splice(i, 1);
        }
      } else {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }
  }

  draw(ctx) {
    ctx.save();
    for (const p of this.particles) {
      if (p.isRing) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = p.alpha;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      }
    }
    ctx.restore();
  }
}

// =============================================================================
// 4. Main Game Engine Class
// =============================================================================
class ChronoSonicGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.sound = new SoundEngine();
    this.particles = new ParticleEngine();

    this.dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.currentLevelIndex = 0;
    this.score = 500;
    this.isLevelWon = false;
    this.levelStartTime = Date.now();

    // Convenience & UI Toggles
    this.isAutoFiring = true;
    this.isSlowMotion = false;
    this.showGhostSolution = false;
    this.isHudVisible = true;
    this.isCardCollapsed = false;
    this.gravityAssist = true; // Gentle Keplerian deflection & crystal magnetic lock-on

    // Movement strictly with WASD / Arrow keys
    this.keys = {
      w: false, a: false, s: false, d: false,
      ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false
    };

    // Player Vessel (Lumina)
    this.player = {
      x: 200,
      y: 350,
      speed: 260,
      radius: 17,
      angle: 0,
      currentFreq: 'SOL',
      isFiring: true,
      glowPulse: 0
    };

    // Temporal Echo System
    this.echoBuffer = [];
    this.bufferDuration = 4.0;
    this.activeEchoes = [];

    // Entities
    this.mirrors = [];
    this.prisms = [];
    this.beamSplitters = [];
    this.singularities = [];
    this.portals = [];
    this.targets = [];
    this.barriers = [];

    // Interactive Mirror Interaction State
    this.mouse = { x: 0, y: 0, isDown: false };
    this.hoveredMirror = null;
    this.draggedMirror = null;
    this.dragMode = null; // 'move' or 'rotate'

    // Background Elements
    this.stars = [];
    this.nebulaOrbs = [];
    this.initStars();

    this.resize();
    this.initEvents();
    this.loadLevel(0);

    this.lastTime = performance.now();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < 110; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.7 + 0.2
      });
    }

    this.nebulaOrbs = [
      { x: this.width * 0.25, y: this.height * 0.45, color: 'rgba(56, 189, 248, 0.05)', r: 240 },
      { x: this.width * 0.75, y: this.height * 0.65, color: 'rgba(192, 132, 252, 0.05)', r: 280 },
      { x: this.width * 0.5, y: this.height * 0.8, color: 'rgba(251, 191, 36, 0.04)', r: 220 }
    ];
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.initStars();
  }

  initEvents() {
    window.addEventListener('resize', () => this.resize());

    // Mouse Movement: Aiming and Mirror Dragging/Rotation
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      if (this.draggedMirror) {
        if (this.dragMode === 'move') {
          // Reposition mirror
          this.draggedMirror.x = e.clientX;
          this.draggedMirror.y = e.clientY;
          this.draggedMirror.updatePoints();
        } else if (this.dragMode === 'rotate') {
          // Rotate mirror towards cursor
          const dx = e.clientX - this.draggedMirror.x;
          const dy = e.clientY - this.draggedMirror.y;
          this.draggedMirror.angle = Math.atan2(dy, dx);
          this.draggedMirror.updatePoints();
        }
      } else {
        // Check hover over mirrors
        this.hoveredMirror = this.findMirrorAt(e.clientX, e.clientY);

        // Aim player beam towards cursor
        const dx = this.mouse.x - this.player.x;
        const dy = this.mouse.y - this.player.y;
        this.player.angle = Math.atan2(dy, dx);
      }
    });

    // Mouse Wheel: Scroll over a mirror to rotate it by 5 degrees!
    window.addEventListener('wheel', (e) => {
      const mirror = this.findMirrorAt(this.mouse.x, this.mouse.y);
      if (mirror) {
        e.preventDefault();
        const deltaAngle = (e.deltaY > 0 ? 1 : -1) * (Math.PI / 36); // ~5 degrees
        mirror.angle += deltaAngle;
        mirror.updatePoints();
        this.showToast(`Ayna Açısı: ${Math.round((mirror.angle * 180 / Math.PI + 360) % 180)}°`);
      }
    }, { passive: false });

    // Mouse Down
    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('#top-bar') || e.target.closest('#bottom-dock') || e.target.closest('.modal-card') || e.target.closest('#hud-overlay')) {
        return;
      }

      if (e.button === 0) {
        const mirrorHit = this.getMirrorHandleAt(e.clientX, e.clientY);
        if (mirrorHit) {
          this.draggedMirror = mirrorHit.mirror;
          this.dragMode = mirrorHit.mode; // 'move' or 'rotate'
          if (mirrorHit.mode === 'rotate') {
            const dx = e.clientX - mirrorHit.mirror.x;
            const dy = e.clientY - mirrorHit.mirror.y;
            mirrorHit.mirror.angle = Math.atan2(dy, dx);
            mirrorHit.mirror.updatePoints();
          }
        } else {
          this.mouse.isDown = true;
          this.player.isFiring = true;
        }
      } else if (e.button === 2) {
        e.preventDefault();
        this.cycleFrequency();
      }
    });

    window.addEventListener('mouseup', () => {
      this.mouse.isDown = false;
      this.draggedMirror = null;
      this.dragMode = null;
      if (!this.isAutoFiring) {
        this.player.isFiring = false;
      }
    });

    window.addEventListener('contextmenu', (e) => e.preventDefault());

    // Keyboard Controls
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (this.keys.hasOwnProperty(k)) this.keys[k] = true;
      if (this.keys.hasOwnProperty(e.key)) this.keys[e.key] = true;

      if (e.code === 'Space') {
        e.preventDefault();
        this.triggerTemporalEcho();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.toggleHud();
      } else if (k === 'e') {
        e.preventDefault();
        this.triggerNovaShockwave();
      } else if (k === 'z' || k === 'x') {
        // Quick rotate nearest mirror
        const m = this.hoveredMirror || this.mirrors[0];
        if (m) {
          m.angle += (k === 'x' ? 1 : -1) * (Math.PI / 18); // ~10 deg
          m.updatePoints();
          this.showToast(`Ayna Açısı: ${Math.round((m.angle * 180 / Math.PI + 360) % 180)}°`);
        }
      } else if (e.key === '1') this.setFrequency('SOL');
      else if (e.key === '2') this.setFrequency('IGNIS');
      else if (e.key === '3') this.setFrequency('TERRA');
      else if (e.key === '4') this.setFrequency('AETHER');
      else if (k === 'm') this.spawnMirror();
      else if (k === 'p') this.spawnPrism();
      else if (k === 'b') this.spawnSplitter();
      else if (k === 'g') this.toggleGravityAssist();
      else if (e.key === 'Delete' || e.key === 'Backspace') this.clearUserPlaced();
      else if (k === 'h') this.openHintModal();
      else if (k === 'q') this.toggleSlowMotion();
      else if (k === 'r') this.restartLevel();
      else if (k === 'c') this.clearEchoes();
      else if (k === 'f') this.toggleAutoFire();
    });

    window.addEventListener('keyup', (e) => {
      const k = e.key.toLowerCase();
      if (this.keys.hasOwnProperty(k)) this.keys[k] = false;
      if (this.keys.hasOwnProperty(e.key)) this.keys[e.key] = false;
    });

    // Touch Support
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.mouse.x = touch.clientX;
        this.mouse.y = touch.clientY;
        const dx = this.mouse.x - this.player.x;
        const dy = this.mouse.y - this.player.y;
        this.player.angle = Math.atan2(dy, dx);
      }
    }, { passive: false });

    // UI Wireups
    document.querySelectorAll('.freq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const freq = btn.getAttribute('data-freq');
        this.setFrequency(freq);
      });
    });

    // Cosmic Construction Toolbelt Wireups
    const buildMirrorBtn = document.getElementById('btn-build-mirror');
    if (buildMirrorBtn) buildMirrorBtn.addEventListener('click', () => this.spawnMirror());

    const buildPrismBtn = document.getElementById('btn-build-prism');
    if (buildPrismBtn) buildPrismBtn.addEventListener('click', () => this.spawnPrism());

    const buildSplitterBtn = document.getElementById('btn-build-splitter');
    if (buildSplitterBtn) buildSplitterBtn.addEventListener('click', () => this.spawnSplitter());

    const rotatePlacedBtn = document.getElementById('btn-rotate-placed');
    if (rotatePlacedBtn) rotatePlacedBtn.addEventListener('click', () => this.rotateSelectedOrHovered(Math.PI / 12));

    const clearPlacedBtn = document.getElementById('btn-clear-placed');
    if (clearPlacedBtn) clearPlacedBtn.addEventListener('click', () => this.clearUserPlaced());

    const gravityAssistBtn = document.getElementById('btn-toggle-gravity-assist');
    if (gravityAssistBtn) gravityAssistBtn.addEventListener('click', () => this.toggleGravityAssist());

    // HUD Toggle
    const hudToggleBtn = document.getElementById('btn-toggle-hud');
    if (hudToggleBtn) {
      hudToggleBtn.addEventListener('click', () => this.toggleHud());
    }

    // Card Collapse Toggle
    const collapseBtn = document.getElementById('btn-collapse-card');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => this.toggleCardCollapse());
    }

    // Nova Pulse Button
    const novaBtn = document.getElementById('btn-nova');
    if (novaBtn) {
      novaBtn.addEventListener('click', () => this.triggerNovaShockwave());
    }

    // Hint Triggers
    const topHintBtn = document.getElementById('btn-hint-top');
    if (topHintBtn) topHintBtn.addEventListener('click', () => this.openHintModal());

    const cardHintBtn = document.getElementById('btn-card-hint');
    if (cardHintBtn) cardHintBtn.addEventListener('click', () => this.openHintModal());

    const closeHintBtn = document.getElementById('btn-close-hint');
    if (closeHintBtn) closeHintBtn.addEventListener('click', () => this.hideModal('hint-modal'));

    const ghostPathBtn = document.getElementById('btn-toggle-ghost-path');
    if (ghostPathBtn) {
      ghostPathBtn.addEventListener('click', () => {
        this.showGhostSolution = !this.showGhostSolution;
        const textSpan = document.getElementById('ghost-path-text');
        if (textSpan) {
          textSpan.textContent = this.showGhostSolution ? 'Görsel Çözüm İzini Gizle' : 'Görsel Çözüm İzini Göster';
        }
        this.showToast(this.showGhostSolution ? 'Görsel çözüm izi aktif edildi!' : 'Çözüm izi gizlendi.');
      });
    }

    // Quick Level Navigation
    const prevBtn = document.getElementById('btn-prev-level');
    if (prevBtn) prevBtn.addEventListener('click', () => this.loadLevel(this.currentLevelIndex - 1));

    const nextBtnQuick = document.getElementById('btn-next-level-quick');
    if (nextBtnQuick) nextBtnQuick.addEventListener('click', () => this.loadLevel(this.currentLevelIndex + 1));

    // Convenience toggles
    const autoFireBtn = document.getElementById('btn-toggle-autofire');
    if (autoFireBtn) {
      autoFireBtn.addEventListener('click', () => this.toggleAutoFire());
    }

    const slowMoBtn = document.getElementById('btn-toggle-slowmo');
    if (slowMoBtn) {
      slowMoBtn.addEventListener('click', () => this.toggleSlowMotion());
    }

    const echoBtn = document.getElementById('echo-btn');
    if (echoBtn) echoBtn.addEventListener('click', () => this.triggerTemporalEcho());

    const clearEchoBtn = document.getElementById('clear-echo-btn');
    if (clearEchoBtn) clearEchoBtn.addEventListener('click', () => this.clearEchoes());

    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => this.restartLevel());

    const audioToggleBtn = document.getElementById('btn-audio');
    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        const muted = this.sound.toggleMute();
        audioToggleBtn.innerHTML = muted ? `<span>🔇</span> Ses Kapalı` : `<span>🔊</span> Ses Açık`;
      });
    }

    const guideBtn = document.getElementById('btn-guide');
    if (guideBtn) guideBtn.addEventListener('click', () => this.showModal('guide-modal'));

    const qrBtn = document.getElementById('btn-qr');
    if (qrBtn) qrBtn.addEventListener('click', () => this.showModal('qr-modal'));

    const levelsBtn = document.getElementById('btn-levels');
    if (levelsBtn) {
      levelsBtn.addEventListener('click', () => {
        this.buildLevelSelectGrid();
        this.showModal('levels-modal');
      });
    }

    const nextLevelBtn = document.getElementById('btn-next-level');
    if (nextLevelBtn) {
      nextLevelBtn.addEventListener('click', () => {
        this.hideModal('victory-modal');
        this.loadLevel(this.currentLevelIndex + 1);
      });
    }

    const replayBtn = document.getElementById('btn-replay-level');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        this.hideModal('victory-modal');
        this.restartLevel();
      });
    }

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-backdrop');
        if (modal) modal.classList.remove('show');
      });
    });
  }

  toggleHud() {
    this.isHudVisible = !this.isHudVisible;
    const overlay = document.getElementById('hud-overlay');
    const toolbelt = document.getElementById('build-toolbelt');
    const textEl = document.getElementById('hud-toggle-text');
    if (overlay) overlay.classList.toggle('hud-hidden', !this.isHudVisible);
    if (toolbelt) toolbelt.classList.toggle('hud-hidden', !this.isHudVisible);
    if (textEl) textEl.textContent = this.isHudVisible ? 'Panelleri Gizle' : 'Panelleri Göster';
    this.showToast(this.isHudVisible ? 'Paneller Açıldı' : 'Paneller Gizlendi (Temiz Ekran Modu)');
  }

  toggleGravityAssist() {
    this.gravityAssist = !this.gravityAssist;
    const btn = document.getElementById('btn-toggle-gravity-assist');
    if (btn) {
      btn.classList.toggle('active', this.gravityAssist);
      btn.innerHTML = this.gravityAssist ? `<span>🌀</span> Kütleçekim Yardımı: Açık` : `<span>🌀</span> Kütleçekim Yardımı: Kapalı`;
    }
    this.showToast(this.gravityAssist ? 'Kütleçekim Düzleştirme & Manyetik Kilitlenme: Aktif' : 'Serbest Kütleçekim Modu');
  }

  spawnMirror(x, y) {
    const posX = x !== undefined ? x : Math.min(Math.max(this.mouse.x || (this.player.x + 120), 140), this.width - 140);
    const posY = y !== undefined ? y : Math.min(Math.max(this.mouse.y || this.player.y, 200), this.height - 130);
    const mirror = {
      type: 'mirror',
      x: posX,
      y: posY,
      angle: Math.PI / 4,
      length: 120,
      userPlaced: true,
      updatePoints: function() {
        const cos = Math.cos(this.angle);
        const sin = Math.sin(this.angle);
        const half = this.length / 2;
        this.x1 = this.x - cos * half;
        this.y1 = this.y - sin * half;
        this.x2 = this.x + cos * half;
        this.y2 = this.y + sin * half;
      }
    };
    mirror.updatePoints();
    this.mirrors.push(mirror);
    this.hoveredMirror = mirror;
    this.particles.emitRings(posX, posY, '#38bdf8', 42);
    this.sound.playReflectionChime('SOL', 1);
    this.showToast('🪞 Yeni Ayna Yerleştirildi! Sürükleyebilir veya [Z/X/Tekerlek] ile döndürebilirsiniz.');
  }

  spawnPrism(x, y) {
    const posX = x !== undefined ? x : Math.min(Math.max(this.mouse.x || (this.player.x + 120), 140), this.width - 140);
    const posY = y !== undefined ? y : Math.min(Math.max(this.mouse.y || this.player.y, 200), this.height - 130);
    const nextFreqs = ['IGNIS', 'TERRA', 'AETHER', 'SOL'];
    const outputFreq = nextFreqs[this.prisms.length % nextFreqs.length];
    const prism = {
      type: 'prism',
      x: posX,
      y: posY,
      radius: 28,
      outputFreq: outputFreq,
      angle: 0,
      userPlaced: true
    };
    this.prisms.push(prism);
    this.particles.emitRings(posX, posY, FREQUENCIES[outputFreq]?.color || '#ffffff', 45);
    this.sound.playReflectionChime('IGNIS', 2);
    this.showToast(`💎 Yeni Prizma (${outputFreq}) Yerleştirildi!`);
  }

  spawnSplitter(x, y) {
    const posX = x !== undefined ? x : Math.min(Math.max(this.mouse.x || (this.player.x + 120), 140), this.width - 140);
    const posY = y !== undefined ? y : Math.min(Math.max(this.mouse.y || this.player.y, 200), this.height - 130);
    const splitter = {
      type: 'splitter',
      x: posX,
      y: posY,
      radius: 26,
      userPlaced: true
    };
    this.beamSplitters.push(splitter);
    this.particles.emitRings(posX, posY, '#38bdf8', 45);
    this.sound.playReflectionChime('AETHER', 3);
    this.showToast('🔀 Yeni Işın Bölücü Yerleştirildi! Işığı 2 bağımsız ışına böler.');
  }

  rotateSelectedOrHovered(delta = Math.PI / 12) {
    const m = this.hoveredMirror || this.mirrors[this.mirrors.length - 1];
    if (m) {
      m.angle += delta;
      m.updatePoints();
      const deg = Math.round((m.angle * 180 / Math.PI + 360) % 180);
      this.showToast(`Ayna Açısı: ${deg}°`);
      this.sound.playReflectionChime('SOL', 0);
    } else {
      this.showToast('Döndürmek için bir aynanın üzerine gelin.');
    }
  }

  clearUserPlaced() {
    const countBefore = this.mirrors.filter(m => m.userPlaced).length +
                        this.prisms.filter(p => p.userPlaced).length +
                        this.beamSplitters.filter(b => b.userPlaced).length;
    this.mirrors = this.mirrors.filter(m => !m.userPlaced);
    this.prisms = this.prisms.filter(p => !p.userPlaced);
    this.beamSplitters = this.beamSplitters.filter(b => !b.userPlaced);
    this.hoveredMirror = null;
    this.draggedMirror = null;
    if (countBefore > 0) {
      this.particles.emitRings(this.player.x, this.player.y, '#f87171', 50);
      this.showToast(`${countBefore} adet oyuncu yapımı temizlendi.`);
    } else {
      this.showToast('Temizlenecek oyuncu yapımı bulunamadı.');
    }
  }

  toggleCardCollapse() {
    this.isCardCollapsed = !this.isCardCollapsed;
    const card = document.getElementById('level-info-card');
    const btn = document.getElementById('btn-collapse-card');
    if (card) card.classList.toggle('collapsed', this.isCardCollapsed);
    if (btn) btn.textContent = this.isCardCollapsed ? '▼' : '▲';
  }

  triggerNovaShockwave() {
    this.sound.playNovaPulse();
    this.particles.emitShockwave(this.player.x, this.player.y, '#c084fc', 300);
    this.particles.emit(this.player.x, this.player.y, '#38bdf8', 35, 5, 3.5, 0.7);

    // Charge nearby crystals instantly by +30%!
    for (const t of this.targets) {
      const dist = Math.hypot(t.x - this.player.x, t.y - this.player.y);
      if (dist < 320) {
        t.charge = Math.min(100, t.charge + 30);
        this.particles.emitRings(t.x, t.y, FREQUENCIES[t.requiredFreq]?.color || '#fff', 40);
      }
    }

    this.showToast('🌊 Kozmik Nova Rezonansı! Yakındaki kristaller şarj edildi.');
  }

  toggleAutoFire() {
    this.isAutoFiring = !this.isAutoFiring;
    this.player.isFiring = this.isAutoFiring || this.mouse.isDown;
    const btn = document.getElementById('btn-toggle-autofire');
    if (btn) {
      btn.classList.toggle('active', this.isAutoFiring);
      btn.innerHTML = this.isAutoFiring ? `<span>⚡</span> Devamlı: Açık` : `<span>⚡</span> Devamlı: Kapalı`;
    }
    this.showToast(this.isAutoFiring ? 'Devamlı Işın Açıldı' : 'Devamlı Işın Kapatıldı (Tıkla-Ateşle)');
  }

  toggleSlowMotion() {
    this.isSlowMotion = !this.isSlowMotion;
    const btn = document.getElementById('btn-toggle-slowmo');
    if (btn) {
      btn.classList.toggle('active', this.isSlowMotion);
      btn.innerHTML = this.isSlowMotion ? `<span>⏳</span> Ağır Çekim [Q]` : `<span>⏳</span> Normal [Q]`;
    }
    this.showToast(this.isSlowMotion ? 'Ağır Çekim Aktif (%50 Hız)' : 'Normal Zaman Hızı');
  }

  openHintModal() {
    const lvl = LEVELS[this.currentLevelIndex];
    if (!lvl) return;

    const modalLvlTitle = document.getElementById('hint-modal-level-title');
    const modalHeading = document.getElementById('hint-modal-heading');
    const container = document.getElementById('hint-steps-container');

    if (modalLvlTitle) modalLvlTitle.textContent = `Bölüm ${this.currentLevelIndex + 1}: ${lvl.title}`;
    if (modalHeading) modalHeading.textContent = `Bu Bölüm Nasıl Geçilir?`;

    if (container) {
      container.innerHTML = '';
      const hints = lvl.hints || ['Kristallere uygun frekanstaki ışını yönlendirip rezonansa ulaştırın.'];
      hints.forEach((hint, idx) => {
        const item = document.createElement('div');
        item.className = 'hint-step-item';
        item.innerHTML = `
          <div class="step-idx">${idx + 1}</div>
          <div class="step-body">${hint}</div>
        `;
        container.appendChild(item);
      });
    }

    this.showModal('hint-modal');
  }

  showToast(text, duration = 2800) {
    const toast = document.getElementById('hint-toast');
    if (toast) {
      toast.textContent = text;
      toast.classList.add('visible');
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        toast.classList.remove('visible');
      }, duration);
    }
  }

  setFrequency(freqKey) {
    if (!FREQUENCIES[freqKey]) return;
    this.player.currentFreq = freqKey;
    document.querySelectorAll('.freq-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-freq') === freqKey);
    });
    this.particles.emitRings(this.player.x, this.player.y, FREQUENCIES[freqKey].color, 35);
  }

  cycleFrequency() {
    const keys = Object.keys(FREQUENCIES);
    const nextIdx = (keys.indexOf(this.player.currentFreq) + 1) % keys.length;
    this.setFrequency(keys[nextIdx]);
  }

  triggerTemporalEcho() {
    if (this.echoBuffer.length < 20) {
      this.showToast('Yankı kaydı için en az 1 saniye hareket edin veya ateşleyin.');
      return;
    }

    if (this.activeEchoes.length >= 2) {
      this.activeEchoes.shift();
    }

    const playbackTrajectory = JSON.parse(JSON.stringify(this.echoBuffer));
    this.activeEchoes.push({
      trajectory: playbackTrajectory,
      currentIndex: 0,
      x: playbackTrajectory[0].x,
      y: playbackTrajectory[0].y,
      angle: playbackTrajectory[0].angle,
      freq: playbackTrajectory[0].freq,
      isFiring: playbackTrajectory[0].isFiring,
      birthTime: performance.now(),
      loopCount: 0
    });

    this.sound.playEchoTrigger();
    this.particles.emitRings(this.player.x, this.player.y, ECHO_COLOR, 60);
    this.showToast('Zaman Yankısı Başlatıldı! Hayaletiniz geçmiş atışınızı tekrarlıyor.');

    const echoBtn = document.getElementById('echo-btn');
    if (echoBtn) echoBtn.classList.add('active-echo');
  }

  clearEchoes() {
    this.activeEchoes = [];
    const echoBtn = document.getElementById('echo-btn');
    if (echoBtn) echoBtn.classList.remove('active-echo');
    this.showToast('Tüm zaman yankıları temizlendi.');
  }

  updateTemporalEchoes(dt) {
    const now = performance.now();
    this.echoBuffer.push({
      x: this.player.x,
      y: this.player.y,
      angle: this.player.angle,
      freq: this.player.currentFreq,
      isFiring: this.player.isFiring,
      time: now
    });

    const maxFrames = Math.floor(this.bufferDuration * 60);
    if (this.echoBuffer.length > maxFrames) {
      this.echoBuffer.shift();
    }

    for (const echo of this.activeEchoes) {
      echo.currentIndex = (echo.currentIndex + 1) % echo.trajectory.length;
      const frame = echo.trajectory[echo.currentIndex];
      echo.x = frame.x;
      echo.y = frame.y;
      echo.angle = frame.angle;
      echo.freq = frame.freq;
      echo.isFiring = frame.isFiring;

      if (Math.random() < 0.25) {
        this.particles.emit(echo.x, echo.y, ECHO_COLOR, 1, 1, 2, 0.4);
      }
    }
  }

  findMirrorAt(x, y) {
    for (const m of this.mirrors) {
      if (Math.hypot(x - m.x, y - m.y) < 55) {
        return m;
      }
    }
    return null;
  }

  getMirrorHandleAt(x, y) {
    for (const m of this.mirrors) {
      // Check center handle (move)
      if (Math.hypot(x - m.x, y - m.y) < 22) {
        return { mirror: m, mode: 'move' };
      }
      // Check endpoint handles (rotate)
      if (Math.hypot(x - m.x1, y - m.y1) < 25 || Math.hypot(x - m.x2, y - m.y2) < 25 || Math.hypot(x - m.x, y - m.y) < 55) {
        return { mirror: m, mode: 'rotate' };
      }
    }
    return null;
  }

  // Exact 2D Line-Line Intersection returning coordinate
  getLineIntersection(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
    const s1_x = p1_x - p0_x;
    const s1_y = p1_y - p0_y;
    const s2_x = p3_x - p2_x;
    const s2_y = p3_y - p2_y;

    const s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    const t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      return {
        x: p0_x + (t * s1_x),
        y: p0_y + (t * s1_y)
      };
    }
    return null;
  }

  // ===========================================================================
  // 5. Flawless Multi-Bounce Raycasting & Gravitational Engine
  // ===========================================================================
  castRay(originX, originY, startAngle, freqKey) {
    const polylines = [];
    
    // Ray queue to support Beam Splitters splitting rays into two!
    const rayQueue = [{
      originX,
      originY,
      dirX: Math.cos(startAngle),
      dirY: Math.sin(startAngle),
      freq: freqKey,
      depth: 0
    }];

    const MAX_RAY_DEPTH = 3;

    while (rayQueue.length > 0) {
      const ray = rayQueue.shift();
      if (ray.depth > MAX_RAY_DEPTH) continue;

      let curX = ray.originX;
      let curY = ray.originY;
      let dirX = ray.dirX;
      let dirY = ray.dirY;
      let currentFreq = ray.freq;

      let currentPolyline = [{ x: curX, y: curY, color: FREQUENCIES[currentFreq]?.color || '#00f0ff' }];

      const STEP_SIZE = 7;
      const MAX_STEPS = 260;
      let bounces = 0;
      const MAX_BOUNCES = 8;
      let lastHitMirror = null;

      for (let step = 0; step < MAX_STEPS; step++) {
        const prevX = curX;
        const prevY = curY;

        // 1. Gravitational Deflection from Black Holes (Singularities)
        for (const hole of this.singularities) {
          const dx = hole.x - curX;
          const dy = hole.y - curY;
          const dist = Math.hypot(dx, dy);

          // Substantially reduced swallowing core: only swallows if hitting the ultra-dense center
          const swallowRadius = Math.min(hole.radius * 0.36, 10);
          if (dist <= swallowRadius) {
            this.particles.emit(curX, curY, '#c084fc', 2, 1, 1.5, 0.25);
            currentPolyline.push({ x: curX, y: curY, color: FREQUENCIES[currentFreq]?.color });
            polylines.push(currentPolyline);
            currentPolyline = [];
            break;
          }

          if (dist < hole.gravityRadius) {
            // Silky smooth Keplerian deflection curve (predictable and controllable)
            const pullFactor = this.gravityAssist ? 0.14 : 0.22;
            const factor = Math.pow(1 - dist / hole.gravityRadius, 1.35) * pullFactor;
            dirX += (dx / dist) * factor;
            dirY += (dy / dist) * factor;
            const len = Math.hypot(dirX, dirY);
            if (len > 0.0001) {
              dirX /= len;
              dirY /= len;
            }
          }
        }
        if (currentPolyline.length === 0) break;

        // 1b. Magnetic Crystal Resonance / Assistance (Guidance lock-on when near crystal)
        if (this.gravityAssist) {
          for (const target of this.targets) {
            if (!target.isSatisfied) {
              const tdx = target.x - curX;
              const tdy = target.y - curY;
              const tdist = Math.hypot(tdx, tdy);
              if (tdist < 48 && tdist > 4) {
                const guidePull = Math.pow(1 - tdist / 48, 1.4) * 0.16;
                dirX += (tdx / tdist) * guidePull;
                dirY += (tdy / tdist) * guidePull;
                const tlen = Math.hypot(dirX, dirY);
                if (tlen > 0.0001) {
                  dirX /= tlen;
                  dirY /= tlen;
                }
              }
            }
          }
        }

        // Advance photon step
        curX += dirX * STEP_SIZE;
        curY += dirY * STEP_SIZE;

        // 2. Cosmic Barriers Collision
        let hitBarrier = false;
        let barrierHitPoint = null;
        for (const b of this.barriers) {
          const hit = this.getLineIntersection(prevX, prevY, curX, curY, b.x1, b.y1, b.x2, b.y2);
          if (hit) {
            hitBarrier = true;
            barrierHitPoint = hit;
            break;
          }
        }
        if (hitBarrier && barrierHitPoint) {
          currentPolyline.push({ x: barrierHitPoint.x, y: barrierHitPoint.y, color: FREQUENCIES[currentFreq]?.color });
          this.particles.emit(barrierHitPoint.x, barrierHitPoint.y, '#64748b', 1, 1, 1.2, 0.15);
          break;
        }

        // 3. Target Crystals Collision
        let hitTarget = false;
        for (const t of this.targets) {
          if (Math.hypot(curX - t.x, curY - t.y) <= t.radius) {
            t.isBeingHit = true;
            t.hitFrequency = currentFreq;
            this.particles.emit(curX, curY, FREQUENCIES[currentFreq]?.color || '#fff', 2, 2, 2, 0.25);
            hitTarget = true;
            break;
          }
        }
        if (hitTarget) {
          currentPolyline.push({ x: curX, y: curY, color: FREQUENCIES[currentFreq]?.color });
          break;
        }

        // 4. Beam Splitter Prisms (Splits 1 beam into 2!)
        let hitSplitter = null;
        for (const bs of this.beamSplitters) {
          if (Math.hypot(curX - bs.x, curY - bs.y) <= bs.radius) {
            hitSplitter = bs;
            break;
          }
        }
        if (hitSplitter && ray.depth < MAX_RAY_DEPTH) {
          this.particles.emitRings(hitSplitter.x, hitSplitter.y, '#38bdf8', 25);
          // Splitter branch: 90 degree reflection
          rayQueue.push({
            originX: hitSplitter.x + -dirY * 8,
            originY: hitSplitter.y + dirX * 8,
            dirX: -dirY,
            dirY: dirX,
            freq: currentFreq,
            depth: ray.depth + 1
          });
        }

        // 5. Mirrors Collision & FLAWLESS Exact Reflection
        let hitMirror = null;
        let mirrorHitPoint = null;
        for (const m of this.mirrors) {
          if (m === lastHitMirror) continue; // Prevent same-mirror grazing bug!
          const hit = this.getLineIntersection(prevX, prevY, curX, curY, m.x1, m.y1, m.x2, m.y2);
          if (hit) {
            hitMirror = m;
            mirrorHitPoint = hit;
            break;
          }
        }

        if (hitMirror && mirrorHitPoint && bounces < MAX_BOUNCES) {
          bounces++;
          lastHitMirror = hitMirror;

          // Normal vector of mirror
          const mdx = hitMirror.x2 - hitMirror.x1;
          const mdy = hitMirror.y2 - hitMirror.y1;
          const mlen = Math.hypot(mdx, mdy);
          let nx = -mdy / mlen;
          let ny = mdx / mlen;

          if (dirX * nx + dirY * ny > 0) {
            nx = -nx;
            ny = -ny;
          }

          // Reflect formula: R = D - 2*(D·N)*N
          const dot = dirX * nx + dirY * ny;
          dirX = dirX - 2 * dot * nx;
          dirY = dirY - 2 * dot * ny;
          const dlen = Math.hypot(dirX, dirY);
          dirX /= dlen;
          dirY /= dlen;

          // End current segment right at mirror surface
          currentPolyline.push({ x: mirrorHitPoint.x, y: mirrorHitPoint.y, color: FREQUENCIES[currentFreq]?.color });
          polylines.push(currentPolyline);

          // Spawn next segment moving away from mirror surface cleanly
          curX = mirrorHitPoint.x + nx * 2 + dirX * 3;
          curY = mirrorHitPoint.y + ny * 2 + dirY * 3;

          currentPolyline = [{ x: mirrorHitPoint.x, y: mirrorHitPoint.y, color: FREQUENCIES[currentFreq]?.color }];

          this.sound.playReflectionChime(currentFreq, bounces);
          this.particles.emit(mirrorHitPoint.x, mirrorHitPoint.y, FREQUENCIES[currentFreq]?.color || '#fff', 3, 2, 2, 0.25);
          continue;
        }

        // 6. Prisms Collision
        let hitPrism = null;
        for (const p of this.prisms) {
          if (Math.hypot(curX - p.x, curY - p.y) <= p.radius) {
            hitPrism = p;
            break;
          }
        }
        if (hitPrism && currentFreq !== hitPrism.outputFreq) {
          currentFreq = hitPrism.outputFreq;
          this.particles.emitRings(hitPrism.x, hitPrism.y, FREQUENCIES[currentFreq].color, 24);
          currentPolyline.push({ x: curX, y: curY, color: FREQUENCIES[currentFreq]?.color });
          polylines.push(currentPolyline);
          currentPolyline = [{ x: curX, y: curY, color: FREQUENCIES[currentFreq]?.color }];
          curX += dirX * (hitPrism.radius * 0.7);
          curY += dirY * (hitPrism.radius * 0.7);
          continue;
        }

        // 7. Portals Collision
        let hitPortal = null;
        for (const port of this.portals) {
          if (Math.hypot(curX - port.x, curY - port.y) <= port.radius) {
            hitPortal = port;
            break;
          }
        }
        if (hitPortal) {
          const exit = this.portals.find(p => p.id === hitPortal.partnerId);
          if (exit) {
            currentPolyline.push({ x: curX, y: curY, color: FREQUENCIES[currentFreq]?.color });
            polylines.push(currentPolyline);

            this.particles.emitRings(exit.x, exit.y, '#38bdf8', 28);
            curX = exit.x + dirX * (exit.radius + 6);
            curY = exit.y + dirY * (exit.radius + 6);

            currentPolyline = [{ x: curX, y: curY, color: FREQUENCIES[currentFreq]?.color }];
            continue;
          }
        }

        // Boundary check
        if (curX < 0 || curX > this.width || curY < 0 || curY > this.height) {
          currentPolyline.push({ x: curX, y: curY, color: FREQUENCIES[currentFreq]?.color });
          break;
        }

        currentPolyline.push({ x: curX, y: curY, color: FREQUENCIES[currentFreq]?.color });
      }

      if (currentPolyline.length > 1) {
        polylines.push(currentPolyline);
      }
    }

    return polylines;
  }

  // ===========================================================================
  // 6. Player Movement & Collision
  // ===========================================================================
  updatePlayerMovement(dt) {
    let moveX = 0;
    let moveY = 0;
    if (this.keys.w || this.keys.ArrowUp) moveY -= 1;
    if (this.keys.s || this.keys.ArrowDown) moveY += 1;
    if (this.keys.a || this.keys.ArrowLeft) moveX -= 1;
    if (this.keys.d || this.keys.ArrowRight) moveX += 1;

    if (moveX !== 0 || moveY !== 0) {
      const len = Math.hypot(moveX, moveY);
      moveX /= len;
      moveY /= len;

      const newX = this.player.x + moveX * this.player.speed * dt;
      const newY = this.player.y + moveY * this.player.speed * dt;

      let canMoveX = true;
      let canMoveY = true;

      for (const b of this.barriers) {
        if (this.circleIntersectsSegment(newX, this.player.y, this.player.radius, b.x1, b.y1, b.x2, b.y2)) {
          canMoveX = false;
        }
        if (this.circleIntersectsSegment(this.player.x, newY, this.player.radius, b.x1, b.y1, b.x2, b.y2)) {
          canMoveY = false;
        }
      }

      if (canMoveX) this.player.x = newX;
      if (canMoveY) this.player.y = newY;
    }

    this.player.x = Math.max(30, Math.min(this.width - 30, this.player.x));
    this.player.y = Math.max(70, Math.min(this.height - 75, this.player.y));
  }

  circleIntersectsSegment(cx, cy, r, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.hypot(cx - x1, cy - y1) <= r;

    let t = ((cx - x1) * dx + (cy - y1) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));

    const projX = x1 + t * dx;
    const projY = y1 + t * dy;

    return Math.hypot(cx - projX, cy - projY) <= r;
  }

  // ===========================================================================
  // 7. Level Loading & Targets Logic
  // ===========================================================================
  loadLevel(index) {
    if (index < 0) index = 0;
    if (index >= LEVELS.length) {
      this.showToast('Tüm 20 bölümü tamamladınız! Gerçek bir Kozmik Ustasınız!');
      index = 0;
    }
    this.currentLevelIndex = index;
    const lvl = LEVELS[index];

    this.isLevelWon = false;
    this.levelStartTime = performance.now();
    this.echoBuffer = [];
    this.activeEchoes = [];

    this.player.x = lvl.player.x;
    this.player.y = lvl.player.y;
    this.player.angle = lvl.player.angle || 0;
    this.player.isFiring = this.isAutoFiring;
    this.setFrequency(lvl.player.initialFreq || 'SOL');

    // Load Mirrors with Safe Placement
    this.mirrors = (lvl.mirrors || []).map((m, idx) => {
      const mirror = {
        id: 'mirror_' + idx,
        type: 'mirror',
        x: m.x,
        y: m.y,
        length: m.length || 120,
        angle: m.angle || 0,
        x1: 0, y1: 0, x2: 0, y2: 0,
        updatePoints() {
          const half = this.length / 2;
          const cos = Math.cos(this.angle);
          const sin = Math.sin(this.angle);
          this.x1 = this.x - cos * half;
          this.y1 = this.y - sin * half;
          this.x2 = this.x + cos * half;
          this.y2 = this.y + sin * half;
        }
      };
      mirror.updatePoints();
      return mirror;
    });

    // Load Prisms
    this.prisms = (lvl.prisms || []).map(p => ({
      type: 'prism',
      x: p.x,
      y: p.y,
      radius: p.radius || 28,
      outputFreq: p.outputFreq || 'IGNIS',
      angle: p.angle || 0
    }));

    // Load Beam Splitters
    this.beamSplitters = (lvl.beamSplitters || []).map(bs => ({
      type: 'splitter',
      x: bs.x,
      y: bs.y,
      radius: bs.radius || 26
    }));

    // Load Singularities
    this.singularities = (lvl.singularities || []).map(s => ({
      type: 'singularity',
      x: s.x,
      y: s.y,
      radius: s.radius || 22,
      gravityRadius: s.gravityRadius || 190,
      pulse: 0
    }));

    // Load Portals
    this.portals = (lvl.portals || []).map(p => ({
      type: 'portal',
      id: p.id,
      partnerId: p.partnerId,
      x: p.x,
      y: p.y,
      radius: p.radius || 25,
      color: p.color || '#38bdf8'
    }));

    // Load Target Crystals
    this.targets = lvl.targets.map(t => ({
      type: 'target',
      x: t.x,
      y: t.y,
      radius: t.radius || 26,
      requiredFreq: t.requiredFreq || 'SOL',
      charge: 0,
      isBeingHit: false,
      hitFrequency: null,
      isSatisfied: false
    }));

    // Load Barriers
    this.barriers = (lvl.barriers || []).map(b => ({
      type: 'barrier',
      x1: b.x1, y1: b.y1,
      x2: b.x2, y2: b.y2
    }));

    // UI Updates
    const titleEl = document.getElementById('level-title');
    const descEl = document.getElementById('level-desc');
    const numEl = document.getElementById('level-number');

    if (titleEl) titleEl.textContent = lvl.title;
    if (descEl) descEl.textContent = lvl.desc;
    if (numEl) numEl.textContent = `Bölüm ${index + 1} / ${LEVELS.length}`;

    this.renderTargetsStatusUI();
    this.showToast(`Bölüm ${index + 1}: ${lvl.title}`);
  }

  restartLevel() {
    this.loadLevel(this.currentLevelIndex);
  }

  renderTargetsStatusUI() {
    const container = document.getElementById('targets-status');
    if (!container) return;
    container.innerHTML = '';

    this.targets.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = 'target-item';
      const col = FREQUENCIES[t.requiredFreq]?.color || '#ffffff';
      item.innerHTML = `
        <div class="target-dot" style="background-color: ${col}; box-shadow: 0 0 6px ${col};"></div>
        <span>K${i+1} (${t.requiredFreq})</span>
        <div class="target-progress-bar">
          <div class="target-progress-fill" id="target-prog-${i}" style="background-color: ${col}; width: 0%;"></div>
        </div>
      `;
      container.appendChild(item);
    });
  }

  updateTargets(dt) {
    let allSatisfied = true;

    this.targets.forEach((t, i) => {
      if (t.isBeingHit && t.hitFrequency === t.requiredFreq) {
        t.charge = Math.min(100, t.charge + dt * 44);
        if (Math.random() < 0.2) {
          this.sound.playCrystalCharge(t.charge / 100);
        }
      } else {
        t.charge = Math.max(0, t.charge - dt * 26);
      }

      t.isSatisfied = t.charge >= 95;
      if (!t.isSatisfied) allSatisfied = false;

      const fillEl = document.getElementById(`target-prog-${i}`);
      if (fillEl) fillEl.style.width = `${Math.floor(t.charge)}%`;

      t.isBeingHit = false;
      t.hitFrequency = null;
    });

    if (allSatisfied && !this.isLevelWon && this.targets.length > 0) {
      this.triggerVictory();
    }
  }

  triggerVictory() {
    this.isLevelWon = true;
    this.sound.playVictory();
    const elapsedSec = ((performance.now() - this.levelStartTime) / 1000).toFixed(1);
    this.score += 500;

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const x = this.width * (0.2 + Math.random() * 0.6);
        const y = this.height * (0.2 + Math.random() * 0.5);
        this.particles.emitRings(x, y, '#38bdf8', 80);
        this.particles.emit(x, y, '#fbbf24', 25, 4, 3, 0.8);
      }, i * 140);
    }

    setTimeout(() => {
      const timeVal = document.getElementById('stat-time-val');
      const scoreVal = document.getElementById('stat-score-val');
      const echoVal = document.getElementById('stat-echoes-val');

      if (timeVal) timeVal.textContent = `${elapsedSec}s`;
      if (scoreVal) scoreVal.textContent = `+500`;
      if (echoVal) echoVal.textContent = `${this.activeEchoes.length} Aktif`;

      this.showModal('victory-modal');
    }, 900);
  }

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('show');
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('show');
  }

  buildLevelSelectGrid() {
    const grid = document.getElementById('levels-grid');
    if (!grid) return;
    grid.innerHTML = '';

    LEVELS.forEach((lvl, idx) => {
      const tile = document.createElement('div');
      tile.className = `level-tile ${idx === this.currentLevelIndex ? 'active-level' : ''}`;
      tile.innerHTML = `
        <div class="level-num">${idx + 1}</div>
        <div class="level-name">${lvl.title}</div>
        <div class="level-stars">★ ★ ★</div>
      `;
      tile.addEventListener('click', () => {
        this.hideModal('levels-modal');
        this.loadLevel(idx);
      });
      grid.appendChild(tile);
    });
  }

  // ===========================================================================
  // 8. Main Render & Physics Simulation Loop
  // ===========================================================================
  update(dt) {
    if (this.isSlowMotion) dt *= 0.5;

    this.updatePlayerMovement(dt);
    this.player.glowPulse = (this.player.glowPulse + dt * 4) % (Math.PI * 2);

    this.particles.update();
    this.updateTemporalEchoes(dt);
    this.updateTargets(dt);

    for (const hole of this.singularities) {
      hole.pulse = (hole.pulse + dt * 3) % (Math.PI * 2);
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Nebulae Glow
    for (const neb of this.nebulaOrbs) {
      const grad = ctx.createRadialGradient(neb.x, neb.y, 10, neb.x, neb.y, neb.r);
      grad.addColorStop(0, neb.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(neb.x, neb.y, neb.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Starfield
    for (const s of this.stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.fill();
    }

    // 3. Cosmic Barriers (Walls)
    ctx.save();
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#334155';
    ctx.lineCap = 'round';
    for (const b of this.barriers) {
      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      ctx.lineTo(b.x2, b.y2);
      ctx.stroke();
    }
    ctx.restore();

    // 4. Singularities (Black Holes with Gravitational Accretion Disk & Lensing Guides)
    for (const hole of this.singularities) {
      ctx.save();
      const grad = ctx.createRadialGradient(hole.x, hole.y, hole.radius * 0.4, hole.x, hole.y, hole.gravityRadius);
      grad.addColorStop(0, 'rgba(168, 85, 247, 0.45)');
      grad.addColorStop(0.35, 'rgba(126, 34, 206, 0.18)');
      grad.addColorStop(0.7, 'rgba(79, 70, 229, 0.06)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(hole.x, hole.y, hole.gravityRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Gravitational lensing guide ring (shows safe slingshot orbit zone)
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, hole.radius + 24, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Accretion disk rings
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, hole.radius + 8 + Math.sin(hole.pulse) * 2.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 14;
      ctx.stroke();

      // Accretion inner photon ring
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, Math.min(hole.radius * 0.36, 10) + 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
      ctx.fill();

      // Singularity core (only swallows within this small nucleus)
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, Math.min(hole.radius * 0.36, 10), 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.restore();
    }

    // 5. Portals
    for (const portal of this.portals) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(portal.x, portal.y, portal.radius, 0, Math.PI * 2);
      ctx.strokeStyle = portal.color;
      ctx.lineWidth = 3;
      ctx.shadowColor = portal.color;
      ctx.shadowBlur = 16;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(portal.x, portal.y, portal.radius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fill();
      ctx.restore();
    }

    // 6. Prisms
    for (const prism of this.prisms) {
      ctx.save();
      ctx.translate(prism.x, prism.y);
      ctx.rotate(prism.angle);

      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
        const px = Math.cos(a) * prism.radius;
        const py = Math.sin(a) * prism.radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // 6b. Beam Splitters (Diamond Refractors)
    for (const bs of this.beamSplitters) {
      ctx.save();
      ctx.translate(bs.x, bs.y);
      ctx.beginPath();
      ctx.moveTo(0, -bs.radius);
      ctx.lineTo(bs.radius, 0);
      ctx.lineTo(0, bs.radius);
      ctx.lineTo(-bs.radius, 0);
      ctx.closePath();

      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 9px var(--font-body)';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SPLIT', 0, 0);
      ctx.restore();
    }

    // 7. Mirrors & Enhanced Precision Gizmos
    for (const m of this.mirrors) {
      ctx.save();
      const isHovered = (this.hoveredMirror === m);
      const isDragged = (this.draggedMirror === m);

      // Mirror reflective bar
      ctx.beginPath();
      ctx.moveTo(m.x1, m.y1);
      ctx.lineTo(m.x2, m.y2);
      ctx.strokeStyle = isHovered || isDragged ? '#38bdf8' : '#f8fafc';
      ctx.lineWidth = isHovered || isDragged ? 6 : 4.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = isHovered || isDragged ? 16 : 9;
      ctx.stroke();

      // Mirror Center Move Handle (Drag to position)
      ctx.beginPath();
      ctx.arc(m.x, m.y, 9, 0, Math.PI * 2);
      ctx.fillStyle = isDragged && this.dragMode === 'move' ? '#38bdf8' : '#0284c7';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Mirror End Rotation Handles (Drag or scroll to rotate)
      ctx.beginPath();
      ctx.arc(m.x1, m.y1, 6, 0, Math.PI * 2);
      ctx.arc(m.x2, m.y2, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Angle indicator readout when hovered or dragged
      if (isHovered || isDragged) {
        ctx.beginPath();
        ctx.arc(m.x, m.y, 28, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const deg = Math.round((m.angle * 180 / Math.PI + 360) % 180);
        ctx.font = '600 11px var(--font-mono)';
        ctx.fillStyle = '#fef08a';
        ctx.textAlign = 'center';
        ctx.fillText(`${deg}°`, m.x, m.y - 34);
      }
      ctx.restore();
    }

    // 8. Visual Solution Ghost Guide (If toggled by user)
    if (this.showGhostSolution) {
      const lvl = LEVELS[this.currentLevelIndex];
      if (lvl && lvl.solutionPath) {
        ctx.save();
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
        ctx.beginPath();
        lvl.solutionPath.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
        ctx.restore();
      }
    }

    // 9. Light Beams (Echoes and Player)
    for (const echo of this.activeEchoes) {
      if (echo.isFiring) {
        const polylines = this.castRay(echo.x, echo.y, echo.angle, echo.freq);
        this.drawPolylines(ctx, polylines, true);
      }
    }

    if (this.player.isFiring) {
      const polylines = this.castRay(this.player.x, this.player.y, this.player.angle, this.player.currentFreq);
      this.drawPolylines(ctx, polylines, false);
    }

    // 10. Target Crystals
    for (const t of this.targets) {
      ctx.save();
      const col = FREQUENCIES[t.requiredFreq]?.color || '#ffffff';

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const px = t.x + Math.cos(a) * t.radius;
        const py = t.y + Math.sin(a) * t.radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      const fillAlpha = 0.2 + (t.charge / 100) * 0.7;
      ctx.fillStyle = col;
      ctx.globalAlpha = fillAlpha;
      ctx.shadowColor = col;
      ctx.shadowBlur = t.charge > 50 ? 25 : 10;
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.strokeStyle = t.isSatisfied ? '#ffffff' : col;
      ctx.lineWidth = t.isSatisfied ? 3.5 : 2;
      ctx.stroke();

      ctx.font = '700 11px var(--font-body)';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 0;
      ctx.fillText(`${Math.floor(t.charge)}%`, t.x, t.y);

      ctx.restore();
    }

    // 11. Temporal Echo Phantoms
    for (const echo of this.activeEchoes) {
      ctx.save();
      ctx.translate(echo.x, echo.y);
      ctx.rotate(echo.angle);

      ctx.beginPath();
      ctx.arc(0, 0, this.player.radius * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(244, 63, 94, 0.35)';
      ctx.strokeStyle = ECHO_COLOR;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = ECHO_COLOR;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(22, 0);
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.restore();
    }

    // 12. Player Core (Lumina)
    ctx.save();
    ctx.translate(this.player.x, this.player.y);
    ctx.rotate(this.player.angle);

    const activeCol = FREQUENCIES[this.player.currentFreq].color;
    const pulseRadius = this.player.radius + Math.sin(this.player.glowPulse) * 2.5;

    ctx.beginPath();
    ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = FREQUENCIES[this.player.currentFreq].glow;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, this.player.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = activeCol;
    ctx.lineWidth = 3;
    ctx.shadowColor = activeCol;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(26, 0);
    ctx.strokeStyle = activeCol;
    ctx.lineWidth = 3.5;
    ctx.stroke();

    ctx.restore();

    // 13. Particles
    this.particles.draw(ctx);
  }

  drawPolylines(ctx, polylines, isGhost = false) {
    ctx.save();
    for (const poly of polylines) {
      if (poly.length < 2) continue;

      const beamColor = isGhost ? ECHO_COLOR : (poly[0].color || '#00f0ff');

      // Outer glow polyline
      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x, poly[i].y);
      }
      ctx.strokeStyle = beamColor;
      ctx.lineWidth = isGhost ? 5 : 7;
      ctx.globalAlpha = isGhost ? 0.35 : 0.45;
      ctx.shadowColor = beamColor;
      ctx.shadowBlur = 14;
      ctx.stroke();

      // Inner crisp core line
      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x, poly[i].y);
      }
      ctx.strokeStyle = isGhost ? '#ffe4e6' : '#ffffff';
      ctx.lineWidth = 2;
      ctx.globalAlpha = isGhost ? 0.8 : 0.95;
      ctx.stroke();
    }
    ctx.restore();
  }

  animate(currentTime) {
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    this.update(dt);
    this.draw();

    requestAnimationFrame(this.animate);
  }
}

// =============================================================================
// 9. 20 Hand-Crafted Puzzle Levels (Unobstructed Spacing & Real Solutions)
// =============================================================================
const LEVELS = [
  // 1: İlk Işık (First Light)
  {
    title: 'İlk Işık (First Light)',
    desc: 'W, A, S, D tuşlarıyla hareket edin. Farenizle nişan alarak Sol (432Hz Mavi) ışınını kristale yöneltin.',
    hints: [
      '1. Adım: W, A, S, D ile karakterinizi yönlendirin.',
      '2. Adım: Frekansınız Sol (Mavi) seçilidir. Farenizle sağdaki kristale nişan alın.',
      '3. Adım: Kristal %100 dolana kadar ışını üzerinde tutun.'
    ],
    player: { x: 200, y: 380, initialFreq: 'SOL' },
    targets: [{ x: 750, y: 380, requiredFreq: 'SOL', radius: 28 }],
    solutionPath: [{ x: 200, y: 380 }, { x: 750, y: 380 }]
  },

  // 2: Yansıma Akoru (Reflection) - Mirror moved to open y:210, well away from top bar!
  {
    title: 'Yansıma Akoru (Reflection)',
    desc: 'Ortadaki kalın duvar doğrudan atışı engelliyor. Yukarıdaki aynanın açısını fareyle ayarlayarak ışığı kristale yansıtın.',
    hints: [
      '1. Adım: Karşıdaki duvar dümdüz atışları engelliyor.',
      '2. Adım: Ortadaki aynayı fareyle tutup açısını 45 dereceye çevirin (veya fare tekerleğini ayna üzerinde kaydırın).',
      '3. Adım: Işını aynaya gönderin; ayna ışığı alttaki kristale yansıtarak şarj edecektir.'
    ],
    player: { x: 200, y: 480, initialFreq: 'SOL' },
    barriers: [{ x1: 480, y1: 270, x2: 480, y2: 600 }],
    mirrors: [{ x: 480, y: 210, angle: Math.PI / 4, length: 130 }],
    targets: [{ x: 780, y: 480, requiredFreq: 'SOL', radius: 28 }],
    solutionPath: [{ x: 200, y: 480 }, { x: 480, y: 210 }, { x: 780, y: 480 }]
  },

  // 3: Zaman Yankısı (Temporal Echo)
  {
    title: 'Zaman Yankısı (Temporal Echo)',
    desc: '2 ayrı kristali aynı anda beslemelisiniz! Önce 1. kristale nişan alıp BOŞLUK tuşuna basın, sonra 2. kristali siz vurun.',
    hints: [
      '1. Adım: Önce üstteki K1 kristaline nişan alıp ışını üzerinde tutun.',
      '2. Adım: [BOŞLUK] tuşuna basarak bir Zaman Yankısı (Hayalet) oluşturun.',
      '3. Adım: Şimdi farenizi alttaki K2 kristaline çevirin. İkisi aynı anda dolduğunda kapı açılır!'
    ],
    player: { x: 240, y: 380, initialFreq: 'SOL' },
    barriers: [
      { x1: 480, y1: 260, x2: 480, y2: 480 },
      { x1: 480, y1: 380, x2: 850, y2: 380 }
    ],
    targets: [
      { x: 750, y: 220, requiredFreq: 'SOL', radius: 26 },
      { x: 750, y: 520, requiredFreq: 'SOL', radius: 26 }
    ],
    solutionPath: [{ x: 240, y: 380 }, { x: 750, y: 220 }]
  },

  // 4: Prizmatik Ayrışma (Spectral Refraction)
  {
    title: 'Prizmatik Ayrışma (Prism)',
    desc: 'Prizma içinden geçen ışığı Ignis (Turuncu) yapar. Prizmadan geçen ışını turuncu kristale ulaştırın.',
    hints: [
      '1. Adım: Prizma ışığı Ignis (Turuncu) yapar.',
      '2. Adım: Işını prizmanın içinden geçirip alttaki turuncu kristale yöneltin ve [BOŞLUK] ile Zaman Yankısı oluşturun.',
      '3. Adım: Ardından farenizi üstteki mavi kristale çevirip doğrudan besleyin.'
    ],
    player: { x: 180, y: 380, initialFreq: 'SOL' },
    barriers: [{ x1: 520, y1: 280, x2: 520, y2: 460 }],
    prisms: [{ x: 440, y: 480, radius: 28, outputFreq: 'IGNIS' }],
    targets: [
      { x: 780, y: 230, requiredFreq: 'SOL', radius: 26 },
      { x: 780, y: 520, requiredFreq: 'IGNIS', radius: 26 }
    ],
    solutionPath: [{ x: 180, y: 380 }, { x: 440, y: 480 }, { x: 780, y: 520 }]
  },

  // 5: Kütleçekim Merceği (Gravity Singularity)
  {
    title: 'Kütleçekim Merceği (Singularity)',
    desc: 'Kara deliğin yerçekimsel alanı ışığı büker! Duvarın arkasındaki kristali vurmak için ışını kara deliğin kenarından geçirin.',
    hints: [
      '1. Adım: Ortadaki duvar düz atışları engelliyor.',
      '2. Adım: Işını yukarıdaki mor kara deliğin hemen sağ kenarından geçirin.',
      '3. Adım: Yerçekimi ışığı kavisli bir yay şeklinde bükerek kristale ulaştıracaktır!'
    ],
    player: { x: 200, y: 480, initialFreq: 'SOL' },
    barriers: [{ x1: 500, y1: 260, x2: 500, y2: 600 }],
    singularities: [{ x: 500, y: 190, radius: 24, gravityRadius: 210 }],
    targets: [{ x: 800, y: 480, requiredFreq: 'SOL', radius: 28 }],
    solutionPath: [{ x: 200, y: 480 }, { x: 500, y: 220 }, { x: 800, y: 480 }]
  },

  // 6: Kuantum Geçidi (Portals)
  {
    title: 'Kuantum Geçidi (Portals)',
    desc: 'Işını solucan deliğine gönderin. Çıkan ışını ayna ile yönlendirerek hedefi vurun.',
    hints: [
      '1. Adım: Frekansınızı [2] tuşuyla Ignis (Turuncu) yapın.',
      '2. Adım: Işını üstteki mavi portala gönderin. Işın alttaki portaldan çıkacaktır.',
      '3. Adım: Alttaki aynayı döndürerek çıkan ışının sağdaki kristale gitmesini sağlayın.'
    ],
    player: { x: 180, y: 250, initialFreq: 'IGNIS' },
    barriers: [{ x1: 500, y1: 170, x2: 500, y2: 450 }],
    portals: [
      { id: 'p1', partnerId: 'p2', x: 420, y: 250, radius: 26, color: '#38bdf8' },
      { id: 'p2', partnerId: 'p1', x: 220, y: 520, radius: 26, color: '#38bdf8' }
    ],
    mirrors: [{ x: 600, y: 520, angle: Math.PI / 4, length: 130 }],
    targets: [{ x: 600, y: 250, requiredFreq: 'IGNIS', radius: 26 }]
  },

  // 7: Dört Frekans Armonisi (Tetra-Harmonics)
  {
    title: 'Dört Frekans Armonisi (Tetra)',
    desc: '3 farklı kristal farklı renkler istiyor. Zaman yankılarınızı doğru renklere ayarlayın!',
    hints: [
      '1. Adım: [3] ile Terra (Yeşil) seçip üst kristali besleyin ve [BOŞLUK] ile ilk yankıyı bırakın.',
      '2. Adım: [1] ile Sol (Mavi) seçip orta kristali besleyin ve [BOŞLUK] ile ikinci yankıyı bırakın.',
      '3. Adım: [2] ile Ignis (Turuncu) seçip alt kristali siz vurun.'
    ],
    player: { x: 200, y: 380, initialFreq: 'TERRA' },
    barriers: [{ x1: 480, y1: 240, x2: 480, y2: 480 }],
    targets: [
      { x: 750, y: 200, requiredFreq: 'TERRA', radius: 25 },
      { x: 750, y: 380, requiredFreq: 'SOL', radius: 25 },
      { x: 750, y: 550, requiredFreq: 'IGNIS', radius: 25 }
    ]
  },

  // 8: Üçlü Zaman Senfonisi (Polyphony)
  {
    title: 'Üçlü Zaman Senfonisi (Polyphony)',
    desc: 'Aynaları açılı yerleştirin. 2 zaman yankısı ve kendi ışınınızla 3 hedefi birden besleyin.',
    hints: [
      '1. Adım: Frekansınızı Aether (Ametist Moru) yapın.',
      '2. Adım: Üst aynaya vurarak üst hedefi besleyin ve [BOŞLUK] ile ilk yankıyı kaydedin.',
      '3. Adım: Alt aynaya vurarak alt hedefi besleyin ve [BOŞLUK] ile ikinci yankıyı kaydedin.',
      '4. Adım: Orta hedefi doğrudan siz vurun!'
    ],
    player: { x: 180, y: 380, initialFreq: 'AETHER' },
    barriers: [{ x1: 520, y1: 260, x2: 520, y2: 460 }],
    mirrors: [
      { x: 480, y: 200, angle: -Math.PI / 4, length: 120 },
      { x: 480, y: 550, angle: Math.PI / 4, length: 120 }
    ],
    targets: [
      { x: 800, y: 200, requiredFreq: 'AETHER', radius: 25 },
      { x: 800, y: 380, requiredFreq: 'AETHER', radius: 25 },
      { x: 800, y: 550, requiredFreq: 'AETHER', radius: 25 }
    ]
  },

  // 9: Kozmik Labirent (Singularity Maze)
  {
    title: 'Kozmik Labirent (Cosmic Labyrinth)',
    desc: 'Hem kara delik hem portal bir arada! Portaldan çıkan ışınla bir hedefi, kara delikten bükülen ışınla diğerini vurun.',
    hints: [
      '1. Adım: Işını önce soldaki portala gönderin. Sağdaki portaldan çıkan ışınla hedefi beslerken [BOŞLUK] ile yankı bırakın.',
      '2. Adım: Şimdi ortadaki kara deliğin kenarından ışını bükerek alt kristali besleyin.'
    ],
    player: { x: 160, y: 480, initialFreq: 'SOL' },
    barriers: [
      { x1: 420, y1: 180, x2: 420, y2: 550 },
      { x1: 650, y1: 180, x2: 650, y2: 550 }
    ],
    singularities: [{ x: 530, y: 360, radius: 22, gravityRadius: 200 }],
    portals: [
      { id: 'p1', partnerId: 'p2', x: 280, y: 220, radius: 24, color: '#c084fc' },
      { id: 'p2', partnerId: 'p1', x: 750, y: 220, radius: 24, color: '#c084fc' }
    ],
    targets: [
      { x: 800, y: 480, requiredFreq: 'SOL', radius: 26 },
      { x: 530, y: 550, requiredFreq: 'SOL', radius: 26 }
    ]
  },

  // 10: Kozmik Çekirdek (Grand Finale 1)
  {
    title: 'Kozmik Çekirdek (Grand Finale 1)',
    desc: 'Prizma, ayna, kara delik ve zaman yankılarının muhteşem harmonisi!',
    hints: [
      '1. Adım: Prizmaya vurup Aether (Mor) ışını üstteki kristale gönderin ve [BOŞLUK] ile yankı oluşturun.',
      '2. Adım: Alttaki aynayı döndürerek alttaki Ignis (Turuncu) kristali vurun ve yankı oluşturun.',
      '3. Adım: Ortadaki kristali kendiniz besleyin.'
    ],
    player: { x: 180, y: 380, initialFreq: 'SOL' },
    barriers: [{ x1: 520, y1: 270, x2: 520, y2: 450 }],
    prisms: [{ x: 420, y: 220, radius: 30, outputFreq: 'AETHER' }],
    singularities: [{ x: 600, y: 220, radius: 22, gravityRadius: 190 }],
    mirrors: [{ x: 600, y: 520, angle: Math.PI / 4, length: 140 }],
    targets: [
      { x: 820, y: 220, requiredFreq: 'AETHER', radius: 28 },
      { x: 820, y: 380, requiredFreq: 'SOL', radius: 28 },
      { x: 820, y: 520, requiredFreq: 'IGNIS', radius: 28 }
    ]
  },

  // 11: Zümrüt Kalkanı (Terra Resonance)
  {
    title: 'Zümrüt Kalkanı (Terra Resonance)',
    desc: 'Terra (639Hz Zümrüt) frekansı ile çift ayna zikzakı yapın.',
    hints: [
      '1. Adım: Frekansınızı [3] ile Terra (Yeşil) yapın.',
      '2. Adım: Aynaların açılarını zikzak şeklinde ayarlayın.',
      '3. Adım: Işını önce 1. aynaya, oradan 2. aynaya çarptırarak hedef kristale ulaştırın.'
    ],
    player: { x: 160, y: 380, initialFreq: 'TERRA' },
    barriers: [{ x1: 450, y1: 240, x2: 450, y2: 550 }],
    mirrors: [
      { x: 450, y: 190, angle: Math.PI / 4, length: 120 },
      { x: 620, y: 290, angle: -Math.PI / 4, length: 120 }
    ],
    targets: [{ x: 820, y: 290, requiredFreq: 'TERRA', radius: 26 }]
  },

  // 12: Zaman Tüneli (Temporal Wormhole)
  {
    title: 'Zaman Tüneli (Temporal Wormhole)',
    desc: 'Portala giren bir zaman yankısı oluşturun.',
    hints: [
      '1. Adım: Işını mavi portala gönderin.',
      '2. Adım: Portala ateş ederken [BOŞLUK] tuşuna basıp zaman yankısı bırakın.',
      '3. Adım: Şimdi diğer açık hedefe dönüp onu kendiniz besleyin.'
    ],
    player: { x: 200, y: 340, initialFreq: 'IGNIS' },
    barriers: [{ x1: 500, y1: 230, x2: 500, y2: 480 }],
    portals: [
      { id: 'p1', partnerId: 'p2', x: 380, y: 340, radius: 26, color: '#38bdf8' },
      { id: 'p2', partnerId: 'p1', x: 650, y: 220, radius: 26, color: '#38bdf8' }
    ],
    targets: [
      { x: 820, y: 220, requiredFreq: 'IGNIS', radius: 26 },
      { x: 820, y: 480, requiredFreq: 'IGNIS', radius: 26 }
    ]
  },

  // 13: Işın Bölücü Kristal (Beam Splitter Prism) - YENİ ÖZELLİK!
  {
    title: 'Işın Bölücü (Beam Splitter)',
    desc: 'Yeni optik teknoloji: Işın Bölücü Prizma! Tek bir ışını ikiye bölerek aynı anda iki farklı koridora yönlendirin.',
    hints: [
      '1. Adım: Ortadaki elmas şeklindeki Işın Bölücüye (SPLIT) nişan alın.',
      '2. Adım: Işın bölücü tek demeti ikiye ayırarak hem düz hem dik açıyla iki hedefe ulaştırır.',
      '3. Adım: Gerekirse [E] tuşuna basarak Nova dalgasıyla son dolumu hızlandırın.'
    ],
    player: { x: 180, y: 450, initialFreq: 'SOL' },
    barriers: [{ x1: 500, y1: 260, x2: 500, y2: 460 }],
    beamSplitters: [{ x: 440, y: 450, radius: 26 }],
    mirrors: [{ x: 440, y: 240, angle: Math.PI / 4, length: 120 }],
    targets: [
      { x: 800, y: 240, requiredFreq: 'SOL', radius: 26 },
      { x: 800, y: 450, requiredFreq: 'SOL', radius: 26 }
    ]
  },

  // 14: Karadelik Yörüngesi (Event Horizon)
  {
    title: 'Karadelik Yörüngesi (Event Horizon)',
    desc: 'Işını karadeliğin tam kenarından geçirerek 180 derece bükün.',
    hints: [
      '1. Adım: Frekansınızı Aether yapın.',
      '2. Adım: Karadeliğin teğet noktasını bulun. Işın tam kenardan geçerken kavis çizerek arkaya dönecektir.',
      '3. Adım: [Q] tuşuna basarak Ağır Çekim ile ince nişan alabilirsiniz.'
    ],
    player: { x: 220, y: 380, initialFreq: 'AETHER' },
    barriers: [{ x1: 520, y1: 260, x2: 520, y2: 500 }],
    singularities: [{ x: 520, y: 380, radius: 26, gravityRadius: 230 }],
    targets: [{ x: 820, y: 380, requiredFreq: 'AETHER', radius: 28 }]
  },

  // 15: Dört Element Dansı (Dance of Elements)
  {
    title: 'Dört Element Dansı (Dance of Elements)',
    desc: 'Dört farklı frekanstaki hedefi zaman yankılarıyla senkronize edin.',
    hints: [
      '1. Adım: [1, 2, 3, 4] tuşlarıyla frekansları sırayla seçin.',
      '2. Adım: İlk iki hedefi vururken [BOŞLUK] ile iki ayrı yankı oluşturun.',
      '3. Adım: Kalan hedefleri sırayla besleyerek hepsi %100 olana kadar dengede tutun.'
    ],
    player: { x: 200, y: 380, initialFreq: 'SOL' },
    targets: [
      { x: 750, y: 190, requiredFreq: 'SOL', radius: 24 },
      { x: 750, y: 310, requiredFreq: 'IGNIS', radius: 24 },
      { x: 750, y: 440, requiredFreq: 'TERRA', radius: 24 },
      { x: 750, y: 560, requiredFreq: 'AETHER', radius: 24 }
    ]
  },

  // 16: Çapraz Yansımalar (Crossfire Echoes)
  {
    title: 'Çapraz Yansımalar (Crossfire Echoes)',
    desc: 'İki aynayı çapraz konumlandırarak ışınları yönlendirin. Aynaları fare tekerleğiyle hassasça çevirebilirsiniz.',
    hints: [
      '1. Adım: Üst aynayı aşağıya, alt aynayı yukarıya çapraz açılandırın.',
      '2. Adım: Bir açıyı zaman yankısına devredin.',
      '3. Adım: İkinci açıyı kendiniz besleyin.'
    ],
    player: { x: 180, y: 380, initialFreq: 'SOL' },
    mirrors: [
      { x: 450, y: 220, angle: Math.PI / 3, length: 130 },
      { x: 450, y: 520, angle: -Math.PI / 3, length: 130 }
    ],
    targets: [
      { x: 780, y: 220, requiredFreq: 'SOL', radius: 26 },
      { x: 780, y: 520, requiredFreq: 'SOL', radius: 26 }
    ]
  },

  // 17: İkili Karadelik Çekimi (Binary Singularities)
  {
    title: 'İkili Karadelik (Binary Singularities)',
    desc: 'İki karadeliğin arasındaki kütleçekim tünelinden ışını geçirin.',
    hints: [
      '1. Adım: İki karadeliğin tam ortasındaki boşluğu hedefleyin.',
      '2. Adım: Çekim kuvvetleri dengelenerek ışını hedef kristale odaklayacaktır.',
      '3. Adım: Kristal dolana kadar odağı koruyun.'
    ],
    player: { x: 180, y: 380, initialFreq: 'TERRA' },
    barriers: [{ x1: 520, y1: 180, x2: 520, y2: 600 }],
    singularities: [
      { x: 480, y: 250, radius: 22, gravityRadius: 180 },
      { x: 480, y: 500, radius: 22, gravityRadius: 180 }
    ],
    targets: [{ x: 820, y: 380, requiredFreq: 'TERRA', radius: 28 }]
  },

  // 18: Kuantum Kaskadı (Quantum Cascade)
  {
    title: 'Kuantum Kaskadı (Quantum Cascade)',
    desc: 'Portal içine giren ışını prizma ile dönüştürüp besleyin.',
    hints: [
      '1. Adım: Işını portala gönderin, portaldan çıkan ışın prizmaya girsin.',
      '2. Adım: [BOŞLUK] ile zaman yankısı oluşturup diğer hedefi kendiniz besleyin.'
    ],
    player: { x: 180, y: 250, initialFreq: 'SOL' },
    barriers: [{ x1: 460, y1: 190, x2: 460, y2: 550 }],
    portals: [
      { id: 'p1', partnerId: 'p2', x: 380, y: 250, radius: 26, color: '#38bdf8' },
      { id: 'p2', partnerId: 'p1', x: 380, y: 500, radius: 26, color: '#38bdf8' }
    ],
    prisms: [{ x: 550, y: 500, radius: 26, outputFreq: 'AETHER' }],
    targets: [
      { x: 800, y: 250, requiredFreq: 'SOL', radius: 26 },
      { x: 800, y: 500, requiredFreq: 'AETHER', radius: 26 }
    ]
  },

  // 19: Zamanın Aynası (Mirror of Eternity)
  {
    title: 'Zamanın Aynası (Mirror of Eternity)',
    desc: '3 farklı zaman katmanını aynalar yardımıyla birbirine bağlayın.',
    hints: [
      '1. Adım: Üst aynayı Sol frekansıyla vurup [BOŞLUK] ile kaydedin.',
      '2. Adım: Alt aynayı Ignis frekansıyla vurup [BOŞLUK] ile kaydedin.',
      '3. Adım: Merkeze geçip Terra kristalini siz besleyin.'
    ],
    player: { x: 200, y: 380, initialFreq: 'SOL' },
    barriers: [{ x1: 520, y1: 270, x2: 520, y2: 470 }],
    mirrors: [
      { x: 480, y: 210, angle: Math.PI / 4, length: 120 },
      { x: 480, y: 540, angle: -Math.PI / 4, length: 120 }
    ],
    targets: [
      { x: 800, y: 210, requiredFreq: 'SOL', radius: 26 },
      { x: 800, y: 380, requiredFreq: 'TERRA', radius: 26 },
      { x: 800, y: 540, requiredFreq: 'IGNIS', radius: 26 }
    ]
  },

  // 20: Sonsuzluk Rezonansı (Omega Finale)
  {
    title: 'Sonsuzluk Rezonansı (Omega Finale)',
    desc: 'Kozmik evrenin nihai harmonisi. Işın Bölücü, karadelik, portallar ve zaman yankılarıyla 20. Bölüm Zaferi!',
    hints: [
      '1. Adım: Portal ve Işın Bölücüyü kullanarak üstteki Aether hedefini vurun ve Zaman Yankısını kaydedin.',
      '2. Adım: Aynayı karadeliğin altından Ignis kristaline çevirip ikinci Zaman Yankısını kaydedin.',
      '3. Adım: Karakterinizi Terra frekansına alıp ortadaki büyük Kozmik Çekirdeği besleyin ve [E] ile Nova patlatın!'
    ],
    player: { x: 160, y: 380, initialFreq: 'SOL' },
    barriers: [
      { x1: 420, y1: 180, x2: 420, y2: 600 },
      { x1: 680, y1: 270, x2: 680, y2: 470 }
    ],
    portals: [
      { id: 'p1', partnerId: 'p2', x: 320, y: 210, radius: 26, color: '#38bdf8' },
      { id: 'p2', partnerId: 'p1', x: 550, y: 210, radius: 26, color: '#38bdf8' }
    ],
    beamSplitters: [{ x: 460, y: 380, radius: 26 }],
    singularities: [{ x: 550, y: 500, radius: 24, gravityRadius: 190 }],
    mirrors: [{ x: 340, y: 530, angle: -Math.PI / 4, length: 120 }],
    targets: [
      { x: 820, y: 210, requiredFreq: 'AETHER', radius: 28 },
      { x: 820, y: 380, requiredFreq: 'TERRA', radius: 28 },
      { x: 820, y: 530, requiredFreq: 'IGNIS', radius: 28 }
    ]
  },

  // 21: Yerçekimi Sapanı (Gravitational Slingshot)
  {
    title: 'Yerçekimi Sapanı (Gravitational Slingshot)',
    desc: 'Karadeliğin pürüzsüz kütleçekim alanını sapan gibi kullanarak ışını engelin arkasındaki aynaya fırlatın.',
    hints: [
      '1. Adım: Işını alttaki karadeliğin safe yörünge çizgisine doğru hedefleyin.',
      '2. Adım: Işın karadeliğin etrafında zarifçe kıvrılarak sağ üstteki aynaya yönelir.',
      '3. Adım: Aynanın açısını ayarlayarak hedef kristale odaklayın; manyetik kilitlenme hedefe kitleyecektir!'
    ],
    player: { x: 180, y: 380, initialFreq: 'SOL' },
    barriers: [{ x1: 520, y1: 190, x2: 520, y2: 480 }],
    singularities: [{ x: 520, y: 530, radius: 20, gravityRadius: 180 }],
    mirrors: [{ x: 740, y: 240, angle: Math.PI / 4, length: 120 }],
    targets: [{ x: 860, y: 440, requiredFreq: 'SOL', radius: 26 }]
  },

  // 22: Çift Kırılma Matrisi (Dual Prism Matrix)
  {
    title: 'Çift Kırılma Matrisi (Dual Prism Matrix)',
    desc: 'İki farklı prizma ışını sırayla Ignis ve Terra frekanslarına dönüştürür. Aynalar ve Zaman Yankısı ile iki kristali doldurun.',
    hints: [
      '1. Adım: Işını ilk prizmaya yönelterek Ignis (Turuncu) kristalini besleyin ve [BOŞLUK] ile Zaman Yankısı kaydedin.',
      '2. Adım: Işını ortadaki aynaya yönlendirin; aynadan ikinci prizmaya geçerek Terra (Yeşil) kristalini şarj edin.',
      '3. Adım: Şarjı hızlandırmak için [E] ile Nova Dalgası patlatın.'
    ],
    player: { x: 180, y: 280, initialFreq: 'SOL' },
    prisms: [
      { x: 420, y: 280, radius: 28, outputFreq: 'IGNIS' },
      { x: 640, y: 480, radius: 28, outputFreq: 'TERRA' }
    ],
    mirrors: [{ x: 420, y: 480, angle: -Math.PI / 4, length: 120 }],
    barriers: [{ x1: 530, y1: 190, x2: 530, y2: 390 }],
    targets: [
      { x: 820, y: 280, requiredFreq: 'IGNIS', radius: 26 },
      { x: 820, y: 480, requiredFreq: 'TERRA', radius: 26 }
    ]
  },

  // 23: Triad Bölücü Ağı (Triad Splitter Network)
  {
    title: 'Triad Bölücü Ağı (Triad Splitter Network)',
    desc: 'Üç adet Işın Bölücü tek bir ışını parçalayarak aynı anda üç farklı kristali besler.',
    hints: [
      '1. Adım: Karakterinizi Terra (Yeşil) frekansına getirin.',
      '2. Adım: Işını merkezdeki ilk Işın Bölücüye (SPLIT) tam ortadan gönderin.',
      '3. Adım: Bölücüler ışığı yukarı ve aşağı kollara dağıtarak 3 kristali de aynı anda şarj edecektir.'
    ],
    player: { x: 160, y: 380, initialFreq: 'TERRA' },
    beamSplitters: [
      { x: 380, y: 380, radius: 26 },
      { x: 580, y: 250, radius: 26 },
      { x: 580, y: 510, radius: 26 }
    ],
    targets: [
      { x: 840, y: 250, requiredFreq: 'TERRA', radius: 26 },
      { x: 840, y: 380, requiredFreq: 'TERRA', radius: 26 },
      { x: 840, y: 510, requiredFreq: 'TERRA', radius: 26 }
    ]
  },

  // 24: Kozmik İnşaatçı (Cosmic Builder's Gate)
  {
    title: 'Kozmik İnşaatçı (Cosmic Builder Gate)',
    desc: 'Doğal aynaların yetmediği yerde yeni yapım araçlarınızı kullanın! [M] ile ayna inşa ederek ışık hattını siz kurun.',
    hints: [
      '1. Adım: [M] tuşuna basarak veya alttaki menüden +Ayna butonuna tıklayarak yeni bir Ayna yerleştirin.',
      '2. Adım: Aynayı farenizle engelin köşesine sürükleyin ve [Z/X] ile 45 dereceye ayarlayın.',
      '3. Adım: Işını yansıtarak alttaki kristali besleyin, [BOŞLUK] ile kaydedip üstteki kristali vurun.'
    ],
    player: { x: 160, y: 260, initialFreq: 'AETHER' },
    barriers: [
      { x1: 440, y1: 190, x2: 440, y2: 410 },
      { x1: 640, y1: 340, x2: 640, y2: 580 }
    ],
    targets: [
      { x: 820, y: 250, requiredFreq: 'AETHER', radius: 26 },
      { x: 820, y: 510, requiredFreq: 'AETHER', radius: 26 }
    ]
  },

  // 25: Üçüz Tekillik Koridoru (Triple Singularity Corridor)
  {
    title: 'Üçüz Tekillik Koridoru (Triple Singularity)',
    desc: 'Üç yumuşatılmış karadeliğin oluşturduğu yerçekimi dalgası boyunca ışını S kıvrımıyla kristale ulaştırın.',
    hints: [
      '1. Adım: Işını ilk karadeliğin hemen alt sınırına doğru gönderin.',
      '2. Adım: Kütleçekim kuvvetleri ışını nazikçe ikinci ve üçüncü karadeliğe aktaracaktır.',
      '3. Adım: Manyetik kilitlenme hedef kristale varıldığında ışını merkeze çekecektir.'
    ],
    player: { x: 160, y: 340, initialFreq: 'SOL' },
    singularities: [
      { x: 360, y: 260, radius: 20, gravityRadius: 160 },
      { x: 520, y: 480, radius: 20, gravityRadius: 160 },
      { x: 680, y: 260, radius: 20, gravityRadius: 160 }
    ],
    targets: [{ x: 860, y: 480, requiredFreq: 'SOL', radius: 28 }]
  },

  // 26: Zamanın Dört Yaprağı (The 4 Leaves of Chronos)
  {
    title: 'Zamanın Dört Yaprağı (4 Leaves of Chronos)',
    desc: 'Dört kadrana dağılmış dört farklı renkteki kristali zaman yankılarıyla eşzamanlı olarak rezonansa sokun.',
    hints: [
      '1. Adım: [1] Sol seçin, sol üst kristali vururken [BOŞLUK] ile kaydedin.',
      '2. Adım: [2] Ignis seçin, sağ üst kristali vururken [BOŞLUK] ile kaydedin.',
      '3. Adım: [3] Terra seçip sol alt kristali besleyin, siz de [4] Aether ile sağ alt kristali vurarak [E] Nova patlatın!'
    ],
    player: { x: 480, y: 380, initialFreq: 'SOL' },
    barriers: [
      { x1: 480, y1: 220, x2: 480, y2: 320 },
      { x1: 480, y1: 440, x2: 480, y2: 540 }
    ],
    targets: [
      { x: 260, y: 240, requiredFreq: 'SOL', radius: 24 },
      { x: 740, y: 240, requiredFreq: 'IGNIS', radius: 24 },
      { x: 260, y: 520, requiredFreq: 'TERRA', radius: 24 },
      { x: 740, y: 520, requiredFreq: 'AETHER', radius: 24 }
    ]
  },

  // 27: Kozmik Işın Dağıtıcı (Cosmic Dispersion Matrix)
  {
    title: 'Kozmik Dağıtıcı (Cosmic Dispersion Matrix)',
    desc: 'Portallar, ışın bölücüler ve prizmaların birleştiği devasa optik kaskad.',
    hints: [
      '1. Adım: Portala gönderdiğiniz ışın sağ koridora geçerek prizmaya girer.',
      '2. Adım: Ortadaki Işın Bölücüye nişan alarak ikinci hattı açın ve [BOŞLUK] ile kaydedin.',
      '3. Adım: İki hedefin de rezonansa ulaşmasını izleyin.'
    ],
    player: { x: 180, y: 380, initialFreq: 'SOL' },
    portals: [
      { id: 'p1', partnerId: 'p2', x: 380, y: 250, radius: 26, color: '#38bdf8' },
      { id: 'p2', partnerId: 'p1', x: 620, y: 250, radius: 26, color: '#38bdf8' }
    ],
    beamSplitters: [{ x: 460, y: 480, radius: 26 }],
    prisms: [{ x: 730, y: 250, radius: 26, outputFreq: 'AETHER' }],
    targets: [
      { x: 860, y: 250, requiredFreq: 'AETHER', radius: 26 },
      { x: 860, y: 480, requiredFreq: 'SOL', radius: 26 }
    ]
  },

  // 28: Serbest Kozmik Laboratuvar (Free Architecture)
  {
    title: 'Serbest Mimari (Free Architecture)',
    desc: 'Doğal hiçbir ayna yok! [M] ve [P] tuşlarını kullanarak kendi optik devrenizi baştan inşa edin.',
    hints: [
      '1. Adım: [M] tuşuna basarak 2 adet Ayna inşa edin ve engellerin arasına yerleştirin.',
      '2. Adım: [P] tuşuna basarak bir Prizma inşa edin ve çıkış frekansını Terra yapın.',
      '3. Adım: Işını kendi kurduğunuz optik sistemden geçirerek arka arkaya hedefleri doldurun.'
    ],
    player: { x: 180, y: 380, initialFreq: 'SOL' },
    barriers: [
      { x1: 420, y1: 200, x2: 420, y2: 420 },
      { x1: 640, y1: 340, x2: 640, y2: 560 }
    ],
    targets: [
      { x: 840, y: 250, requiredFreq: 'SOL', radius: 26 },
      { x: 840, y: 500, requiredFreq: 'TERRA', radius: 26 }
    ]
  },

  // 29: Kütleçekim Aynaları (Singularity & Speculum)
  {
    title: 'Kütleçekim Aynaları (Singularity & Speculum)',
    desc: 'Karadeliğin sapan etkisiyle fırlatılan ışını hareketli aynalarla iki farklı kristale dağıtın.',
    hints: [
      '1. Adım: Karadeliğin çekim alanını kullanarak ışığı yukarıdaki aynaya doğru bükün.',
      '2. Adım: Aynanın açısını ayarlayarak üstteki Ignis kristalini şarj edin ve [BOŞLUK] ile kaydedin.',
      '3. Adım: Karakterinizi Aether frekansına alıp alttaki kristale doğrudan odaklanın.'
    ],
    player: { x: 180, y: 380, initialFreq: 'IGNIS' },
    singularities: [{ x: 460, y: 380, radius: 22, gravityRadius: 180 }],
    mirrors: [{ x: 680, y: 240, angle: Math.PI / 4, length: 120 }],
    barriers: [{ x1: 580, y1: 300, x2: 580, y2: 460 }],
    targets: [
      { x: 860, y: 240, requiredFreq: 'IGNIS', radius: 26 },
      { x: 860, y: 520, requiredFreq: 'AETHER', radius: 26 }
    ]
  },

  // 30: Büyük Rezonans Başyapıtı (Master Resonance 30 - Grand Finale)
  {
    title: 'Büyük Rezonans Başyapıtı (Master Resonance 30)',
    desc: '30. Aşama Kozmik Final: Karadelikler, Işın Bölücüler, Portallar, Zaman Yankıları ve Serbest İnşaat bir arada!',
    hints: [
      '1. Adım: Portala ve Işın Bölücüye Sol ve Ignis frekanslarında atışlar yapıp [BOŞLUK] ile Zaman Yankılarını sabitleyin.',
      '2. Adım: Karadeliğin çekim sapanıyla Terra kristalini besleyin ve üçüncü Zaman Yankısını oluşturun.',
      '3. Adım: [4] Aether frekansına geçip dev Kozmik Çekirdeği besleyin ve [E] tuşuna basarak Evrensel Nova Rezonansını patlatın!'
    ],
    player: { x: 160, y: 380, initialFreq: 'SOL' },
    barriers: [
      { x1: 420, y1: 190, x2: 420, y2: 360 },
      { x1: 420, y1: 420, x2: 420, y2: 590 }
    ],
    portals: [
      { id: 'p1', partnerId: 'p2', x: 300, y: 240, radius: 26, color: '#38bdf8' },
      { id: 'p2', partnerId: 'p1', x: 560, y: 240, radius: 26, color: '#38bdf8' }
    ],
    beamSplitters: [{ x: 480, y: 380, radius: 26 }],
    singularities: [{ x: 560, y: 500, radius: 22, gravityRadius: 180 }],
    mirrors: [{ x: 320, y: 520, angle: -Math.PI / 4, length: 120 }],
    targets: [
      { x: 840, y: 240, requiredFreq: 'SOL', radius: 26 },
      { x: 840, y: 330, requiredFreq: 'IGNIS', radius: 26 },
      { x: 840, y: 430, requiredFreq: 'TERRA', radius: 26 },
      { x: 840, y: 530, requiredFreq: 'AETHER', radius: 28 }
    ]
  }
];

window.addEventListener('DOMContentLoaded', () => {
  window.chronoSonicApp = new ChronoSonicGame();
});
