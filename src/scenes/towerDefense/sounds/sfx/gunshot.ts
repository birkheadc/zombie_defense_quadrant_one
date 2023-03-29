import GunshotSound from '../../../../assets/sound/sfx/towerDefenseScene/gunshot.mp3';

const AUDIO_ID = 'gunshot_audio';

function preload(scene: Phaser.Scene) {
  scene.load.audio(AUDIO_ID, GunshotSound);
}

function play(scene: Phaser.Scene) {
  scene.sound.play(AUDIO_ID);
}

export default {
  preload,
  play
}