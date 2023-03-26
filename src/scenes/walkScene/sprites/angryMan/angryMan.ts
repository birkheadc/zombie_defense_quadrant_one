import { Physics } from 'phaser';
import AngryManSprite from '../../../../assets/sprites/walkScene/angryMan/angry_man.png';
import { AngryMessage } from '../angryMessage/angryMessage';

const SPRITE_ID = 'angry_man_sprite';
const FRAME_SIZE = { frameWidth: 64, frameHeight: 64 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, AngryManSprite, FRAME_SIZE);
}

export class AngryMan extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, private spawnLocation: { x: number, y: number}, private scrollSpeed: number, group: Phaser.GameObjects.Group | undefined, private isDogKiller: boolean) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    group?.add(this);
    this.declareAnims();
    this.beginBehavior();
    this.createMessage();
  }

  declareAnims() {
    this.anims.create({
      key: 'shout',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [ 0, 1 ]}),
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

  update(delta: number) {

  }
}

export default {
  preload
}