import { Physics } from 'phaser';
import BartenderSprite from '../../../../assets/sprites/barScene/bartender/bartender.png';

const SPIRTE_ID = 'bartender_sprite';
const FRAME_SIZE = { frameWidth: 32, frameHeight: 32 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPIRTE_ID, BartenderSprite, FRAME_SIZE);
}

export class Bartender extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPIRTE_ID);
    scene.add.existing(this);
    this.declareAnims();
  }

  declareAnims() {
    this.anims.create({
      key: 'be_angry',
      frames: this.anims.generateFrameNumbers(SPIRTE_ID, { frames: [1, 2, 1, 2, 1, 2, 1, 0]}),
      frameRate: 2,
      repeat: 0
    });
  }

  getAngry() {
    this.anims.play('be_angry', false);
  }
}

export default {
  preload
}