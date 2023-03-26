import { Physics } from 'phaser';
import ShootDogCutsceneSprite from '../../../../assets/sprites/cutscene/shot_dog/shot_dog_cutscene.png';

const SPRITE_ID = 'shot_dog_sprite';
const FRAME_SIZE = { frameWidth: 480, frameHeight: 320 }

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, ShootDogCutsceneSprite, FRAME_SIZE);
}

export class ShootDogCutscene extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    this.scene.add.existing(this);
  }
}

export default {
  preload
}