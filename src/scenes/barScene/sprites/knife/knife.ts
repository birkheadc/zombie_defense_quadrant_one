import { Physics } from 'phaser';
import KnifeSprite from '../../../../assets/sprites/barScene/knife/knife.png';

const SPIRTE_ID = 'knife_sprite';
const FRAME_SIZE = { frameWidth: 32, frameSize: 32 };
const SPEED_RANGE = { MIN: 200, MAX: 250 };
const FALL_SPEED = 400;

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPIRTE_ID, KnifeSprite, FRAME_SIZE);
}

export class Knife extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }, group: Phaser.GameObjects.Group | undefined) {
    super(scene, spawnLocation.x, spawnLocation.y, SPIRTE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    group?.add(this);
    this.setRotation(3.95);
    this.beginBehavior();
  }

  beginBehavior() {
    let velocity = Math.random() * (SPEED_RANGE.MAX - SPEED_RANGE.MIN) + SPEED_RANGE.MIN;
    this.setVelocityX(velocity);
  }

  fall() {
    this.setAccelerationY(FALL_SPEED);
  }
}

export default {
  preload
}