import { describe, it, expect } from "vitest"
// importujemy narzędzia z Vitest do pisania testów
// describe → grupa testów
// it → pojedynczy test
// expect → sprawdza czy wynik jest poprawny

import { getRandomSpawn } from "./spawn"
// importujemy funkcję getRandomSpawn którą chcemy przetestować
// funkcja losuje pozycję spawn na mapie


describe("getRandomSpawn", () => {
// tworzymy grupę testów dla funkcji getRandomSpawn


  it("pozycja jest w granicach mapy", () => {
  // test sprawdza czy wylosowana pozycja znajduje się w granicach mapy

    const p = getRandomSpawn(800,600)
    // wywołujemy funkcję
    // 800 → szerokość mapy
    // 600 → wysokość mapy
    // wynik zapisujemy w zmiennej p (pozycja spawn)


    expect(p.x).toBeGreaterThanOrEqual(0)
    // sprawdzamy czy X nie jest mniejsze niż 0
    // czyli czy nie wychodzi poza lewą krawędź mapy

    expect(p.y).toBeGreaterThanOrEqual(0)
    // sprawdzamy czy Y nie jest mniejsze niż 0
    // czyli czy nie wychodzi poza górną krawędź mapy

    expect(p.x).toBeLessThanOrEqual(800)
    // sprawdzamy czy X nie przekracza szerokości mapy

    expect(p.y).toBeLessThanOrEqual(600)
    // sprawdzamy czy Y nie przekracza wysokości mapy

  })

})