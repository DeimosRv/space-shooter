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
js/
  game.js        — game loop, collisions, initialization
  Player.js      — player ship movement and shooting
  Boss.js        — boss enemy AI and health
  Asteroid.js    — asteroid targets
  Bullet.js      — bullet movement and lifecycle
  HUD.js         — timer and ammo display
  constants.js   — game configuration values
  utils.js       — helper functions
```

---


