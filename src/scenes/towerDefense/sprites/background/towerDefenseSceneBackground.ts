import { Physics } from 'phaser';
import TowerDefenseSceneBackgroundSprite from '../../../../assets/sprites/towerDefenseScene/background/tower_defense_scene.png';

const SPRITE_ID = 'tower_defense_scene_background_sprite';
const FRAME_SIZE = { frameWidth: 480, frameHeight: 320 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, TowerDefenseSceneBackgroundSprite, FRAME_SIZE);
}

export class TowerDefenseSceneBackground extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
  }
}

export default {
  preload
}