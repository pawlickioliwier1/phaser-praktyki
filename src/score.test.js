import { describe, it, expect } from "vitest"
// importujemy funkcje z biblioteki Vitest do pisania testów

import { increaseScore } from "./score"
// importujemy funkcję increaseScore którą chcemy testować
// funkcja powinna zwiększyć wynik o 1


describe("increaseScore", () => {
// tworzymy grupę testów dla funkcji increaseScore


  it("zwiększa wynik o 1", () => {
  // test sprawdza czy funkcja zwiększa wynik gdy zaczynamy od 0

    expect(increaseScore(0)).toBe(1)
    // wywołujemy funkcję i sprawdzamy czy wynik to 1
  })


  it("zwiększa wynik z 5 do 6", () => {
  // test sprawdza czy funkcja poprawnie zwiększa wynik gdy score wynosi 5

    expect(increaseScore(5)).toBe(6)
    // funkcja powinna dodać 1 do aktualnego wyniku
  })


  it("zwiększa wynik ze 100 do 101", () => {
  // test sprawdza czy funkcja działa poprawnie dla większych liczb

    expect(increaseScore(100)).toBe(101)
    // wynik powinien być większy o 1
  })

})