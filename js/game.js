import * as PIXI from "https://cdn.jsdelivr.net/npm/pixi.js@8.6.0/dist/pixi.mjs";
import { loadTextures, textures } from "./textures.js";
import { Player } from "./Player.js";
import { Asteroid } from "./Asteroid.js";
import { Boss } from "./Boss.js";
import { HUD } from "./HUD.js";
import { Collision } from "./Collision.js";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  GAME_DURATION,
  ASTEROID_COUNT,
  ASTEROID_MIN_RADIUS,
  ASTEROID_RADIUS_RANGE,
  PLAYER_MAX_BULLETS,
  BOSS_SHOOT_INTERVAL,
  BOSS_MOVE_INTERVAL_MIN,
  BOSS_MOVE_INTERVAL_RANGE,
} from "./constants.js";

const app = new PIXI.Application();

const keys = {};
window.addEventListener("keydown", (e) => (keys[e.code] = true));
window.addEventListener("keyup", (e) => (keys[e.code] = false));

async function start() {
  await app.init({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 0x000000,
  });

  document.body.appendChild(app.canvas);

  await loadTextures();

  const background = new PIXI.TilingSprite({
    texture: textures.background,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  app.stage.addChild(background);

  const player = new Player(app);

  console.log(22)

  const asteroids = [];
  for (let i = 0; i < ASTEROID_COUNT; i++) {
    const radius = ASTEROID_MIN_RADIUS + Math.random() * ASTEROID_RADIUS_RANGE;
    asteroids.push(new Asteroid(app, radius));
  }

  const hud = new HUD(app);
  const collision = new Collision(player, hud);

  let boss = null;
  let bossMoving = false;
  let shootTimer = 0;
  let moveTimer = 0;
  let moveInterval =
    BOSS_MOVE_INTERVAL_MIN + Math.random() * BOSS_MOVE_INTERVAL_RANGE;
  let startTime = performance.now();

  app.ticker.add((delta) => {
    const dt = delta.deltaTime;
    const elapsed = (performance.now() - startTime) / 1000;
    const timeLeft = GAME_DURATION - elapsed;

    if (timeLeft <= 0 || hud.win != null) {
      hud.createTextLoseOrWin();
      app.ticker.stop();
      return;
    }

    hud.updateTimer(Math.ceil(timeLeft));

    player.move(keys, dt);
    player.shoot(keys);
    player.updateBulletsArray(dt);
    hud.updateBullets(player.maxBullets);

    collision.checkAsteroidPhase(asteroids);

    if (asteroids.length === 0 && boss === null) {
      boss = new Boss(app);
      player.maxBullets = PLAYER_MAX_BULLETS;
      startTime = performance.now();
    }

    if (!boss || !boss.alive) return;

    boss.show(dt);
    boss.createHealthBar();

    collision.checkBossPhase(boss);

    if (boss.event === "static") {
      boss.updateBulletsArray(dt);
      shootTimer += delta.elapsedMS;
      moveTimer += delta.elapsedMS;

      if (shootTimer >= BOSS_SHOOT_INTERVAL) {
        boss.shoot();
        shootTimer = 0;
      }

      if (moveTimer >= moveInterval) {
        bossMoving = !bossMoving;
        moveTimer = 0;
        moveInterval =
          BOSS_MOVE_INTERVAL_MIN + Math.random() * BOSS_MOVE_INTERVAL_RANGE;
      }

      if (bossMoving) {
        boss.move(dt);
      }
    }
  });
}

start();
