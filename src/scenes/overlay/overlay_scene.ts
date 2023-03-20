import sprites from "./sprites";
import { SoundButton } from "./sprites/soundButton/soundButton";

export default class OverlayScene extends Phaser.Scene {

  soundButton: SoundButton | null = null;
  isSoundOn: boolean = false;

  constructor() {
    super("OverlayScene");
  }

  preload() {
    sprites.preload(this);
  }

  create() {
    this.generateSoundButton();
    this.scene.launch('MainMenuScene');
    this.scene.bringToTop();
  }

  generateSoundButton() {
    const soundButton = new SoundButton(this, 32, 32, this.test);
    this.soundButton = soundButton;
  }

  test = () => {
    if (this.soundButton == null) return;
    this.isSoundOn = !this.isSoundOn;
    console.log('Sound is now: ', this.isSoundOn);
    this.soundButton.setSound(this.isSoundOn);
  }
}