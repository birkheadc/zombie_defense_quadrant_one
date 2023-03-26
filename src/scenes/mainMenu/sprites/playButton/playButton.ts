import { Physics } from "phaser";
import PlayButtonSprite from '../../../../assets/sprites/ui/play_button.png';

const SPRITE_ID = 'play_button';
const FRAME_SIZE = {
  frameWidth: 128,
  frameHeight: 64
};

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, PlayButtonSprite, FRAME_SIZE);
}

export class PlayButton extends Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number, private onclick: Function) {
    super(scene, x, y, SPRITE_ID);
    this.scene.add.existing(this);
    this.on('pointerdown', this.handlePointerDown);
    this.on('pointerup', this.handlePointerUp);
    this.setInteractive();
  }

  handlePointerDown = () => {
  }

  handlePointerUp = () => {
    this.onclick();
  }
}

export default {
  PlayButton,
  preload
}