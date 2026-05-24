/* ============================================================
   AUDIO ENGINE — Web Audio API, 8-bit sounds
   ============================================================ */

const Audio8bit = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function beep({ freq = 440, type = 'square', duration = 0.15, vol = 0.18, delay = 0, sweep = null }) {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = type;
    const t = c.currentTime + delay;
    osc.frequency.setValueAtTime(freq, t);
    if (sweep) osc.frequency.linearRampToValueAtTime(sweep, t + duration);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  const sounds = {
    correct() {
      beep({ freq: 523, duration: 0.1 });
      beep({ freq: 659, duration: 0.1, delay: 0.1 });
      beep({ freq: 784, duration: 0.2, delay: 0.2 });
    },
    wrong() {
      beep({ freq: 220, type: 'sawtooth', duration: 0.2, vol: 0.12 });
      beep({ freq: 165, type: 'sawtooth', duration: 0.25, delay: 0.2, vol: 0.1 });
    },
    click() {
      beep({ freq: 440, duration: 0.06, vol: 0.1 });
    },
    star() {
      beep({ freq: 880, duration: 0.08, vol: 0.15 });
      beep({ freq: 1100, duration: 0.08, delay: 0.08, vol: 0.15 });
    },
    heartLost() {
      beep({ freq: 330, type: 'sawtooth', duration: 0.15, vol: 0.2 });
      beep({ freq: 220, type: 'sawtooth', duration: 0.3, delay: 0.15, vol: 0.18 });
    },
    levelUp() {
      [523, 659, 784, 1047].forEach((f, i) =>
        beep({ freq: f, duration: 0.12, delay: i * 0.1, vol: 0.2 }));
    },
    bossDead() {
      const notes = [523, 659, 784, 659, 784, 1047, 784, 1047, 1319];
      notes.forEach((f, i) => beep({ freq: f, duration: 0.14, delay: i * 0.1, vol: 0.2 }));
    },
    langFR() {
      beep({ freq: 350, duration: 0.12, vol: 0.15 });
      beep({ freq: 440, duration: 0.12, delay: 0.12, vol: 0.15 });
    },
    langEN() {
      beep({ freq: 550, duration: 0.12, vol: 0.15 });
      beep({ freq: 660, duration: 0.12, delay: 0.12, vol: 0.15 });
    },
    dragonGrow() {
      beep({ freq: 220, type: 'triangle', duration: 0.5, sweep: 440, vol: 0.25 });
    },
    fanfare() {
      const m = [392, 392, 392, 311, 466, 392, 311, 466, 392];
      m.forEach((f, i) => beep({ freq: f, duration: 0.18, delay: i * 0.18, vol: 0.2 }));
    },
    transition() {
      beep({ freq: 660, duration: 0.08, vol: 0.1 });
      beep({ freq: 880, duration: 0.08, delay: 0.1, vol: 0.1 });
    },
  };

  return { play: (name) => { try { sounds[name]?.(); } catch(e) {} } };
})();
