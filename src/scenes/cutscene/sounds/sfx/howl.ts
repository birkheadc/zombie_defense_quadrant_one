import BreakSound from '../../../../assets/sound/sfx/cutsceneScene/howl.wav';

const AUDIO_ID = 'howl_audio';

function preload(scene: Phaser.Scene) {
  scene.load.audio(AUDIO_ID, BreakSound);
}

function play(scene: Phaser.Scene) {
  scene.sound.play(AUDIO_ID);
}

export default {
  preload,
  play
}