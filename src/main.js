/* ============================================================
   MAIN — Entry point, start/restart logic
   ============================================================ */

function confirmRestart() {
  // Don't show confirm if already on start screen
  const onStart = document.getElementById('screen-start').classList.contains('visible');
  if (onStart) return;
  document.getElementById('confirm-modal').style.display = 'flex';
  Audio8bit.play('click');
}

function startGame() {
  const playerInput = document.getElementById('input-player').value.trim();
  const dragonInput = document.getElementById('input-dragon').value.trim();

  if (!dragonInput) {
    document.getElementById('input-dragon').style.borderColor = '#e74c3c';
    document.getElementById('input-dragon').placeholder = '⚠️ Obligatoire !';
    Audio8bit.play('wrong');
    return;
  }
  if (!playerInput) {
    document.getElementById('input-player').style.borderColor = '#e74c3c';
    Audio8bit.play('wrong');
    return;
  }

  GS.playerName  = playerInput;
  GS.dragonName  = dragonInput;
  GS.stars       = 0;
  GS.hearts      = 3;
  GS.actIndex    = 0;
  GS.dragonStage = 0;
  GS.journal     = [];

  Audio8bit.play('click');
  updateHUD();
  runAct1();
}

function restartGame() {
  GS.stars       = 0;
  GS.hearts      = 3;
  GS.actIndex    = 0;
  GS.dragonStage = 0;
  GS.journal     = [];
  GS.dragonName  = '';
  document.getElementById('input-dragon').value = '';
  document.getElementById('input-player').value = GS.playerName || 'Erwan';
  document.getElementById('pin-section').style.display = '';
  document.getElementById('settings-panel').classList.remove('show');
  showScreen('screen-start');
  updateHUD();
}

// ── Initialization ────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initDOM();
  gameLoop();
  updateHUD();

  // Allow Enter key on start screen
  document.getElementById('input-dragon').addEventListener('keydown', e => {
    if (e.key === 'Enter') startGame();
  });
  document.getElementById('pin-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkPin();
  });

  // Draw animated background on main canvas
  let bgTick = 0;
  function animateBg() {
    const c = DOM.mainCanvas;
    const ctx = DOM.ctx;
    if (c.width > 0 && c.height > 0) {
      Sprites.drawBackground(ctx, c.width, c.height, 'brooklyn');
      // Animated title text on canvas (subtle)
      ctx.fillStyle = `rgba(255,215,0,${0.05 + Math.sin(bgTick*0.05)*0.03})`;
      ctx.fillRect(0, 0, c.width, c.height);
    }
    bgTick++;
    requestAnimationFrame(animateBg);
  }
  animateBg();
});
