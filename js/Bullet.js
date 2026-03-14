import * as PIXI from "https://cdn.jsdelivr.net/npm/pixi.js@8.6.0/dist/pixi.mjs";
import { BULLET_RADIUS, BULLET_SPEED } from "./constants.js";

export class Bullet {
  constructor(app, x, y, speed = BULLET_SPEED) {
    this.app = app;
    this.radius = BULLET_RADIUS;
    this.speed = speed;

    this.sprite = new PIXI.Graphics();
    this.sprite.fill(0xffffff);
    this.sprite.circle(0, 0, BULLET_RADIUS);
    this.sprite.fill();
    const scale = (this.radius * 2) / 54;
    this.sprite.scale.set(scale);
    if (speed < 0) {
      this.sprite.rotation = Math.PI;
    }
    this.sprite.x = x;
    this.sprite.y = y;

    this.app.stage.addChild(this.sprite);
  }

  remove() {
    this.sprite.visible = false;
    this.app.stage.removeChild(this.sprite);
  }

  update(dt) {
    this.sprite.y += this.speed * dt;

    if (this.sprite.y < 0 || this.sprite.y > this.app.screen.height) {
      this.remove();
      return false;
    }
    return true;
  }
}
