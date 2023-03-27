import GameState from "../../gameState/gameState";
import ProgressBar from "../barScene/progressBar/progressBar";
import BuildingsScroller from "./buildingsScroller/buildingsScroller";
import MobSpawner from "./mobSpawner/mobSpawner";
import sounds from "./sounds";
import sprites from "./sprites";
import { SadMan } from "./sprites/sadMan/sadMan";

const SCROLL_SPEED = 50;
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

export default class WalkScene extends Phaser.Scene {

  gameState: GameState | undefined = undefined;

  buildingScroller: BuildingsScroller | undefined = undefined;

  buildingsGroup: Phaser.GameObjects.Group | undefined = undefined;

  PLAY_RANGE: IRange | undefined = undefined;

  player: SadMan | undefined = undefined;
  playerGroup: Phaser.GameObjects.Group | undefined = undefined;

  progressBar: ProgressBar | undefined = undefined;

  progressPoints: number = 0;
  deltaProgressPoints: number = 0;

  PROGRESS_POINTS_PER_SECOND = 100;
  PROGRESS_POINTS_TO_WIN = 3000;

  mobSpawner: MobSpawner | undefined = undefined;
  mobGroup: Phaser.GameObjects.Group | undefined = undefined;

  MOB_SPAWN_RATE = 2800;

  constructor() {
    super('WalkScene');
  }

  init(data: { gameState: GameState}) {
    this.gameState = data.gameState;
  }

  preload() {
    sprites.preload(this);
    sounds.preload(this);
  }

  create() {
    this.progressPoints = 0;
    this.deltaProgressPoints = 0;
    sounds.stopAll(this);
    
    this.PLAY_RANGE = { topLeft: { x: 0, y: 96}, bottomRight: { x: this.cameras.main.width, y: this.cameras.main.height} };

    this.buildingsGroup = this.add.group();
    this.playerGroup = this.add.group();
    this.mobGroup = this.add.group();
    
    this.generateBackground();
    sounds.playBgm(this);
    this.generateBuildings();
    this.generatePlayer();
    this.generateProgressBar();
    this.startSpawningMobs();

    this.physics.add.overlap(this.mobGroup, this.playerGroup, this.handleMobOverlapPlayer);
  }

  generateBackground() {
    this.cameras.main.setBackgroundColor('rgba(0, 50, 100, 1.0)');
  }

  generateBuildings() {
    this.buildingScroller = new BuildingsScroller(this, this.buildingsGroup, SCROLL_SPEED);
  }

  generatePlayer() {
    this.player = new SadMan(
      this,
      { x: this.cameras.main.width * 0.5, y: this.cameras.main.height * 0.5 },
      this.PLAY_RANGE
    );
    this.playerGroup?.add(this.player);
    this.input.on('pointermove', (event: PointerEvent) => {
      const position = { x: event.x, y: event.y };
      this.player?.moveTo(position);
    })
  }

  generateProgressBar() {
    this.progressBar = new ProgressBar(this, { x: 240, y: 16}, { x: this.cameras.main.width * 0.5, y: 25}, 0x0000aa, this.PROGRESS_POINTS_TO_WIN);
  }

  startSpawningMobs() {
    const spawnRange: IRange = {
      topLeft: {
        x: this.cameras.main.width + 50,
        y: (this.PLAY_RANGE?.topLeft.y ?? 0)
      },
      bottomRight: {
        x: this.cameras.main.width + 50,
        y: (this.PLAY_RANGE?.bottomRight.y ?? this.cameras.main.height) - 16
      }
    }
    this.mobSpawner = new MobSpawner(this, spawnRange, SCROLL_SPEED, this.mobGroup, this.gameState?.isDogKiller ?? false, this.player);
    this.mobSpawner.beginSpawning(this.MOB_SPAWN_RATE);
  }

  updateProgress(delta: number) {
    this.deltaProgressPoints += delta;
    if (this.deltaProgressPoints >= 1000 / this.PROGRESS_POINTS_PER_SECOND) {
      this.deltaProgressPoints -= 1000 / this.PROGRESS_POINTS_PER_SECOND;
      this.progressBar?.add(1);
      this.progressPoints += 1;
      if (this.progressPoints >= this.PROGRESS_POINTS_TO_WIN) {
        this.win();
      }
    }
  }

  update(_: any, delta: number) {
    this.buildingScroller?.update();
    this.updateProgress(delta);
    this.mobSpawner?.update(delta);
  }

  handleMobOverlapPlayer = (object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) => {
    if (object2 instanceof SadMan) {
      this.lose();
    }
  }

  lose() {
    this.mobGroup?.setAlpha(0);
    this.playerGroup?.setAlpha(0);
    this.cameras.main.flash(500, 200, 0, 0, false, (_: any, progress: number) => {
      if (progress >= 0.8) {
        this.reset();
      }
    });
  }

  reset() {
    this.scene.start('WalkScene', { gameState: this.gameState });
  }

  win() {
    this.scene.start('BarScene', { gameState: this.gameState });
  }
}