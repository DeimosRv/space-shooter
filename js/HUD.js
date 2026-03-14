import * as PIXI from "https://cdn.jsdelivr.net/npm/pixi.js@8.6.0/dist/pixi.mjs";
import { PLAYER_MAX_BULLETS } from "./constants.js";

export class HUD {
  constructor(app) {
    this.app = app;
    this.win = null;

    this.timerText = new PIXI.Text({
      text: "60",
      style: { fontSize: 36, fill: 0xffffff },
    });
    this.timerText.x = app.screen.width - 80;
    this.timerText.y = 0;

    this.bulletText = new PIXI.Text({
      text: `Bullets: ${PLAYER_MAX_BULLETS} / ${PLAYER_MAX_BULLETS}`,
      style: { fontSize: 36, fill: 0xffffff },
    });
    this.bulletText.x = 20;
    this.bulletText.y = 0;

    app.stage.addChild(this.timerText);
    app.stage.addChild(this.bulletText);
  }

  updateTimer(time) {
    this.timerText.text = `${time}`;
  }

  updateBullets(bullets) {
    this.bulletText.text = `Bullets: ${bullets} / ${PLAYER_MAX_BULLETS}`;
  }

  createTextLoseOrWin() {
    if (this.endText) return;

    const message = this.win ? "YOU WIN" : "YOU LOSE";
    const color = this.win ? 0x00ff00 : 0xff0000

    this.endText = new PIXI.Text({
      text: message,
      style: { fontSize: 100, fill: color },
    });
    this.endText.anchor.set(0.5);
    this.endText.x = this.app.screen.width / 2;
    this.endText.y = this.app.screen.height / 2;

    this.app.stage.addChild(this.endText);
  }
}
