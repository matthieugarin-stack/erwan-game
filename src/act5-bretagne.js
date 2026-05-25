/* ============================================================
   ACT 5 — BRETAGNE : LA FÊTE FINALE
   ============================================================ */

async function runAct5() {
  GS.actIndex = 4;
  await doTransition('🌊', 1200);

  // ── Scene 5.1 — Arrivée en Bretagne ─────────────────────
  await runNarration([
    {
      speaker: `🐉 ${GS.dragonName} vole !`,
      text: `${GS.dragonName} vole jusqu'en Bretagne ! Il est LIBRE maintenant ! En dessous, l'océan brille comme un million d'étoiles Knicks !`,
      bg: 'brittany',
      characters: [{ name:'dragon', x:0.5, y:0.3 }, { name:'erwan', x:0.55, y:0.28 }],
    },
    {
      speaker: '👵 Mamiya',
      text: `"Oh ! Le dragon est libre ! Et mon petit chevalier est sur son dos !" Mamiya pleure de joie dans son jardin de Bretagne.`,
      bg: 'brittany',
      characters: [{ name:'mamiya', x:0.25, y:0.65 }, { name:'papou', x:0.45, y:0.65 }, { name:'raphael', x:0.65, y:0.65 }],
    },
    {
      speaker: '🔧 Papou',
      text: `"Fantastique ! Et ce dragon a de magnifiques ailes ! Presque aussi belles que ma tondeuse à gazon réparée la semaine dernière !" dit Papou avec fierté.`,
      bg: 'brittany',
      characters: [{ name:'papou', x:0.35, y:0.65 }, { name:'mamiya', x:0.6, y:0.65 }],
    },
    {
      speaker: '👦 Raphaël',
      text: `"WOOOOAH ! C'est trop cool ! ${GS.playerName} est revenu avec un vrai dragon ! Je veux faire un tour ! Je veux faire un tour !"`,
      bg: 'brittany',
      characters: [{ name:'raphael', x:0.5, y:0.65 }, { name:'dragon', x:0.75, y:0.45 }],
    },
  ]);

  // Exercise 19 — Reading FR (spot errors in banner)
  await runNarration([
    {
      speaker: '🎊 Banderole de bienvenue',
      text: 'Raphaël a fait une banderole de bienvenue... mais il a fait 3 fautes ! À toi de les trouver !',
      bg: 'brittany',
      characters: [{ name:'raphael', x:0.5, y:0.65 }],
    },
  ]);

  await runErrorFindingExercise();

  // Exercise 20 — Math FR (apple harvest)
  await runExercise({
    lang: 'fr',
    type: 'numpad',
    title: '🔢 Calcul — Le jardin de Mamiya',
    question: 'Mamiya ramasse 5 paniers de 30 pommes. Raphaël en mange 2. Combien reste-t-il de pommes ?',
    answer: 148,
    correctMsg: 'Parfait ! 5 × 30 = 150, moins 2 = 148 pommes ! Mamiya est impressionnée !',
  });

  // ── Scene 5.2 — Dragon learns to fly with Papou ──────────
  await runNarration([
    {
      speaker: '🔧 Papou le bricoleur',
      text: `Papou a une idée de génie ! Il fabrique des ailes mécaniques GÉANTES pour aider ${GS.dragonName} à voler encore plus haut. "C'est comme réparer un vélo, mais en beaucoup plus grand !"`,
      bg: 'brittany',
      characters: [{ name:'papou', x:0.3, y:0.65 }, { name:'dragon', x:0.65, y:0.45 }],
    },
    {
      speaker: `🐉 ${GS.dragonName}`,
      text: `${GS.dragonName} teste ses nouvelles ailes... et décolle vers les étoiles ! Il vole au-dessus de l'océan breton, libre comme jamais !`,
      bg: 'brittany',
      characters: [{ name:'dragon', x:0.5, y:0.25 }, { name:'erwan', x:0.2, y:0.65 }],
    },
  ]);
  evolveDragon(); // stage 3 → 4 (majestic!)
  Audio8bit.play('magic');
  setTimeout(() => Audio8bit.play('dragonGrow'), 300);

  // Exercise 22 — Journal FR (longest writing exercise)
  await runExercise({
    lang: 'fr',
    type: 'journal',
    title: '📔 Journal de bord — La grande aventure',
    question: `Écris dans ton journal ! Parle de ton dragon et de ton aventure :`,
    hint: `💡 Écris le nom de ${GS.dragonName}, ce que tu as vécu, les châteaux, la Bretagne...`,
    placeholder: `${GS.dragonName} est mon dragon. Pendant mon aventure, j'ai...`,
    journalLabel: '🌊 Journal de Bretagne',
  });

  // Exercise 23 — Reading FR (galette recipe)
  await runNarration([
    {
      speaker: '👵 Mamiya',
      text: 'Mamiya prépare des galettes bretonnes magiques pour redonner des forces au dragon ! Elle lit la recette à voix haute...',
      bg: 'brittany',
      characters: [{ name:'mamiya', x:0.4, y:0.65 }, { name:'dragon', x:0.7, y:0.5 }],
    },
  ]);

  await runMCQSequence([
    {
      question: 'La recette dit : "Mélange 200g de farine, 2 œufs et du lait". Quel ingrédient n\'est PAS dans la recette ?',
      choices: [
        { text: '🌾 Farine',   correct: false },
        { text: '🥚 Œufs',    correct: false },
        { text: '🍫 Chocolat', correct: true  },
      ],
      correctMsg: 'Le chocolat n\'est pas dans la recette de galette bretonne !',
    },
    {
      question: 'La recette dit : "Cuis à la poêle pendant 2 minutes et 40 secondes de chaque côté." Combien de temps au total pour une galette ?',
      choices: [
        { text: '4 minutes',             correct: false },
        { text: '5 minutes 20 secondes', correct: true  },
        { text: '6 minutes 20 secondes', correct: false },
      ],
      correctMsg: '2 min 40 sec × 2 = 5 minutes 20 secondes ! Tu sais cuisiner !',
    },
    {
      question: `Mamiya fait 3 fournées de 4 galettes. Le dragon ${GS.dragonName} en mange 5. Combien reste-t-il de galettes ?`,
      choices: [
        { text: '5 galettes',  correct: false },
        { text: '7 galettes',  correct: true  },
        { text: '9 galettes',  correct: false },
        { text: '12 galettes', correct: false },
      ],
      correctMsg: '3 × 4 = 12 galettes, moins 5 = 7 galettes ! Excellent !',
    },
  ], '📖 Lecture — La recette de Mamiya', 'fr');

  // Exercise 24 — Writing EN (postcard)
  await runNarration([
    {
      speaker: '👵 Mamiya',
      text: '"Et maintenant un petit exercice en anglais pour que tu n\'oublies pas tes amis de Brooklyn !" dit Mamiya avec un grand sourire.',
      bg: 'brittany',
      characters: [{ name:'mamiya', x:0.45, y:0.65 }, { name:'erwan', x:0.65, y:0.65 }],
    },
  ]);

  await runExercise({
    lang: 'en',
    type: 'journal',
    title: '✏️ Writing — Postcard to Brooklyn 🇺🇸',
    question: 'Write a postcard in English to Gabriel, Adi and Claire! Tell them about your adventure in France!',
    hint: `💡 Start with "Dear Gabriel, Adi and Claire," — tell them about your dragon ${GS.dragonName}, the castles, Brittany...`,
    placeholder: `Dear Gabriel, Adi and Claire,\nI am in Brittany with my dragon ${GS.dragonName}...`,
    journalLabel: '🇺🇸 Carte postale en anglais',
  });

  // ── Scene 5.4 — EPILOGUE ─────────────────────────────────
  await runEpilogue();
}

// ── Exercise: Find errors in banner ───────────────────────────
function runErrorFindingExercise() {
  return new Promise(resolve => {
    // tokens: { word, isError, correction }
    const tokens = [
      { word: 'Bienvenus',      isError: true,  correction: 'Bienvenue' },
      { word: ` ${GS.playerName},`, isError: false },
      { word: ' chevalier !',   isError: false },
      { word: ' Félicitation,', isError: true,  correction: 'Félicitations,' },
      { word: ' sauveur du',    isError: false },
      { word: ' drageon',       isError: true,  correction: 'dragon' },
      { word: ' !',             isError: false },
    ];
    const totalErrors = tokens.filter(t => t.isError).length;
    let foundErrors = 0;
    let wrongAttempts = 0;

    const panel = document.getElementById('exercise-panel');
    panel.innerHTML = `
      <div class="exercise-title">📖 Lecture — Trouve les fautes !</div>
      <div class="exercise-question">Raphaël a fait une banderole avec <strong style="color:#e74c3c">${totalErrors} fautes</strong> ! Appuie directement sur les mots incorrects :</div>
      <div id="banner-display" style="background:#0d1a2e;border:3px solid #ffd700;border-radius:4px;
        padding:16px 12px;font-size:17px;line-height:2.4;text-align:center;word-break:break-word;"></div>
      <div style="font-size:14px;color:#aaa;text-align:center;">
        ✅ <span id="errors-found">0</span> / ${totalErrors} fautes trouvées
      </div>
      <div class="exercise-feedback" id="ex-feedback"></div>
    `;

    const bannerDiv = document.getElementById('banner-display');
    const errorChips = [];

    tokens.forEach(token => {
      const el = document.createElement('span');
      el.textContent = token.word;

      if (token.isError) {
        el.style.cssText = `cursor:pointer;border:2px dashed #e74c3c;border-radius:4px;
          padding:2px 5px;color:#ffaaaa;transition:all 0.2s;display:inline-block;`;
        errorChips.push(el);

        const handleClick = () => {
          if (el.dataset.found) return;
          el.dataset.found = '1';
          el.style.cssText = `cursor:default;border:2px solid #2ecc40;border-radius:4px;
            padding:2px 5px;background:#1a7a28;color:#2ecc40;display:inline-block;`;
          el.title = `✓ ${token.correction.trim()}`;
          foundErrors++;
          Audio8bit.play('star');
          document.getElementById('errors-found').textContent = foundErrors;
          const fb = document.getElementById('ex-feedback');
          if (fb) { fb.textContent = `✅ "${token.word.trim()}" s'écrit "${token.correction.trim()}" !`; fb.className = 'exercise-feedback feedback-correct'; }
          if (foundErrors >= totalErrors) {
            celebrate(2);
            setTimeout(resolve, 900);
          }
        };
        el.addEventListener('click', handleClick);
        el.addEventListener('touchend', e => { e.preventDefault(); handleClick(); });
      } else {
        el.style.cssText = `cursor:pointer;border-radius:4px;padding:2px 3px;
          color:#e0e0ff;transition:background 0.15s;display:inline;`;

        const handleWrong = () => {
          if (foundErrors >= totalErrors) return;
          wrongAttempts++;
          Audio8bit.play('wrong');
          el.style.background = 'rgba(231,76,60,0.25)';
          setTimeout(() => { el.style.background = ''; }, 500);
          const msgs = ['Ce mot est correct !', 'Pas de faute ici !', 'Cherche encore les mots rouges !'];
          const fb = document.getElementById('ex-feedback');
          if (fb) { fb.textContent = '❌ ' + msgs[Math.min(wrongAttempts - 1, 2)]; fb.className = 'exercise-feedback feedback-wrong'; }
          if (wrongAttempts >= 3) {
            errorChips.forEach(chip => {
              if (!chip.dataset.found) {
                chip.style.cssText = `cursor:default;border:2px solid #ffd700;border-radius:4px;
                  padding:2px 5px;background:#3a2a00;color:#ffd700;display:inline-block;`;
              }
            });
            const fb2 = document.getElementById('ex-feedback');
            if (fb2) { fb2.textContent = '💡 Les fautes restantes sont surlignées en or !'; fb2.className = 'exercise-feedback feedback-hint'; }
            setTimeout(() => { loseHeart(); if (GS.hearts > 0) resolve(); }, 2200);
          }
        };
        el.addEventListener('click', handleWrong);
        el.addEventListener('touchend', e => { e.preventDefault(); handleWrong(); });
      }

      bannerDiv.appendChild(el);
    });

    showScreen('screen-exercise');
  });
}

// ── Mini-game: Bike ride side-scroller ───────────────────────
function runBikeGame() {
  return new Promise(resolve => {
    showScreen('screen-minigame');
    const screen = document.getElementById('screen-minigame');

    const canvas  = document.getElementById('minigame-canvas');
    const ctx     = canvas.getContext('2d');
    document.getElementById('mg-title').textContent = '🚲 Balade en vélo !';
    document.getElementById('mg-instr').textContent = 'Évite les obstacles ! ← → ou tape les côtés de l\'écran';

    let playerX = 0.25;
    let score = 0;
    let tick = 0;
    let starsCollected = 0;
    const TARGET_STARS = 5;

    const obstacles = [];
    const stars = [];

    function spawnObstacle() {
      obstacles.push({ x: 1.1, y: 0.55 + (Math.random() > 0.5 ? 0 : 0.15), w: 0.04, h: 0.12 });
    }
    function spawnStar() {
      stars.push({ x: 1.05, y: 0.4 + Math.random() * 0.25, collected: false });
    }

    function loop() {
      canvas.width  = canvas.offsetWidth  || 400;
      canvas.height = canvas.offsetHeight || 300;
      const W = canvas.width, H = canvas.height;

      Sprites.drawBackground(ctx, W, H, 'brittany');

      tick++;
      if (tick % 80 === 0) spawnObstacle();
      if (tick % 50 === 0) spawnStar();

      // Move obstacles
      for (let i = obstacles.length-1; i>=0; i--) {
        obstacles[i].x -= 0.015;
        if (obstacles[i].x < -0.1) { obstacles.splice(i,1); continue; }
        const ox = obstacles[i].x*W, oy = obstacles[i].y*H;
        ctx.fillStyle = '#555';
        ctx.fillRect(ox, oy, obstacles[i].w*W, obstacles[i].h*H);
        // Collision
        const px = playerX*W, py = H*0.6;
        if (Math.abs(px - ox) < 20 && Math.abs(py - oy) < 30) {
          Audio8bit.play('wrong');
          playerX = 0.25;
          obstacles.splice(i,1);
        }
      }

      // Move stars
      for (let i = stars.length-1; i>=0; i--) {
        stars[i].x -= 0.012;
        if (stars[i].x < -0.1) { stars.splice(i,1); continue; }
        const sx = stars[i].x*W, sy = stars[i].y*H;
        if (!stars[i].collected) {
          ctx.fillStyle = '#ffd700';
          ctx.font = '20px serif';
          ctx.textAlign = 'center';
          ctx.fillText('⭐', sx, sy);
          const px = playerX*W, py = H*0.6;
          if (Math.abs(px - sx) < 25 && Math.abs(py - sy) < 35) {
            stars[i].collected = true;
            starsCollected++;
            score++;
            Audio8bit.play('star');
            GS.stars++;
          }
        }
      }

      // Draw Erwan on bike
      ctx.fillStyle = '#2ecc40';
      ctx.fillRect(playerX*W - 12, H*0.58, 24, 30);
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(playerX*W, H*0.56, 10, 0, Math.PI*2);
      ctx.fill();
      // Wheels
      ctx.fillStyle = '#333';
      ctx.beginPath(); ctx.arc(playerX*W - 10, H*0.68+5, 8, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(playerX*W + 10, H*0.68+5, 8, 0, Math.PI*2); ctx.fill();

      // Dragon flies overhead
      Sprites.drawDragon(ctx, GS.dragonStage, W*0.6, H*0.15, 3, tick);

      // Score and progress
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`⭐ ${starsCollected}/${TARGET_STARS}`, 10, 30);

      if (starsCollected >= TARGET_STARS) {
        celebrate(2);
        screen.classList.remove('visible');
        resolve();
        return;
      }

      if (screen.classList.contains('visible')) requestAnimationFrame(loop);
    }

    // Controls
    const keys = {};
    document.addEventListener('keydown', e => keys[e.key] = true);
    document.addEventListener('keyup',   e => keys[e.key] = false);

    // Touch controls (tap left/right half)
    canvas.addEventListener('touchstart', e => {
      const r = canvas.getBoundingClientRect();
      const tx = e.touches[0].clientX - r.left;
      if (tx < canvas.width / 2) keys['ArrowLeft'] = true;
      else keys['ArrowRight'] = true;
    }, { passive: true });
    canvas.addEventListener('touchend', () => {
      keys['ArrowLeft'] = false; keys['ArrowRight'] = false;
    }, { passive: true });

    function moveBike() {
      if (keys['ArrowLeft']  || keys['a']) playerX = Math.max(0.1, playerX - 0.015);
      if (keys['ArrowRight'] || keys['d']) playerX = Math.min(0.9, playerX + 0.015);
      requestAnimationFrame(moveBike);
    }
    moveBike();
    loop();
  });
}

// ── Grand Epilogue ────────────────────────────────────────────
async function runEpilogue() {
  await runNarration([
    {
      speaker: '🌅 Coucher de soleil en Bretagne',
      text: `${GS.dragonName} vole au-dessus de la mer de Bretagne. Le soleil se couche sur l'océan. Toute la famille est réunie...`,
      bg: 'brittany',
      characters: [
        { name:'mamiya',   x:0.1,  y:0.7  },
        { name:'papou',    x:0.25, y:0.7  },
        { name:'raphael',  x:0.4,  y:0.7  },
        { name:'erwan',    x:0.55, y:0.7  },
        { name:'dragon',   x:0.78, y:0.4  },
      ],
    },
    {
      speaker: '🌟 La famille réunie',
      text: `Papi Jean-Marie et Maminette arrivent depuis Orléans par la route ! Et surprise : maman et papa ont pris l'avion depuis New York ! Tout le monde est là : maman, papa, Mamiya, Papou, Raphaël, Papi Jean-Marie, Maminette... et ${GS.dragonName} !`,
      bg: 'brittany',
      characters: [
        { name:'maman',     x:0.02, y:0.7  },
        { name:'papa',      x:0.13, y:0.7  },
        { name:'papi',      x:0.24, y:0.7  },
        { name:'maminette', x:0.35, y:0.7  },
        { name:'mamiya',    x:0.46, y:0.7  },
        { name:'papou',     x:0.57, y:0.7  },
        { name:'raphael',   x:0.68, y:0.7  },
        { name:'erwan',     x:0.82, y:0.7  },
      ],
    },
  ]);

  celebrate(10);
  Audio8bit.play('fanfare');

  // Show the grand finale screen
  document.getElementById('epilogue-player').textContent = GS.playerName;
  document.getElementById('epilogue-dragon').textContent = GS.dragonName;
  document.getElementById('epilogue-stars').textContent  = GS.stars;

  // Fill the journal display
  const jList = document.getElementById('epilogue-journal');
  jList.innerHTML = '';
  GS.journal.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'journal-entry';
    div.innerHTML = `<div class="journal-entry-label">${entry.label}</div><div>${entry.text}</div>`;
    jList.appendChild(div);
  });

  showScreen('screen-epilogue');
}
