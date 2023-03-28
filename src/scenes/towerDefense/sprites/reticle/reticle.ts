import { Physics } from 'phaser';
import ReticleSprite from '../../../../assets/sprites/towerDefenseScene/reticle/reticle.png';

const SPRITE_ID = 'reticle_sprite';
const FRAME_SIZE = { frameWidth: 9, frameHeight: 9, margin: 1 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, ReticleSprite, FRAME_SIZE);
}

export class Reticle extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
    this.setScale(1.5);
    this.setInteractive({ cursor: 'none' });
    this.setDepth(5);
  }

  moveTo(location: { x: number, y: number} ) {
    this.setPosition(location.x, location.y);
  }
}

export default { 
  preload
}