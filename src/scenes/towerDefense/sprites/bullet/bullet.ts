import { Physics } from 'phaser';
import BulletSprite from '../../../../assets/sprites/zombieDefenseScene/bullet/bullet.png';

const SPRITE_ID = 'bullet_sprite';
const FRAME_SIZE = { frameWidth: 16, frameHeight: 16 };
const BULLET_SPEED = 1;

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, BulletSprite, FRAME_SIZE);
}

export class Bullet extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, private spawnLocation: { x: number, y: number }, private destination: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    this.scene.add.existing(this);
    this.moveTowardsDestination();
  }

  moveTowardsDestination() {
    let velocity = {
      x: (this.destination.x - this.spawnLocation.x) * BULLET_SPEED,
      y: (this.destination.y - this.spawnLocation.y) * BULLET_SPEED
    }
    // Todo
  }
}

export default {
  preload
}