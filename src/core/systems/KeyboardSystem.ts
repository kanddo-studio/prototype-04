import Phaser from 'phaser';

import { Entity, InputComponent, System } from 'kanji-ecs';

export class KeyboardSystem implements System {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene) {
        if (scene.input.keyboard) {
            this.cursors = scene.input.keyboard.createCursorKeys();
        } else {
            throw new Error("Keyboard input is not available in the scene.");
        }
    }

    update(entities: Entity[]) {
        entities.forEach(entity => {

            const inputComponent = entity.get<InputComponent>('input');

            if (!inputComponent) return;

            if (this.cursors.left?.isDown) {
                inputComponent.keys.add('ArrowLeft');
            } else {
                inputComponent.keys.delete('ArrowLeft');
            }

            if (this.cursors.right?.isDown) {
                inputComponent.keys.add('ArrowRight');
            } else {
                inputComponent.keys.delete('ArrowRight');
            }

            if (this.cursors.up?.isDown) {
                inputComponent.keys.add('ArrowUp');
            } else {
                inputComponent.keys.delete('ArrowUp');
            }

            if (this.cursors.down?.isDown) {
                inputComponent.keys.add('ArrowDown');
            } else {
                inputComponent.keys.delete('ArrowDown');
            }
        })
    }
}
