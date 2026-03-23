import Phaser from "phaser";
// importujemy bibliotekę Phaser – to silnik do robienia gier w JavaScript

import { clampPlayerPosition } from "./playerBounds";
// importujemy funkcję, która pilnuje żeby gracz nie wyszedł poza ekran

import { getAngleToPointer } from "./aiming";
// importujemy funkcję liczącą kąt między graczem a kursorem myszy

import { getBulletVelocity } from "./bulletPhysics";
// importujemy funkcję która oblicza prędkość pocisku (vx i vy)

import { canShoot } from "./shooting"; 
// funkcja sprawdzająca czy minął cooldown i czy można strzelić

import { getRandomSpawn } from "./spawn";
// importujemy funkcję, która losuje pozycję na mapie

import { increaseScore } from "./score";
// importujemy funkcję increaseScore z pliku score.js

import { takeDamage, isAlive } from "./playerHealth";
// importujemy funkcje do obsługi zdrowia gracza (obrażenia i sprawdzanie czy żyje)

import { getEnemyStats, chooseEnemyType } from "./enemyTypes";
// importujemy typy przeciwników i wybór typu

// =======================
// Zmienne globalne
// =======================

let player; 
// zmienna na obiekt gracza (nasz prostokąt)

let keys;   
// zmienna na klawisze sterowania (W A S D)

let bullets = []; 
// tablica (lista) w której będziemy przechowywać wszystkie pociski

let targets = [];
// tablica przeciwników (zamiast jednego target)

const SHOOT_COOLDOWN = 300; 
// czas między strzałami w milisekundach (300ms = 0.3 sekundy)

let lastShotTime = 0; 
// zapamiętujemy kiedy był ostatni strzał (na początku 0)

let score = 0;
// zmienna do przechowywania punktów gracza

let health = 3;
// aktualne zdrowie gracza

let currentWave = 1;
// aktualna fala przeciwników

let isTouchingTargets = [];
// tablica flag: czy gracz aktualnie dotyka danego przeciwnika (żeby nie dostawać obrażeń co klatkę od każdego)

// =======================
// Konfiguracja gry
// =======================

const config = {
  type: Phaser.AUTO,
  // Phaser sam wybierze czy użyć WebGL czy Canvas

  width: 800,
  // szerokość okna gry w pikselach

  height: 600,
  // wysokość okna gry

  backgroundColor: "#222222",
  // kolor tła gry (ciemnoszary)

  scene: { create: create, update: update }
  // ustawiamy funkcje create i update dla sceny
};

new Phaser.Game(config);
// tworzymy nową grę Phaser z powyższą konfiguracją


// =======================
// Funkcja pomocna do spawnowania fali przeciwników
// =======================
function spawnWave(numEnemies, scene) {
  for (let i = 0; i < numEnemies; i++) {
    const spawn = getRandomSpawn(800, 600);
    // losujemy spawn przeciwnika

    const type = chooseEnemyType(currentWave);
    // wybieramy typ przeciwnika na podstawie fali

    const stats = getEnemyStats(type);
    // pobieramy statystyki przeciwnika

    let color = 0xff0000;
    // domyślny kolor (normal)

    if (type === "fast") color = 0x00ffff;
    // szybki = niebieski

    if (type === "tank") color = 0x888888;
    // tank = szary

    const enemy = scene.add.rectangle(spawn.x, spawn.y, 40, 40, color);
    // tworzymy przeciwnika z odpowiednim kolorem

    enemy.speed = stats.speed;
    // przypisujemy prędkość

    enemy.hp = stats.hp;
    // przypisujemy hp

    enemy.damage = stats.damage;
    // przypisujemy obrażenia

    targets.push(enemy);
    // dodajemy przeciwnika do tablicy

    isTouchingTargets.push(false);
    // flaga kolizji dla tego przeciwnika
  }
}


// =======================
// Funkcja create
// =======================

function create() {
  player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
  // tworzymy zielony prostokąt
  // 400,300 = środek ekranu
  // 50,50 = szerokość i wysokość
  // 0x00ff00 = kolor zielony

  // spawnuje pierwszą falę przeciwników
  spawnWave(5, this);

  keys = this.input.keyboard.addKeys({
    // rejestrujemy klawisze z klawiatury

    W: Phaser.Input.Keyboard.KeyCodes.W,
    // klawisz W

    A: Phaser.Input.Keyboard.KeyCodes.A,
    // klawisz A

    S: Phaser.Input.Keyboard.KeyCodes.S,
    // klawisz S

    D: Phaser.Input.Keyboard.KeyCodes.D
    // klawisz D
  });

  // =======================
  // Strzelanie myszą
  // =======================

  this.input.on("pointerdown", (pointer) => {
    // pointerdown = kliknięcie myszy

    const now = this.time.now;
    // aktualny czas w grze (Phaser liczy czas w ms)

    if (!canShoot(lastShotTime, now, SHOOT_COOLDOWN)) {
      // sprawdzamy czy minął cooldown
      return;
      // kończymy funkcję i nie strzelamy
    }

    lastShotTime = now;
    // zapisujemy moment strzału

    const speed = 10;
    // prędkość pocisku

    const v = getBulletVelocity(
      player.x, player.y, pointer.worldX, pointer.worldY, speed
    );
    // obliczamy prędkość pocisku

    const bullet = this.add.circle(player.x, player.y, 5, 0xffff00);
    // tworzymy pocisk

    bullet.vx = v.vx;
    bullet.vy = v.vy;

    bullets.push(bullet);
    // dodajemy pocisk do tablicy
  });
}


// =======================
// Funkcja obsługująca trafienie pocisku w przeciwnika
// =======================
function handleBulletHitTarget(bullet, enemyIndex, scene) {
  bullet.destroy();

  const index = bullets.indexOf(bullet);
  if (index > -1) bullets.splice(index, 1);

  const enemy = targets[enemyIndex];

  enemy.hp--;
  // odejmujemy hp przeciwnikowi

  if (enemy.hp <= 0) {
    // jeśli przeciwnik nie żyje

    score = increaseScore(score);
    console.log("Punkty:", score);

    enemy.destroy();
    targets.splice(enemyIndex, 1);
    isTouchingTargets.splice(enemyIndex, 1);
  }
}


// =======================
// Funkcja update
// =======================

function update() {
  const speed = 4;

  let newX = player.x;
  let newY = player.y;

  if (keys.W.isDown) newY -= speed;
  if (keys.S.isDown) newY += speed;
  if (keys.A.isDown) newX -= speed;
  if (keys.D.isDown) newX += speed;

  const pos = clampPlayerPosition(newX, newY, 800, 600);

  player.x = pos.x;
  player.y = pos.y;

  const pointer = this.input.activePointer;

  const angle = getAngleToPointer(player.x, player.y, pointer.worldX, pointer.worldY);

  player.rotation = angle;

  // =======================
  // Ruch pocisków i kolizja z przeciwnikami
  // =======================

  for (const bullet of bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;

    for (let enemyIndex = 0; enemyIndex < targets.length; enemyIndex++) {
      const enemy = targets[enemyIndex];
      const bulletRect = bullet.getBounds();
      const enemyRect = enemy.getBounds();

      if (Phaser.Geom.Intersects.RectangleToRectangle(bulletRect, enemyRect)) {
        handleBulletHitTarget(bullet, enemyIndex, this);
        break;
      }
    }
  }

  // =======================
  // Kolizja GRACZ vs PRZECIWNIKÓW
  // =======================

  const playerRect = player.getBounds();

  for (let enemyIndex = 0; enemyIndex < targets.length; enemyIndex++) {
    const enemy = targets[enemyIndex];
    const enemyRect = enemy.getBounds();

    const isCollidingNow = Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect);

    if (isCollidingNow && !isTouchingTargets[enemyIndex]) {
      isTouchingTargets[enemyIndex] = true;

      health = takeDamage(health, enemy.damage);
      // używamy damage przeciwnika

      console.log(`Trafienie! Zdrowie: ${health}`);

      if (!isAlive(health)) {
        console.log("GAME OVER");
      }
    } else if (!isCollidingNow) {
      isTouchingTargets[enemyIndex] = false;
    }
  }

  // =======================
  // Przejście do następnej fali
  // =======================
  if (targets.length === 0) {
    currentWave++;
    console.log("Fala", currentWave);
    spawnWave(currentWave * 2, this);
  }
}