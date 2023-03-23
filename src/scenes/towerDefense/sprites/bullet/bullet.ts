import { Physics } from 'phaser';
import BulletSprite from '../../../../assets/sprites/towerDefenseScene/bullet/bullet.png';
import { TowerDefenseZombie } from '../zombie/towerDefenseZombie';

const SPRITE_ID = 'bullet_sprite';
const FRAME_SIZE = { frameWidth: 16, frameHeight: 16 };
const BULLET_SPEED = 200;
const BULLET_DAMAGE = 20;

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, BulletSprite, FRAME_SIZE);
}

export class Bullet extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, private spawnLocation: { x: number, y: number }, private destination: { x: number, y: number }, group: Phaser.GameObjects.Group | null) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    group?.add(this);
    this.moveTowardsDestination();
  }

  moveTowardsDestination() {
    let angle = Math.atan2(this.destination.y - this.spawnLocation.y, this.destination.x - this.spawnLocation.x) * ( 180 / Math.PI );
    angle = angle + 90;
    angle = (angle * Math.PI / 180)
    let velocity = {
      x: Math.sin(angle) * BULLET_SPEED,
      y: Math.cos(angle) * BULLET_SPEED * -1
    }
    this.setVelocity(velocity.x, velocity.y);
  }

  damage(zombie: TowerDefenseZombie) {
    zombie.hit(BULLET_DAMAGE);
    this.die();
  }

  die() {
    this.destroy();
  }
}

export default {
  preload
}