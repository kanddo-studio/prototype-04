import Phaser from 'phaser';

import { Entity } from 'kanji-ecs/core';

import { MovementSystem } from 'kanji-ecs/systems';

import { PositionComponent, VelocityComponent, InputComponent } from 'kanji-ecs/components';

import { SpriteComponent } from '../components/SpriteComponent';
import { RenderSystem } from '../systems/RenderSystem';
import { InputSystem } from '../systems/InputSystem';


export class GameScene extends Phaser.Scene {
    player!: Entity;
    movement!: MovementSystem;
    render!: RenderSystem;
    inputSystem!: InputSystem;

    constructor() {
        super('game-scene');
    }

    preload() {
        this.load.image('player', 'assets/player.png');
    }

    create() {
        const sprite = this.add.sprite(100, 100, 'player', 0);

        this.player = new Entity();
        this.player.add('velocity', new VelocityComponent(400));
        this.player.add('position', new PositionComponent(300, 200));
        this.player.add('input', new InputComponent(new Set<string>()));
        this.player.add('sprite', new SpriteComponent(sprite));

        this.movement = new MovementSystem();
        this.render = new RenderSystem();
        this.inputSystem = new InputSystem(this);
        
    }

    update(_time: number, deltaTime: number) {
        const dt = deltaTime / 1000;
        this.movement.update([this.player], dt);
        this.render.update([this.player]);
        this.inputSystem.update(this.player);
    }
}
