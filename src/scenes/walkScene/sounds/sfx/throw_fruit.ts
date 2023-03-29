import ThrowSound from '../../../../assets/sound/sfx/walkScene/throw.wav';

const AUDIO_ID = 'throw_audio';

function preload(scene: Phaser.Scene) {
  scene.load.audio(AUDIO_ID, ThrowSound);
}

function play(scene: Phaser.Scene) {
  scene.sound.play(AUDIO_ID);
}

export default {
  preload,
  play
}