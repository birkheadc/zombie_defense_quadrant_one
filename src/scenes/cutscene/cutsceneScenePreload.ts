import sprites from "./sprites";

function preload(scene: Phaser.Scene) {
  sprites.preload(scene);
}

export default {
  preload
}