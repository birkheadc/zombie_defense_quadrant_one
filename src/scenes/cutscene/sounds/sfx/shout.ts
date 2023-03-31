import BreakSound from '../../../../assets/sound/sfx/cutsceneScene/shout.wav';

const AUDIO_ID = 'shout_audio';

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