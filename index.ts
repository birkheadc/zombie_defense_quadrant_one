import Game from "./src/game";

function loadGame() {
  const game = new Game();
  game.start();
}

loadGame();