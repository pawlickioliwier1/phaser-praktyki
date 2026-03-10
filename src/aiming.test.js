import { describe, it, expect } from "vitest"
import { getAngleToPointer } from "./aiming"

describe("getAngleToPointer", () => {

  it("zwraca kąt 0 gdy kursor jest po prawej stronie", () => {
    const angle = getAngleToPointer(100, 100, 200, 100)
    expect(angle).toBe(0)
  })

  it("zwraca kąt Math.PI gdy kursor jest po lewej stronie", () => {
    const angle = getAngleToPointer(100, 100, 0, 100)
    expect(angle).toBeCloseTo(Math.PI)
  })

  it("zwraca kąt -Math.PI / 2 gdy kursor jest nad graczem", () => {
    const angle = getAngleToPointer(100, 100, 100, 0)
    expect(angle).toBeCloseTo(-Math.PI / 2)
  })

  it("zwraca kąt Math.PI / 2 gdy kursor jest pod graczem", () => {
    const angle = getAngleToPointer(100, 100, 100, 200)
    expect(angle).toBeCloseTo(Math.PI / 2)
  })

})