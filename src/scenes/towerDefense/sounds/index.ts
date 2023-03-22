import towerDefenseSceneBgm from "./bgm/towerDefenseSceneBgm"

function preload(scene: Phaser.Scene) {
  towerDefenseSceneBgm.preload(scene);
}

function playBgm(scene: Phaser.Scene) {
  towerDefenseSceneBgm.play(scene);
}

export default {
  preload,
  playBgm
}