import { Physics } from "phaser";
import PlayButtonSprite from '../../../../assets/sprites/ui/button.png';

const SPRITE_ID = 'play_button';
const FRAME_SIZE = {
  frameWidth: 98,
  frameHeight: 39
};

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, PlayButtonSprite, FRAME_SIZE);
}

export class PlayButton extends Physics.Arcade.Sprite {

  text: Phaser.GameObjects.Text;
  isEnabled: boolean = true;

  constructor(scene: Phaser.Scene, x: number, y: number, private onclick: Function) {
    super(scene, x, y, SPRITE_ID);
    this.scene.add.existing(this);
    this.on('pointerover', this.handlePointerOver);
    this.on('pointerout', this.handlePointerOut)
    this.on('pointerdown', this.handlePointerDown);
    this.on('pointerup', this.handlePointerUp);
    this.setInteractive();
    this.text = scene.add.text(x, y, 'play');
    this.text.setPosition(this.text.x - this.text.width * 0.5, this.text.y - this.text.height * 0.5);
  }

  handlePointerOver = () => {
    this.setScale(1.1);
  }

  handlePointerOut = () => {
    this.setScale(1);
  }

  handlePointerDown = () => {
    if (this.isEnabled === false) return;
    this.setScale(0.9);
  }

  handlePointerUp = () => {
    if (this.isEnabled === false) return;
    this.isEnabled = false;
    this.setScale(1);
    this.scene.cameras.main.fade(500, 50, 50, 50, false, (camera: any, progress: number) => {
      if (progress >= 0.8) this.onclick();
    })
  }
}

export default {
  PlayButton,
  preload
}