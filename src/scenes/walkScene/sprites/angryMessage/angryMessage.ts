import AngryMessageDogKillerSprite from '../../../../assets/sprites/walkScene/angryMessage/dog_killer.png';
import AngryMessageBackStabberSprite from '../../../../assets/sprites/walkScene/angryMessage/back_stabber.png';
import { Physics } from 'phaser';

const DOG_KILLER_SPRITE_ID = 'angry_message_dog_killer_sprite';
const BACK_STABBER_SPRITE_ID = 'angry_message_back_stabber_sprite';

const FRAME_SIZE = { frameWidth: 64, frameHeight: 64 };

function preload(scene: Phaser.Scene) {
  scene.load.spritesheet(DOG_KILLER_SPRITE_ID, AngryMessageDogKillerSprite, FRAME_SIZE);
  scene.load.spritesheet(BACK_STABBER_SPRITE_ID, AngryMessageBackStabberSprite, FRAME_SIZE);
}

export class AngryMessage extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, spawnLocation: { x: number, y: number }, private isDogKiller: boolean, private scrollSpeed: number) {
    super(scene, spawnLocation.x, spawnLocation.y, isDogKiller ? DOG_KILLER_SPRITE_ID : BACK_STABBER_SPRITE_ID);
    scene.add.existing(this);
    this.declareAnims();
    this.beginBehavior();
  }

  declareAnims() {
    this.anims.create({
      key: 'flash',
      frames: this.anims.generateFrameNumbers(this.isDogKiller ? DOG_KILLER_SPRITE_ID : BACK_STABBER_SPRITE_ID, { frames: [ 0, 1 ] }),
      frameRate: 2,
      repeat: -1
    });
  }

  beginBehavior() {
    this.anims.play('flash');
    this.setVelocityX(-1 * this.scrollSpeed);
  }
}

export default {
  preload
}