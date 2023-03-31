import barScenePreload from "../barScene/barScenePreload";
import ProgressBar from "../barScene/progressBar/progressBar";
import cutsceneScenePreload from "../cutscene/cutsceneScenePreload";
import mainMenuPreload from "../mainMenu/mainMenuPreload";
import overlayScenePreload from "../overlay/overlayScenePreload";
import towerDefenseScenePreload from "../towerDefense/towerDefenseScenePreload";
import walkScenePreload from "../walkScene/walkScenePreload";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    const progressBar = new ProgressBar(
      this,
      { x: this.cameras.main.width * 0.25, y: 24 },
      { x: this.cameras.main.width * 0.5, y: this.cameras.main.height * 0.5 },
      0x000000,
      1
    );

    this.load.on('progress', (event: number) => {
      progressBar.set(event)
    });

    barScenePreload.preload(this);
    cutsceneScenePreload.preload(this);
    mainMenuPreload.preload(this);
    overlayScenePreload.preload(this);
    towerDefenseScenePreload.preload(this);
    walkScenePreload.preload(this);
  }

  create() {
    this.scene.start('OverlayScene');
  }
}