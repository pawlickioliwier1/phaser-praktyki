import { getEnemyStats } from "./enemyTypes"
import { describe, it, expect } from "vitest"

describe("enemy types", () => {
  it("fast jest szybki", () => {
    const s = getEnemyStats("fast")
    expect(s.speed).toBeGreaterThan(100)
  })
})