import { Physics } from 'phaser';
import TowerDefenseDogSprite from '../../../../assets/sprites/towerDefenseScene/mobs/towerDefenseDog/tower_defense_dog.png';

const SPRITE_ID = 'tower_defense_dog_sprite';
const FRAME_SIZE = { frameWidth: 48, frameHeight: 48 };
const SPEED = 5;

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, TowerDefenseDogSprite, FRAME_SIZE);
}

export class TowerDefenseDog extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnPosition: { x: number, y: number }, group: Phaser.GameObjects.Group | null) {
    super(scene, spawnPosition.x, spawnPosition.y, SPRITE_ID);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    group?.add(this);
    this.declareAnims();
    this.beginBehavior();
  }

  declareAnims() {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [0, 1, 2, 3, 4, 5]}),
      frameRate: 3,
      repeat: -1
    });
  }

  beginBehavior() {
    this.anims.play('walk');
    this.setVelocityX(SPEED);
  }
}

export default {
  preload
}