import towerDefenseZombie from "./zombie/towerDefenseZombie"
import tower from "./tower/tower";
import bullet from "./bullet/bullet";
import towerDefenseDog from "./dog/towerDefenseDog";
import wall from "./wall/wall";
import reticle from "./reticle/reticle";
import towerDefenseSceneBackground from "./background/towerDefenseSceneBackground";

function preload(scene: Phaser.Scene) {
  towerDefenseZombie.preload(scene);
  tower.preload(scene);
  bullet.preload(scene);
  towerDefenseDog.preload(scene);
  wall.preload(scene);
  reticle.preload(scene);
  towerDefenseSceneBackground.preload(scene);
}

export default {
  preload
}