import walkSceneBgm from "./bgm/walkSceneBgm";

function preload(scene: Phaser.Scene) {
  walkSceneBgm.preload(scene);
}

function stopAll(scene: Phaser.Scene) {
  scene.sound.stopAll();
}

function playBgm(scene: Phaser.Scene) {
  walkSceneBgm.play(scene);
}

export default {
  preload,
  stopAll,
  playBgm
}