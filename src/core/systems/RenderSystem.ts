import { Entity } from "kanji-ecs/core";
import { SpriteComponent } from "../components/SpriteComponent";
import { PositionComponent } from "kanji-ecs";

export class RenderSystem {
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
  