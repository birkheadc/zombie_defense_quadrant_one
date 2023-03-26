import endCutscene from "./endCutscene/endCutscene";
import saveDogCutscene from "./saveDogCutscene/saveDogCutscene";
import shootDogCutscene from "./shootDogCutscene/shootDogCutscene";

function preload(scene: Phaser.Scene) {
  endCutscene.preload(scene);
  saveDogCutscene.preload(scene);
  shootDogCutscene.preload(scene);
}

export default {
  preload: preload
}