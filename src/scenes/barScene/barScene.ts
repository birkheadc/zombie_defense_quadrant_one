import { Physics } from "phaser";
import GameState from "../../gameState/gameState";
import CupSpawner from "./cupSpawner/cupSpawner";
import ProgressBar from "./progressBar/progressBar";
import sounds from './sounds';
import sprites from "./sprites";
import { BarBackground } from "./sprites/background/background";
import { Bartender } from "./sprites/bartender/bartender";
import { Cup } from "./sprites/cup/cup";
import { Drinker } from "./sprites/drinker/drinker";
import { Hand } from "./sprites/hand/hand";
import { Knife } from "./sprites/knife/knife";

export default class BarScene extends Phaser.Scene {

  gameState: GameState | undefined;

  droppedCups: number = 0;
  drankCups: number = 0;

  MAX_DROPPED_CUPS = 5;
  MAX_DRANK_CUPS = 15;

  hand: Hand | undefined = undefined;
  handGroup: Phaser.GameObjects.Group | undefined = undefined;

  bartender: Bartender | undefined = undefined;

  drinker: Drinker | undefined = undefined;
  drinkerGroup: Phaser.GameObjects.Group | undefined = undefined;

  spawnCupDelta: number = 0;
  CUP_SPAWN_RATE = 300;

  cupSpawner : CupSpawner | undefined = undefined;
  cupGroup: Phaser.GameObjects.Group | undefined = undefined;
  knifeGroup: Phaser.GameObjects.Group | undefined = undefined;

  edgeOfTable: Physics.Arcade.Sprite | undefined = undefined;
  edgeOfTableGroup: Phaser.GameObjects.Group | undefined;
  
  droppedCupsBar: ProgressBar | undefined = undefined;
  drankCupsBar: ProgressBar | undefined = undefined;

  deltaCameraWobble: number = 0;
  CAMERA_WOBBLE_RATE = 500;
  CAMERA_WOBBLE_BASE_STRENGTH = 1;

  isDead: boolean = false;

  // Was too late to come up with a good way to toggle this, and it can make some players sick, so turned it off for now
  IS_WOBBLE_ENABLED: boolean = false;

  constructor() {
    super('BarScene');
  }

  init(data: { gameState: GameState }) {
    this.gameState = data.gameState;
  }

  preload() {
    
  }

  create() {
    this.isDead = false;
    this.spawnCupDelta = 0;
    this.droppedCups = 0;
    this.drankCups = 0;
    this.deltaCameraWobble = 0;

    this.cupGroup = this.add.group();
    this.knifeGroup = this.add.group();
    this.edgeOfTableGroup = this.add.group();
    this.handGroup = this.add.group();
    this.drinkerGroup = this.add.group();

    this.generateBackground();
    sounds.stopAll(this);
    sounds.playBgm(this)
    this.generateHand();
    this.generateBartender();
    this.generateDrinker();
    this.generateProgressBars();
    this.generateCupSpawner();
    this.generateEdgeOfTable();

    this.physics.add.overlap(this.handGroup, this.cupGroup, this.handleHandOverCup);
    this.physics.add.overlap(this.handGroup, this.knifeGroup, this.handleHandOverKnife);
    this.physics.add.overlap(this.cupGroup, this.edgeOfTableGroup, this.handleCupOffEdgeOfTable);
    this.physics.add.overlap(this.knifeGroup, this.edgeOfTableGroup, this.handleCupOffEdgeOfTable);
    this.physics.add.overlap(this.handGroup, this.drinkerGroup, this.handleHandOverDrinker);
  }

  generateBackground() {
    this.cameras.main.setBackgroundColor('rgba(0, 100, 50, 1.0)');
    new BarBackground(this, { x: this.cameras.main.width * 0.5, y: this.cameras.main.height * 0.5 });
  }

  generateHand() {
    this.hand = new Hand(this, { x: this.cameras.main.width / 2, y: this.cameras.main.height / 2 });
    this.input.on('pointermove', (event: PointerEvent) => {
      this.hand?.moveTo({
        x: event.x,
        y: event.y
      });
    });
    this.handGroup?.add(this.hand);
  }

  generateBartender() {
    this.bartender = new Bartender(this, { x: this.cameras.main.width * 0.5, y: this.cameras.main.height * 0.285 });
  }
  
  generateDrinker() {
    this.drinker = new Drinker(this, { x: this.cameras.main.width * 0.1, y: this.cameras.main.height * 0.8 });
    this.drinkerGroup?.add(this.drinker);
  }

  generateProgressBars() {
    this.droppedCupsBar = new ProgressBar(this, { x: 240, y: 16 }, { x: this.cameras.main.width / 2, y: 25}, 0xaa0000, this.MAX_DROPPED_CUPS);
    this.drankCupsBar = new ProgressBar(this, { x: 240, y: 16 }, { x: this.cameras.main.width / 2, y: 50}, 0x0000aa, this.MAX_DRANK_CUPS);
  }

  generateCupSpawner() {
    let spawnRange = {
      topLeft: {
        x: -20,
        y: this.cameras.main.height * 0.35
      }, 
      bottomRight: {
        x: -20,
        y: this.cameras.main.height * 0.7
      }};
    this.cupSpawner = new CupSpawner(this, spawnRange, this.cupGroup, this.knifeGroup, this.handleCupBreak);
  }

  generateEdgeOfTable() {
    this.edgeOfTable = new Physics.Arcade.Sprite(this, this.cameras.main.width * 0.7, this.cameras.main.height * 0.5, '');
  this.edgeOfTable.setAlpha(0);
    this.edgeOfTable.setScale(1, 100);
    this.edgeOfTableGroup?.add(this.edgeOfTable);
    this.physics.add.existing(this.edgeOfTable);
  }

  handleCupOffEdgeOfTable = (object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) => {
    if (object1 instanceof Cup || object1 instanceof Knife) {
      object1.fall();
    }
  }

  handleHandOverCup = (object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) => {
    if (object1 instanceof Hand && object2 instanceof Cup) {
      if (object1.isHoldingCup === false) {
        object2.destroy();
        object1.setHoldingCup(true);
        sounds.playPickup(this);
      }
    }
  }

  handleHandOverKnife = (object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) => {
    if (this.isDead === true) return;
    if (object2 instanceof Knife) {
      sounds.playOw(this);
      this.lose();
    }
  }

  handleCupBreak = () => {
    this.bartender?.getAngry();
    this.droppedCups += 1;
    this.droppedCupsBar?.add(1);
    sounds.playBreak(this);
    if (this.droppedCups >= this.MAX_DROPPED_CUPS) {
      this.lose();
    }
  }

  handleHandOverDrinker = (object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) => {
    if (object1 instanceof Hand && object2 instanceof Drinker) {
      if (this.hand?.isHoldingCup === true) {
        this.hand.setHoldingCup(false);
        this.handleDrink();
        sounds.playDrink(this);
      }
    }
  }

  handleDrink = () => {
    this.drankCups += 1;
    this.drankCupsBar?.add(1);
    this.drinker?.drink();
    if (this.drankCups >= this.MAX_DRANK_CUPS) {
      this.win();
    }
  }

  lose() {
    this.isDead = true;
    this.cupGroup?.setAlpha(0);
    this.knifeGroup?.setAlpha(0);
    this.cameras.main.flash(500, 200, 0, 0, false, (_: any, progress: number) => {
      if (progress >= 0.8) {
        this.reset();
      }
    });
  }

  win() {
    sounds.stopAll(this);
    this.scene.start('TowerDefenseScene', { gameState: this.gameState });
  }

  reset() {
    this.spawnCupDelta = 0;
    this.drankCups = 0;
    this.droppedCups = 0;
    this.scene.start('BarScene', { gameState: this.gameState });
  }

  update(_: any, delta: number) {
    this.spawnCup(delta);
    this.cupSpawner?.update(delta);
    this.wobbleCamera(delta);
  }

  wobbleCamera(delta: number) {
    if (this.IS_WOBBLE_ENABLED === false) return;
    this.deltaCameraWobble += delta;
    if (this.deltaCameraWobble >= this.CAMERA_WOBBLE_RATE) {
      this.deltaCameraWobble -= this.CAMERA_WOBBLE_RATE;
      const max = { x: (this.cameras.main.width / 2) + (this.drankCups * this.CAMERA_WOBBLE_BASE_STRENGTH), y: (this.cameras.main.height / 2) + (this.drankCups * this.CAMERA_WOBBLE_BASE_STRENGTH) };
      const min = { x: (this.cameras.main.width / 2) - (this.drankCups * this.CAMERA_WOBBLE_BASE_STRENGTH), y: (this.cameras.main.height / 2) - (this.drankCups * this.CAMERA_WOBBLE_BASE_STRENGTH) };
      const destination = {
        x: Math.random() * (max.x - min.x) + min.x,
        y: Math.random() * (max.y - min.y) + min.y
      };
      this.cameras.main.pan(destination.x, destination.y, this.CAMERA_WOBBLE_RATE, 'Linear', true);
    }
  }

  spawnCup(delta: number) {
    this.spawnCupDelta += delta;
    if (this.spawnCupDelta >= this.CUP_SPAWN_RATE) {
      this.cupSpawner?.spawnCup();
      this.spawnCupDelta -= this.CUP_SPAWN_RATE;
    }
  }
}