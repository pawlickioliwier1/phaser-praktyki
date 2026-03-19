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
    const enemy = scene.add.rectangle(spawn.x, spawn.y, 40, 40, 0xff0000);
    targets.push(enemy);
    isTouchingTargets.push(false);
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
      // jeśli NIE minął to funkcja zwróci false
      return;
      // kończymy funkcję i nie strzelamy
    }

    lastShotTime = now;
    // zapisujemy moment strzału jako ostatni strzał

    const speed = 10;
    // prędkość pocisku

    const v = getBulletVelocity(
      player.x, player.y, pointer.worldX, pointer.worldY, speed
    );
    // obliczamy prędkość pocisku w osi X i Y

    const bullet = this.add.circle(player.x, player.y, 5, 0xffff00);
    // tworzymy pocisk
    // zaczyna w miejscu gracza
    // promień 5
    // kolor żółty

    bullet.vx = v.vx;
    // zapisujemy prędkość w osi X

    bullet.vy = v.vy;
    // zapisujemy prędkość w osi Y

    bullets.push(bullet);
    // dodajemy pocisk do tablicy pocisków
  });
}


// =======================
// Funkcja obsługująca trafienie pocisku w przeciwnika
// =======================
function handleBulletHitTarget(bullet, enemyIndex, scene) {
  // funkcja usuwa pocisk, zwiększa punkty i losuje nowego przeciwnika

  bullet.destroy();
  // usuwamy pocisk z gry

  const index = bullets.indexOf(bullet);
  if (index > -1) bullets.splice(index, 1);
  // usuwamy pocisk z tablicy bullets

  score = increaseScore(score);
  // używamy funkcji increaseScore z pliku score.js
  console.log("Punkty:", score);
  // wyświetlamy wynik w konsoli

  // usuwamy trafionego przeciwnika z tablicy
  targets[enemyIndex].destroy();
  targets.splice(enemyIndex, 1);
  isTouchingTargets.splice(enemyIndex, 1); // usuń flagę dla tego przeciwnika

  // nowy przeciwnik zostanie dodany przy przejściu fali
}


// =======================
// Funkcja update
// =======================

function update() {
  const speed = 4;
  // prędkość ruchu gracza

  let newX = player.x;
  let newY = player.y;
  // zapisujemy aktualną pozycję gracza

  if (keys.W.isDown) newY -= speed;
  if (keys.S.isDown) newY += speed;
  if (keys.A.isDown) newX -= speed;
  if (keys.D.isDown) newX += speed;
  // obsługa ruchu klawiszami W A S D

  const pos = clampPlayerPosition(newX, newY, 800, 600);
  // sprawdzamy czy gracz nie wychodzi poza ekran

  player.x = pos.x;
  player.y = pos.y;
  // ustawiamy nową pozycję gracza

  const pointer = this.input.activePointer;
  // pobieramy aktualną pozycję kursora myszy

  const angle = getAngleToPointer(player.x, player.y, pointer.worldX, pointer.worldY);
  // obliczamy kąt gracza w stronę kursora

  player.rotation = angle;
  // obracamy gracza w stronę kursora

  // =======================
  // Ruch pocisków i kolizja z przeciwnikami
  // =======================

  for (const bullet of bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    // przesuwamy pocisk ręcznie po ekranie

    // sprawdzamy kolizję pocisku z każdym przeciwnikiem
    for (let enemyIndex = 0; enemyIndex < targets.length; enemyIndex++) {
      const enemy = targets[enemyIndex];
      const bulletRect = bullet.getBounds();
      const enemyRect = enemy.getBounds();
      if (Phaser.Geom.Intersects.RectangleToRectangle(bulletRect, enemyRect)) {
        handleBulletHitTarget(bullet, enemyIndex, this);
        break; // kończymy pętlę po trafieniu jednego przeciwnika
      }
    }
  }

  // =======================
  // Kolizja GRACZ vs PRZECIWNIKÓW
  // =======================

  const playerRect = player.getBounds();
  // pobieramy prostokąt granic gracza

  // sprawdzamy kolizję z każdym przeciwnikiem
  for (let enemyIndex = 0; enemyIndex < targets.length; enemyIndex++) {
    const enemy = targets[enemyIndex];
    const enemyRect = enemy.getBounds();

    const isCollidingNow = Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect);
    // sprawdzamy czy jest aktualnie kolizja z tym przeciwnikiem

    if (isCollidingNow && !isTouchingTargets[enemyIndex]) {
      // jeśli jest kolizja z tym przeciwnikiem, a wcześniej nie było → zadajemy obrażenia

      isTouchingTargets[enemyIndex] = true;
      // ustawiamy flagę dla tego przeciwnika

      health = takeDamage(health, 1);
      // używamy funkcji z playerHealth.js

      console.log(`Trafienie! Zdrowie: ${health}`);

      if (!isAlive(health)) {
        console.log("GAME OVER");
      }
      // break; // opcjonalnie, jeśli chcesz obrażenia tylko od jednego na raz
    } else if (!isCollidingNow) {
      // jeśli nie ma kolizji z tym przeciwnikiem → resetujemy jego flagę
      isTouchingTargets[enemyIndex] = false;
    }
  }

  // =======================
  // Przejście do następnej fali
  // =======================
  if (targets.length === 0) {
    currentWave++;
    console.log("Fala", currentWave);
    spawnWave(currentWave * 2, this); // np. 2x więcej przeciwników na falę
  }
}