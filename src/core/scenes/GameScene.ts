import Phaser from 'phaser';

import { PlayerEntity } from 'kanji-ecs/entities';

import { MovementSystem } from 'kanji-ecs/systems';


export class GameScene extends Phaser.Scene {
    playerEntity!: PlayerEntity;
    movementSystem!: MovementSystem;


    constructor() {
        super('game-scene');
    }

    preload() {
        this.load.image('player', 'assets/player.png');
    }

    create() {
        this.playerEntity = new PlayerEntity({ scene: this, x: 100, y: 300});
        this.movementSystem = new MovementSystem({ scene: this });
    }

    update(_time: number, deltaTime: number) {
        const dt = deltaTime / 1000;

        this.movementSystem.update({ player: this.playerEntity, deltaTime: dt });
    }
}
