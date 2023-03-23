import towerDefenseZombie from "./zombie/towerDefenseZombie"
import tower from "./tower/tower";
import bullet from "./bullet/bullet";
import towerDefenseDog from "./dog/towerDefenseDog";

function preload(scene: Phaser.Scene) {
  towerDefenseZombie.preload(scene);
  tower.preload(scene);
  bullet.preload(scene);
  towerDefenseDog.preload(scene);
}

export default {
  preload
}