import sounds from "./sounds";
import sprites from "./sprites";

function preload(scene: Phaser.Scene) {
  sprites.preload(scene);
  sounds.preload(scene);
}

export default {
  preload
}