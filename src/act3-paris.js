/* ============================================================
   ACT 3 — PARIS CDG → ORLÉANS
   ============================================================ */

async function runAct3() {
  GS.actIndex = 2;
  await doTransition('🗼', 1200);

  // ── Scene 3.1 — Arrivée à Paris CDG ─────────────────────
  await runNarration([
    {
      speaker: '🛬 Arrivée à Paris !',
      text: 'L\'avion atterrit à l\'aéroport Charles de Gaulle — CDG pour les initiés ! Erwan regarde par le hublot : la Tour Eiffel au loin, et... la vieille voiture de Papi Jean-Marie dans le parking !',
      bg: 'paris',
      characters: [{ name:'erwan', x:0.3, y:0.65 }],
    },
    {
      speaker: '🧓 Papi Jean-Marie',
      text: `Mon grand chevalier ! Bienvenue en France ! Maminette et moi on t'a apporté des croissants frais — ça va te changer des donuts américains !`,
      bg: 'paris',
      characters: [{ name:'papi', x:0.25, y:0.65 }, { name:'maminette', x:0.45, y:0.65 }, { name:'erwan', x:0.7, y:0.65 }],
    },
    {
      speaker: '👵 Maminette',
      text: 'Oh mon chéri ! Tu as grandi ! Vite, on doit trouver la sortie et prendre la route pour Orléans !',
      bg: 'paris',
      characters: [{ name:'papi', x:0.25, y:0.65 }, { name:'maminette', x:0.45, y:0.65 }, { name:'erwan', x:0.7, y:0.65 }],
    },
  ]);

  // Exercise 10 — Reading FR (CDG signs)
  await runMCQSequence([
    {
      question: 'Tu dois récupérer ta valise. Quel panneau suis-tu ?',
      choices: [
        { text: '🛫 DÉPARTS',  correct: false },
        { text: '🧳 BAGAGES',  correct: true  },
        { text: '🚌 NAVETTES', correct: false },
      ],
      correctMsg: 'BAGAGES ! C\'est là que tu récupères ta valise !',
    },
    {
      question: 'Papi Jean-Marie t\'attend dehors. Quel panneau suis-tu ?',
      choices: [
        { text: '🧳 BAGAGES',  correct: false },
        { text: '🚪 SORTIE',   correct: true  },
        { text: '✈️ ARRIVÉES', correct: false },
      ],
      correctMsg: 'SORTIE ! Papi Jean-Marie est dehors, il t\'attend !',
    },
  ], '📖 Lecture — Panneaux de CDG 🇫🇷', 'fr');

  // Exercise 11 — Writing FR (postcard)
  await runNarration([
    {
      speaker: '📮 Carte postale',
      text: 'Pendant que Papi charge les bagages dans la voiture, tu écris une carte postale à Gabriel !',
      bg: 'paris',
      characters: [{ name:'erwan', x:0.5, y:0.65 }],
    },
  ]);

  await runExercise({
    lang: 'fr',
    type: 'fillblanks',
    title: '✏️ Écriture — Carte postale à Gabriel',
    question: 'Complète la carte postale pour Gabriel :',
    segments: [
      { text: 'Je suis ', isBlank: false },
      { text: 'arrivé', isBlank: true, answer: 'arrivé' },
      { text: ' à ', isBlank: false },
      { text: 'Paris', isBlank: true, answer: 'Paris' },
      { text: '. Il y a la Tour ', isBlank: false },
      { text: 'Eiffel', isBlank: true, answer: 'Eiffel' },
      { text: ' !', isBlank: false },
    ],
    journalLabel: '📮 Carte postale de Paris',
  });

  // ── Scene 3.2 — Route vers Orléans ──────────────────────
  await runNarration([
    {
      speaker: '🚗 Sur la route !',
      text: 'La nouvelle voiture électrique de Papi Jean-Marie roule silencieusement vers Orléans. On n\'entend que le vent et les oiseaux — c\'est magique !',
      bg: 'road',
      characters: [{ name:'papi', x:0.25, y:0.65 }, { name:'maminette', x:0.45, y:0.65 }, { name:'erwan', x:0.7, y:0.65 }],
    },
    {
      speaker: '🧓 Papi Jean-Marie',
      text: 'Tu sais, les châteaux de la Loire ont été construits il y a plus de 500 ans ! Chambord, Chenonceau, Blois... des palais de roi !',
      bg: 'road',
      characters: [{ name:'papi', x:0.3, y:0.65 }, { name:'erwan', x:0.6, y:0.65 }],
    },
    {
      speaker: '👵 Maminette',
      text: 'Et dans l\'un de ces châteaux, un dragon est emprisonné par le terrible Sorcier Malfang... mais toi tu vas le sauver, mon grand chevalier !',
      bg: 'road',
      characters: [{ name:'maminette', x:0.35, y:0.65 }, { name:'erwan', x:0.65, y:0.65 }],
    },
  ]);

  // Exercise 12 — Math FR (distance)
  await runExercise({
    lang: 'fr',
    type: 'numpad',
    title: '🔢 Calcul — La route pour Orléans',
    question: 'Orléans est à 130 km de Paris. On a déjà fait 65 km. Combien de km reste-t-il ?',
    answer: 65,
    correctMsg: 'Bravo ! Il reste 65 km !',
  });

  // Exercise 13 — Dragon book (narration + typing + English MCQ)
  await runNarration([
    {
      speaker: '👵 Maminette (lit un livre)',
      text: '"Tiens, j\'ai trouvé un livre sur les dragons de la Loire ! Il dit : les dragons mangent des étoiles magiques... et pour libérer un dragon prisonnier, il faut absolument connaître son nom !" Maminette sourit : "Tu vois pourquoi on a donné un nom à ton dragon ?"',
      bg: 'road',
      characters: [{ name:'maminette', x:0.35, y:0.65 }, { name:'erwan', x:0.65, y:0.65 }],
    },
  ]);

  await runExercise({
    lang: 'fr',
    type: 'typing',
    title: '📖 Lecture — Le livre des dragons',
    question: 'Maminette vient de lire que les dragons de la Loire mangent des... Écris ce qu\'ils mangent :',
    answer: 'étoiles magiques',
    alternatives: ['etoiles magiques', 'étoiles magique', 'etoile magique', 'etoiles magique'],
    placeholder: 'Tape la réponse...',
    hint: '💡 Maminette vient de lire la réponse à voix haute !',
  });

  await runMCQSequence([
    {
      question: 'The book says: "To free a dragon, a brave knight must know its..." What is missing?',
      choices: [
        { text: '😴 Sleep schedule', correct: false },
        { text: '🔤 Name',           correct: true  },
        { text: '📚 Favourite book', correct: false },
      ],
      correctMsg: `Yes! You must know its name! That's why your dragon is called "${GS.dragonName}"!`,
    },
  ], '📖 Reading — The Dragon Book 🇺🇸', 'en');

  // Mini-game: Map of France — click cities
  await runMapGame();

  Audio8bit.play('levelUp');
  evolveDragon(); // stage 1 → 2

  await runAct4();
}

// ── Mini-game: France map city click ─────────────────────────
function runMapGame() {
  return new Promise(resolve => {
    showScreen('screen-minigame');
    const screen = document.getElementById('screen-minigame');

    const canvas  = document.getElementById('minigame-canvas');
    const ctx     = canvas.getContext('2d');
    const titleEl = document.getElementById('mg-title');
    const instrEl = document.getElementById('mg-instr');

    titleEl.textContent = '🗺️ Carte de France !';
    instrEl.textContent = 'Clique sur les villes dans l\'ordre : Paris → Orléans → Lorient';

    const cities = [
      { name:'Paris',   px:0.48, py:0.28, done:false },
      { name:'Orléans', px:0.47, py:0.38, done:false },
      { name:'Lorient', px:0.22, py:0.62, done:false },
    ];
    let step = 0;

    function draw() {
      canvas.width  = canvas.offsetWidth  || 400;
      canvas.height = canvas.offsetHeight || 300;
      const W = canvas.width, H = canvas.height;

      // France shape (simplified)
      ctx.fillStyle = '#2a5a20';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#3a7a30';
      ctx.beginPath();
      ctx.ellipse(W*0.48, H*0.5, W*0.28, H*0.38, 0, 0, Math.PI*2);
      ctx.fill();

      // Route lines for completed segments
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 3;
      ctx.setLineDash([6,4]);
      if (step >= 1) {
        ctx.beginPath();
        ctx.moveTo(cities[0].px*W, cities[0].py*H);
        ctx.lineTo(cities[1].px*W, cities[1].py*H);
        ctx.stroke();
      }
      if (step >= 2) {
        ctx.beginPath();
        ctx.moveTo(cities[1].px*W, cities[1].py*H);
        ctx.lineTo(cities[2].px*W, cities[2].py*H);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Cities
      cities.forEach((city, i) => {
        const x = city.px * W, y = city.py * H;
        const isNext = i === step;
        ctx.fillStyle = city.done ? '#2ecc40' : (isNext ? '#ffd700' : '#888');
        ctx.beginPath();
        ctx.arc(x, y, isNext ? 12 : 8, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${isNext ? 14 : 12}px monospace`;
        ctx.textAlign = 'left';
        ctx.fillText(city.name, x + 14, y + 5);
        if (city.done) {
          ctx.fillStyle = '#2ecc40';
          ctx.fillText('✓', x - 5, y + 5);
        }
      });

      // Instructions
      if (step < cities.length) {
        ctx.fillStyle = '#ffd700';
        ctx.font = '15px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`➤ Clique sur : ${cities[step].name}`, W/2, H - 20);
      }
    }

    canvas.onclick = e => {
      const r = canvas.getBoundingClientRect();
      const mx = (e.clientX - r.left);
      const my = (e.clientY - r.top);
      const W = canvas.width, H = canvas.height;
      if (step >= cities.length) return;
      const city = cities[step];
      const dx = mx - city.px * W, dy = my - city.py * H;
      if (Math.sqrt(dx*dx+dy*dy) < 28) {
        city.done = true;
        step++;
        Audio8bit.play('star');
        draw();
        if (step >= cities.length) {
          celebrate(2);
          setTimeout(() => {
            screen.classList.remove('visible');
            resolve();
          }, 800);
        }
      }
    };
    canvas.addEventListener('touchstart', e => {
      const t = e.touches[0], r = canvas.getBoundingClientRect();
      canvas.onclick({ clientX: t.clientX, clientY: t.clientY });
    }, { passive: true });

    draw();
  });
}
