import { Physics } from 'phaser';
import AngryManSprite from '../../../../assets/sprites/walkScene/angryMan/angry_man.png';
import bullet from '../../../towerDefense/sprites/bullet/bullet';
import { Bullet } from '../../../towerDefense/sprites/bullet/bullet';
import { AngryMessage } from '../angryMessage/angryMessage';
import { Fruit } from '../fruit/fruit';
import { SadMan } from '../sadMan/sadMan';

const SPRITE_ID = 'angry_man_sprite';
const FRAME_SIZE = { frameWidth: 24, frameHeight: 32 };

const BULLET_RATE_RANGE = { MIN: 2000, MAX: 5000 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, AngryManSprite, FRAME_SIZE);
  bullet.preload(scene);
}

export class AngryMan extends Physics.Arcade.Sprite {

  deltaBullet: number = 0;
  nextBulletTime: number = 0;

  constructor(scene: Phaser.Scene,
    private spawnLocation: { x: number, y: number},
    private scrollSpeed: number,
    private group: Phaser.GameObjects.Group | undefined,
    private isDogKiller: boolean,
    private player: Physics.Arcade.Sprite | undefined
    ) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(1.9);
    group?.add(this);
    this.declareAnims();
    this.setNextBulletRandomTime();
    this.beginBehavior();
    this.createMessage();
  }

  declareAnims() {
    this.anims.create({
      key: 'shout',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [ 0, 1, 2, 3 ]}),
      frameRate: 2,
      repeat: -1
    })
  }

  beginBehavior() {
    this.anims.play('shout');
    this.setVelocityX(-1 * this.scrollSpeed);
  }

  createMessage() {
    const location = { x: this.spawnLocation.x + 25, y: this.spawnLocation.y - 25};
    new AngryMessage(this.scene, location, this.isDogKiller, this.scrollSpeed);
  }

  setNextBulletRandomTime() {
    const random = Math.random() * (BULLET_RATE_RANGE.MAX - BULLET_RATE_RANGE.MIN) + BULLET_RATE_RANGE.MIN;
    this.nextBulletTime = random;
  }

  throwBullet(delta: number) {
    if (this.x < 0) return;
    this.deltaBullet += delta;
    if (this.deltaBullet >= this.nextBulletTime) {
      const destination = this.player == null ? { x: 0, y: 0 } : { x: this.player.x, y: this.player.y };
      const fruit = new Fruit(this.scene, { x: this.x, y: this.y }, destination, this.group)
      this.deltaBullet -= this.nextBulletTime;
      this.setNextBulletRandomTime();
    }
  }

  update(delta: number) {
    this.throwBullet(delta);
  }
}

export default {
  preload
}