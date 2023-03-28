import { Physics } from 'phaser';
import TowerDefenseZombieSprite from '../../../../assets/sprites/towerDefenseScene/mobs/towerDefenseZombie/tower_defense_zombie.png'

const SPRITE_ID = 'zombie_sprite';
const FRAME_SIZE: Phaser.Types.Loader.FileTypes.ImageFrameConfig = { frameWidth: 16, frameHeight: 32 };
const SPEED_RANGE = { MIN: 1, MAX: 3 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, TowerDefenseZombieSprite, FRAME_SIZE);
}

export class TowerDefenseZombie extends Physics.Arcade.Sprite {

  health: number = 100;

  constructor(scene: Phaser.Scene, private spawnLocation: { x: number, y: number }, private destination: { x: number, y: number }, group: Phaser.GameObjects.Group | null ) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    group?.add(this);
    this.declareAnims();
    this.beginBehaviour();
  }

  declareAnims() {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [0, 1, 2, 3]}),
      frameRate: 2,
      repeat: -1
    });
  }

  beginBehaviour() {
    this.anims.play('walk');
    this.startWalkingRandomSpeed();
  }

  startWalkingRandomSpeed() {
    let velocity = Math.random() * (SPEED_RANGE.MAX - SPEED_RANGE.MIN) + SPEED_RANGE.MIN;
    velocity *= 0.01;
    this.setVelocity((this.destination.x - this.spawnLocation.x) * velocity, (this.destination.y - this.spawnLocation.y) * velocity);
  }

  hit(damage: number) {
    this.health -= damage;
    if (this.health <= 0) this.die();
  }

  die() {
    this.destroy();
  }
}

export default {
  preload
}