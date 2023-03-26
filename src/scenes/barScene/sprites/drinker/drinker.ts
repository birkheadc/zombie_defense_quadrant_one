import { Physics } from 'phaser';
import DrinkerSprite from '../../../../assets/sprites/barScene/drinker/drinker.png';

const SPRITE_ID = 'drinker_sprite';
const FRAME_SIZE = { frameWidth: 32, frameHeight: 32 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, DrinkerSprite, FRAME_SIZE);
}

export class Drinker extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}

export default { 
  preload
}