/* ============================================================
   ACT 4 — CHÂTEAUX DE LA LOIRE
   ============================================================ */

async function runAct4() {
  GS.actIndex = 3;
  await doTransition('🏰', 1400);

  // ── Scene 4.1 — Château de Chambord ─────────────────────
  await runNarration([
    {
      speaker: '🏰 Château de Chambord',
      text: 'Le château de Chambord ! Erwan n\'a jamais rien vu d\'aussi grand. Des tours, des tourelles, des douves... et dans l\'air, une magie étrange...',
      bg: 'castle',
      characters: [{ name:'erwan', x:0.35, y:0.65 }, { name:'papi', x:0.6, y:0.65 }],
    },
    {
      speaker: '🧓 Papi Jean-Marie',
      text: 'Chambord a 365 salles — une pour chaque jour de l\'année ! François Premier l\'a fait construire. C\'est le plus grand château de la Loire !',
      bg: 'castle',
      characters: [{ name:'papi', x:0.3, y:0.65 }, { name:'erwan', x:0.6, y:0.65 }],
    },
    {
      speaker: '👵 Maminette',
      text: 'Regarde ! Il y a une inscription mystérieuse gravée dans la pierre... en vieux français !',
      bg: 'castle',
      characters: [{ name:'maminette', x:0.35, y:0.65 }, { name:'erwan', x:0.65, y:0.65 }],
    },
  ]);

  // Exercise 14 — Reading FR (inscription)
  await runMCQSequence([
    {
      question: 'L\'inscription dit : "Le dragon dort sous la tour ronde. Seul un chevalier brave peut briser les chaînes qui l\'emprisonnent." Où dort le dragon ?',
      choices: [
        { text: 'Dans les douves',      correct: false },
        { text: 'Sous la tour ronde',   correct: true  },
        { text: 'Dans la grande salle', correct: false },
      ],
      correctMsg: 'Sous la tour ronde ! Tu as bien lu l\'inscription !',
    },
    {
      question: 'Qui peut briser les chaînes du dragon ?',
      choices: [
        { text: 'Le roi de France',    correct: false },
        { text: 'Un chevalier brave',  correct: true  },
        { text: 'Un sorcier puissant', correct: false },
      ],
      correctMsg: `Un chevalier brave... comme ${GS.playerName} !`,
    },
  ], '📖 Lecture — Inscription mystérieuse', 'fr');

  // Exercise 15 — Writing FR (password)
  await runExercise({
    lang: 'fr',
    type: 'fillblanks',
    title: '✏️ Écriture — Mot de passe de la porte',
    question: 'Complète le mot de passe gravé dans la pierre :',
    segments: [
      { text: 'D', isBlank: false },
      { text: 'R', isBlank: true, answer: 'R' },
      { text: 'A', isBlank: false },
      { text: 'G', isBlank: true, answer: 'G' },
      { text: 'O', isBlank: false },
      { text: 'N', isBlank: true, answer: 'N' },
    ],
  });

  // Exercise 16 — Math FR (castle stairs)
  await runExercise({
    lang: 'fr',
    type: 'numpad',
    title: '🔢 Calcul — Les marches du château',
    question: 'La tour a 365 marches (une par jour de l\'année !). Tu en montes 100. Combien en reste-t-il ?',
    answer: 265,
    correctMsg: 'Bravo ! 365 − 100 = 265 marches restantes !',
  });

  // ── Scene 4.2 — The English Gate ─────────────────────────
  await runNarration([
    {
      speaker: '🚪 Porte mystérieuse',
      text: 'Une porte avec une inscription... mais elle est en ANGLAIS ! Papi Jean-Marie plisse les yeux.',
      bg: 'castle',
      characters: [{ name:'papi', x:0.25, y:0.65 }, { name:'maminette', x:0.45, y:0.65 }, { name:'erwan', x:0.7, y:0.65 }],
    },
    {
      speaker: '🧓 Papi Jean-Marie',
      text: '"De l\'anglais... je ne comprends rien à ces machins ! Du temps de ma jeunesse on apprenait le latin !"',
      bg: 'castle',
      characters: [{ name:'papi', x:0.3, y:0.65 }, { name:'erwan', x:0.65, y:0.65 }],
    },
    {
      speaker: '👵 Maminette',
      text: '"Le parchemin magique dit qu\'il faut répondre en anglais pour ouvrir la prochaine porte... on ne comprend pas l\'anglais nous, mais je suis sûre que notre chevalier saura nous aider !"',
      bg: 'castle',
      characters: [{ name:'maminette', x:0.35, y:0.65 }, { name:'erwan', x:0.65, y:0.65 }],
    },
  ]);

  // Exercise 17 — Reading EN (translate inscription)
  await runExercise({
    lang: 'en',
    type: 'mcq',
    title: '📖 Reading — The Castle Door 🇺🇸',
    question: 'The inscription says: "The brave knight must open this door." What does it mean in French?',
    choices: [
      { text: 'Le courageux chevalier doit ouvrir cette porte.', correct: true  },
      { text: 'Le sorcier fermera cette porte pour toujours.',   correct: false },
      { text: 'Le dragon brisera cette porte cette nuit.',       correct: false },
    ],
    correctMsg: 'Perfect! "The brave knight must open this door" = Le courageux chevalier doit ouvrir cette porte !',
  });

  // Exercise 18 — Writing EN (BRAVE KNIGHT)
  await runExercise({
    lang: 'en',
    type: 'fillblanks',
    title: '✏️ Writing — The Password 🇺🇸',
    question: 'Complete the password to open the door:',
    segments: [
      { text: 'B', isBlank: false },
      { text: 'RA', isBlank: true, answer: 'RA' },
      { text: 'VE ', isBlank: false },
      { text: 'KN', isBlank: true, answer: 'KN' },
      { text: 'I', isBlank: false },
      { text: 'GHT', isBlank: true, answer: 'GHT' },
    ],
  });

  // ── Scene 4.3 — BOSS: Sorcier Malfang ───────────────────
  await runNarration([
    {
      speaker: '⚡ ATTENTION !',
      text: 'La porte s\'ouvre avec un craquement sinistre... et là, dans l\'obscurité, des yeux violets s\'allument !',
      bg: 'castle',
      characters: [{ name:'erwan', x:0.65, y:0.65 }],
    },
    {
      speaker: '🧙 Sorcier Malfang',
      text: '"MWAHAHAHA ! Qui ose entrer dans mon château ?! Un simple chevalier de Brooklyn ?! Je suis le SORCIER MALFANG !"',
      bg: 'castle',
      characters: [{ name:'malfang', x:0.2, y:0.55 }, { name:'erwan', x:0.7, y:0.65 }],
    },
    {
      speaker: '🧙 Sorcier Malfang',
      text: `"Si tu réponds juste à mes TROIS ÉPREUVES, je libère la créature. Sinon... ${GS.dragonName || 'ton dragon'} restera enchaîné POUR TOUJOURS ! Ha ha ha !"`,
      bg: 'castle',
      characters: [{ name:'malfang', x:0.2, y:0.55 }, { name:'erwan', x:0.7, y:0.65 }, { name:'dragon', x:0.5, y:0.75 }],
    },
    {
      speaker: `⚔️ ${GS.playerName}`,
      text: `"Je relève le défi, Sorcier Malfang ! Je suis ${GS.playerName}, Chevalier de Brooklyn, et je vais sauver ${GS.dragonName || 'mon dragon'} !"`,
      bg: 'castle',
      characters: [{ name:'malfang', x:0.2, y:0.55 }, { name:'erwan', x:0.7, y:0.65 }],
    },
  ]);
  Audio8bit.play('drumRoll');
  setTimeout(() => Audio8bit.play('bossDead'), 700);

  // Boss Challenge 1 — Math FR
  await runExercise({
    lang: 'fr',
    type: 'numpad',
    title: '⚡ ÉPREUVE 1 du Sorcier Malfang !',
    question: 'ÉPREUVE 1 : "J\'ai 3 fois 8 étoiles magiques et j\'en perds 7. Combien en reste-t-il ?" (rit Malfang)',
    answer: 17,
    correctMsg: '✅ 17 ! Malfang grogne de rage !',
  });

  await runNarration([
    {
      speaker: '🧙 Malfang (furieux)',
      text: `"Grrrr ! Bien calculé, chevalier ! Mais tu ne passeras pas la deuxième épreuve !"`,
      bg: 'castle',
      characters: [{ name:'malfang', x:0.25, y:0.55 }, { name:'erwan', x:0.7, y:0.65 }],
    },
  ]);

  // Boss Challenge 2 — Reading FR (drag-drop)
  await runExercise({
    lang: 'fr',
    type: 'dragdrop',
    title: '⚡ ÉPREUVE 2 du Sorcier Malfang !',
    question: '"Remets ces mots dans le bon ordre pour former une phrase !" rugit Malfang.',
    words: ['sauver', 'je', 'vais', 'mon', 'dragon'],
    correctOrder: ['je', 'vais', 'sauver', 'mon', 'dragon'],
  });

  await runNarration([
    {
      speaker: '🧙 Malfang (de plus en plus furieux)',
      text: `"IMPOSSIBLE ! Chevalier de malheur ! Mais tu ne peux PAS connaître la dernière épreuve !"`,
      bg: 'castle',
      characters: [{ name:'malfang', x:0.2, y:0.55 }, { name:'erwan', x:0.7, y:0.65 }],
    },
    {
      speaker: '🧙 Malfang',
      text: `"Pour libérer le dragon... tu dois prononcer son nom secret ! Et tu ne le connais pas !"`,
      bg: 'castle',
      characters: [{ name:'malfang', x:0.2, y:0.55 }, { name:'dragon', x:0.5, y:0.75 }, { name:'erwan', x:0.75, y:0.65 }],
    },
  ]);

  // Boss Challenge 3 — Type dragon's name!
  await runExercise({
    lang: 'fr',
    type: 'typing',
    title: '⚡ ÉPREUVE FINALE — Appelle ton dragon !',
    question: `Tape le nom de ton dragon pour l'appeler ! (Malfang pâlit de rage...)`,
    answer: GS.dragonName,
    alternatives: [GS.dragonName.toLowerCase(), GS.dragonName.toUpperCase()],
    placeholder: 'Tape le nom de ton dragon...',
    hint: `💡 Son nom commence par : ${GS.dragonName[0] || '?'}`,
  });

  // VICTORY CINEMATIC
  await runNarration([
    {
      speaker: '🔥 VICTOIRE !',
      text: `"NOOOON !" hurle Malfang. "Tu connais son nom ! C'est impossible !" Les chaînes du dragon brillent, craquent, et... BOOM !`,
      bg: 'castle',
      characters: [{ name:'malfang', x:0.15, y:0.55 }, { name:'dragon', x:0.5, y:0.6 }],
    },
    {
      speaker: `🐉 ${GS.dragonName} est LIBRE !`,
      text: `${GS.dragonName} brise ses chaînes ! Il grandit, ses écailles brillent, ses ailes se déploient ! Le Sorcier Malfang disparaît dans un nuage de fumée violette !`,
      bg: 'castle',
      characters: [{ name:'dragon', x:0.5, y:0.5 }, { name:'erwan', x:0.2, y:0.65 }],
    },
    {
      speaker: '🎆 Feux d\'artifice !',
      text: `Papi Jean-Marie et Maminette applaudissent ! Des feux d'artifice colorés illuminent le ciel du château ! "${GS.playerName}, tu es le plus grand chevalier de toute la Loire !"`,
      bg: 'castle',
      characters: [
        { name:'papi', x:0.15, y:0.65 }, { name:'maminette', x:0.35, y:0.65 },
        { name:'erwan', x:0.6, y:0.65 }, { name:'dragon', x:0.82, y:0.5 },
      ],
    },
  ]);

  celebrate(5);
  Audio8bit.play('magic');
  setTimeout(() => Audio8bit.play('bossDead'), 400);
  evolveDragon(); // stage 2 → 3

  await runAct5();
}
