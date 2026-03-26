import { describe, it, expect } from "vitest"
// importujemy narzędzia testowe z Vitest

import { canShootWithAmmo, useAmmo, finishReload, MAX_AMMO } from "./reload"
// importujemy funkcje z pliku reload.js


describe("reload mechanics", () => {
  // grupa testów dla mechaniki ammo i przeładowania

  it("gdy ammo > 0, można strzelać", () => {
    // jeśli gracz ma naboje, strzał powinien być dozwolony
    expect(canShootWithAmmo(5)).toBe(true)
  })

  it("gdy ammo = 0, nie można strzelać", () => {
    // pusty magazynek blokuje strzał
    expect(canShootWithAmmo(0)).toBe(false)
  })

  it("strzał zmniejsza ammo o 1", () => {
    // każdy strzał zużywa dokładnie jeden nabój
    expect(useAmmo(5)).toBe(4)
  })

  it("reload ustawia ammo na max", () => {
    // po przeładowaniu ammo wraca do wartości maksymalnej
    const result = finishReload(MAX_AMMO)

    expect(result.ammo).toBe(MAX_AMMO)
    expect(result.isReloading).toBe(false)
  })
})
