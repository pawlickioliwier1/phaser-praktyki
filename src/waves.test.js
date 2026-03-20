import { describe, it, expect } from "vitest"
import { getEnemiesCountForWave, shouldStartNextWave } from "./waves"

// --------------------------------------------------
// TESTY LOGIKI FAL (WAVES)
// --------------------------------------------------
describe("waves", () => {

  // Testy funkcji getEnemiesCountForWave
  it("fala 1 ma 3 przeciwników", () => {
    // 2 + wave → fala 1 = 3 wrogów
    expect(getEnemiesCountForWave(1)).toBe(3)
  })

  it("fala 5 ma więcej przeciwników", () => {
    // fala 5 = 7 → sprawdzamy, że rośnie powyżej 5
    expect(getEnemiesCountForWave(5)).toBeGreaterThan(5)
  })

  // Testy funkcji shouldStartNextWave
  it("shouldStartNextWave: 0 przeciwników → true", () => {
    // gdy nie ma już żadnego wroga na mapie → pora na następną falę
    expect(shouldStartNextWave(0)).toBe(true)
  })

  it("shouldStartNextWave: 1 przeciwnik → false", () => {
    // jak jeszcze jest choć jeden wróg → nie przechodzimy do następnej fali
    expect(shouldStartNextWave(1)).toBe(false)
  })

})