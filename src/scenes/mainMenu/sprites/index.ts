import playButton from "./playButton/playButton";

function preload(scene: Phaser.Scene) {
  playButton.preload(scene);
}

export default {
  preload: preload
}