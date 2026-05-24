/* ============================================================
   SPRITE & PIXEL ART ENGINE
   All art drawn on Canvas using 2D color arrays.
   ============================================================ */

const Sprites = (() => {

  // ── Color palette shorthand ──────────────────────────────
  const _ = null; // transparent
  const K = '#111'; const W = '#eee'; const R = '#e74c3c';
  const G = '#2ecc40'; const DG = '#1a7a28'; const LG = '#90ee90';
  const B = '#006bff'; const LB = '#5dade2'; const DB = '#003580';
  const Y = '#ffd700'; const O = '#ff6b00'; const P = '#9b59b6';
  const BR = '#8b4513'; const SK = '#ffdbac'; const GR = '#888';
  const DGR = '#444'; const WH = '#fff'; const BK = '#222d';

  // ── Draw helper ──────────────────────────────────────────
  function draw(ctx, grid, x, y, scale = 3) {
    grid.forEach((row, r) => row.forEach((c, col) => {
      if (c !== _) { ctx.fillStyle = c; ctx.fillRect(x + col*scale, y + r*scale, scale, scale); }
    }));
  }

  // ── ERWAN — 12×16 green knight ───────────────────────────
  const ERWAN = [
    [_,_,_,DGR,DGR,DGR,DGR,_,_,_,_,_],
    [_,_,DGR,G,  G,  G,  G,DGR,_,_,_,_],
    [_,_,DGR,SK, SK, SK, SK,DGR,_,_,_,_],
    [_,_,_,DGR,SK, SK,DGR,_,_,_,_,_],
    [_,_,_,DG, G,  G,  DG,_,_,_,_,_],
    [_,DG,DG,G,  G,  G,  G, DG,DG,_,_,_],
    [_,G, G, G,  Y,  Y,  G,  G, G, _,_,_],
    [_,G, G, G,  G,  G,  G,  G, G, _,_,_],
    [_,G, G, G,  G,  G,  G,  G, G, _,_,_],
    [_,DG,G, Y,  G,  G,  Y,  G,DG,_,_,_],
    [_,_,DG,DG, G,  G, DG,DG,_,_,_,_],
    [_,_,G,  G,  DG,DG, G, G, _,_,_,_],
    [_,_,G,  G,  _,  _,  G, G, _,_,_,_],
    [_,_,DG,DG, _,  _,  DG,DG,_,_,_,_],
    [_,_,Y,  Y,  _,  _,  Y, Y, _,_,_,_],
    [_,_,GR, GR, _,  _,  GR,GR,_,_,_,_],
  ];

  // ── BAT mascot — 6×5 ────────────────────────────────────
  const BAT = [
    [_,K,K,K,K,_],
    [K,K,GR,GR,K,K],
    [K,GR,W, W, GR,K],
    [_,K,K, K, K,_],
    [_,K,_,  _,K,_],
  ];

  // ── DRAGON stages ────────────────────────────────────────
  // Stage 0: tiny grey (imprisoned)
  const DRAGON_0 = [
    [_,_,GR,GR,GR,_],
    [_,GR,W, W, GR,GR],
    [GR,W, W, W, W, GR],
    [GR,GR,W, W,GR,GR],
    [_,GR,GR,GR,GR,_],
    [_,_,GR,GR,_,_],
  ];
  // Stage 1: small, green tint
  const DRAGON_1 = [
    [_,_,LG,LG,LG,_,_],
    [_,LG,G,  G,  G, LG,_],
    [LG,G, W,  W,  G, G, LG],
    [G, G, G,  G,  G, G, G],
    [_,G, G,  G,  G, G,_],
    [_,_,G,  LG, G,_,_],
    [_,_,DG,DG, DG,_,_],
  ];
  // Stage 2: medium, more colors
  const DRAGON_2 = [
    [_,DG,G,  Y,  G, DG,_,_],
    [DG,G, G,  G,  G,  G, DG,_],
    [G, G, W,  W,  W,  G,  G, _],
    [G, Y, G,  G,  G,  Y,  G, _],
    [G, G, G,  G,  G,  G,  G, _],
    [_,G, DG,G,  G, DG,G, _],
    [_,DG,DG,G,  G, DG,DG,_],
    [_,_,DG,DG,DG,DG,_,_],
  ];
  // Stage 3: large, colorful
  const DRAGON_3 = [
    [_,_,O,  DG,DG,DG,O,  _,_],
    [_,DG,G,  G,  G,  G,  G, DG,_],
    [DG,G, G,  W,  W,  W,  G, G, DG],
    [G, G, Y,  W,  W,  W,  Y, G, G],
    [G, G, G,  G,  G,  G,  G, G, G],
    [G, O, G,  G,  G,  G,  G, O, G],
    [DG,G, DG,G,  G,  G, DG,G, DG],
    [_,DG,DG,DG,G,  DG,DG,DG,_],
    [_,_,DG,DG,DG,DG,DG,_,_],
  ];
  // Stage 4: majestic
  const DRAGON_4 = [
    [_,O,  O,  DG,DG,DG,DG,O,  O, _],
    [O,DG,G,  G,  Y,  Y,  G,  G, DG,O],
    [DG,G, G,  Y,  W,  W,  Y,  G, G, DG],
    [G, G, Y,  W,  W,  W,  W,  Y, G, G],
    [G, G, G,  G,  W,  W,  G,  G, G, G],
    [G, O, G,  G,  G,  G,  G,  G, O, G],
    [G, G, O,  G,  G,  G,  G,  O, G, G],
    [DG,G, G, DG,G,  G, DG,G,  G, DG],
    [_,DG,DG,DG,DG,DG,DG,DG,DG,_],
    [_,_,DG,DG,DG,DG,DG,DG,_,_],
  ];
  const DRAGONS = [DRAGON_0, DRAGON_1, DRAGON_2, DRAGON_3, DRAGON_4];

  // ── Grandparents ─────────────────────────────────────────
  const PAPI = [
    [_,_,BR,BR,BR,BR,_],
    [_,BR,W,  W,  W,  BR,_],
    [_,_,SK, SK, SK,_,_],
    [_,_,SK, SK, SK,_,_],
    [_,_,GR,GR, GR,_,_],
    [_,B, B,  B,  B, B,_],
    [_,B, B,  B,  B, B,_],
    [_,_,GR,_,  GR,_,_],
    [_,_,BR,_,  BR,_,_],
  ];
  const MAMINETTE = [
    [_,_,Y,  Y,  Y,_,_],
    [_,Y,W,  W,  W,Y,_],
    [_,_,SK, SK, SK,_,_],
    [_,_,SK, SK, SK,_,_],
    [_,_,GR,GR, GR,_,_],
    [_,R, R,  R,  R, R,_],
    [_,R, R,  R,  R, R,_],
    [_,_,GR,_,  GR,_,_],
    [_,_,R,  _,  R, _,_],
  ];
  const MAMIYA = [
    [_,_,LG,LG,LG,_,_],
    [_,LG,W, W, W, LG,_],
    [_,_,SK,SK, SK,_,_],
    [_,_,SK,SK, SK,_,_],
    [_,_,GR,GR,GR,_,_],
    [_,G, G,  G,  G, G,_],
    [_,G, G,  G,  G, G,_],
    [_,_,GR,_,  GR,_,_],
    [_,_,G,  _,  G, _,_],
  ];
  const PAPOU = [
    [_,_,GR,GR,GR,_,_],
    [_,GR,W, W, W, GR,_],
    [_,_,SK,SK, SK,_,_],
    [_,_,SK,SK, SK,_,_],
    [_,_,GR,GR,GR,_,_],
    [_,BR,BR,BR,BR,BR,_],
    [_,BR,BR,BR,BR,BR,_],
    [_,_,GR,_,  GR,_,_],
    [_,_,BR,_,  BR,_,_],
  ];
  const RAPHAEL = [
    [_,_,Y,  Y,  Y,_,_],
    [_,Y,SK, SK, SK,Y,_],
    [_,_,SK, SK, SK,_,_],
    [_,_,_,  SK, _,_,_],
    [_,_,LB,LB,LB,_,_],
    [_,LB,LB,LB,LB,LB,_],
    [_,_,GR,_,  GR,_,_],
    [_,_,Y,  _,  Y, _,_],
  ];

  // ── GABRIEL, ADI, CLAIRE (kids) ──────────────────────────
  const GABRIEL = [
    [_,_,K,  K,  K,_,_],
    [_,K,SK, SK, SK,K,_],
    [_,_,SK, SK, SK,_,_],
    [_,_,_,SK,  _,_,_],
    [_,_,O, O,  O,_,_],
    [_,O, O, O,  O, O,_],
    [_,_,GR,_,  GR,_,_],
    [_,_,B,  _,  B, _,_],
  ];
  const ADI = [
    [_,_,BR,BR,BR,_,_],
    [_,BR,SK,SK, SK,BR,_],
    [_,_,SK,SK, SK,_,_],
    [_,_,_,SK,  _,_,_],
    [_,_,P, P,  P,_,_],
    [_,P, P, P,  P, P,_],
    [_,_,GR,_,  GR,_,_],
    [_,_,P,  _,  P, _,_],
  ];
  const CLAIRE = [
    [_,_,R,  R,  R,_,_],
    [_,R,SK, SK, SK,R,_],
    [_,_,SK, SK, SK,_,_],
    [_,_,_,SK,  _,_,_],
    [_,_,R, LG, R,_,_],
    [_,R, LG,LG,R, R,_],
    [_,_,GR,_,  GR,_,_],
    [_,_,R,  _,  R, _,_],
  ];

  // ── SORCIER MALFANG ──────────────────────────────────────
  const MALFANG = [
    [_,_,K,  K,  K,  K,  K,_,_],
    [_,K,P,  P,  P,  P,  P,K,_],
    [_,K,P,  GR, GR, GR, P,K,_],
    [_,_,K,  GR, GR, GR, K,_,_],
    [_,_,_,  K,  GR, K,  _,_,_],
    [_,K,K,  K,  P,  K,  K,K,_],
    [_,K,P,  P,  P,  P,  P,K,_],
    [_,K,P,  P,  P,  P,  P,K,_],
    [K,K,K,  P,  _,  P,  K,K,K],
    [K,_,K,  P,  _,  P,  K,_,K],
    [K,_,_,  K,  _,  K,  _,_,K],
  ];

  // ── Backgrounds ──────────────────────────────────────────
  function drawBackground(ctx, W, H, type) {
    ctx.clearRect(0, 0, W, H);
    const drawPixelGround = (y, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, y, W, H - y);
    };
    const drawSky = (color1, color2) => {
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    };

    switch (type) {
      case 'brooklyn':
        drawSky('#1a1a3e', '#2d4a7a');
        // Buildings silhouette
        ctx.fillStyle = '#111';
        [[0,80,40,H],[50,60,50,H],[110,70,35,H],[155,50,60,H],[225,75,30,H],
         [265,55,45,H],[320,65,40,H],[370,45,55,H],[430,70,35,H],[475,60,50,H]
        ].forEach(([x,y,w,h]) => ctx.fillRect(x, y, w, h));
        // Stars
        ctx.fillStyle = '#fffde7';
        for (let i=0; i<30; i++) {
          ctx.fillRect(Math.sin(i*37)*W/2+W/2, Math.sin(i*13)*50+10, 2, 2);
        }
        // Ground
        ctx.fillStyle = '#333';
        ctx.fillRect(0, H*0.75, W, H*0.25);
        break;

      case 'school':
        drawSky('#87ceeb', '#b0e2ff');
        ctx.fillStyle = '#c8e6c9';
        ctx.fillRect(0, H*0.7, W, H*0.3);
        // School building
        ctx.fillStyle = '#b05020';
        ctx.fillRect(W*0.2, H*0.3, W*0.6, H*0.45);
        ctx.fillStyle = '#8b3018';
        ctx.fillRect(W*0.15, H*0.2, W*0.7, H*0.12);
        // Windows
        ctx.fillStyle = '#aee';
        [[0.25,0.38],[0.45,0.38],[0.65,0.38],[0.25,0.55],[0.65,0.55]].forEach(([rx,ry]) => {
          ctx.fillRect(W*rx, H*ry, W*0.08, H*0.08);
        });
        // Sign
        ctx.fillStyle = '#fff';
        ctx.fillRect(W*0.33, H*0.24, W*0.34, H*0.07);
        ctx.fillStyle = '#333';
        ctx.font = `bold ${Math.floor(H*0.045)}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('PS 58', W/2, H*0.3);
        break;

      case 'airport':
        drawSky('#c5e8f7', '#e8f4fc');
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, H*0.72, W, H*0.28);
        // Terminal
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(0, H*0.35, W, H*0.4);
        ctx.fillStyle = '#aaa';
        ctx.fillRect(0, H*0.35, W, H*0.04);
        // Planes
        ctx.fillStyle = '#fff';
        ctx.fillRect(W*0.1, H*0.55, W*0.2, H*0.04);
        ctx.fillRect(W*0.6, H*0.58, W*0.18, H*0.04);
        break;

      case 'plane_interior':
        drawSky('#1a3a5c', '#2d5a8e');
        // Plane interior
        ctx.fillStyle = '#e8e8e8';
        ctx.fillRect(0, H*0.1, W, H*0.8);
        // Windows
        ctx.fillStyle = '#87ceeb';
        [0.15, 0.4, 0.65, 0.85].forEach(rx => {
          ctx.fillStyle = '#87ceeb';
          ctx.beginPath();
          ctx.ellipse(W*rx, H*0.25, W*0.06, H*0.1, 0, 0, Math.PI*2);
          ctx.fill();
          ctx.strokeStyle = '#aaa'; ctx.lineWidth = 2; ctx.stroke();
        });
        ctx.fillStyle = '#d0d0d0';
        ctx.fillRect(0, H*0.15, W, H*0.03);
        ctx.fillRect(0, H*0.82, W, H*0.03);
        break;

      case 'paris':
        drawSky('#87ceeb', '#c8e6f5');
        ctx.fillStyle = '#90c060';
        ctx.fillRect(0, H*0.72, W, H*0.28);
        // Eiffel Tower silhouette
        const tx = W*0.5;
        ctx.fillStyle = '#555';
        ctx.beginPath();
        ctx.moveTo(tx, H*0.05);
        ctx.lineTo(tx-W*0.02, H*0.35);
        ctx.lineTo(tx-W*0.12, H*0.72);
        ctx.lineTo(tx+W*0.12, H*0.72);
        ctx.lineTo(tx+W*0.02, H*0.35);
        ctx.closePath();
        ctx.fill();
        break;

      case 'road':
        drawSky('#87ceeb', '#c5e8ff');
        ctx.fillStyle = '#6aaa40';
        ctx.fillRect(0, H*0.55, W, H*0.45);
        ctx.fillStyle = '#888';
        ctx.fillRect(0, H*0.62, W, H*0.2);
        ctx.fillStyle = '#fff';
        for (let x=0; x<W; x+=40) ctx.fillRect(x, H*0.71, 20, 4);
        // Trees
        ctx.fillStyle = '#3a7a20';
        [0.1,0.3,0.7,0.9].forEach(rx => {
          ctx.fillRect(W*rx-5, H*0.42, 10, H*0.15);
          ctx.fillStyle = '#2a5a15';
          ctx.beginPath();
          ctx.arc(W*rx, H*0.4, W*0.04, 0, Math.PI*2);
          ctx.fill();
          ctx.fillStyle = '#3a7a20';
        });
        break;

      case 'castle':
        drawSky('#3a4a6a', '#6a7aa0');
        ctx.fillStyle = '#2a2a3a';
        ctx.fillRect(0, H*0.6, W, H*0.4);
        // Castle silhouette
        ctx.fillStyle = '#555568';
        // Main wall
        ctx.fillRect(W*0.1, H*0.3, W*0.8, H*0.35);
        // Towers
        [[0.08,0.15],[0.42,0.12],[0.7,0.18],[0.88,0.15]].forEach(([rx,ry]) => {
          ctx.fillRect(W*rx, H*ry, W*0.12, H*0.18);
          // Battlements
          for (let b=0; b<3; b++) {
            ctx.fillRect(W*rx + b*W*0.04, H*ry - H*0.04, W*0.025, H*0.04);
          }
        });
        // Gate
        ctx.fillStyle = '#1a1a2a';
        ctx.beginPath();
        ctx.arc(W*0.5, H*0.5, W*0.07, Math.PI, 0);
        ctx.fillRect(W*0.43, H*0.5, W*0.14, H*0.15);
        ctx.fill();
        // Moon
        ctx.fillStyle = '#fffde7';
        ctx.beginPath();
        ctx.arc(W*0.15, H*0.12, W*0.04, 0, Math.PI*2);
        ctx.fill();
        break;

      case 'brittany':
        drawSky('#87ceeb', '#b3d9f0');
        // Sea
        const seaGrad = ctx.createLinearGradient(0, H*0.5, 0, H);
        seaGrad.addColorStop(0, '#1a6fa0');
        seaGrad.addColorStop(1, '#0d4a6f');
        ctx.fillStyle = seaGrad;
        ctx.fillRect(0, H*0.5, W, H*0.5);
        // Waves
        ctx.strokeStyle = '#5ab0d4';
        ctx.lineWidth = 2;
        for (let w=0; w<4; w++) {
          ctx.beginPath();
          for (let x=0; x<W; x+=8) {
            ctx.lineTo(x, H*(0.55 + w*0.06) + Math.sin(x*0.05)*4);
          }
          ctx.stroke();
        }
        // Land
        ctx.fillStyle = '#5a8a30';
        ctx.fillRect(0, H*0.45, W, H*0.08);
        // House
        ctx.fillStyle = '#e8e0d0';
        ctx.fillRect(W*0.1, H*0.3, W*0.2, H*0.18);
        ctx.fillStyle = '#888';
        ctx.beginPath();
        ctx.moveTo(W*0.08, H*0.3);
        ctx.lineTo(W*0.2, H*0.18);
        ctx.lineTo(W*0.32, H*0.3);
        ctx.fill();
        break;

      default:
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, W, H);
    }
  }

  // ── Public draw API ──────────────────────────────────────
  function drawCharacter(ctx, name, x, y, scale=3, frame=0) {
    const spriteMap = {
      erwan: ERWAN, papi: PAPI, maminette: MAMINETTE,
      mamiya: MAMIYA, papou: PAPOU, raphael: RAPHAEL,
      gabriel: GABRIEL, adi: ADI, claire: CLAIRE, malfang: MALFANG,
    };
    const s = spriteMap[name];
    if (!s) return;
    // Idle bob animation
    const bob = Math.sin(frame * 0.1) * (scale * 0.3) | 0;
    draw(ctx, s, x, y + bob, scale);
    // Draw bat for Erwan
    if (name === 'erwan') {
      draw(ctx, BAT, x + s[0].length * scale - scale, y + scale - (frame % 20 > 10 ? scale : 0), 2);
    }
  }

  function drawDragon(ctx, stage, x, y, scale=4, frame=0) {
    const s = DRAGONS[Math.min(stage, 4)];
    const bob = Math.sin(frame * 0.08) * (scale * 0.4) | 0;
    // Glow effect for freed dragon
    if (stage >= 2) {
      ctx.shadowColor = stage >= 4 ? '#ffd700' : '#2ecc40';
      ctx.shadowBlur = 8;
    }
    draw(ctx, s, x, y + bob, scale);
    ctx.shadowBlur = 0;
  }

  function drawFlag(ctx, lang, cx, cy) {
    if (lang === 'fr') {
      const w = 90, h = 60;
      ctx.fillStyle = '#002395'; ctx.fillRect(cx - w/2, cy - h/2, w/3, h);
      ctx.fillStyle = '#fff';    ctx.fillRect(cx - w/2 + w/3, cy - h/2, w/3, h);
      ctx.fillStyle = '#ED2939'; ctx.fillRect(cx - w/2 + 2*w/3, cy - h/2, w/3, h);
      ctx.strokeStyle = '#000'; ctx.lineWidth = 1; ctx.strokeRect(cx - w/2, cy - h/2, w, h);
    } else {
      const w = 90, h = 60;
      ctx.fillStyle = '#B22234'; ctx.fillRect(cx - w/2, cy - h/2, w, h);
      for (let s=0; s<6; s++) {
        if (s%2===0) { ctx.fillStyle = '#fff'; ctx.fillRect(cx - w/2, cy - h/2 + s*(h/7), w, h/7); }
      }
      ctx.fillStyle = '#3C3B6E'; ctx.fillRect(cx - w/2, cy - h/2, w*0.4, h*0.5);
    }
  }

  // ── 2CV vintage car ──────────────────────────────────────
  function drawCar(ctx, x, y, scale=3) {
    const car = [
      [_,_,GR,GR,GR,GR,GR,GR,_,_],
      [_,GR,Y,  Y,  Y,  Y,  Y,  Y, GR,_],
      [GR,Y, LB, LB, Y,  Y, LB, LB,Y, GR],
      [GR,Y, Y,  Y,  Y,  Y,  Y,  Y, Y, GR],
      [GR,Y, Y,  Y,  Y,  Y,  Y,  Y, Y, GR],
      [_,GR,K,  GR, GR, GR, GR, K,  GR,_],
      [_,_,K,  K,  _,  _,  K,  K,  _,_],
    ];
    draw(ctx, car, x, y, scale);
    // Wheels
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(x + 2*scale, y + 7*scale, scale*1.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 7*scale, y + 7*scale, scale*1.5, 0, Math.PI*2); ctx.fill();
  }

  // ── Stars / confetti animation helpers ───────────────────
  function spawnCelebration(container) {
    const colors = ['#ffd700','#ff6b00','#2ecc40','#006bff','#e74c3c','#9b59b6'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      p.style.cssText = `
        left: ${Math.random()*100}%;
        top: ${Math.random()*20}%;
        background: ${colors[i % colors.length]};
        animation-duration: ${0.8 + Math.random()*1.2}s;
        animation-delay: ${Math.random()*0.3}s;
        transform: rotate(${Math.random()*360}deg);
        width: ${6 + Math.random()*8}px;
        height: ${6 + Math.random()*8}px;
      `;
      container.appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }
  }

  return { draw, drawCharacter, drawDragon, drawBackground, drawFlag, drawCar, spawnCelebration };
})();
