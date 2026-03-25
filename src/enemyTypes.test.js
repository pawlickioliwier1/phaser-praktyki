import { getEnemyStats } from "./enemyTypes"
// importujemy funkcję getEnemyStats, która zwraca statystyki przeciwnika na podstawie typu

import { describe, it, expect } from "vitest"
// importujemy funkcje testowe z Vitest:
// describe – grupa testów
// it – pojedynczy test
// expect – asercje (sprawdzanie wyników)

describe("enemy types", () => {
  // grupa testów dotyczących typów przeciwników

  it("fast jest szybki", () => {
    // test sprawdzający czy przeciwnik typu "fast" ma dużą prędkość

    const s = getEnemyStats("fast")
    // pobieramy statystyki dla typu "fast"

    expect(s.speed).toBeGreaterThan(100)
    // sprawdzamy czy prędkość jest większa niż 100
  })
})