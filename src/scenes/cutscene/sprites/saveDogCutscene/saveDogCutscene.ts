import { Physics } from 'phaser';
import SaveDogCutsceneSprite from '../../../../assets/sprites/cutscene/save_dog/save_dog_cutscene.png';

const SPRITE_ID = 'save_dog_sprite';
const FRAME_SIZE = { frameWidth: 480, frameHeight: 320 }

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, SaveDogCutsceneSprite, FRAME_SIZE);
}

export class SaveDogCutscene extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    this.scene.add.existing(this);
  }
}

export default {
  preload
}