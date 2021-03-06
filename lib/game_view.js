class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
  }

  start() {
    this.bindKeyHandlers();
    requestAnimationFrame(this.game.animate);
  }

  bindKeyHandlers() {
    const ship = this.ship;
    let keys = {};
    window.keys = keys;
    let timeId = 0;
    window.addEventListener('keydown', (e) => {
      if (GameView.keys.includes(e.keyCode)) {
        e.preventDefault();
      }
      keys[e.keyCode] = e.type === 'keydown';
      clearTimeout(timeId);
      timeId = window.setTimeout( () => {
        this.ship.keypress(keys);
      }, 50);
    });
    window.addEventListener('keyup', (e) => {
      keys[e.keyCode] = e.type !== 'keyup';
    });
  }
}

GameView.keys = [32, 37, 38, 39, 40, 87, 83, 68, 65];

module.exports = GameView;
