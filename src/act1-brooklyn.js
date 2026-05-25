/* ============================================================
   ACT 1 — BROOKLYN
   ============================================================ */

async function runAct1() {
  GS.actIndex = 0;
  await doTransition('🗽', 1200);

  // ── Scene 1.1 — Erwan's Room ─────────────────────────────
  await runNarration([
    {
      speaker: '📜 Parchemin magique',
      text: 'Un parchemin magique apparaît sur le bureau d\'Erwan... Il vient de Mamiya ! Sur le mur, le poster orange et bleu des Knicks te regarde.',
      bg: 'room',
      characters: [{ name:'erwan', x:0.5, y:0.65 }],
    },
    {
      speaker: '💌 Mamiya',
      text: `Un dragon bébé est emprisonné par le terrible Sorcier Malfang dans un château de la Loire. Toi seul peux le sauver, ${GS.playerName} ! Tu pars en France tout seul, comme un grand chevalier !`,
      bg: 'room',
      characters: [{ name:'erwan', x:0.5, y:0.65 }],
    },
  ]);

  // Exercise 1 — Reading FR (MCQ sequence)
  await runMCQSequence([
    {
      question: 'Sur le poster des Knicks dans ta chambre, de quelles couleurs est le maillot ?',
      choices: [
        { text: '🔴 Rouge et blanc', correct: false },
        { text: '🟠 Orange et bleu', correct: true  },
        { text: '🟢 Vert et noir',   correct: false },
      ],
      correctMsg: 'Oui ! Orange et bleu, les couleurs des New York Knicks !',
    },
    {
      question: 'Qui a envoyé le parchemin magique à Erwan ?',
      choices: [
        { text: 'Gabriel',         correct: false },
        { text: 'Mamiya',          correct: true  },
        { text: 'Papi Jean-Marie', correct: false },
      ],
      correctMsg: 'Oui ! C\'est Mamiya, la grand-mère de Bretagne !',
    },
    {
      question: 'Où est emprisonné le dragon ?',
      choices: [
        { text: 'À Brooklyn',                  correct: false },
        { text: 'Dans un château de la Loire', correct: true  },
        { text: 'En Bretagne',                 correct: false },
      ],
      correctMsg: 'Bravo ! Dans un château de la Loire !',
    },
  ], '📖 Lecture — La chambre d\'Erwan', 'fr');

  // Exercise 2 — Math FR
  await runExercise({
    lang: 'fr',
    type: 'numpad',
    title: '🔢 Calcul — Le sac de voyage',
    question: `Tu prépares ton sac pour la grande aventure ! Tu as 12 étoiles Knicks dans ta chambre, tu en mets 7 dans ton sac. Combien en reste-t-il dans ta chambre ?`,
    answer: 5,
    correctMsg: '12 − 7 = 5. Exactement !',
  });

  // ── Scene 1.2 — PS58, au revoir les amis ─────────────────
  await runNarration([
    {
      speaker: '🏫 Devant PS58',
      text: 'Gabriel, Adi et Claire attendent devant l\'école PS58. Ils veulent dire au revoir à leur ami chevalier !',
      bg: 'school',
      characters: [
        { name:'gabriel', x:0.3, y:0.65 },
        { name:'adi',     x:0.5, y:0.65 },
        { name:'claire',  x:0.7, y:0.65 },
      ],
    },
    {
      speaker: '🛡️ Gabriel',
      text: 'Je te donne mon bouclier magique ! Il a la toile de Spider-Man dessus. Et j\'ai écrit un message pour toi sur ce bout de papier !',
      bg: 'school',
      characters: [{ name:'gabriel', x:0.4, y:0.65 }, { name:'erwan', x:0.65, y:0.65 }],
    },
    {
      speaker: '🧣 Adi',
      text: 'Et moi je te donne ma cape violette ! Elle te rendra invisible si tu as peur.',
      bg: 'school',
      characters: [{ name:'adi', x:0.35, y:0.65 }, { name:'erwan', x:0.65, y:0.65 }],
    },
    {
      speaker: '🧪 Claire',
      text: 'Et voilà une fiole de courage ! Bois-la si le sorcier te fait peur. Bon voyage !',
      bg: 'school',
      characters: [{ name:'claire', x:0.35, y:0.65 }, { name:'erwan', x:0.65, y:0.65 }],
    },
  ]);

  // Exercise 3 — Writing FR (fill blanks — exact quotes)
  await runExercise({
    lang: 'fr',
    type: 'fillblanks',
    title: '✏️ Écriture — Ce qu\'ont dit tes amis',
    question: 'Rappelle-toi ce que t\'ont dit tes amis ! Complète leurs paroles :',
    segments: [
      { text: 'Gabriel : "J\'ai écrit un ', isBlank: false },
      { text: 'message', isBlank: true, answer: 'message' },
      { text: ' pour toi !"', isBlank: false },
      { text: ' — Adi : "Elle te rendra ', isBlank: false },
      { text: 'invisible', isBlank: true, answer: 'invisible' },
      { text: ' !"', isBlank: false },
      { text: ' — Claire : "Bon ', isBlank: false },
      { text: 'voyage', isBlank: true, answer: 'voyage' },
      { text: ' !"', isBlank: false },
    ],
  });

  // Exercise 3b — Type school name
  await runExercise({
    lang: 'fr',
    type: 'typing',
    title: '✏️ Écriture — Ton école',
    question: 'Comment s\'appelle ton école à Brooklyn ? Tape son nom :',
    answer: 'PS58',
    alternatives: ['ps 58', 'ps58', 'P.S. 58'],
    placeholder: 'Tape le nom de l\'école...',
    hint: '💡 C\'est PS suivi d\'un nombre...',
  });

  // Exercise 4 — Reading FR (drag-drop)
  await runExercise({
    lang: 'fr',
    type: 'dragdrop',
    title: '📖 Message de Gabriel — Remet les mots en ordre',
    question: 'Gabriel t\'a écrit un message sur un bout de papier ! Remets les mots dans le bon ordre pour lire sa phrase :',
    words: ['Tu', 'vas', 'sauver', 'le', 'dragon,', 'brave', 'chevalier', '!'],
    correctOrder: ['Tu', 'vas', 'sauver', 'le', 'dragon,', 'brave', 'chevalier', '!'],
  });

  // Mini celebration — fanfare joue dès l'affichage de la scène
  await runNarration([
    {
      speaker: '🎺 Au revoir !',
      text: 'Gabriel, Adi et Claire font coucou et sautent de joie. Le chevalier Erwan part à l\'aventure !',
      bg: 'school',
      sound: 'fanfare',
      characters: [
        { name:'gabriel', x:0.2, y:0.65 },
        { name:'adi',     x:0.4, y:0.65 },
        { name:'claire',  x:0.6, y:0.65 },
        { name:'erwan',   x:0.82, y:0.65 },
      ],
    },
  ]);
  evolveDragon(); // stage 0 → 1

  await runAct2();
}
