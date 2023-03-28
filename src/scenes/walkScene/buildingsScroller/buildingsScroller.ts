import { Buildings } from "../sprites/buildings/buildings";

export default class BuildingsScroller {

  buildings: Buildings[] = [];

  constructor(scene: Phaser.Scene, group: Phaser.GameObjects.Group | undefined, scrollSpeed: number) {
    this.buildings.push(new Buildings(scene, { x: scene.cameras.main.width * -0.5, y: scene.cameras.main.height * 0.5}, scrollSpeed));
    this.buildings.push(new Buildings(scene, { x: scene.cameras.main.width * 0.5, y: scene.cameras.main.height * 0.5}, scrollSpeed));
    this.buildings.push(new Buildings(scene, { x: scene.cameras.main.width * 1.5, y: scene.cameras.main.height * 0.5}, scrollSpeed));
  }

  update() {
    for (let i = 0; i < this.buildings.length; i++) {
      if (this.buildings[i].x < -240) {
        this.buildings[i].setPosition(this.buildings[i].x + (480*3), this.buildings[i].y);
      }
    }
  }
}