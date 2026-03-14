import * as PIXI from "https://cdn.jsdelivr.net/npm/pixi.js@8.6.0/dist/pixi.mjs";

export const textures = {};

export async function loadTextures() {
  await PIXI.Assets.load([
    "img/player.png",
    "img/boss.png",
    "img/asteroid.png",
    "img/background.png",
  ]);

  textures.player = PIXI.Assets.get("img/player.png");
  textures.boss = PIXI.Assets.get("img/boss.png");
  textures.asteroid = PIXI.Assets.get("img/asteroid.png");
  textures.background = PIXI.Assets.get("img/background.png");
}
