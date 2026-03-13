import { describe, it, expect } from "vitest"
// importujemy funkcje z Vitest (biblioteka do testów)
// describe → grupuje testy
// it → pojedynczy test
// expect → sprawdza czy wynik jest taki jak oczekujemy

import { getAngleToPointer } from "./aiming"
// importujemy funkcję którą chcemy testować
// ta funkcja liczy kąt między graczem a kursorem myszy


describe("getAngleToPointer", () => {
// describe tworzy grupę testów
// nazwa "getAngleToPointer" mówi czego dotyczą testy


  it("zwraca kąt 0 gdy kursor jest po prawej stronie", () => {
  // pierwszy test
  // sprawdzamy czy funkcja zwróci kąt 0
  // gdy kursor jest po prawej stronie gracza

    const angle = getAngleToPointer(100, 100, 200, 100)
    // wywołujemy funkcję
    // 100,100 → pozycja gracza
    // 200,100 → pozycja kursora (po prawej stronie)

    expect(angle).toBe(0)
    // sprawdzamy czy wynik angle jest dokładnie równy 0
  })


  it("zwraca kąt Math.PI gdy kursor jest po lewej stronie", () => {
  // drugi test
  // sprawdzamy czy kąt wynosi PI (180 stopni)
  // gdy kursor jest po lewej stronie gracza

    const angle = getAngleToPointer(100, 100, 0, 100)
    // gracz jest w (100,100)
    // kursor w (0,100) czyli po lewej

    expect(angle).toBeCloseTo(Math.PI)
    // sprawdzamy czy wynik jest bardzo blisko PI
    // używamy toBeCloseTo bo liczby zmiennoprzecinkowe mogą mieć małe różnice
  })


  it("zwraca kąt -Math.PI / 2 gdy kursor jest nad graczem", () => {
  // trzeci test
  // sprawdzamy czy kąt jest -90 stopni
  // gdy kursor jest nad graczem

    const angle = getAngleToPointer(100, 100, 100, 0)
    // gracz (100,100)
    // kursor (100,0) czyli nad nim

    expect(angle).toBeCloseTo(-Math.PI / 2)
    // sprawdzamy czy wynik jest bliski -PI/2
    // czyli -90 stopni
  })


  it("zwraca kąt Math.PI / 2 gdy kursor jest pod graczem", () => {
  // czwarty test
  // sprawdzamy czy kąt wynosi 90 stopni
  // gdy kursor jest pod graczem

    const angle = getAngleToPointer(100, 100, 100, 200)
    // gracz (100,100)
    // kursor (100,200) czyli pod nim

    expect(angle).toBeCloseTo(Math.PI / 2)
    // sprawdzamy czy wynik jest bliski PI/2
    // czyli 90 stopni
  })

})