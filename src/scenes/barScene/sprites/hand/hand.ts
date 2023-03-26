import { Physics } from 'phaser';
import HandSprite from '../../../../assets/sprites/barScene/hand/hand.png';

const SPRITE_ID = 'hand_sprite';
const FRAME_SIZE = { frameWidth: 16, frameHeight: 16 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, HandSprite, FRAME_SIZE);
}

export class Hand extends Physics.Arcade.Sprite {

  isHoldingCup: boolean = false;

  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(2);
    this.setInteractive({ cursor: 'none' });
    this.declareAnims();
    this.updateAnimation();
    this.setDepth(5);
  }

  declareAnims() {
    this.anims.create({
      key: 'holding_cup',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [ 1 ]}),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'empty',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [ 0 ]}),
      frameRate: 1,
      repeat: -1
    });
  }

  updateAnimation() {
    this.anims.play(this.isHoldingCup ? 'holding_cup' : 'empty');
  }

  moveTo(location: { x: number, y: number} ) {
    this.setPosition(location.x, location.y);
  }

  setHoldingCup(isHoldingCup: boolean) {
    this.isHoldingCup = isHoldingCup;
    this.updateAnimation();
  }
}

export default {
  preload
}