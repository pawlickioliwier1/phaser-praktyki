// debugBug.js
// Plik demonstracyjny pokazujący bug i jego naprawę

export function movePlayer(player, speed) {
  
  // === NAPRAWA BUGA ===
  // Przed naprawą: jeśli ktoś przekazał undefined jako speed,
  // to player.x + undefined dawało NaN i psuło pozycję gracza.
  // Teraz sprawdzamy, czy speed jest liczbą.
  if (typeof speed !== "number") {
    speed = 0;                    // jeśli speed jest undefined lub inny typ → traktujemy jako 0
  }

  // Przesuwamy gracza o podaną prędkość
  player.x = player.x + speed;
  player.y = player.y + speed;

  return player;
}

// Przykład użycia (demonstracja buga przed naprawą)
const player = { x: 0, y: 0 };

// Przed naprawą ta linijka psuła pozycję gracza (dawała NaN)
// Teraz funkcja działa poprawnie
movePlayer(player, undefined);