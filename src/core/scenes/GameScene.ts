import Phaser from 'phaser';

import { Entity } from 'kanji-ecs/core';

import { MovementSystem } from 'kanji-ecs/systems';

import { PositionComponent, VelocityComponent, InputComponent } from 'kanji-ecs/components';

import { SpriteComponent } from '../components/SpriteComponent';
import { RenderSystem } from '../systems/RenderSystem';
import { KeyboardSystem } from '../systems/KeyboardSystem';
import { CameraSystem } from '../systems/CameraSystem';
import { CameraComponent } from '../components/CameraComponent';


import * as Utils from '../utils';

export class GameScene extends Phaser.Scene {
    player!: Entity;
    movementSystem!: MovementSystem;
    renderSystem!: RenderSystem;
    keyboardSystem!: KeyboardSystem;
    cameraSystem!: CameraSystem;

    constructor() {
        super('game-scene');
    }

    preload() {
        this.load.image('player', 'assets/images/game/player.png');
    }

    create() {
        const worldSize = 400;
        this.physics.world.setBounds(0, 0, worldSize, worldSize);
        Utils.createGrid(this, worldSize);


        const sprite = this.add.sprite(0, 0, 'player', 0);

        // Entities
        this.player = new Entity();

        // Components
        this.player.add('velocity', new VelocityComponent(400));
        this.player.add('position', new PositionComponent(200, 200));
        this.player.add('input', new InputComponent());
        this.player.add('sprite', new SpriteComponent(sprite));
        this.player.add('camera', new CameraComponent());

        // Systems
        this.movementSystem = new MovementSystem();
        this.renderSystem = new RenderSystem();
        this.keyboardSystem = new KeyboardSystem(this);
        this.cameraSystem = new CameraSystem(this, this.player);
    }


    update(_time: number, deltaTime: number) {
        const dt = deltaTime / 1000;
        this.movementSystem.update([this.player], dt);
        this.renderSystem.update([this.player]);
        this.keyboardSystem.update([this.player]);
        this.cameraSystem.update();
    }
}