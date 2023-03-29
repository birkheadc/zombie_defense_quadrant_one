import DieSound from '../../../../assets/sound/sfx/walkScene/die.wav';

const AUDIO_ID = 'die_audio';

function preload(scene: Phaser.Scene) {
  scene.load.audio(AUDIO_ID, DieSound);
}

function play(scene: Phaser.Scene) {
  scene.sound.play(AUDIO_ID);
}

export default {
  preload,
  play
}