# Space Shooter

A 2D space shooter game built with [PixiJS](https://pixijs.com/) for learning purposes.

## How to play

Destroy all asteroids, then defeat the boss before time runs out.

- **Arrow keys** — move left/right
- **Space** — shoot

## Run locally

Serve the project with any static HTTP server:

```bash
npx serve .
```

Then open `http://localhost:3000`.

## Project structure

```
index.html         — entry point, loads PixiJS and game module
js/
  game.js          — game loop, phases, initialization
  Player.js        — player ship movement and shooting
  Boss.js          — boss enemy AI and health
  Asteroid.js      — asteroid targets
  Bullet.js        — bullet movement and lifecycle
  Collision.js     — collision detection (circle & polygon)
  HUD.js           — timer and ammo display
  textures.js      — asset loading via PIXI.Assets
  constants.js     — game configuration values
  utils.js         — helper functions
img/
  player.png       — player ship sprite
  boss.png         — boss sprite
  asteroid.png     — asteroid sprite
  background.png   — scrolling background
```
