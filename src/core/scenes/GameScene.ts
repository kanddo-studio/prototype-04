import { PlayerEntity } from '../entities/Player';
import { MovementSystem } from '../systems/MovementSystem';
import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    player!: PlayerEntity;
    movementSystem!: MovementSystem;


    constructor() {
        super('game-scene');
    }

    preload() {
        this.load.image('player', 'assets/player.png');
    }

    create() {
        this.player = new PlayerEntity({ scene: this, x: 100, y: 300});
        this.movementSystem = new MovementSystem({ scene: this });
    }

    update(_time: number, deltaTime: number) {
        const dt = deltaTime / 1000;

        this.movementSystem.update({ player: this.player, deltaTime: dt });
    }
}
