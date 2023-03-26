import hand from "./hand/hand";
import bartender from "./bartender/bartender";
import cup from "./cup/cup";
import drinker from "./drinker/drinker";

function preload(scene: Phaser.Scene) {
  hand.preload(scene);
  bartender.preload(scene);
  cup.preload(scene);
  drinker.preload(scene);
}

export default {
  preload: preload
}