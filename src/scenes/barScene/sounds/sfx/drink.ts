import DrinkSound from '../../../../assets/sound/sfx/barScene/drink.wav';

const AUDIO_ID = 'drink_audio';

function preload(scene: Phaser.Scene) {
  scene.load.audio(AUDIO_ID, DrinkSound);
}

function play(scene: Phaser.Scene) {
  scene.sound.play(AUDIO_ID);
}

export default {
  preload,
  play
}