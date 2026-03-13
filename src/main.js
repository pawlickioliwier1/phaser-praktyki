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


// =======================
// Zmienne globalne
// =======================

let player; 
// zmienna na obiekt gracza (nasz prostokąt)

let keys;   
// zmienna na klawisze sterowania (W A S D)

let bullets = []; 
// tablica (lista) w której będziemy przechowywać wszystkie pociski

let target; 
// nowy obiekt celu który pojawi się na planszy

const SHOOT_COOLDOWN = 300; 
// czas między strzałami w milisekundach (300ms = 0.3 sekundy)

let lastShotTime = 0; 
// zapamiętujemy kiedy był ostatni strzał (na początku 0)

let score = 0;
// zmienna do przechowywania punktów gracza


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
// Funkcja create
// =======================

function create() {
  player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
  // tworzymy zielony prostokąt
  // 400,300 = środek ekranu
  // 50,50 = szerokość i wysokość
  // 0x00ff00 = kolor zielony

  const spawn = getRandomSpawn(800, 600);
  // losujemy pozycję spawn na mapie
  // 800 = szerokość mapy, 600 = wysokość mapy

  target = this.add.rectangle(spawn.x, spawn.y, 40, 40, 0xff0000);
  // tworzymy czerwony kwadrat w losowej pozycji
  // target pojawia się w różnych miejscach przy starcie gry

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
// Funkcja obsługująca trafienie pocisku w target
// =======================
function handleBulletHitTarget(bullet, target) {
  // funkcja usuwa pocisk, zwiększa punkty i losuje nowy target

  bullet.destroy();
  // usuwamy pocisk z gry

  const index = bullets.indexOf(bullet);
  if (index > -1) bullets.splice(index, 1);
  // usuwamy pocisk z tablicy bullets

  score = increaseScore(score);
  // używamy funkcji increaseScore z pliku score.js
  console.log("Punkty:", score);
  // wyświetlamy wynik w konsoli

  const spawn = getRandomSpawn(800, 600);
  target.x = spawn.x;
  target.y = spawn.y;
  // losujemy nową pozycję targeta
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
  // Ruch pocisków i kolizja z targetem
  // =======================

  for (const bullet of bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    // przesuwamy pocisk ręcznie po ekranie

    // sprawdzamy kolizję pocisku z targetem
    const bulletRect = bullet.getBounds();
    const targetRect = target.getBounds();
    if (Phaser.Geom.Intersects.RectangleToRectangle(bulletRect, targetRect)) {
      handleBulletHitTarget(bullet, target);
    }
  }
}