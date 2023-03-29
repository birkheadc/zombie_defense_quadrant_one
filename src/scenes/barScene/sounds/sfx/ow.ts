import OwSound from '../../../../assets/sound/sfx/walkScene/die.wav';

const AUDIO_ID = 'ow_sound';

function preload(scene: Phaser.Scene) {
  scene.load.audio(AUDIO_ID, OwSound);
}

function play(scene: Phaser.Scene) {
  scene.sound.play(AUDIO_ID);
}

export default {
  preload,
  play
}