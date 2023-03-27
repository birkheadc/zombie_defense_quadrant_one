import { Physics } from "phaser";
import { AngryMan } from "../sprites/angryMan/angryMan";
import { WalkDog } from "../sprites/dog/walkDog";

interface IRange {
  topLeft: {
    x: number,
    y: number
  },
  bottomRight: {
    x: number,
    y: number
  }
}

export default class MobSpawner {

  deltaSpawnMob: number = 0;
  spawnRate: number = 1000;
  isSpawning: boolean = false;
  mobs: {
    angryMans: AngryMan[],
    dogs: WalkDog[]
  } = {
    angryMans: [],
    dogs: []
  };

  constructor(
    private scene: Phaser.Scene,
    private spawnRange: IRange | undefined,
    private scrollSpeed: number,
    private mobGroup: Phaser.GameObjects.Group | undefined,
    private isDogKiller: boolean,
    private player: Physics.Arcade.Sprite | undefined
    ) {
    
  }

  beginSpawning(spawnRate: number) {
    this.isSpawning = true;
    this.spawnRate = spawnRate;
  }

  stopSpawning() {
    this.isSpawning = false;
  }

  destroyAll() {
    // Todo
  }

  spawnMob(delta: number) {
    if (this.isSpawning === false) return;
    this.deltaSpawnMob += delta;
    if (this.deltaSpawnMob >= this.spawnRate) {
      // Todo
      const ran = Math.random();
      ran < 0.5 ? this.spawnMan() : this.spawnDog();
      this.deltaSpawnMob -= this.spawnRate;
    }
  }

  spawnMan() {
    const man = new AngryMan(this.scene, this.getRandomSpawnLocation(), this.scrollSpeed, this.mobGroup, this.isDogKiller, this.player);
    this.mobs.angryMans.push(man);
  }

  spawnDog() {
    const dog = new WalkDog(this.scene, this.getRandomSpawnLocation(), { top: this.spawnRange?.topLeft.y ?? 0, bottom: this.spawnRange?.bottomRight.y ?? this.scene.cameras.main.height}, this.mobGroup);
    dog.flipX = true;
    this.mobs.dogs.push(dog);
  }

  getRandomSpawnLocation(): { x: number, y: number } {
    if (this.spawnRange == null) return { x: 0, y: 0 };
    return {
      x: Math.random() * (this.spawnRange.bottomRight.x - this.spawnRange.topLeft.x) + this.spawnRange.topLeft.x,
      y: Math.random() * (this.spawnRange.bottomRight.y - this.spawnRange.topLeft.y) + this.spawnRange.topLeft.y,
    };
  }

  update(delta: number) {
    this.spawnMob(delta);
    for (let i = 0; i < this.mobs.angryMans.length; i++) {
      const mob = this.mobs.angryMans[i];
      mob.update(delta);
    }
    for (let i = 0; i < this.mobs.dogs.length; i++) {
      const mob = this.mobs.dogs[i];
      mob.update(delta);
    }
  }
}