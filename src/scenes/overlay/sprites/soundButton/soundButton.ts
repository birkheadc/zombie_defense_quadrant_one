
import { Physics } from 'phaser';
import SoundOnSprite from '../../../../assets/sprites/ui/sound_on.png';
import SoundOffSprite from '../../../../assets/sprites/ui/sound_off.png';

const SPRITE_ID_ON = 'sound_button_on';
const SPRITE_ID_OFF = 'sound_button_off';
const FRAME_SIZE = {
  frameWidth: 63,
  frameHeight: 63
};

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID_ON, SoundOnSprite, FRAME_SIZE);
  scene.load.spritesheet(SPRITE_ID_OFF, SoundOffSprite, FRAME_SIZE);
}

export class SoundButton extends Physics.Arcade.Sprite {

  isSoundOn: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, private onclick: Function) {
    super(scene, x, y, SPRITE_ID_OFF);
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
      frames: [
        { key: SPRITE_ID_OFF }
      ],
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'sound_on',
      frames: [
        { key: SPRITE_ID_ON }
      ],
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
  preload
}