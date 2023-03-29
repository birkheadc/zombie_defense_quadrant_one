import { Physics } from 'phaser';
import DrinkerSprite from '../../../../assets/sprites/barScene/drinker/drinker.png';

const SPRITE_ID = 'drinker_sprite';
const FRAME_SIZE = { frameWidth: 16, frameHeight: 24 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, DrinkerSprite, FRAME_SIZE);
}

export class Drinker extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(3);
    this.declareAnims();
    this.setDepth(2);
  }

  declareAnims() {
    this.anims.create({
      key: 'drink',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [1, 2, 0]}),
      frameRate: 3,
      repeat: 0
    });
  }

  drink() {
    this.anims.play('drink');
  }
}

export default { 
  preload
}