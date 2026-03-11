import { describe, it, expect } from "vitest"
import { canShoot } from "./shooting"

describe("canShoot", () => {

  it("pozwala strzelić po cooldownie", () => {
    expect(canShoot(0, 1000, 500)).toBe(true)
  })

  it("nie pozwala strzelić gdy cooldown jeszcze trwa", () => {
    expect(canShoot(800, 1000, 500)).toBe(false)
  })

  it("pozwala strzelić dokładnie na granicy cooldownu", () => {
    expect(canShoot(500, 1000, 500)).toBe(true)
  })

  it("pozwala strzelić gdy minęło dużo więcej czasu niż cooldown", () => {
    expect(canShoot(0, 5000, 500)).toBe(true)
  })

})