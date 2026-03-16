import { describe, it, expect } from "vitest"
import { takeDamage, isAlive } from "./playerHealth"

describe("player health", () => {

  it("zmniejsza życie o damage", () => {
    expect(takeDamage(10, 1)).toBe(9)
  })

  it("5 hp - 2 damage → 3", () => {
    expect(takeDamage(5, 2)).toBe(3)
  })

  it("1 hp - 1 damage → 0", () => {
    expect(takeDamage(1, 1)).toBe(0)
  })

  it("10 hp → true", () => {
    expect(isAlive(10)).toBe(true)
  })

  it("1 hp → true", () => {
    expect(isAlive(1)).toBe(true)
  })

  it("0 hp → false", () => {
    expect(isAlive(0)).toBe(false)
  })

  it("-5 hp → false", () => {
    expect(isAlive(-5)).toBe(false)
  })

})