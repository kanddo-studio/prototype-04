import { Entity, System } from "kanji-ecs/core";

import { PositionComponent } from "kanji-ecs/components";

import { SpriteComponent } from "../components/SpriteComponent";

export class RenderSystem implements System {
    update(entities: Entity[]) {
      entities.forEach(entity => {
        const spriteComponent = entity.get('sprite') as SpriteComponent;

        if (spriteComponent) {
          spriteComponent.sprite.x = (entity.get('position') as PositionComponent).x;
          spriteComponent.sprite.y = (entity.get('position') as PositionComponent).y;
        }
      });
    }
  }
  