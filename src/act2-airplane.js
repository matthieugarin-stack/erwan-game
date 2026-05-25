/* ============================================================
   ACT 2 — JFK AIRPORT & THE AIRPLANE
   ============================================================ */

async function runAct2() {
  GS.actIndex = 1;
  await doTransition('✈️', 1200);

  // ── Scene 2.1 — JFK Airport ─────────────────────────────
  await runNarration([
    {
      speaker: '🗽 Aéroport JFK',
      text: `Te voilà à l'aéroport JFK — tout seul, comme un vrai chevalier ! Des panneaux partout, des avions partout... C'est grand comme ta salle de classe fois mille !`,
      bg: 'airport',
      characters: [{ name:'erwan', x:0.5, y:0.65 }],
    },
    {
      speaker: '📋 Mission',
      text: 'Tu dois trouver ta porte d\'embarquement. Lis bien les panneaux !',
      bg: 'airport',
      characters: [{ name:'erwan', x:0.5, y:0.65 }],
    },
  ]);

  // Exercise 5 — Reading FR (airport signs)
  await runMCQSequence([
    {
      question: 'Tu cherches ton avion qui part. Quel panneau dois-tu suivre ?',
      choices: [
        { text: '🧳 ARRIVÉES',  correct: false },
        { text: '🛫 DÉPARTS',   correct: true  },
        { text: '🚌 NAVETTES',  correct: false },
      ],
      correctMsg: 'DÉPARTS ! C\'est là que partent les avions !',
    },
    {
      question: 'Ton billet dit "PORTE 23". Quel panneau suis-tu maintenant ?',
      choices: [
        { text: 'Zone B — Portes 40-60', correct: false },
        { text: 'Zone A — Portes 1-30',  correct: true  },
        { text: 'Bagages perdus',        correct: false },
      ],
      correctMsg: 'Zone A, portes 1-30 ! La porte 23 est là !',
    },
  ], '📖 Lecture — Panneaux de l\'aéroport JFK 🇫🇷', 'fr');

  // Exercise 6 — Math EN (first English exercise!)
  await runNarration([
    {
      speaker: '📢 Attention !',
      text: 'Le panneau de l\'aéroport est en anglais ! Le drapeau américain va apparaître — c\'est le signal !',
      bg: 'airport',
      characters: [{ name:'erwan', x:0.5, y:0.65 }],
    },
  ]);

  await runExercise({
    lang: 'en',
    type: 'numpad',
    title: '🔢 Math — Flight Time 🇺🇸',
    question: 'Your flight leaves at 6:00pm. It is now 3:30pm. How many minutes until your flight?',
    answer: 150,
    correctMsg: '3:30pm to 6:00pm = 2 hours 30 min = 150 minutes!',
  });

  // Exercise 7 — Writing EN (complex: name + destination)
  await runExercise({
    lang: 'en',
    type: 'fillblanks',
    title: '✏️ Writing — Check-in 🇺🇸',
    question: 'Complete the check-in screen with your name and your destination:',
    segments: [
      { text: 'PASSENGER: ', isBlank: false },
      { text: GS.playerName.toUpperCase(), isBlank: true, answer: GS.playerName.toUpperCase() },
      { text: ' — DESTINATION: ', isBlank: false },
      { text: 'PARIS', isBlank: true, answer: 'PARIS' },
      { text: ' — GATE: 23', isBlank: false },
    ],
  });

  // ── Scene 2.2 — In the Airplane ─────────────────────────
  await runNarration([
    {
      speaker: '✈️ Dans l\'avion',
      text: 'L\'avion décolle ! New York disparaît sous les nuages. Erwan regarde par le hublot. C\'est la troisième fois qu\'il prend l\'avion tout seul !',
      bg: 'plane_interior',
      characters: [{ name:'erwan', x:0.5, y:0.65 }],
    },
    {
      speaker: '👨‍✈️ Steward',
      text: '"Would you like something to drink, young man?" — Le steward parle anglais ! Erwan répond poliment en français.',
      bg: 'plane_interior',
      characters: [{ name:'erwan', x:0.6, y:0.65 }],
    },
    {
      speaker: `⚔️ ${GS.playerName}`,
      text: '"Oui merci, un jus d\'orange s\'il vous plaît !" Le steward sourit et apporte le jus. Bravo le chevalier !',
      bg: 'plane_interior',
      characters: [{ name:'erwan', x:0.5, y:0.65 }],
    },
  ]);

  // Exercise 8 — Journal FR
  await runExercise({
    lang: 'fr',
    type: 'journal',
    title: '📔 Journal de bord — Dans l\'avion',
    question: 'Écris dans ton journal de bord ! Décris ce que tu vois et ce que tu ressens :',
    hint: `💡 Tu peux écrire : "Je suis dans l'avion au-dessus de l'Atlantique. Par le hublot, je vois les nuages. Je ressens... Je pense à ${GS.dragonName} qui m'attend..."`,
    placeholder: `Je suis dans l'avion au-dessus de l'Atlantique. Par le hublot, je vois...`,
    journalLabel: '✈️ Dans l\'avion',
  });

  // Exercise 9 — Math FR (flight duration)
  await runExercise({
    lang: 'fr',
    type: 'numpad',
    title: '🔢 Calcul — Durée du vol',
    question: 'L\'avion part à 18h (heure de New York) et atterrit à 1h du matin (heure de New York). Combien d\'heures dure le vol ?',
    answer: 7,
    correctMsg: 'De 18h à 1h du matin = 7 heures de vol !',
  });

  // Mini-game: Catch cloud syllables to spell the dragon's name
  await runCloudGame();

  Audio8bit.play('levelUp');
  await runAct3();
}

// ── Mini-game: Cloud syllable catcher ────────────────────────
function runCloudGame() {
  return new Promise(resolve => {
    showScreen('screen-minigame');
    const screen = document.getElementById('screen-minigame');

    const canvas  = document.getElementById('minigame-canvas');
    const ctx     = canvas.getContext('2d');
    const titleEl = document.getElementById('mg-title');
    const instrEl = document.getElementById('mg-instr');

    // Build target word (dragon name or DRAGON if short)
    const target = (GS.dragonName || 'DRAGON').toUpperCase().split('');
    let collected = [];
    titleEl.textContent = '🌤️ Mini-jeu : Attrape les nuages !';
    instrEl.textContent = `Attrape les lettres dans l'ordre pour écrire : ${target.join(' - ')}`;

    const clouds = [];
    let tick = 0;

    function spawnCloud() {
      const idx = collected.length;
      if (idx >= target.length) return;
      // Only spawn the next needed letter
      clouds.push({
        x: Math.random() * (canvas.width - 80) + 40,
        y: -40,
        letter: target[idx],
        speed: 0.8 + Math.random() * 0.8,
        isNext: true,
      });
      // Decoys
      for (let i = 0; i < 2; i++) {
        const decoy = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random()*26)];
        clouds.push({
          x: Math.random() * (canvas.width - 80) + 40,
          y: -40 - i * 50,
          letter: decoy,
          speed: 0.5 + Math.random(),
          isNext: false,
        });
      }
    }

    function drawCloud(x, y, letter, isNext) {
      ctx.fillStyle = isNext ? '#fff9c4' : '#e0e0e0';
      ctx.beginPath();
      ctx.ellipse(x, y, 36, 22, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = isNext ? '#ffd700' : '#888';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter, x, y);
    }

    function drawProgress() {
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(collected.join(' ') + (collected.length < target.length ? ' _' : ''), canvas.width/2, canvas.height - 30);
    }

    function handleClick(cx, cy) {
      for (let i = clouds.length - 1; i >= 0; i--) {
        const cl = clouds[i];
        const dx = cx - cl.x, dy = cy - cl.y;
        if (Math.sqrt(dx*dx+dy*dy) < 38) {
          if (cl.isNext) {
            collected.push(cl.letter);
            clouds.splice(i, 1);
            Audio8bit.play('star');
            // Remove all decoys
            clouds.length = 0;
            if (collected.length >= target.length) {
              // Win!
              setTimeout(() => {
                screen.classList.remove('visible');
                celebrate(3);
                resolve();
              }, 600);
              return;
            }
            spawnCloud();
          } else {
            Audio8bit.play('wrong');
            // Flash red
            clouds.splice(i, 1);
          }
          return;
        }
      }
    }

    canvas.onclick = e => {
      const r = canvas.getBoundingClientRect();
      handleClick(e.clientX - r.left, e.clientY - r.top);
    };
    canvas.addEventListener('touchstart', e => {
      const t = e.touches[0], r = canvas.getBoundingClientRect();
      handleClick(t.clientX - r.left, t.clientY - r.top);
    }, { passive: true });

    spawnCloud();

    function loop() {
      canvas.width  = canvas.offsetWidth  || 400;
      canvas.height = canvas.offsetHeight || 300;
      ctx.fillStyle = '#1a3a5c';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      // Clouds bg
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      for (let c=0; c<5; c++) {
        ctx.beginPath();
        ctx.ellipse(((tick*0.3+c*120)%canvas.width), (c*60+20)%canvas.height, 60, 25, 0, 0, Math.PI*2);
        ctx.fill();
      }

      tick++;
      clouds.forEach(cl => { cl.y += cl.speed; });
      // Remove clouds that fell off screen
      for (let i = clouds.length-1; i>=0; i--) {
        if (clouds[i].y > canvas.height + 50) clouds.splice(i,1);
      }
      // If no clouds, spawn next
      if (clouds.length === 0 && collected.length < target.length) spawnCloud();

      clouds.forEach(cl => drawCloud(cl.x, cl.y, cl.letter, cl.isNext));
      // Erwan at bottom
      Sprites.drawCharacter(ctx, 'erwan', canvas.width/2 - 18, canvas.height - 80, 3, tick);
      drawProgress();

      if (screen.classList.contains('visible')) requestAnimationFrame(loop);
    }
    loop();
  });
}
