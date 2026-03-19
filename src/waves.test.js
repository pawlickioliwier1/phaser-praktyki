import { describe, it, expect } from "vitest"
import { getEnemiesCountForWave, shouldStartNextWave } from "./waves"

describe("waves", () => {
  it("fala 1 ma 3 przeciwników", () => {
    expect(getEnemiesCountForWave(1)).toBe(3)
  })

  it("fala 5 ma więcej przeciwników", () => {
    expect(getEnemiesCountForWave(5)).toBeGreaterThan(5)
  })

  it("shouldStartNextWave: 0 przeciwników → true", () => {
    expect(shouldStartNextWave(0)).toBe(true)
  })

  it("shouldStartNextWave: 1 przeciwnik → false", () => {
    expect(shouldStartNextWave(1)).toBe(false)
  })
})