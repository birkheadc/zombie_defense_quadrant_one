import { Physics } from 'phaser';
import EndCutsceneSprite from '../../../../assets/sprites/cutscene/end/end_cutscene.png';

const SPRITE_ID = 'end_sprite';
const FRAME_SIZE = { frameWidth: 480, frameHeight: 320 }

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, EndCutsceneSprite, FRAME_SIZE);
}

export class EndCutscene extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }
}

export default {
  preload
}