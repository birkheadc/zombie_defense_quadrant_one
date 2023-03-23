import sounds from "./sounds";
import sprites from "./sprites";
import { Bullet } from "./sprites/bullet/bullet";
import { TowerDefenseDog } from "./sprites/dog/towerDefenseDog";
import { Tower } from "./sprites/tower/tower";
import { TowerDefenseZombie } from "./sprites/zombie/towerDefenseZombie";
import ZombieSpawner from "./zombieSpawner/zomberSpawner";

export default class TowerDefenseScene extends Phaser.Scene {

  DELAY_UNTIL_DOG = 500;
  ZOMBIE_SPAWN_RATE = 1000;

  zombieSpawner: ZombieSpawner | null = null;
  isSpawnZombie: boolean = false;
  spawnZombieDelta: number = 0;

  spawnDogDelta: number = 0;
  dogSpawned: boolean = false;

  tower: Tower | null = null;

  zombieGroup: Phaser.GameObjects.Group | null = null;
  bulletGroup: Phaser.GameObjects.Group | null = null;

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
    return new ZombieSpawner(this, spawnRange, destination, this.zombieGroup);
  }

  preload() {
    sprites.preload(this);
    sounds.preload(this);
  }

  create() {
    this.generateBackground();
    sounds.playBgm(this);

    this.zombieGroup = this.add.group();
    this.bulletGroup = this.add.group();

    this.physics.add.overlap(this.bulletGroup, this.zombieGroup, this.handleBulletCollide);

    this.zombieSpawner = this.buildZombieSpawner();
    this.isSpawnZombie = true;
    this.spawnTower();
    this.input.on('pointerdown', this.handleFire)
  }

  handleFire = (event: PointerEvent) => {
    this.tower?.fireTowards({ x: event.x, y: event.y });
  }

  handleBulletCollide = (object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) => {
    if (object1 instanceof Bullet) {
      if (object2 instanceof TowerDefenseZombie) {
        object1.damage(object2);
        return;
      }
      if (object2 instanceof TowerDefenseDog) {
        this.shootDog();
      }
    }
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
    }, this.bulletGroup);
  }

  generateBackground() {
    this.cameras.main.setBackgroundColor('rgba(100, 50, 0, 1.0)');
  }

  shootDog() {
    console.log('oh no you shot a dog');
  }

  update(time: any, delta: number) {
    this.spawnZombie(delta);
    this.spawnDog(delta);
  }
}