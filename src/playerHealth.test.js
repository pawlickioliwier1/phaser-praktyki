import { describe, it, expect } from "vitest"
import { takeDamage, isAlive } from "./playerHealth"

// Grupa testów sprawdzająca poprawność funkcji związanych ze zdrowiem gracza
describe("player health", () => {

  // Testy funkcji takeDamage (parametryzowane)
  describe("takeDamage – poprawne obliczenia", () => {
    it.each([
      [10, 1, 9],      // 10 życia - 1 obrażenia = 9
      [5, 2, 3],       // 5 życia - 2 obrażenia = 3
      [1, 1, 0],       // 1 życie - 1 obrażenie = 0
      [10, 0, 10],     // brak obrażeń = brak zmian
      [20, 25, 0],     // duże obrażenia → zdrowie spada do 0, nie niżej
    ])("powinno odliczyć damage: %d hp - %d damage → %d", (hp, damage, expected) => {
      expect(takeDamage(hp, damage)).toBe(expected)
    })
  })

  // Testy walidacji wejścia w takeDamage
  describe("takeDamage – walidacja wejścia", () => {
    it("rzuca błąd gdy health nie jest liczbą", () => {
      expect(() => takeDamage("10", 1)).toThrow("health and damage must be numbers")
    })

    it("rzuca błąd gdy damage nie jest liczbą", () => {
      expect(() => takeDamage(10, "5")).toThrow("health and damage must be numbers")
    })

    it("rzuca błąd gdy health jest ujemne", () => {
      expect(() => takeDamage(-3, 1)).toThrow("health cannot be negative")
    })

    it("rzuca błąd gdy damage jest ujemne", () => {
      expect(() => takeDamage(10, -1)).toThrow("damage cannot be negative")
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

  // Test walidacji wejścia w isAlive
  describe("isAlive – walidacja wejścia", () => {
    it("rzuca błąd gdy health nie jest liczbą", () => {
      expect(() => isAlive("5")).toThrow("health must be a number")
    })

    it("rzuca błąd gdy health jest undefined", () => {
      expect(() => isAlive(undefined)).toThrow("health must be a number")
    })
  })

})