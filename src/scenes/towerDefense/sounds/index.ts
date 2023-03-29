import towerDefenseSceneBgm from "./bgm/towerDefenseSceneBgm"
import gunshot from "./sfx/gunshot";
import zombie_die from "./sfx/zombie_die";

function preload(scene: Phaser.Scene) {
  towerDefenseSceneBgm.preload(scene);
  gunshot.preload(scene);
  zombie_die.preload(scene);
}

function stopAll(scene: Phaser.Scene) {
  scene.sound.stopAll();
}

function playBgm(scene: Phaser.Scene) {
  towerDefenseSceneBgm.play(scene);
}

function playGunshot(scene: Phaser.Scene) {
  gunshot.play(scene);
}

function playZombieDie(scene: Phaser.Scene) {
  zombie_die.play(scene);
}

export default {
  preload,
  playBgm,
  stopAll,
  playGunshot,
  playZombieDie
}