import { Component } from '../components/Component';
import { MovementComponent } from '../components/MovementComponent';

interface IPlayerEntityConstructor {
    scene: Phaser.Scene,
    x: number, 
    y: number
}
export class PlayerEntity extends Phaser.GameObjects.Sprite {
    components: Component[];

    constructor(props: IPlayerEntityConstructor) {
        super(props.scene, props.x, props.y, 'player');
        props.scene.add.existing(this);

        this.components = [
            new MovementComponent(200),
        ];
    }

    getComponent(componentClass: any) {
        return this.components.find(component => component instanceof componentClass);
    }
}
