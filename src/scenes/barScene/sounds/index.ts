import barSceneBgm from "./bgm/barSceneBgm"

function preload(scene: Phaser.Scene) {
  barSceneBgm.preload(scene);
}

function stopAll(scene: Phaser.Scene) {
  scene.sound.stopAll();
}

function playBgm(scene: Phaser.Scene) {
  barSceneBgm.play(scene);
}

export default {
  preload,
  playBgm,
  stopAll
}