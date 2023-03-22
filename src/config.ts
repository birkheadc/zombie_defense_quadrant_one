import Phaser from "phaser";
import scenes from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  title: 'Zombie Defense Quadrant One',
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#363636',
  scale: {
    width: 480,
    height: 320,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0},
      debug: false,
      fixedStep: true,
      fps: 120
    },
  },
  scene: scenes,
}

export default config;  