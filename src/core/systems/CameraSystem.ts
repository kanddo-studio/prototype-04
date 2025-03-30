import { Entity, PositionComponent } from "kanji-ecs";

import { CameraComponent } from "../components/CameraComponent";

export class CameraSystem {
    constructor(private scene: Phaser.Scene, private entity: Entity) {
        this.scene = scene;
        this.entity = entity;

        this.scene.input.on(
            'wheel',
            (
                _pointer: Phaser.Input.Pointer,
                _gameObjects: Phaser.GameObjects.GameObject[],
                _deltaX: number,
                deltaY: number,
                _deltaZ: number
            ) => {
                const cameraComponent = this.entity.get<CameraComponent>('camera');

                if (!cameraComponent) return;

                const zoomFactor = 0.1;
                if (deltaY > 0) {
                    cameraComponent.zoom = Phaser.Math.Clamp(
                        cameraComponent.zoom - zoomFactor,
                        cameraComponent.minZoom,
                        cameraComponent.maxZoom
                    );
                } else if (deltaY < 0) {
                    cameraComponent.zoom = Phaser.Math.Clamp(
                        cameraComponent.zoom + zoomFactor,
                        cameraComponent.minZoom,
                        cameraComponent.maxZoom
                    );
                }
                scene.cameras.main.setZoom(cameraComponent.zoom);
            }
        );

        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const cameraComponent = this.entity.get<CameraComponent>('camera');
            if (!cameraComponent) return;

            cameraComponent.isDragging = true;
            cameraComponent.dragStartX = pointer.worldX;
            cameraComponent.dragStartY = pointer.worldY;

            cameraComponent.isFollowActive = false;
            scene.cameras.main.stopFollow();
        });

        this.scene.input.on('pointerup', () => {
            const cameraComponent = this.entity.get<CameraComponent>('camera');
            if (!cameraComponent) return;

            cameraComponent.isDragging = false;

            cameraComponent.isFollowActive = true;

            const positionComponent = this.entity.get<PositionComponent>('position');
            if (cameraComponent.isFollowActive && positionComponent) {
                scene.cameras.main.startFollow(positionComponent);
            }
        });

        this.scene.input.on('pointerupoutside', () => {
            const cameraComponent = this.entity.get<CameraComponent>('camera');
            const positionComponent = this.entity.get<PositionComponent>('position');

            if (cameraComponent && positionComponent) {
                cameraComponent.isDragging = false;
                scene.cameras.main.startFollow(positionComponent);

            }
        });

        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            const cameraComponent = this.entity.get<CameraComponent>('camera');
            if (!cameraComponent || !cameraComponent.isDragging) return;

            const camera = scene.cameras.main;
            const dragX = pointer.worldX - cameraComponent.dragStartX;
            const dragY = pointer.worldY - cameraComponent.dragStartY;

            const smoothFactor = 0.1;
            camera.scrollX -= (dragX * smoothFactor) / camera.zoom;
            camera.scrollY -= (dragY * smoothFactor) / camera.zoom;

            cameraComponent.dragStartX = pointer.worldX;
            cameraComponent.dragStartY = pointer.worldY;
        });
    }

    update() {
        const cameraComponent = this.entity.get<CameraComponent>('camera');
        const positionComponent = this.entity.get<PositionComponent>('position');

        if (cameraComponent && positionComponent && !cameraComponent.isDragging) {

            if (cameraComponent.isFollowActive) {
                this.scene.cameras.main.startFollow(positionComponent);
            }
        }
    }
}