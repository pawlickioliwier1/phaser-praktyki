import { describe, it, expect } from "vitest"
import { getBulletVelocity } from "./bulletPhysics"

describe("getBulletVelocity", () => {

  it("pocisk leci w prawo", () => {
    const v = getBulletVelocity(0, 0, 100, 0, 10)

    expect(v.vx).toBeGreaterThan(0)
    expect(v.vy).toBe(0)
  })

  it("pocisk leci w lewo", () => {
    const v = getBulletVelocity(0, 0, -100, 0, 10)

    expect(v.vx).toBeLessThan(0)
    expect(v.vy).toBe(0)
  })

  it("pocisk leci do góry", () => {
    const v = getBulletVelocity(0, 0, 0, -100, 10)

    expect(v.vx).toBeCloseTo(0)
    expect(v.vy).toBeLessThan(0)
  })

  it("pocisk leci w dół", () => {
    const v = getBulletVelocity(0, 0, 0, 100, 10)

    expect(v.vx).toBeCloseTo(0)
    expect(v.vy).toBeGreaterThan(0)
  })

  it("długość prędkości jest równa speed", () => {
    const speed = 10
    const v = getBulletVelocity(0, 0, 100, 100, speed)

    const length = Math.sqrt(v.vx * v.vx + v.vy * v.vy)

    expect(length).toBeCloseTo(speed)
  })

})