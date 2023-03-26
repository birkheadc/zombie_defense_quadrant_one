import { Cup } from "../sprites/cup/cup";

interface IRange { topLeft: { x: number, y: number }, bottomRight: { x: number, y: number } };

export default class CupSpawner {

  cups: Cup[] = [];

  constructor(
    private scene: Phaser.Scene,
    private spawnRange: IRange,
    private drinkGroup: Phaser.GameObjects.Group | undefined,
    private onCupBreak: Function
  ) { }
  
  spawnCup() {
    this.cups.push(new Cup(this.scene, this.getRandomSpawnLocation(), this.drinkGroup));
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
  }
}