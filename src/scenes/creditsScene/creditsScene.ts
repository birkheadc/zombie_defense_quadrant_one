export default class CreditsScene extends Phaser.Scene {

  LINES = [
    'Zombie Defense Force Delta One', "", "", 
    'Assets Used', "",
    'Music', "",
    "It Can't Be Bargained With - Three Chain Links",
    "Turbulence - Timecrawler 82",
    "Phantasia - Timecrawler 82", "",
    "Sound Effects", "",
    "Snake's Authentic Gun Sounds",
    "200 Free SFX",
    "FilmCow Royalty Free Sound Effects Library",
    "Super Dialogue Audio Pack", "",
    "Sprites", "",
    "Modern City Top-Down Tileset [16x16]",
    "RPG Asset Character 'Soldier' NES",
    "Brawler Asset Character 'Soldier' NES",
    "RPG Asset Character 'Zombie' NES",
    "Free Enemy Sprite Sheets Pixel Art",
    "RPG Asset Character 'Royal Servant' SMS",
    "Fruit+",
    "Crosshair for Shooter 2D Games",
    "Free Pro UI Light Minimalism",
    "Ground Shaker",
    "Free 39 Portraits Pixel Art Game Assets",
    "Modern interiors - RPG Tileset [16X16]",
    "Free Pixel Food!",
    "3000+ Free Icons",
    "Shikashi's Fantasy Icons Pack", "", "", "",
  ];

  nextLine: number = 0;

  spawnedLines: Phaser.GameObjects.Text[] = [];

  LINE_SPAWN_RATE = 500;
  deltaSpawn = 0;

  LINE_SPEED = 0.2;

  isThankYouSpawned: boolean = false;
  thankYou: Phaser.GameObjects.Text | undefined = undefined;

  isThankYouInCenter: boolean = false;

  constructor() {
    super('CreditsScene');
  }

  init() {

  }

  preload() {

  }

  create() {
    this.sound.play('walk_scene_bgm');
  }

  update(_: any, delta: number) {
    this.moveLines();
    this.deltaSpawn += delta;
    if (this.deltaSpawn >= this.LINE_SPAWN_RATE) {
      this.generateNextLine();
      this.deltaSpawn -= this.LINE_SPAWN_RATE;
    }
  }

  moveLines() {
    console.log('move');
    for (let i = 0; i < this.spawnedLines.length; i++) {
      this.spawnedLines[i].setPosition(this.spawnedLines[i].x, this.spawnedLines[i].y - this.LINE_SPEED);
    }
    if (this.thankYou != null) {
      if (this.isThankYouInCenter === false) {
        this.thankYou.setPosition(this.thankYou.x, this.thankYou.y - this.LINE_SPEED);
        if (this.thankYou.y <= this.cameras.main.height * 0.5) {
          this.isThankYouInCenter = true;
        }
      }
    }
  }

  generateNextLine() {
    if (this.nextLine >= this.LINES.length) {
      this.generateThankYou();
    } else {
      const location = { x: this.cameras.main.width * 0.5, y: this.cameras.main.height + 25 };
      const text = this.add.text(location.x, location.y, this.LINES[this.nextLine]);
      text.setPosition(text.x - text.width * 0.5, text.y - text.height * 0.5);
      this.spawnedLines.push(text);
      this.nextLine++;
    }
  }

  generateThankYou() {
    if (this.isThankYouSpawned === true) return;
    const location = { x: this.cameras.main.width * 0.5, y: this.cameras.main.height - 50 };
    this.thankYou = this.add.text(location.x, location.y, 'Thank you for playing');
    this.thankYou.setPosition(this.thankYou.x - this.thankYou.width * 0.5, this.thankYou.y - this.thankYou.height * 0.5);
    this.isThankYouSpawned = true;
  }
}