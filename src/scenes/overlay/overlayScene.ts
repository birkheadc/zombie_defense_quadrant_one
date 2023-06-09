import { SoundButton } from "./sprites/soundButton/soundButton";

export default class OverlayScene extends Phaser.Scene {

  soundButton: SoundButton | null = null;
  isSoundOn: boolean = false;

  constructor() {
    super("OverlayScene");
  }

  preload() {
    
  }

  create() {
    this.generateSoundButton();
    this.scene.launch('MainMenuScene');
    this.scene.bringToTop();
    this.sound.mute = !this.isSoundOn;
  }

  generateSoundButton() {
    const soundButton = new SoundButton(this, 20, 20, this.toggleSound);
    this.soundButton = soundButton;
  }

  toggleSound = () => {
    if (this.soundButton == null) return;

    this.isSoundOn = !this.isSoundOn;
    this.sound.mute = !this.isSoundOn;
    this.soundButton.setSound(this.isSoundOn);
  }
}