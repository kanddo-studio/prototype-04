import './styles/global.css';
import Phaser from 'phaser';

import { GameScene } from './core/scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  scene: GameScene,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  }
};

function init() {
  new Phaser.Game(config);
}

init();
