import * as PIXI from "https://cdn.jsdelivr.net/npm/pixi.js@8.6.0/dist/pixi.mjs";
import { textures } from "./textures.js";
import {
  ASTEROID_COUNT,
  ASTEROID_MIN_RADIUS,
  ASTEROID_RADIUS_RANGE,
} from "./constants.js";

export class Asteroid {
  constructor(app, radius = 30) {
    this.app = app;
    this.radius = radius;

    this.sprite = new PIXI.Sprite(textures.asteroid);
    this.sprite.anchor.set(0.5, 0.5);
    const scale = (radius * 2) / 101;
    this.sprite.scale.set(scale);
    this.asteroids = [];

    this.sprite.x = radius + Math.random() * (app.screen.width - radius * 2);
    this.sprite.y = radius + Math.random() * (app.screen.height / 2);

    app.stage.addChild(this.sprite);
  }
  createAsteroids() {
    for (let i = 0; i < ASTEROID_COUNT; i++) {
      const radius =
        ASTEROID_MIN_RADIUS + Math.random() * ASTEROID_RADIUS_RANGE;
      this.asteroids.push(new Asteroid(this.app, radius));
    }
  }

  remove() {
    this.sprite.visible = false;
    this.app.stage.removeChild(this.sprite);
  }
}
