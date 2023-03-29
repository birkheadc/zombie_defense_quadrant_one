import ZombieDieSound from '../../../../assets/sound/sfx/towerDefenseScene/zombie_die.wav';

const AUDIO_ID = 'zombie_die_audio';

function preload(scene: Phaser.Scene) {
  scene.load.audio(AUDIO_ID, ZombieDieSound);
}

function play(scene: Phaser.Scene) {
  scene.sound.play(AUDIO_ID);
}

export default {
  preload,
  play
}