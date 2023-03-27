import { Physics } from 'phaser';
import CupSprite from '../../../../assets/sprites/barScene/cup/cup.png';

const SPIRTE_ID = 'cup_sprite';
const FRAME_SIZE = { frameWidth: 16, frameHeight: 16 };
const SPEED_RANGE = { MIN: 200, MAX: 250 };
const FALL_SPEED = 200;

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPIRTE_ID, CupSprite, FRAME_SIZE);
}

export class Cup extends Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number}, group: Phaser.GameObjects.Group | undefined) {
    super(scene, spawnLocation.x, spawnLocation.y, SPIRTE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    group?.add(this);
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