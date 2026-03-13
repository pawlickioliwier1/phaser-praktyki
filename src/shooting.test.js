import { describe, it, expect } from "vitest"
// importujemy narzędzia z biblioteki Vitest do pisania testów
// describe → tworzy grupę testów
// it → pojedynczy test
// expect → sprawdza czy wynik jest taki jak oczekujemy

import { canShoot } from "./shooting"
// importujemy funkcję canShoot którą chcemy testować
// funkcja sprawdza czy gracz może już oddać kolejny strzał


describe("canShoot", () => {
// tworzymy grupę testów dla funkcji canShoot


  it("pozwala strzelić po cooldownie", () => {
  // test sprawdza sytuację gdy minął już wymagany czas między strzałami

    expect(canShoot(0, 1000, 500)).toBe(true)
    // wywołujemy funkcję canShoot
    // jeśli minął wystarczający czas od ostatniego strzału
    // funkcja powinna zwrócić true (czyli można strzelać)
  })


  it("nie pozwala strzelić gdy cooldown jeszcze trwa", () => {
  // test sprawdza sytuację gdy gracz próbuje strzelić za szybko

    expect(canShoot(800, 1000, 500)).toBe(false)
    // funkcja powinna zwrócić false
    // oznacza to że cooldown jeszcze się nie skończył
  })


  it("pozwala strzelić dokładnie na granicy cooldownu", () => {
  // test sprawdza moment gdy cooldown właśnie się kończy

    expect(canShoot(500, 1000, 500)).toBe(true)
    // jeśli czas między strzałami jest dokładnie równy cooldownowi
    // funkcja nadal powinna pozwolić na strzał
  })


  it("pozwala strzelić gdy minęło dużo więcej czasu niż cooldown", () => {
  // test sprawdza sytuację gdy od ostatniego strzału minęło dużo czasu

    expect(canShoot(0, 5000, 500)).toBe(true)
    // funkcja powinna pozwolić strzelać
    // bo cooldown dawno już minął
  })

})