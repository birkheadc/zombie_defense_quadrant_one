import sprites from "./sprites";
import { PlayButton } from "./sprites/playButton/playButton";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  preload() {
    sprites.preload(this);
  }

  create() {
    this.generateBackground();
    this.generatePlayButton();
  }
  
  generateBackground() {
    this.cameras.main.setBackgroundColor('rgba(0, 50, 100, 1.0)');
  }

  getScreenCenter(): { x: number, y: number} {
    return {
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height / 2
    };
  }

  generatePlayButton() {
    const pos = this.getScreenCenter();
    new PlayButton(this, pos.x, pos.y, this.startGame);
  }

  startGame = () => {
    this.scene.start('TowerDefenseScene');
  }
}