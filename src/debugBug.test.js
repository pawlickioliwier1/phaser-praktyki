import { describe, it, expect } from "vitest"
// importujemy potrzebne narzędzia do pisania testów

import { movePlayer } from "./debugBug"
// importujemy funkcję, którą testujemy

// Grupa wszystkich testów dotyczących funkcji movePlayer
describe("movePlayer", () => {

  // Test sprawdzający poprawne działanie przy normalnej prędkości
  it("przesuwa gracza poprawnie, gdy speed jest liczbą", () => {
    const player = { x: 0, y: 0 }        // tworzymy gracza na pozycji startowej

    const result = movePlayer(player, 5) // wywołujemy funkcję z prędkością 5

    expect(result).toEqual({ x: 5, y: 5 }) // sprawdzamy czy gracz przesunął się o 5 w obie osie
  })

  // Test sprawdzający naprawę błędu z undefined
  it("nie psuje pozycji gracza gdy speed jest undefined", () => {
    const player = { x: 0, y: 0 }                 // tworzymy nowego gracza

    const result = movePlayer(player, undefined)  // celowo przekazujemy undefined (to był bug)

    // Po naprawie funkcja powinna potraktować undefined jako 0
    // Gracz nie powinien się ruszyć i nie powinien dostać NaN
    expect(result).toEqual({ x: 0, y: 0 })
  })

})