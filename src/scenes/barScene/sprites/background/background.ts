import { Physics } from 'phaser';
import BackgroundSprite from '../../../../assets/sprites/barScene/background/bar_scene.png';

const SPRITE_ID = 'bar_scene_background_sprite';
const FRAME_SIZE = { frameWidth: 512, frameHeight: 352 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, BackgroundSprite, FRAME_SIZE);
}

export class BarBackground extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
  }
}

export default {
  preload
}