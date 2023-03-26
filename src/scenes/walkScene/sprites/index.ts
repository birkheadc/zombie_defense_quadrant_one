import angryMan from "./angryMan/angryMan";
import angryMessage from "./angryMessage/angryMessage";
import buildings from "./buildings/buildings"
import walkDog from "./dog/walkDog";
import sadMan from "./sadMan/sadMan";

function preload(scene: Phaser.Scene) {
  buildings.preload(scene);
  sadMan.preload(scene);
  angryMan.preload(scene);
  walkDog.preload(scene);
  angryMessage.preload(scene);
}

export default {
  preload: preload
}