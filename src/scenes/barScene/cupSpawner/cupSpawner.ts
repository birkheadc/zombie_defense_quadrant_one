import { Cup } from "../sprites/cup/cup";
import { Knife } from "../sprites/knife/knife";

interface IRange { topLeft: { x: number, y: number }, bottomRight: { x: number, y: number } };

export default class CupSpawner {

  cups: Cup[] = [];
  knifes: Knife[] = [];

  CUP_SPAWN_CHANCE = 0.2;

  constructor(
    private scene: Phaser.Scene,
    private spawnRange: IRange,
    private drinkGroup: Phaser.GameObjects.Group | undefined,
    private knifeGroup: Phaser.GameObjects.Group | undefined,
    private onCupBreak: Function
  ) { }
  
  spawnCup() {
    if (Math.random() >= 1.0 - this.CUP_SPAWN_CHANCE) this.cups.push(new Cup(this.scene, this.getRandomSpawnLocation(), this.drinkGroup))
    else this.knifes.push(new Knife(this.scene, this.getRandomSpawnLocation(), this.knifeGroup))
  }

  getRandomSpawnLocation(): { x: number, y: number } {
    return {
      x: Math.random() * (this.spawnRange.bottomRight.x - this.spawnRange.topLeft.x) + this.spawnRange.topLeft.x,
      y: Math.random() * (this.spawnRange.bottomRight.y - this.spawnRange.topLeft.y) + this.spawnRange.topLeft.y,
    };
  }

  update(delta: number) {
    for (let i = 0; i < this.cups.length; i++) {
      if (this.cups[i].y > this.scene.cameras.main.height) {
        this.onCupBreak();
        this.cups[i].destroy();
        this.cups.splice(i, 1);
        return;
      }
    }
    for (let i = 0; i < this.knifes.length; i++) {
      if (this.knifes[i].y > this.scene.cameras.main.height) {
        this.knifes[i].destroy();
        this.knifes.splice(i, 1);
        return;
      }
    }
  }
}