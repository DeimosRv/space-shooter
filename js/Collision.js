import { distance } from "./utils.js";

export class Collision {
  constructor(player, hud) {
    this.player = player;
    this.hud = hud;
  }

  
  circlePair(listA, listB) {
    for (let i = listA.length - 1; i >= 0; i--) {
      const a = listA[i];
      for (let j = listB.length - 1; j >= 0; j--) {
        const b = listB[j];
        if (distance(a.sprite, b.sprite) < a.radius + b.radius) {
          a.remove();
          listA.splice(i, 1);
          b.remove();
          listB.splice(j, 1);
          break;
        }
      }
    }
  }

  bulletsVsAsteroids(asteroids) {
    this.circlePair(this.player.bullets, asteroids);
  }

  bossBulletsVsPlayer(boss) {
    if (!this.player.alive) return;

    for (let j = boss.bullets.length - 1; j >= 0; j--) {
      const bossBullet = boss.bullets[j];
      const localX = bossBullet.sprite.x - this.player.ship.x;
      const localY = bossBullet.sprite.y - this.player.ship.y;

      if (this.player.poly.contains(localX, localY)) {
        this.player.kill();
        this.hud.win = false;

        bossBullet.remove();
        boss.bullets.splice(j, 1);
        break;
      }
    }
  }

  playerBulletsVsBoss(boss) {
    for (let i = this.player.bullets.length - 1; i >= 0; i--) {
      const bullet = this.player.bullets[i];
      const localX = bullet.sprite.x - boss.sprite.x;
      const localY = bullet.sprite.y - boss.sprite.y;

      if (boss.poly.contains(localX, localY)) {
        bullet.remove();
        this.player.bullets.splice(i, 1);
        boss.takeDamage();

        if (!boss.alive) {
          this.hud.win = true;
        }
      }
    }
  }

  playerBulletsVsBossBullets(boss) {
    if (!this.player.alive) return;
    this.circlePair(this.player.bullets, boss.bullets);
  }

  checkAsteroidPhase(asteroids) {
    this.bulletsVsAsteroids(asteroids);
  }

  checkBossPhase(boss) {
    this.bossBulletsVsPlayer(boss);
    this.playerBulletsVsBoss(boss);
    this.playerBulletsVsBossBullets(boss);
  }
}