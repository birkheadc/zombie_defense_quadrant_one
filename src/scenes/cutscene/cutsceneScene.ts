import { spawn } from "child_process";
import GameState from "../../gameState/gameState";
import sprites from "./sprites";
import { EndCutscene } from "./sprites/endCutscene/endCutscene";
import { SaveDogCutscene } from "./sprites/saveDogCutscene/saveDogCutscene";
import { ShootDogCutscene } from "./sprites/shootDogCutscene/shootDogCutscene";

export default class CutsceneScene extends Phaser.Scene {

  gameState: GameState | undefined;
  cutsceneId: string = '';
  nextScene: string = '';

  CUTSCENE_DURATION = 3000;
  delta: number = 0;

  constructor() {
    super('CutsceneScene');
  }

  init(data: { gameState: GameState, cutsceneId: string, nextScene: string } ) {
    this.gameState = data.gameState;
    this.cutsceneId = data.cutsceneId;
    this.nextScene = data.nextScene;
  }

  preload() {
    
  }

  create() {
    this.delta = 0;
    this.spawnCutsceneSprite();
  }

  spawnCutsceneSprite() {
    const spawnLocation = {
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height / 2
    };

    if (this.cutsceneId === 'shoot_dog') {
      new ShootDogCutscene(this, spawnLocation);
    } else if (this.cutsceneId === 'save_dog') {
      new SaveDogCutscene(this, spawnLocation);
    } else {
      new EndCutscene(this, spawnLocation);
    }
  }

  update(_: any, delta: number) {
    if (this.delta >= this.CUTSCENE_DURATION) return; 
    this.delta += delta;
    if (this.delta >= this.CUTSCENE_DURATION) {
      this.goNext();
    }
  }

  goNext() {
    if (this.cutsceneId === 'end') return;
    this.scene.start(this.nextScene, { gameState: this.gameState });
  }
}