import sprites from "./sprites";

export default class TowerDefenseScene extends Phaser.Scene {

  constructor() {
    super("TowerDefenseScene");
  }

  preload() {
    sprites.preload(this);
  }

  create() {
    this.generateBackground();
    console.log('tower defense scene loaded');
  }

  generateBackground() {
    this.cameras.main.setBackgroundColor('rgba(100, 50, 0, 1.0)');
  }
}