import { Physics } from 'phaser';
import HandSprite from '../../../../assets/sprites/barScene/hand/hand.png';
import CupSprite from '../../../../assets/sprites/barScene/cup/cup.png';

const SPRITE_ID = 'hand_sprite';
const SPRITE_ID_CUP = 'hand_cup_sprite';
const FRAME_SIZE = { frameWidth: 32, frameHeight: 32 };
const FRAME_SIZE_CUP = { frameWidth: 15, frameHeight: 18 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, HandSprite, FRAME_SIZE);
  scene.load.spritesheet(SPRITE_ID_CUP, CupSprite, FRAME_SIZE_CUP);
}

export class Hand extends Physics.Arcade.Sprite {

  isHoldingCup: boolean = false;

  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setInteractive({ cursor: 'none' });
    this.declareAnims();
    this.updateAnimation();
    this.setDepth(5);
  }

  declareAnims() {
    this.anims.create({
      key: 'holding_cup',
      frames: [
        { key: SPRITE_ID_CUP }
      ],
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'empty',
      frames: [
        { key: SPRITE_ID }
      ],
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