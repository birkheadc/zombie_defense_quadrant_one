import hand from "./hand/hand";
import bartender from "./bartender/bartender";
import cup from "./cup/cup";
import drinker from "./drinker/drinker";
import background from "./background/background";
import knife from "./knife/knife";

function preload(scene: Phaser.Scene) {
  hand.preload(scene);
  bartender.preload(scene);
  cup.preload(scene);
  drinker.preload(scene);
  background.preload(scene);
  knife.preload(scene);
}

export default {
  preload: preload
}