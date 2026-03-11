import Phaser from "phaser"; // Importujemy główną bibliotekę Phaser
import { clampPlayerPosition } from "./playerBounds";
import { getAngleToPointer } from "./aiming";
import { getBulletVelocity } from "./bulletPhysics";
import { canShoot } from "./shooting"; // funkcja sprawdzająca cooldown strzału

// =======================
// Zmienne globalne
// =======================

let player; // Obiekt reprezentujący gracza (prostokąt)
let keys;   // Obiekt przechowujący stan klawiszy WASD
let bullets = []; // tablica przechowująca pociski

const SHOOT_COOLDOWN = 300; // czas między strzałami (ms)
let lastShotTime = 0; // czas ostatniego strzału

// =======================
// Konfiguracja gry
// =======================

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600, // szerokość oraz wysokość okna
  backgroundColor: "#222222", // Kolor tła

  scene: {
    create: create,
    update: update
  }
};

new Phaser.Game(config);

// =======================
// Funkcja create
// =======================

function create() {
  // Tworzymy zielony prostokąt – to będzie nasz gracz
  player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);

  // Rejestrujemy klawisze WASD
  keys = this.input.keyboard.addKeys({
    W: Phaser.Input.Keyboard.KeyCodes.W,
    A: Phaser.Input.Keyboard.KeyCodes.A,
    S: Phaser.Input.Keyboard.KeyCodes.S,
    D: Phaser.Input.Keyboard.KeyCodes.D
  });

  // =======================
  // Strzelanie myszą
  // =======================

  this.input.on("pointerdown", (pointer) => {

    const now = this.time.now; // aktualny czas w grze

    // sprawdzamy czy cooldown już minął
    if (!canShoot(lastShotTime, now, SHOOT_COOLDOWN)) {
      return; // jeśli nie minął, nie strzelamy
    }

    lastShotTime = now; // zapisujemy czas strzału

    const speed = 10; // prędkość pocisku

    // liczymy prędkość pocisku w stronę kursora
    const v = getBulletVelocity(
      player.x,
      player.y,
      pointer.worldX,
      pointer.worldY,
      speed
    );

    // tworzymy pocisk
    const bullet = this.add.circle(player.x, player.y, 5, 0xffff00);

    // zapisujemy prędkość pocisku
    bullet.vx = v.vx;
    bullet.vy = v.vy;

    bullets.push(bullet); // dodajemy pocisk do listy
  });
}

// =======================
// Funkcja update
// =======================

function update() {
  const speed = 4;

  let newX = player.x;
  let newY = player.y;

  // Ruch gracza
  if (keys.W.isDown) newY -= speed;
  if (keys.S.isDown) newY += speed;
  if (keys.A.isDown) newX -= speed;
  if (keys.D.isDown) newX += speed;

  // Ograniczamy nowe położenie do granic ekranu
  const pos = clampPlayerPosition(newX, newY, 800, 600);

  player.x = pos.x;
  player.y = pos.y;

  // =======================
  // Celowanie w kursor
  // =======================

  const pointer = this.input.activePointer;

  const angle = getAngleToPointer(
    player.x,
    player.y,
    pointer.worldX,
    pointer.worldY
  );

  player.rotation = angle;

  // =======================
  // Ruch pocisków
  // =======================

  for (const bullet of bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
  }
}