import Phaser from "phaser";

import { clampPlayerPosition } from "./playerBounds";
import { getAngleToPointer } from "./aiming";
import { getBulletVelocity } from "./bulletPhysics";
import { canShoot } from "./shooting";
import { getRandomSpawn } from "./spawn";
import { increaseScore } from "./score";
import { takeDamage, isAlive } from "./playerHealth";
import { getEnemyStats, chooseEnemyType } from "./enemyTypes";
import { getEnemiesCountForWave } from "./waves";
import { MAX_AMMO, RELOAD_TIME, canShootWithAmmo, useAmmo, finishReload } from "./reload";
import { createPauseOverlay, createGameOverOverlay, togglePause } from "./pause";

// =======================
// Zmienne globalne
// =======================

let player;
let keys;
let bullets = [];
let enemies = [];

const SHOOT_COOLDOWN = 300;
let lastShotTime = 0;

let score = 0;
let health = 3;
let currentWave = 1;

let ammo = MAX_AMMO;
let isReloading = false;
let reloadStartTime = 0;
let ammoText;
let healthText;

let isPaused = false;
let isGameOver = false;
let pauseText;
let gameOverText;
let restartHintText;

// =======================
// Konfiguracja gry
// =======================

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222222",
  scene: { create: create, update: update }
};

new Phaser.Game(config);

// =======================
// Funkcje pomocnicze
// =======================

function spawnWave(scene) {
  const enemyCount = getEnemiesCountForWave(currentWave);

  for (let i = 0; i < enemyCount; i++) {
    const spawnPos = getRandomSpawn(800, 600);
    const type = chooseEnemyType(currentWave);
    const stats = getEnemyStats(type);

    const color = type === "fast" ? 0x00ffff : 
                  type === "tank" ? 0x888888 : 0xff0000;

    const enemy = scene.add.rectangle(spawnPos.x, spawnPos.y, 40, 40, color);

    enemy.speed = stats.speed;
    enemy.hp = stats.hp;
    enemy.damage = stats.damage;
    enemy.lastHitTime = 0;

    enemies.push(enemy);
  }
}

function handleBulletHit(bullet, enemyIndex, scene) {
  bullet.destroy();

  const bulletIndex = bullets.indexOf(bullet);
  if (bulletIndex > -1) bullets.splice(bulletIndex, 1);

  const enemy = enemies[enemyIndex];
  enemy.hp--;

  if (enemy.hp <= 0) {
    score = increaseScore(score);
    console.log("Punkty:", score);

    enemy.destroy();
    enemies.splice(enemyIndex, 1);
  }
}

// =======================
// Funkcja create
// =======================

function create() {
  // Reset stanu gry (potrzebne przy restarcie przez scene.scene.restart())
  bullets = [];
  enemies = [];
  score = 0;
  health = 3;
  currentWave = 1;
  ammo = MAX_AMMO;
  isReloading = false;
  reloadStartTime = 0;
  lastShotTime = 0;
  isPaused = false;
  isGameOver = false;

  player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);

  spawnWave(this);

  keys = this.input.keyboard.addKeys({
    W: Phaser.Input.Keyboard.KeyCodes.W,
    A: Phaser.Input.Keyboard.KeyCodes.A,
    S: Phaser.Input.Keyboard.KeyCodes.S,
    D: Phaser.Input.Keyboard.KeyCodes.D,
    R: Phaser.Input.Keyboard.KeyCodes.R,
    P: Phaser.Input.Keyboard.KeyCodes.P,
    ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER
  });

  ammoText = this.add.text(10, 10, `Ammo: ${ammo}/${MAX_AMMO}`, {
    fontSize: "18px",
    fill: "#ffffff"
  }).setDepth(1);

  healthText = this.add.text(10, 35, `HP: ${health}`, {
    fontSize: "18px",
    fill: "#ff6666"
  }).setDepth(1);

  pauseText = createPauseOverlay(this);
  ({ gameOverText, restartHintText } = createGameOverOverlay(this));

  this.input.on("pointerdown", (pointer) => {
    const now = this.time.now;

    if (isPaused || isGameOver) return;
    if (!canShoot(lastShotTime, now, SHOOT_COOLDOWN)) return;
    if (!canShootWithAmmo(ammo) || isReloading) return;

    lastShotTime = now;
    ammo = useAmmo(ammo);

    const velocity = getBulletVelocity(
      player.x, player.y, pointer.worldX, pointer.worldY, 10
    );

    const bullet = this.add.circle(player.x, player.y, 5, 0xffff00);
    bullet.vx = velocity.vx;
    bullet.vy = velocity.vy;

    bullets.push(bullet);
  });
}

// =======================
// Funkcja update
// =======================

function update() {
  // Przełączanie pauzy klawiszem P
  if (Phaser.Input.Keyboard.JustDown(keys.P)) {
    isPaused = togglePause(isPaused);
    pauseText.setVisible(isPaused);
  }

  // Restart po game over klawiszem ENTER
  if (isGameOver) {
    if (Phaser.Input.Keyboard.JustDown(keys.ENTER)) {
      this.scene.restart();
    }
    return;
  }

  // Blokada logiki podczas pauzy
  if (isPaused) return;

  handlePlayerMovement();
  handlePlayerRotation(this);        // przekazujemy this (scenę)
  updateBullets(this);               // przekazujemy this
  checkPlayerEnemyCollisions(this);  // przekazujemy this
  checkWaveProgress(this);
  handleReload(this);
}

// =======================
// Pomocnicze funkcje
// =======================

function handlePlayerMovement() {
  const speed = 4;
  let newX = player.x;
  let newY = player.y;

  if (keys.W.isDown) newY -= speed;
  if (keys.S.isDown) newY += speed;
  if (keys.A.isDown) newX -= speed;
  if (keys.D.isDown) newX += speed;

  const clamped = clampPlayerPosition(newX, newY, 800, 600);
  player.x = clamped.x;
  player.y = clamped.y;
}

function handlePlayerRotation(scene) {
  const pointer = scene.input.activePointer;
  const angle = getAngleToPointer(player.x, player.y, pointer.worldX, pointer.worldY);
  player.rotation = angle;
}

function updateBullets(scene) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;

    for (let j = enemies.length - 1; j >= 0; j--) {
      const bulletRect = bullet.getBounds();
      const enemyRect = enemies[j].getBounds();

      if (Phaser.Geom.Intersects.RectangleToRectangle(bulletRect, enemyRect)) {
        handleBulletHit(bullet, j, scene);
        break;
      }
    }
  }
}

function checkPlayerEnemyCollisions(scene) {
  const playerRect = player.getBounds();
  const now = scene.time.now;

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];

    const isColliding = Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemy.getBounds());

    if (isColliding && now - enemy.lastHitTime >= 800) {
      enemy.lastHitTime = now;

      health = takeDamage(health, enemy.damage);
      healthText.setText(`HP: ${health}`);
      console.log(`Trafienie! Zdrowie: ${health}`);

      if (!isAlive(health)) {
        isGameOver = true;
        gameOverText.setText(`GAME OVER\nPunkty: ${score}`);
        gameOverText.setVisible(true);
        restartHintText.setVisible(true);
      }
    }
  }
}

function checkWaveProgress(scene) {
  if (enemies.length === 0) {
    currentWave++;
    console.log("Fala", currentWave);
    spawnWave(scene);
  }
}

function handleReload(scene) {
  // Rozpocznij przeładowanie po wciśnięciu R
  if (Phaser.Input.Keyboard.JustDown(keys.R) && !isReloading && ammo < MAX_AMMO) {
    isReloading = true;
    reloadStartTime = scene.time.now;
    console.log("Przeładowuję...");
  }

  // Zakończ przeładowanie po upływie RELOAD_TIME
  if (isReloading && scene.time.now - reloadStartTime >= RELOAD_TIME) {
    const result = finishReload(MAX_AMMO);
    ammo = result.ammo;
    isReloading = result.isReloading;
    console.log("Przeładowano! Ammo:", ammo);
  }

  // Aktualizuj tekst UI
  if (isReloading) {
    ammoText.setText("Reloading...");
  } else {
    ammoText.setText(`Ammo: ${ammo}/${MAX_AMMO}`);
  }
}