import soundButton from "./soundButton/soundButton";

function preload(scene: Phaser.Scene) {
  soundButton.preload(scene);
}

export default {
  preload: preload
}