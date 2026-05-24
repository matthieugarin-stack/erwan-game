/* ============================================================
   GAME ENGINE — State, Scene Management, Exercise System
   ============================================================ */

// ── Global Game State ────────────────────────────────────────
const GS = {
  playerName: 'Erwan',
  dragonName: '',
  difficulty: 'medium',    // 'easy' | 'medium' | 'hard'
  stars: 0,
  hearts: 3,
  actIndex: 0,             // 0-4 = acts 1-5
  sceneQueue: [],          // upcoming scenes
  journal: [],             // { label, text }
  dragonStage: 0,          // 0-4
  frame: 0,
  paused: false,
  animFrame: null,
};

// ── DOM refs ─────────────────────────────────────────────────
const DOM = {};

// ── Initialize DOM refs ──────────────────────────────────────
function initDOM() {
  DOM.hudHearts  = document.getElementById('hud-hearts');
  DOM.hudStars   = document.getElementById('hud-stars');
  DOM.hudAct     = document.getElementById('hud-act');
  DOM.hudLevel   = document.getElementById('hud-level');
  DOM.mainCanvas = document.getElementById('main-canvas');
  DOM.ctx        = DOM.mainCanvas.getContext('2d');
  DOM.dragonCanvas = document.getElementById('dragon-canvas');
  DOM.dragonCtx    = DOM.dragonCanvas.getContext('2d');
  DOM.dragonName   = document.getElementById('dragon-name-display');
  DOM.dragonStatus = document.getElementById('dragon-status');
  DOM.dragonMood   = document.getElementById('dragon-mood');
  DOM.uiOverlay    = document.getElementById('ui-overlay');
  DOM.flagAnnounce = document.getElementById('flag-announce');
  DOM.flagEmoji    = document.getElementById('flag-emoji');
  DOM.celebration  = document.getElementById('celebration');
  DOM.transOverlay = document.getElementById('transition-overlay');
  DOM.transIcon    = document.getElementById('transition-icon');
  DOM.pinModal     = document.getElementById('pin-modal');
}

// ── HUD Update ───────────────────────────────────────────────
function updateHUD() {
  DOM.hudHearts.textContent = '❤️'.repeat(GS.hearts) + '🖤'.repeat(3 - GS.hearts);
  DOM.hudStars.textContent  = `⭐ ${GS.stars}`;
  const actNames = ['Act 1: Brooklyn','Act 2: Avion','Act 3: Paris','Act 4: Loire','Act 5: Bretagne'];
  DOM.hudAct.textContent = actNames[GS.actIndex] || '';
  const levels = { easy:'⚔️', medium:'⚔️⚔️', hard:'⚔️⚔️⚔️' };
  DOM.hudLevel.textContent = levels[GS.difficulty];
  // Dragon panel
  DOM.dragonName.textContent = GS.dragonName ? `🐉 ${GS.dragonName}` : '🐉 ???';
  const statuses = [
    'Emprisonné... 😢', 'Encore enchaîné... 😟', 'Un peu libre ! 😊',
    'Presque sauvé ! 😄', 'Libre et majestueux ! 🎉'
  ];
  DOM.dragonStatus.textContent = statuses[GS.dragonStage] || '';
  DOM.dragonMood.textContent = GS.dragonStage >= 2 ? '😊' : '😢';
}

// ── Dragon canvas render ─────────────────────────────────────
function renderDragonPanel() {
  const c = DOM.dragonCanvas;
  const ctx = DOM.dragonCtx;
  const SIZE = 80;
  c.width = SIZE; c.height = SIZE;
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, SIZE, SIZE);
  // Scale grows with stage so dragon looks bigger each time
  const scales = [3, 3, 4, 4, 5];
  const scale = scales[GS.dragonStage] || 3;
  // Center the sprite in the canvas
  const spriteW = (GS.dragonStage <= 1 ? 7 : GS.dragonStage === 2 ? 8 : GS.dragonStage === 3 ? 9 : 10) * scale;
  const spriteH = (GS.dragonStage <= 1 ? 7 : GS.dragonStage === 2 ? 8 : GS.dragonStage === 3 ? 9 : 10) * scale;
  const ox = Math.max(0, (SIZE - spriteW) / 2) | 0;
  const oy = Math.max(0, (SIZE - spriteH) / 2) | 0;
  Sprites.drawDragon(ctx, GS.dragonStage, ox, oy, scale, GS.frame);
  // Stage indicator dots
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i <= GS.dragonStage ? '#ffd700' : '#333';
    ctx.beginPath();
    ctx.arc(8 + i * 13, SIZE - 6, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ── Main animation loop ──────────────────────────────────────
function gameLoop() {
  GS.frame++;
  resizeCanvas();
  renderDragonPanel();
  updateHUD();
  GS.animFrame = requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
  const c = DOM.mainCanvas;
  const area = document.getElementById('canvas-area');
  if (c.width !== area.clientWidth || c.height !== area.clientHeight) {
    c.width  = area.clientWidth;
    c.height = area.clientHeight;
  }
}

// ── Screen management ────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('visible'));
  DOM.uiOverlay.classList.add('active');
  const el = document.getElementById(id);
  if (el) el.classList.add('visible');
}
function hideAllScreens() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('visible'));
  // keep active so overlay stays clickable when a minigame canvas is shown directly
}

// ── Flag announcement ────────────────────────────────────────
function showFlag(lang) {
  return new Promise(resolve => {
    DOM.flagEmoji.textContent = lang === 'fr' ? '🇫🇷' : '🇺🇸';
    DOM.flagAnnounce.classList.add('show');
    Audio8bit.play(lang === 'fr' ? 'langFR' : 'langEN');
    setTimeout(() => {
      DOM.flagAnnounce.classList.remove('show');
      setTimeout(resolve, 200);
    }, 1100);
  });
}

// ── Celebration ───────────────────────────────────────────────
function celebrate(addStars = 1) {
  GS.stars += addStars;
  Audio8bit.play('correct');
  Sprites.spawnCelebration(DOM.celebration);
  for (let i = 0; i < addStars; i++) {
    setTimeout(() => Audio8bit.play('star'), i * 100);
  }
}

// ── Heart loss ───────────────────────────────────────────────
function loseHeart() {
  if (GS.hearts <= 0) return;
  GS.hearts--;
  Audio8bit.play('heartLost');
  updateHUD();
  if (GS.hearts === 0) {
    setTimeout(() => showGameOver(), 600);
    return true; // game over
  }
  return false;
}

function showGameOver() {
  document.getElementById('gameover-stars').textContent = `⭐ ${GS.stars} étoiles Knicks !`;
  showScreen('screen-gameover');
}

// ── Transition overlay ────────────────────────────────────────
function doTransition(icon, duration = 1000) {
  return new Promise(resolve => {
    DOM.transIcon.textContent = icon;
    DOM.transOverlay.classList.add('show');
    Audio8bit.play('transition');
    setTimeout(() => {
      DOM.transOverlay.classList.remove('show');
      resolve();
    }, duration);
  });
}

// ── Dragon evolution ──────────────────────────────────────────
function evolveDragon() {
  if (GS.dragonStage < 4) {
    GS.dragonStage++;
    Audio8bit.play('dragonGrow');
    updateHUD();
  }
}

// ── Journal ────────────────────────────────────────────────────
function addToJournal(label, text) {
  if (text && text.trim()) GS.journal.push({ label, text: text.trim() });
}

let _journalPrev = null; // screen id shown before journal was opened

function showJournal() {
  // Remember what was visible so we can restore it on close
  const current = document.querySelector('.screen.visible');
  _journalPrev = current ? current.id : null;

  const list = document.getElementById('journal-list');
  list.innerHTML = '';
  if (GS.journal.length === 0) {
    list.innerHTML = '<div class="journal-entry" style="color:#666;">Rien encore écrit...</div>';
  } else {
    GS.journal.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'journal-entry';
      div.innerHTML = `<div class="journal-entry-label">${entry.label}</div><div>${entry.text}</div>`;
      list.appendChild(div);
    });
  }
  showScreen('screen-journal');
}

function closeJournal() {
  if (_journalPrev) {
    // Restore previous screen (exercise, narration, etc.)
    showScreen(_journalPrev);
  } else {
    // Was on canvas/minigame — just hide journal, keep overlay active
    document.getElementById('screen-journal').classList.remove('visible');
  }
  _journalPrev = null;
}

// ── PIN & Parent Settings ─────────────────────────────────────
function openParentMenu() {
  DOM.pinModal.classList.add('show');
  document.getElementById('pin-input').value = '';
  document.getElementById('pin-error').textContent = '';
  document.getElementById('settings-panel').classList.remove('show');
}
function checkPin() {
  const val = document.getElementById('pin-input').value;
  if (val === '1234') {
    document.getElementById('pin-section').style.display = 'none';
    document.getElementById('settings-panel').classList.add('show');
    updateDifficultyButtons();
  } else {
    document.getElementById('pin-error').textContent = 'Code incorrect !';
    Audio8bit.play('wrong');
  }
}
function setDifficulty(d) {
  GS.difficulty = d;
  updateDifficultyButtons();
  Audio8bit.play('click');
}
function updateDifficultyButtons() {
  document.querySelectorAll('.difficulty-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.diff === GS.difficulty);
  });
}

// ── Exercise Engine ────────────────────────────────────────────
//
// exerciseDef = {
//   lang: 'fr' | 'en',
//   type: 'mcq' | 'fillblanks' | 'typing' | 'numpad' | 'dragdrop' | 'journal',
//   title: string,
//   question: string,
//   // MCQ:
//   choices: [{text, correct}],
//   // fillblanks: segments with gaps
//   segments: [{text, isBlank, answer}],
//   // typing: target string
//   answer: string,
//   // numpad: number answer
//   answer: number,
//   // dragdrop: words to order
//   words: string[], correctOrder: string[],
//   // journal: prompt, store in journal
//   journalLabel: string,
//   // on complete callback
//   onComplete: fn,
// }

let currentExercise = null;
let exerciseAttempts = 0;

function runExercise(def) {
  return new Promise(async resolve => {
    await showFlag(def.lang || 'fr');
    currentExercise = def;
    exerciseAttempts = 0;
    def._resolve = resolve;
    renderExercise(def);
    showScreen('screen-exercise');
  });
}

function renderExercise(def) {
  const panel = document.getElementById('exercise-panel');
  const levels = { easy:'⚔️ Simple', medium:'⚔️⚔️ Moyen', hard:'⚔️⚔️⚔️ Complexe' };
  panel.innerHTML = `
    <div class="exercise-title">${def.title} <span style="float:right;font-size:11px">${levels[GS.difficulty]}</span></div>
    <div class="exercise-question">${def.question}</div>
    <div id="ex-content"></div>
    <div class="exercise-feedback" id="ex-feedback"></div>
    <div id="ex-actions"></div>
  `;
  const content = document.getElementById('ex-content');
  const actions = document.getElementById('ex-actions');

  switch (def.type) {
    case 'mcq':       renderMCQ(def, content); break;
    case 'fillblanks': renderFillBlanks(def, content, actions); break;
    case 'typing':    renderTyping(def, content, actions); break;
    case 'numpad':    renderNumpad(def, content, actions); break;
    case 'dragdrop':  renderDragDrop(def, content, actions); break;
    case 'journal':   renderJournal(def, content, actions); break;
  }
}

function setFeedback(msg, type = '') {
  const fb = document.getElementById('ex-feedback');
  if (fb) { fb.textContent = msg; fb.className = 'exercise-feedback feedback-' + type; }
}

// ── MCQ ───────────────────────────────────────────────────────
function renderMCQ(def, content) {
  const colMap = { 2:'cols-2', 3:'cols-3', 4:'cols-4' };
  const n = def.choices.length;
  const grid = document.createElement('div');
  grid.className = `choices-grid ${colMap[n] || 'cols-2'}`;
  def.choices.forEach((ch, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = ch.text;
    btn.onclick = () => handleMCQChoice(def, ch, btn, grid);
    grid.appendChild(btn);
  });
  content.appendChild(grid);
}

let mcqQueue = []; // for multi-question MCQ sequences
function handleMCQChoice(def, choice, btn, grid) {
  Audio8bit.play('click');
  const allBtns = grid.querySelectorAll('.choice-btn');
  allBtns.forEach(b => b.disabled = true);
  if (choice.correct) {
    btn.classList.add('correct');
    celebrate();
    setFeedback('✅ ' + (def.correctMsg || 'Bravo !'), 'correct');
    setTimeout(() => {
      if (def._mcqNext) def._mcqNext();
      else def._resolve();
    }, 900);
  } else {
    btn.classList.add('wrong');
    exerciseAttempts++;
    Audio8bit.play('wrong');
    const hints = ['Presque !', 'Encore un essai !', 'Tu y es presque !'];
    setFeedback('❌ ' + hints[Math.min(exerciseAttempts-1, 2)], 'wrong');
    if (exerciseAttempts >= 3) {
      // Show correct answer
      allBtns.forEach(b => {
        const ch = def.choices.find(c => c.text === b.textContent);
        if (ch?.correct) b.classList.add('correct');
      });
      setFeedback('💡 La bonne réponse est surlignée en vert.', 'hint');
      setTimeout(() => {
        loseHeart();
        if (GS.hearts > 0) {
          allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong','correct'); });
          exerciseAttempts = 0;
          if (def._mcqNext) def._mcqNext();
          else def._resolve();
        }
      }, 2000);
    } else {
      setTimeout(() => {
        allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
      }, 800);
    }
  }
}

// Multi-question MCQ: runs questions sequentially
function runMCQSequence(questions, title, lang) {
  return new Promise(resolve => {
    let qi = 0;
    function nextQ() {
      if (qi >= questions.length) { resolve(); return; }
      const q = questions[qi++];
      const def = { ...q, title, lang, type:'mcq' };
      def._resolve = resolve;
      def._mcqNext = nextQ;
      exerciseAttempts = 0;
      renderExercise(def);
      showScreen('screen-exercise');
    }
    nextQ();
  });
}

// ── Fill Blanks ───────────────────────────────────────────────
function renderFillBlanks(def, content, actions) {
  const area = document.createElement('div');
  area.className = 'fill-blank-area';
  const inputs = [];
  def.segments.forEach(seg => {
    if (seg.isBlank) {
      const inp = document.createElement('input');
      inp.className = 'fill-input';
      inp.style.width = Math.max(60, seg.answer.length * 18 + 20) + 'px';
      inp.dataset.answer = seg.answer.toLowerCase();
      inp.setAttribute('autocomplete','off');
      inp.setAttribute('autocapitalize','none');
      inputs.push(inp);
      area.appendChild(inp);
    } else {
      const span = document.createElement('span');
      span.className = 'fill-word';
      span.textContent = seg.text + ' ';
      area.appendChild(span);
    }
  });
  content.appendChild(area);

  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.textContent = 'Vérifier ✓';
  btn.style.marginTop = '12px';
  btn.onclick = () => checkFillBlanks(def, inputs);
  actions.appendChild(btn);

  if (inputs[0]) setTimeout(() => inputs[0].focus(), 100);
}

function checkFillBlanks(def, inputs) {
  let allOk = true;
  inputs.forEach(inp => {
    const val = inp.value.toLowerCase().replace(/\s+/g,'').normalize('NFD').replace(/[̀-ͯ]/g,'');
    const ans = inp.dataset.answer.normalize('NFD').replace(/[̀-ͯ]/g,'');
    if (val === ans) {
      inp.style.borderColor = '#2ecc40';
    } else {
      inp.style.borderColor = '#e74c3c';
      allOk = false;
    }
  });
  if (allOk) {
    celebrate();
    setFeedback('✅ Parfait !', 'correct');
    // Add to journal if requested
    if (def.journalLabel) {
      const fullText = def.segments.map(s => s.isBlank
        ? inputs.find(i => i.dataset.answer === s.answer.toLowerCase())?.value || s.answer
        : s.text
      ).join('');
      addToJournal(def.journalLabel, fullText);
    }
    setTimeout(() => def._resolve(), 900);
  } else {
    exerciseAttempts++;
    Audio8bit.play('wrong');
    const msgs = ['Presque !', 'Encore un essai !', 'Tu y es presque !'];
    setFeedback('❌ ' + msgs[Math.min(exerciseAttempts-1, 2)], 'wrong');
    if (exerciseAttempts >= 3) {
      inputs.forEach(inp => { inp.style.borderColor = '#ffd700'; inp.value = inp.dataset.answer; });
      setFeedback('💡 Voici la bonne réponse !', 'hint');
      setTimeout(() => { loseHeart(); if (GS.hearts > 0) def._resolve(); }, 2000);
    }
  }
}

// ── Typing ────────────────────────────────────────────────────
function renderTyping(def, content, actions) {
  const area = document.createElement('div');
  area.className = 'full-input-area';
  const inp = document.createElement('input');
  inp.className = 'full-input';
  inp.setAttribute('autocomplete','off');
  inp.setAttribute('autocapitalize','none');
  inp.placeholder = def.placeholder || '';
  if (def.hint) {
    const hint = document.createElement('div');
    hint.style.cssText = 'font-size:13px;color:#aaa;margin-bottom:6px;';
    hint.textContent = def.hint;
    content.appendChild(hint);
  }
  area.appendChild(inp);
  content.appendChild(area);

  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.textContent = 'Vérifier ✓';
  btn.style.marginTop = '12px';
  btn.onclick = () => checkTyping(def, inp);
  actions.appendChild(btn);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkTyping(def, inp); });
  setTimeout(() => inp.focus(), 100);
}

function checkTyping(def, inp) {
  const val = inp.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const ans = def.answer.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const alts = (def.alternatives || []).map(a => a.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,''));
  if (val === ans || alts.includes(val)) {
    inp.style.borderColor = '#2ecc40';
    celebrate();
    setFeedback('✅ Bravo !', 'correct');
    if (def.journalLabel) addToJournal(def.journalLabel, inp.value.trim());
    setTimeout(() => def._resolve(), 900);
  } else {
    exerciseAttempts++;
    inp.style.borderColor = '#e74c3c';
    Audio8bit.play('wrong');
    const msgs = ['Presque !', 'Encore un essai !', 'Tu y es presque !'];
    setFeedback('❌ ' + msgs[Math.min(exerciseAttempts-1, 2)], 'wrong');
    if (exerciseAttempts >= 3) {
      inp.value = def.answer;
      inp.style.borderColor = '#ffd700';
      setFeedback('💡 Voici la bonne réponse !', 'hint');
      setTimeout(() => { loseHeart(); if (GS.hearts > 0) def._resolve(); }, 2000);
    }
  }
}

// ── Numpad ────────────────────────────────────────────────────
function renderNumpad(def, content, actions) {
  const area = document.createElement('div');
  area.className = 'numpad-area';
  const display = document.createElement('div');
  display.className = 'numpad-display';
  display.textContent = '_';
  let current = '';

  const grid = document.createElement('div');
  grid.className = 'numpad-grid';
  ['7','8','9','4','5','6','1','2','3','⌫','0','✓'].forEach(k => {
    const btn = document.createElement('button');
    btn.className = 'numpad-btn';
    btn.textContent = k;
    btn.onclick = () => {
      Audio8bit.play('click');
      if (k === '⌫') { current = current.slice(0,-1); }
      else if (k === '✓') { checkNumpad(def, current, display); return; }
      else if (current.length < 6) { current += k; }
      display.textContent = current || '_';
    };
    grid.appendChild(btn);
  });

  area.appendChild(display);
  area.appendChild(grid);
  content.appendChild(area);
}

function checkNumpad(def, val, display) {
  const num = parseInt(val, 10);
  if (num === def.answer) {
    display.style.borderColor = '#2ecc40';
    celebrate();
    setFeedback('✅ ' + (def.correctMsg || 'Parfait !'), 'correct');
    setTimeout(() => def._resolve(), 900);
  } else {
    exerciseAttempts++;
    display.style.borderColor = '#e74c3c';
    Audio8bit.play('wrong');
    const msgs = ['Presque !', 'Encore un essai !', 'Tu y es presque !'];
    setFeedback('❌ ' + msgs[Math.min(exerciseAttempts-1, 2)], 'wrong');
    if (exerciseAttempts >= 3) {
      display.textContent = String(def.answer);
      display.style.borderColor = '#ffd700';
      setFeedback('💡 La bonne réponse est ' + def.answer, 'hint');
      setTimeout(() => { loseHeart(); if (GS.hearts > 0) def._resolve(); }, 2200);
    } else {
      setTimeout(() => { display.style.borderColor = ''; }, 600);
    }
  }
}

// ── Drag & Drop word ordering ─────────────────────────────────
function renderDragDrop(def, content, actions) {
  // Source zone (shuffled words)
  const srcZone  = document.createElement('div');
  srcZone.className = 'drag-zone';
  srcZone.id = 'dd-source';
  const destZone = document.createElement('div');
  destZone.className = 'drag-zone target-zone';
  destZone.id = 'dd-dest';

  const label1 = document.createElement('div');
  label1.style.cssText = 'font-size:12px;color:#aaa;margin-top:8px;';
  label1.textContent = '📦 Mots disponibles :';
  const label2 = document.createElement('div');
  label2.style.cssText = 'font-size:12px;color:#aaa;margin-top:12px;';
  label2.textContent = '✏️ Ta phrase :';

  content.appendChild(label1);
  content.appendChild(srcZone);
  content.appendChild(label2);
  content.appendChild(destZone);

  // Shuffle and render
  const shuffled = [...def.words].sort(() => Math.random() - 0.5);
  shuffled.forEach(w => srcZone.appendChild(makeWordChip(w, srcZone, destZone)));

  // Touch/mouse drag implementation
  let dragging = null, ghost = null, originZone = null;

  function makeWordChip(word, src, dest) {
    const chip = document.createElement('div');
    chip.className = 'drag-word';
    chip.textContent = word;
    chip.dataset.word = word;

    const startDrag = (clientX, clientY) => {
      dragging = chip;
      originZone = chip.parentElement;
      chip.classList.add('dragging');
      ghost = chip.cloneNode(true);
      ghost.style.cssText = `position:fixed;pointer-events:none;opacity:0.85;z-index:999;
        left:${clientX - 30}px;top:${clientY - 20}px;`;
      document.body.appendChild(ghost);
    };

    chip.addEventListener('mousedown', e => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    });
    chip.addEventListener('touchstart', e => {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    }, { passive: true });

    return chip;
  }

  const moveGhost = (cx, cy) => {
    if (ghost) { ghost.style.left = cx - 30 + 'px'; ghost.style.top  = cy - 20 + 'px'; }
  };
  const endDrag = (cx, cy) => {
    if (!dragging) return;
    ghost?.remove(); ghost = null;
    dragging.classList.remove('dragging');
    const target = document.elementFromPoint(cx, cy)?.closest('.drag-zone');
    if (target && target !== dragging.parentElement) {
      target.appendChild(dragging);
    }
    dragging = null;
  };

  document.addEventListener('mousemove', e => moveGhost(e.clientX, e.clientY));
  document.addEventListener('mouseup',   e => endDrag(e.clientX, e.clientY));
  document.addEventListener('touchmove', e => {
    const t = e.touches[0]; moveGhost(t.clientX, t.clientY);
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const t = e.changedTouches[0]; endDrag(t.clientX, t.clientY);
  });

  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.textContent = 'Vérifier ✓';
  btn.style.marginTop = '12px';
  btn.onclick = () => {
    const placed = [...destZone.querySelectorAll('.drag-word')].map(c => c.dataset.word);
    const correct = JSON.stringify(placed) === JSON.stringify(def.correctOrder);
    if (correct) {
      celebrate();
      setFeedback('✅ Parfaite phrase !', 'correct');
      setTimeout(() => def._resolve(), 900);
    } else {
      exerciseAttempts++;
      Audio8bit.play('wrong');
      const msgs = ['Presque !', 'Réessaie !', 'Tu y es presque !'];
      setFeedback('❌ ' + msgs[Math.min(exerciseAttempts-1, 2)], 'wrong');
      if (exerciseAttempts >= 3) {
        // Show correct order
        destZone.innerHTML = '';
        srcZone.innerHTML = '';
        def.correctOrder.forEach(w => {
          const chip = document.createElement('div');
          chip.className = 'drag-word';
          chip.textContent = w;
          chip.style.background = '#1a7a28';
          destZone.appendChild(chip);
        });
        setFeedback('💡 Voici la bonne ordre !', 'hint');
        setTimeout(() => { loseHeart(); if (GS.hearts > 0) def._resolve(); }, 2200);
      }
    }
  };
  actions.appendChild(btn);
}

// ── Journal entry ─────────────────────────────────────────────
function renderJournal(def, content, actions) {
  if (def.hint) {
    const h = document.createElement('div');
    h.style.cssText = 'color:#aaa;font-size:13px;margin-bottom:8px;';
    h.innerHTML = def.hint;
    content.appendChild(h);
  }
  const area = document.createElement('textarea');
  area.style.cssText = `width:100%;min-height:90px;background:#0a0a1a;border:2px solid #0f3460;
    color:#e0e0ff;font-family:'Courier New',monospace;font-size:16px;padding:10px;
    border-radius:3px;resize:vertical;outline:none;`;
  area.placeholder = def.placeholder || 'Écris ici...';
  content.appendChild(area);

  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.textContent = 'Enregistrer ✓';
  btn.style.marginTop = '12px';
  btn.onclick = () => {
    const val = area.value.trim();
    if (val.length < 2) {
      setFeedback('Écris quelque chose !', 'wrong');
      return;
    }
    addToJournal(def.journalLabel || 'Note', val);
    celebrate();
    setFeedback('✅ Super ! Enregistré dans ton journal.', 'correct');
    setTimeout(() => def._resolve(), 900);
  };
  actions.appendChild(btn);
  setTimeout(() => area.focus(), 100);
}

// ── Scene narration helper ─────────────────────────────────────
function runNarration(lines) {
  // lines: [{speaker, text, bg, characters:[{name,x,y}]}]
  return new Promise(resolve => {
    let idx = 0;
    const screen = document.getElementById('screen-narration');
    const sceneCanvas = document.getElementById('scene-canvas');
    const scCtx = sceneCanvas.getContext('2d');
    const speakerEl = document.getElementById('narr-speaker');
    const textEl    = document.getElementById('narr-text');
    const nextBtn   = document.getElementById('narr-next');

    function showLine() {
      if (idx >= lines.length) { resolve(); return; }
      const line = lines[idx];
      // Draw background
      sceneCanvas.width  = sceneCanvas.offsetWidth  || 400;
      sceneCanvas.height = sceneCanvas.offsetHeight || 200;
      const W = sceneCanvas.width, H = sceneCanvas.height;
      Sprites.drawBackground(scCtx, W, H, line.bg || 'brooklyn');
      // Draw characters
      (line.characters || []).forEach(ch => {
        const x = (ch.x || 0.5) * W - 24;
        const y = (ch.y || 0.6) * H - 48;
        if (ch.name === 'dragon') Sprites.drawDragon(scCtx, GS.dragonStage, x, y, 3, GS.frame);
        else Sprites.drawCharacter(scCtx, ch.name, x, y, 3, GS.frame);
      });

      speakerEl.textContent = line.speaker || '';
      textEl.textContent    = '';
      // Typewriter effect
      let ci = 0;
      const txt = line.text;
      const iv = setInterval(() => {
        textEl.textContent = txt.slice(0, ++ci);
        if (ci >= txt.length) clearInterval(iv);
      }, 28);

      nextBtn.onclick = () => { clearInterval(iv); textEl.textContent = txt; idx++; showLine(); };
    }

    showScreen('screen-narration');
    setTimeout(showLine, 50);
  });
}
