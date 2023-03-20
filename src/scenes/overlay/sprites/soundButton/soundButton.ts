
import { Physics } from 'phaser';
import SoundButtonSprite from '../../../../assets/sprites/ui/sound_button.png';

const SPRITE_ID = 'sound_button';
const FRAME_SIZE = {
  frameWidth: 64,
  frameHeight: 64
};

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, SoundButtonSprite, FRAME_SIZE);
}

export class SoundButton extends Physics.Arcade.Sprite {

  isSoundOn: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, private onclick: Function) {
    super(scene, x, y, SPRITE_ID);
    this.scene.add.existing(this);
    this.setScale(0.5);
    this.declareAnims();
    this.on('pointerdown', this.handlePointerDown);
    this.on('pointerup', this.handlePointerUp);
    this.setInteractive();
    this.updateAnimation();
  }

  declareAnims() {
    this.anims.create({
      key: 'sound_off',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [ 0 ] }),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'sound_on',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [ 1 ] }),
      frameRate: 1,
      repeat: -1
    });
  }

  handlePointerDown = () => {
    this.onclick();
  }

  handlePointerUp = () => {
    
  }

  setSound(isSoundOn: boolean) {
    this.isSoundOn = isSoundOn;
    this.updateAnimation();
  }

  updateAnimation() {
    this.isSoundOn ? this.anims.play('sound_on') : this.anims.play('sound_off');
  }
}

export default {
  SoundButton,
  preload
}