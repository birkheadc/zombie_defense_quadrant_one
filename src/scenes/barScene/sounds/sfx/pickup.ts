import PickupSound from '../../../../assets/sound/sfx/barScene/pickup.wav';

const AUDIO_ID = 'pickup_audio';

function preload(scene: Phaser.Scene) {
  scene.load.audio(AUDIO_ID, PickupSound);
}

function play(scene: Phaser.Scene) {
  scene.sound.play(AUDIO_ID);
}

export default {
  preload,
  play
}