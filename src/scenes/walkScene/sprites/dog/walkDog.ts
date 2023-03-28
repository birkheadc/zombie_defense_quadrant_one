import { Physics } from 'phaser';
import WalkDogSprite from '../../../../assets/sprites/towerDefenseScene/mobs/towerDefenseDog/tower_defense_dog.png';

const SPRITE_ID = 'walk_dog_sprite';
const FRAME_SIZE = { frameWidth: 48, frameHeight: 48 };
const SPEED_X = 100;
const SPEED_Y = 50;

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, WalkDogSprite, FRAME_SIZE);
}

export class WalkDog extends Physics.Arcade.Sprite {

  directionY = 0;

  constructor(scene: Phaser.Scene, spawnPosition: { x: number, y: number }, private range: { top: number, bottom: number }, group: Phaser.GameObjects.Group | undefined) {
    super(scene, spawnPosition.x, spawnPosition.y, SPRITE_ID);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    group?.add(this);
    this.setScale(1);
    this.declareAnims();
    this.beginBehavior();
  }

  declareAnims() {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [0, 1, 2, 3, 4, 5]}),
      frameRate: 6,
      repeat: -1
    });
  }

  beginBehavior() {
    this.anims.play('walk');
    this.setVelocityX(-1 * SPEED_X);
    this.directionY = Math.random() < 0.5 ? -1 : 1;
    this.setVelocityY(this.directionY * SPEED_Y);
  }

  update(delta: number) {
    if (this.y >= this.range.bottom && this.directionY > 0) {
      this.directionY = -1;
    } else if (this.y <= this.range.top && this.directionY < 0) {
      this.directionY = 1;
    }
    this.setVelocityY(this.directionY * SPEED_Y);
  }
}

export default {
  preload
}