import { describe, it, expect } from "vitest"
import { takeDamage, isAlive } from "./playerHealth"

// Grupa testów sprawdzająca poprawność funkcji związanych ze zdrowiem gracza
describe("player health", () => {

  // Testy funkcji takeDamage (parametryzowane)
  describe("takeDamage", () => {
    it.each([
      [10, 1, 9],      // 10 życia - 1 obrażenia = 9
      [5, 2, 3],       // 5 życia - 2 obrażenia = 3
      [1, 1, 0],       // 1 życie - 1 obrażenie = 0
      [10, 0, 10],     // brak obrażeń = brak zmian
      [20, 25, -5],    // duże obrażenia mogą dać ujemną wartość
    ])("powinno odliczyć damage: %d hp - %d damage → %d", (hp, damage, expected) => {
      expect(takeDamage(hp, damage)).toBe(expected)
    })
  })

  // Testy funkcji isAlive (parametryzowane)
  describe("isAlive", () => {
    it.each([
      [10, true],      // dużo życia → żywy
      [1, true],       // minimalne życie → żywy
      [0, false],      // brak życia → martwy
      [-5, false],     // ujemne wartości → martwy
      [100, true],     // ogromna wartość → żywy
    ])("powinno zwrócić %s dla %d hp", (hp, expected) => {
      expect(isAlive(hp)).toBe(expected)
    })
  })

})