import Phaser from "phaser"; // Importujemy główną bibliotekę Phaser
import { clampPlayerPosition } from "./playerBounds";
import { getAngleToPointer } from "./aiming";

// =======================
// Zmienne globalne
// =======================

let player; // Obiekt reprezentujący gracza (prostokąt)
let keys;   // Obiekt przechowujący stan klawiszy WASD

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
  // Funkcja wywoływana raz – na początku gry (inicjalizacja)

  // Tworzymy zielony prostokąt – to będzie nasz gracz
  player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);

  // Rejestrujemy klawisze WASD
  keys = this.input.keyboard.addKeys({
    W: Phaser.Input.Keyboard.KeyCodes.W,
    A: Phaser.Input.Keyboard.KeyCodes.A,
    S: Phaser.Input.Keyboard.KeyCodes.S,
    D: Phaser.Input.Keyboard.KeyCodes.D
  });
}

// =======================
// Funkcja update
// =======================

function update() {
  const speed = 4; // Prędkość poruszania się gracza

  let newX = player.x;
  let newY = player.y;

  // Ruch gracza
  if (keys.W.isDown) newY -= speed;
  if (keys.S.isDown) newY += speed;
  if (keys.A.isDown) newX -= speed;
  if (keys.D.isDown) newX += speed;

  // Ograniczamy nowe położenie do granic ekranu (800×600)
  const pos = clampPlayerPosition(newX, newY, 800, 600);

  // Przypisujemy poprawione (bezpieczne) współrzędne do gracza
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
}