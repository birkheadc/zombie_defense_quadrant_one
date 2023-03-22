import TowerDefenseSceneBgmAudio from '../../../../assets/sound/bgm/tower_defense_scene_bgm.mp3';

const AUDIO_ID = "tower_defense_scene_bgm";

function preload(scene: Phaser.Scene) {
  scene.load.audio(AUDIO_ID, TowerDefenseSceneBgmAudio);
}

function play(scene: Phaser.Scene) {
  scene.sound.play(AUDIO_ID);
}

export default {
  preload,
  play
}