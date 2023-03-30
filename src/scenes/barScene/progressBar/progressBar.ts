export default class ProgressBar {
  box: Phaser.GameObjects.Graphics | undefined = undefined;
  bar: Phaser.GameObjects.Graphics | undefined = undefined;

  current: number = 0;

  constructor(scene: Phaser.Scene, private size: { x: number, y: number}, private center: { x: number, y: number }, private color: number, private max: number) {
    this.box = scene.add.graphics();
    this.bar = scene.add.graphics();

    this.box.fillStyle(0xffffff, 1);
    this.box.fillRect(center.x - size.x / 2, center.y - size.y / 2, size.x, size.y);
  }

  add(num: number) {
    this.current += num;
    this.updateBar();
  }

  set(num: number) {
    this.current = num;
    this.updateBar();
  }

  updateBar() {
    const ratio = this.current / this.max;
    this.bar?.clear();
    this.bar?.fillStyle(this.color, 1);
    this.bar?.fillRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x * ratio, this.size.y);
  }
}