import GameState from "../../gameState/gameState";
import sounds from "./sounds";
import sprites from "./sprites";
import { Bullet } from "./sprites/bullet/bullet";
import { TowerDefenseDog } from "./sprites/dog/towerDefenseDog";
import { Reticle } from "./sprites/reticle/reticle";
import { Tower } from "./sprites/tower/tower";
import { Wall } from "./sprites/wall/wall";
import { TowerDefenseZombie } from "./sprites/zombie/towerDefenseZombie";
import ZombieSpawner from "./zombieSpawner/zomberSpawner";

export default class TowerDefenseScene extends Phaser.Scene {

  gameState: GameState | undefined;

  DELAY_UNTIL_DOG = 15000;
  ZOMBIE_SPAWN_RATE = 1000;

  zombieSpawner: ZombieSpawner | null = null;
  isSpawnZombie: boolean = false;
  spawnZombieDelta: number = 0;

  spawnDogDelta: number = 0;
  dogSpawned: boolean = false;

  tower: Tower | null = null;

  zombieGroup: Phaser.GameObjects.Group | null = null;
  bulletGroup: Phaser.GameObjects.Group | undefined = undefined;
  wallGroup: Phaser.GameObjects.Group | null = null;

  reticle: Reticle | undefined = undefined;

  isFiring: boolean = false;
  deltaFire: number = 0;
  FIRE_RATE = 200;

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
    return new ZombieSpawner(this, spawnRange, destination, this.zombieGroup, () => sounds.playZombieDie(this));
  }

  init(data: { gameState: GameState}) {
    this.gameState = data.gameState;
  }

  preload() {
    
  }

  create() {
    this.spawnDogDelta = 0;
    this.spawnZombieDelta = 0;
    this.dogSpawned = false;
    
    this.deltaFire = this.FIRE_RATE;

    this.generateBackground();
    this.generateReticle();

    sounds.stopAll(this);
    sounds.playBgm(this);

    this.zombieGroup = this.add.group();
    this.bulletGroup = this.add.group();
    this.wallGroup = this.add.group();

    this.physics.add.overlap(this.bulletGroup, this.zombieGroup, this.handleBulletCollide);
    this.physics.add.overlap(this.zombieGroup, this.wallGroup, this.handleWallCollide);

    this.zombieSpawner = this.buildZombieSpawner();
    this.isSpawnZombie = true;
    this.spawnTower();
    this.input.on('pointerdown', this.startFiring)
    this.input.on('pointerup', this.stopFiring);

    this.spawnWall();
  }

  generateReticle() {
    this.reticle = new Reticle(this, { x: this.cameras.main.width / 2, y: this.cameras.main.height / 2});
    this.input.on('pointermove', (event: PointerEvent) => {
      const location = { x: event.x, y: event.y };
      this.reticle?.moveTo(location);
      this.tower?.pointTowardsLocation(location);
    });
  }

  startFiring = (event: PointerEvent) => {
    this.isFiring = true;
  }

  stopFiring = (event: PointerEvent) => {
    this.isFiring = false;
    this.deltaFire = this.FIRE_RATE;
  }

  handleBulletCollide = (object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) => {
    if (object1 instanceof Bullet) {
      if (object2 instanceof TowerDefenseZombie) {
        object1.damage(object2);
        return;
      }
      if (object2 instanceof TowerDefenseDog) {
        object1.destroy();
        this.shootDog();
      }
    }
  }

  handleWallCollide = (object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) => {
    if (object2 instanceof Wall) {
      if (object1 instanceof TowerDefenseZombie) {
        this.lose();
        return;
      }
      if (object1 instanceof TowerDefenseDog) {
        object1.destroy();
        this.saveDog();
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

  spawnWall() {
    new Wall(
      this, {
      x: this.cameras.main.width * 0.5,
      y: this.cameras.main.height * 0.5,
      },
      this.wallGroup
    )
  }

  generateBackground() {
    this.cameras.main.setBackgroundColor('rgba(100, 50, 0, 1.0)');
  }

  shootDog = () => {
    sounds.stopAll(this);
    if (this.gameState == null) return;
    if (this.gameState.didSaveDog && this.gameState.didShootDog) {
      this.scene.start('CutsceneScene', { gameSta: this.gameState, cutsceneId: 'end', nextScene: 'none' }, );
    } else {
      this.gameState.didShootDog = true;
      this.gameState.isDogKiller = true;
      this.scene.start('CutsceneScene', { gameState: this.gameState, cutsceneId: 'shoot_dog', nextScene: 'WalkScene'} );
    }
  }

  saveDog() {
    sounds.stopAll(this);
    if (this.gameState == null) return;
    if (this.gameState.didSaveDog && this.gameState.didShootDog) {
      this.scene.start('CutsceneScene', { gameState: this.gameState, cutsceneId: 'end', nextScene: 'none' } );
    } else {
      this.gameState.didSaveDog = true;
      this.gameState.isDogKiller = false;
      this.scene.start('CutsceneScene', { gameState: this.gameState, cutsceneId: 'save_dog', nextScene: 'WalkScene'} );
    }
  }

  lose() {
    this.zombieGroup?.setAlpha(0);
    this.cameras.main.flash(500, 200, 0, 0, false, (_: any, progress: number) => {
      if (progress >= 0.8) {
        this.reset();
      }
    });
  }

  reset() {
    this.spawnDogDelta = 0;
    this.spawnZombieDelta = 0;
    this.dogSpawned = false;
    this.scene.start('TowerDefenseScene', { gameState: this.gameState });
  }

  fire(delta: number) {
    if (this.isFiring === false) return;
    this.deltaFire += delta;
    if (this.deltaFire >= this.FIRE_RATE) {
      this.tower?.fireTowards({ x: this.reticle?.x ?? 0, y: this.reticle?.y ?? 0});
      sounds.playGunshot(this);
      this.deltaFire -= this.FIRE_RATE;
    }
  }

  update(_: any, delta: number) {
    this.spawnZombie(delta);
    this.spawnDog(delta);
    this.fire(delta);
  }
}