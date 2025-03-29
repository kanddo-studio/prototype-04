import { PlayerEntity } from '../entities/Player';
import { MovementComponent } from '../components/MovementComponent';
import Phaser from 'phaser';

interface IMovementSystemConstructor {
    scene: Phaser.Scene,
}
interface IMovementSystemUpdate {
    player: PlayerEntity, 
    deltaTime: number
}
export class MovementSystem {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(props: IMovementSystemConstructor) {
        if (props.scene.input.keyboard) {
            this.cursors = props.scene.input.keyboard.createCursorKeys();
        } else {
            throw new Error("Keyboard input is not available in the scene.");
        }
    }

    update(props: IMovementSystemUpdate) {
        const movementComponent = props.player.getComponent(MovementComponent) as MovementComponent;

        if (!movementComponent) return;

        const speed = movementComponent.speed * props.deltaTime;

        if (this.cursors.left?.isDown) {
            props.player.x -= speed;
        } else if (this.cursors.right?.isDown) {
            props.player.x += speed;
        }

        if (this.cursors.up?.isDown) {
            props.player.y -= speed;
        } else if (this.cursors.down?.isDown) {
            props.player.y += speed;
        }
    }
}
