import Phaser from "phaser"; // Importujemy główną bibliotekę Phaser
// Zmienne globalne – będą widoczne w funkcjach create i update
let player; // Obiekt reprezentujący gracza (prostokąt)
let keys; // Obiekt przechowujący stan klawiszy WASD

function clampPlayerPosition(x, y, sceneWidth, sceneHeight) { // Funkcja pomocnicza – ogranicza pozycję gracza do granic ekranu
  x = Math.max(0, Math.min(x, sceneWidth)); // Nie pozwalamy wyjść poza lewą i prawą krawędź
  y = Math.max(0, Math.min(y, sceneHeight)); // Nie pozwalamy wyjść poza górną i dolną krawędź
  return { x, y }; // Zwracamy poprawione współrzędne
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600, //szerokosc oraz dlugosc okna 
  backgroundColor: "#222222", // Kolor tła
  scene: {
    create: create,
    update: update
  }
};

new Phaser.Game(config);

function create() { // Funkcja wywoływana raz – na początku gry (inicjalizacja)

  player = this.add.rectangle(400, 300, 50, 50, 0x00ff00); // Tworzymy zielony prostokąt – to będzie nasz gracz

  keys = this.input.keyboard.addKeys({
    W: Phaser.Input.Keyboard.KeyCodes.W,
    A: Phaser.Input.Keyboard.KeyCodes.A,
    S: Phaser.Input.Keyboard.KeyCodes.S,
    D: Phaser.Input.Keyboard.KeyCodes.D
  });

}

function update() {

  const speed = 4; // Prędkość poruszania się gracza

  let newX = player.x;
  let newY = player.y;

  if (keys.W.isDown) newY -= speed;
  if (keys.S.isDown) newY += speed;
  if (keys.A.isDown) newX -= speed;
  if (keys.D.isDown) newX += speed;

  const pos = clampPlayerPosition(newX, newY, 800, 600); // Ograniczamy nowe położenie do granic ekranu (800×600)

  player.x = pos.x;
  player.y = pos.y;
// Przypisujemy poprawione (bezpieczne) współrzędne do gracza
}