import { Physics } from 'phaser';
import SadManSprite from '../../../../assets/sprites/walkScene/sadMan/sad_man.png';

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

const SPRITE_ID = 'sad_man_sprite';
const FRAME_SIZE = { frameWidth: 16, frameHeight: 24 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(SPRITE_ID, SadManSprite, FRAME_SIZE);
}

export class SadMan extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }, private range: IRange | undefined) {
    super(scene, spawnLocation.x, spawnLocation.y, SPRITE_ID);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this,this.setScale(1.2);
    this.setCollideWorldBounds(true);
    this.setInteractive({ cursor: 'none' });
    this.declareAnims();
    this.beginBehavior();
  }

  declareAnims() {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers(SPRITE_ID, { frames: [ 0, 1, 2, 3 ] }),
      frameRate: 4,
      repeat: -1
    });
  }

  beginBehavior() {
    this.anims.play('walk');
  }

  moveTo(location: { x: number, y: number }) {
    let _x = location.x;
    let _y = location.y;
    
    if (this.range == null) {
      this.setPosition(_x, _y);
      return;
    }

    if (_x < this.range.topLeft.x) _x = this.range.topLeft.x;
    if (_x > this.range.bottomRight.x) _x = this.range.bottomRight.x;
    if (_y < this.range.topLeft.y) _y = this.range.topLeft.y;
    if (_y > this.range.bottomRight.y) _y = this.range.bottomRight.y;
    
    this.setPosition(_x, _y);
  }
}

export default {
  preload
}