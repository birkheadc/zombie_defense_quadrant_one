import { Physics } from 'phaser';
import WallSprite from '../../../../assets/sprites/towerDefenseScene/wall/wall.png';

const SPRITE_ID = 'wall_sprite';
const FRAME_SIZE = { frameWidth: 32, frameHeight: 320 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, WallSprite, FRAME_SIZE);
}

export class Wall extends Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, private spawnPosition: { x: number, y: number}, group: Phaser.GameObjects.Group | null) {
    super(scene, spawnPosition.x, spawnPosition.y, SPRITE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    group?.add(this);
  }
}

export default { 
  preload
}