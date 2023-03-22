import { Physics } from 'phaser';
import TowerSprite from '../../../../assets/sprites/zombieDefenseScene/tower/tower.png';
import { Bullet } from '../bullet/bullet';

const SPRITE_ID = 'tower_sprite';
const FRAME_SIZE = { frameWidth: 64, frameHeight: 128 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, TowerSprite, FRAME_SIZE);
}

export class Tower extends Physics.Arcade.Sprite {
  
  constructor(scene: Phaser.Scene, private spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    this.scene.add.existing(this);
  }

  fireTowards(location: { x: number, y: number }) {
    new Bullet(this.scene, this.spawnLocation, location);
  }
}

export default {
  preload
}