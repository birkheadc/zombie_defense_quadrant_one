import { on } from "events";
import { addListener } from "process";
import sounds from "./sounds";
import sprites from "./sprites";
import { Tower } from "./sprites/tower/tower";
import { TowerDefenseZombie } from "./sprites/zombie/towerDefenseZombie";
import ZombieSpawner from "./zombieSpawner/zomberSpawner";

export default class TowerDefenseScene extends Phaser.Scene {

  DELAY_UNTIL_DOG = 5000;
  ZOMBIE_SPAWN_RATE = 1000;

  zombieSpawner: ZombieSpawner | null = null;
  isSpawnZombie: boolean = false;
  spawnZombieDelta: number = 0;

  spawnDogDelta: number = 0;
  dogSpawned: boolean = false;

  tower: Tower | null = null;

  constructor() {
    super("TowerDefenseScene");
  }

  buildZombieSpawner(): ZombieSpawner {
    let spawnRange = {
      topLeft: {
        x: this.cameras.main.width * 0.1,
        y: this.cameras.main.height * 0.1
      }, 
      bottomRight: {
        x: this.cameras.main.width * 0.1,
        y: this.cameras.main.height * 0.9
      }};
    let destination = {
      topLeft: {
        x: this.cameras.main.width * 0.7,
        y: this.cameras.main.height * 0.1
      }, 
      bottomRight: {
        x: this.cameras.main.width * 0.7,
        y: this.cameras.main.height * 0.9
      }};
    return new ZombieSpawner(this, spawnRange, destination);
  }

  preload() {
    sprites.preload(this);
    sounds.preload(this);
  }

  create() {
    this.generateBackground();
    sounds.playBgm(this);
    this.zombieSpawner = this.buildZombieSpawner();
    this.isSpawnZombie = true;
    this.spawnTower();
    this.input.on('pointerdown', this.handleFire)
  }

  handleFire = (event: PointerEvent) => {
    this.tower?.fireTowards({ x: event.x, y: event.y });
  }

  spawnZombie(delta: number) {
    this.spawnZombieDelta += delta;
    if (this.spawnZombieDelta >= this.ZOMBIE_SPAWN_RATE) {
      this.zombieSpawner?.spawnZombie();
      this.spawnZombieDelta -= this.ZOMBIE_SPAWN_RATE;
    }
  }

  spawnDog(delta: number) {
    if (this.dogSpawned === true) return;
    this.spawnDogDelta += delta;
    if (this.spawnDogDelta >= this.DELAY_UNTIL_DOG) {
      this.zombieSpawner?.spawnDog();
      this.dogSpawned = true;
    }
  }

  spawnTower() {
    this.tower = new Tower(this, {
      x: this.cameras.main.width * 0.8,
      y: this.cameras.main.height * 0.5
    });
  }

  generateBackground() {
    this.cameras.main.setBackgroundColor('rgba(100, 50, 0, 1.0)');
  }

  update(time: any, delta: number) {
    this.spawnZombie(delta);
    this.spawnDog(delta);
  }
}