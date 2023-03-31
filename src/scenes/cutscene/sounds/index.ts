import howl from "./sfx/howl";
import shout from "./sfx/shout";

function preload(scene: Phaser.Scene) {
  shout.preload(scene);
  howl.preload(scene);
}

function stopAll(scene: Phaser.Scene) {
  scene.sound.stopAll();
}

function playShout(scene: Phaser.Scene) {
  shout.play(scene);
}

function playHowl(scene: Phaser.Scene) {
  howl.play(scene);
}

export default {
  preload,
  stopAll,
  playShout,
  playHowl
}