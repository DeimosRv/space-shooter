import * as PIXI from "https://cdn.jsdelivr.net/npm/pixi.js@8.6.0/dist/pixi.mjs";
import { Bullet } from "./Bullet.js";
import {
  BOSS_HP,
  BOSS_SPEED_X,
  BOSS_BULLET_SPEED,
  BOSS_STAR_RADIUS,
  BOSS_ENTRY_Y,
  PLAYER_SHAPE,
} from "./constants.js";
import { textures } from "./textures.js";

export class Boss {
  constructor(app) {
    this.app = app;

    this.sprite = new PIXI.Container();

    this.body = new PIXI.Sprite(textures.boss);
    this.body.anchor.set(0.5, 0.5);
    const bossScale = (BOSS_STAR_RADIUS * 2) / 97;
    this.body.scale.set(bossScale);

    this.sprite.addChild(this.body);
    this.app.stage.addChild(this.sprite);

    this.sprite.x = app.screen.width / 2;
    this.sprite.y = -20;

    this.bullets = [];
    this.event = "show";
    this.speedX = BOSS_SPEED_X;
    this.poly = new PIXI.Polygon(PLAYER_SHAPE);
    this.hpMax = BOSS_HP;
    this.hp = this.hpMax;
    this.alive = true;

    this.healthBarBg = null;
    this.healthBar = null;
  }

  createHealthBar() {
    if (!this.healthBarBg) {
      this.healthBarBg = new PIXI.Graphics();
      this.sprite.addChild(this.healthBarBg);

      this.healthBar = new PIXI.Graphics();
      this.sprite.addChild(this.healthBar);
    }

    const hpWidth = (this.hp / this.hpMax) * 100;

    this.healthBarBg.clear();
    this.healthBarBg.fill(0x555555);
    this.healthBarBg.rect(-50, 45, 100, 10);
    this.healthBarBg.fill();

    this.healthBar.clear();
    this.healthBar.fill(0xff0000);
    this.healthBar.rect(-50, 45, hpWidth, 10);
    this.healthBar.fill();
  }

  show(dt) {
    if (this.sprite.y <= BOSS_ENTRY_Y) {
      this.sprite.y += 1 * dt;
    } else {
      this.event = "static";
    }
  }

  move(dt) {
    if (!this.alive) return;

    this.sprite.x += this.speedX * dt;

    if (this.sprite.x > this.app.screen.width - 50 || this.sprite.x < 50) {
      this.speedX *= -1;
    }
  }

  shoot() {
    const bullet = new Bullet(this.app, this.sprite.x, this.sprite.y + 30, BOSS_BULLET_SPEED, "bullet_boss");
    this.bullets.push(bullet);
  }

  updateBulletsArray(dt) {
    this.bullets = this.bullets.filter((b) => b.update(dt));
  }

  takeDamage() {
    this.hp--;
    if (this.hp <= 0) {
      this.alive = false;
      this.sprite.visible = false;
      this.app.stage.removeChild(this.sprite);
    }
  }
}
