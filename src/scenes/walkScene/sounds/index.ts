import walkSceneBgm from "./bgm/walkSceneBgm";
import throw_fruit from "./sfx/throw_fruit";
import die from "./sfx/die";


function preload(scene: Phaser.Scene) {
  walkSceneBgm.preload(scene);
  throw_fruit.preload(scene);
  die.preload(scene);
}

function stopAll(scene: Phaser.Scene) {
  scene.sound.stopAll();
}

function playBgm(scene: Phaser.Scene) {
  walkSceneBgm.play(scene);
}

function playThrowFruit(scene: Phaser.Scene) {
  throw_fruit.play(scene);
}

function playDieSound(scene: Phaser.Scene) {
  die.play(scene);
}

export default {
  preload,
  stopAll,
  playBgm,
  playThrowFruit,
  playDieSound
}