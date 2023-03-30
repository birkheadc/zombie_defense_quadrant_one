import sprites from "./sprites";
import sounds from "./sounds";

function preload(scene: Phaser.Scene) {
  sprites.preload(scene);
  sounds.preload(scene);
}

export default {
  preload
}