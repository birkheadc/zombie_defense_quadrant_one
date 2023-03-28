import { spawn } from 'child_process';
import { Physics } from 'phaser';
import BuildingsSprite from '../../../../assets/sprites/walkScene/buildings/buildings.png';

const SPRITE_ID = 'buildings_sprite';
const FRAME_SIZE = { frameWidth: 480, frameHeight: 320 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, BuildingsSprite, FRAME_SIZE);
}

export class Buildings extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number}, private scrollSpeed: number) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.beginBehavior();
  }

  beginBehavior() {
    this.setVelocityX(-1 * this.scrollSpeed);
  }

  moveTo(location: { x: number, y: number }) {
    this.setPosition(location.x, location.y);
  }
}

export default {
  preload
}