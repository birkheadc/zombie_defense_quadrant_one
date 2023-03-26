import WalkSceneBgmAudio from '../../../../assets/sound/bgm/walk_scene_bgm.mp3';

const AUDIO_ID = "walk_scene_bgm";

function preload(scene: Phaser.Scene) {
  scene.load.audio(AUDIO_ID, WalkSceneBgmAudio);
}

function play(scene: Phaser.Scene) {
  scene.sound.play(AUDIO_ID);
}

export default {
  preload,
  play
}