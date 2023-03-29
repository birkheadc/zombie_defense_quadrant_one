import { TowerDefenseDog } from "../sprites/dog/towerDefenseDog";
import { TowerDefenseZombie } from "../sprites/zombie/towerDefenseZombie";

interface IRange { topLeft: { x: number, y: number }, bottomRight: { x: number, y: number } };

export default class ZombieSpawner {
  constructor(
    private scene: Phaser.Scene,
    private spawnRange: IRange,
    private destinationRange: IRange,
    private zombieGroup: Phaser.GameObjects.Group | null,
    private zombieDieSound: Function
  ) { }

  spawnZombie() {
    new TowerDefenseZombie(this.scene, this.getRandomSpawnLocation(), this.getRandomDestination(), this.zombieGroup, this.zombieDieSound)
  }

  getRandomSpawnLocation(): { x: number, y: number } {
    return {
      x: Math.random() * (this.spawnRange.bottomRight.x - this.spawnRange.topLeft.x) + this.spawnRange.topLeft.x,
      y: Math.random() * (this.spawnRange.bottomRight.y - this.spawnRange.topLeft.y) + this.spawnRange.topLeft.y,
    };
  }

  getRandomDestination(): { x: number, y: number } {
    return {
      x: Math.random() * (this.destinationRange.bottomRight.x - this.destinationRange.topLeft.x) + this.destinationRange.topLeft.x,
      y: Math.random() * (this.destinationRange.bottomRight.y - this.destinationRange.topLeft.y) + this.destinationRange.topLeft.y,
    };
  }

  spawnDog() {
    const dog = new TowerDefenseDog(this.scene, this.getRandomSpawnLocation(), this.zombieGroup);
    dog.setFlipX(true);
    dog.setScale(0.5);
  }
}