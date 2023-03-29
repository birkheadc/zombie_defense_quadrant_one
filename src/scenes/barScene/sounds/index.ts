import barSceneBgm from "./bgm/barSceneBgm"
import breakSound from "./sfx/breakSound";
import drink from "./sfx/drink";
import ow from "./sfx/ow";
import pickup from "./sfx/pickup";

function preload(scene: Phaser.Scene) {
  barSceneBgm.preload(scene);
  pickup.preload(scene);
  drink.preload(scene);
  breakSound.preload(scene);
  ow.preload(scene);
}

function stopAll(scene: Phaser.Scene) {
  scene.sound.stopAll();
}

function playBgm(scene: Phaser.Scene) {
  barSceneBgm.play(scene);
}

function playPickup(scene: Phaser.Scene) {
  pickup.play(scene);
}

function playDrink(scene: Phaser.Scene) {
  drink.play(scene);
}

function playBreak(scene: Phaser.Scene) {
  breakSound.play(scene);
}

function playOw(scene: Phaser.Scene) {
  ow.play(scene);
}

export default {
  preload,
  playBgm,
  stopAll,
  playPickup,
  playDrink,
  playBreak,
  playOw
}