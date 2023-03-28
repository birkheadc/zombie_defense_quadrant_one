import { Physics } from 'phaser';
import TowerSprite from '../../../../assets/sprites/towerDefenseScene/tower/tower.png';
import { Bullet } from '../bullet/bullet';
import reticle, { Reticle } from '../reticle/reticle';

const SPRITE_ID = 'tower_sprite';
const FRAME_SIZE = { frameWidth: 128, frameHeight: 128 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, TowerSprite, FRAME_SIZE);
}

export class Tower extends Physics.Arcade.Sprite {

  bulletSpawnLocation: { x: number, y: number } = { x: 0, y: 0};
  
  constructor(scene: Phaser.Scene, private spawnLocation: { x: number, y: number }, private bulletGroup: Phaser.GameObjects.Group | undefined) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    this.scene.add.existing(this);
    this.bulletSpawnLocation = { x: spawnLocation.x, y: spawnLocation.y - 48};
    this.declareAnims();
  }

  declareAnims() {
    this.anims.create({
      key: 'fire',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, {frames: [ 0, 1, 2, 3, 4, 5, 6, 7 ]}),
      frameRate: 40,
      repeat: 0
    })
  }

  pointTowardsLocation(location: { x: number, y: number }) {
    const angle = Phaser.Math.Angle.BetweenPoints(this, location);
    const diff = ((Phaser.Math.RAD_TO_DEG * angle + 90) - this.angle) * Phaser.Math.DEG_TO_RAD;
    this.bulletSpawnLocation = Phaser.Math.RotateAroundDistance(this.bulletSpawnLocation, this.spawnLocation.x, this.spawnLocation.y, diff, 48);
    this.angle = Phaser.Math.RAD_TO_DEG * angle + 90;
  }

  fireTowards(location: { x: number, y: number }) {
    this.anims.play('fire', false);
    new Bullet(this.scene, this.bulletSpawnLocation, location, this.bulletGroup);
  }
}

export default {
  preload
}