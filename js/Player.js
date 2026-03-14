import * as PIXI from "https://cdn.jsdelivr.net/npm/pixi.js@8.6.0/dist/pixi.mjs";
import { Bullet } from "./Bullet.js";
import { PLAYER_SPEED, PLAYER_MAX_BULLETS, PLAYER_SHAPE } from "./constants.js";
import { textures } from "./textures.js";

export class Player {
  constructor(app) {
    this.app = app;
    this.speed = PLAYER_SPEED;
    this.bullets = [];
    this.maxBullets = PLAYER_MAX_BULLETS;
    this.spacePressed = false;
    this.alive = true;

    this.ship = new PIXI.Sprite(textures.player);
    this.ship.anchor.set(0.5, 0.5);
    this.ship.scale.set(80 / 99);
    this.ship.x = app.screen.width / 2;
    this.ship.y = app.screen.height - 60;

    this.poly = new PIXI.Polygon(PLAYER_SHAPE);
    app.stage.addChild(this.ship);
  }

  move(keys, dt) {
    if (!this.alive) return;

    if (keys["ArrowLeft"]) this.ship.x -= this.speed * dt;
    if (keys["ArrowRight"]) this.ship.x += this.speed * dt;
    this.ship.x = Math.max(
      20,
      Math.min(this.app.screen.width - 20, this.ship.x),
    );
  }

  shoot(keys) {
    if (!this.alive) return;

    if (keys["Space"] && this.maxBullets > 0 && !this.spacePressed) {
      const bullet = new Bullet(this.app, this.ship.x, this.ship.y - 20);
      this.bullets.push(bullet);
      this.maxBullets--;
      this.spacePressed = true;
    }
    if (!keys["Space"]) this.spacePressed = false;
  }

  updateBulletsArray(dt) {
    if (!this.alive) return;
    this.bullets = this.bullets.filter((bullet) => bullet.update(dt));
  }

  kill() {
    this.alive = false;
    this.ship.visible = false;
    this.app.stage.removeChild(this.ship);
  }
}
