import { describe, it, expect } from "vitest"
// importujemy narzędzia z Vitest
// describe → grupa testów
// it → pojedynczy test
// expect → sprawdza czy wynik jest poprawny

import { getBulletVelocity } from "./bulletPhysics"
// importujemy funkcję którą chcemy testować
// ta funkcja liczy prędkość pocisku (vx i vy)

describe("getBulletVelocity", () => {
// tworzymy grupę testów dla funkcji getBulletVelocity


  it("pocisk leci w prawo", () => {
  // test sprawdza czy pocisk poleci w prawo

    const v = getBulletVelocity(0, 0, 100, 0, 10)
    // wywołujemy funkcję
    // 0,0 → pozycja gracza
    // 100,0 → punkt w który celujemy (po prawej)
    // 10 → prędkość pocisku

    expect(v.vx).toBeGreaterThan(0)
    // sprawdzamy czy prędkość w osi X jest większa od 0
    // czyli pocisk leci w prawo

    expect(v.vy).toBe(0)
    // sprawdzamy czy prędkość w osi Y wynosi 0
    // czyli pocisk nie leci w górę ani w dół
  })


  it("pocisk leci w lewo", () => {
  // test sprawdza czy pocisk poleci w lewo

    const v = getBulletVelocity(0, 0, -100, 0, 10)
    // gracz jest w (0,0)
    // cel jest w (-100,0) czyli po lewej

    expect(v.vx).toBeLessThan(0)
    // sprawdzamy czy prędkość X jest mniejsza od 0
    // czyli ruch w lewo

    expect(v.vy).toBe(0)
    // prędkość w osi Y powinna być 0
  })


  it("pocisk leci do góry", () => {
  // test sprawdza czy pocisk poleci do góry

    const v = getBulletVelocity(0, 0, 0, -100, 10)
    // gracz (0,0)
    // cel (0,-100) czyli nad graczem

    expect(v.vx).toBeCloseTo(0)
    // prędkość X powinna być bliska 0

    expect(v.vy).toBeLessThan(0)
    // prędkość Y powinna być mniejsza od 0
    // w grach 2D minus Y oznacza ruch w górę
  })


  it("pocisk leci w dół", () => {
  // test sprawdza czy pocisk poleci w dół

    const v = getBulletVelocity(0, 0, 0, 100, 10)
    // gracz (0,0)
    // cel (0,100) czyli pod graczem

    expect(v.vx).toBeCloseTo(0)
    // prędkość X bliska 0

    expect(v.vy).toBeGreaterThan(0)
    // prędkość Y większa od 0
    // w grach dodatnie Y oznacza ruch w dół
  })


  it("długość prędkości jest równa speed", () => {
  // ten test sprawdza czy prędkość pocisku jest taka jak ustawiliśmy

    const speed = 10
    // ustawiamy prędkość pocisku

    const v = getBulletVelocity(0, 0, 100, 100, speed)
    // liczymy prędkość pocisku w kierunku punktu (100,100)


    const length = Math.sqrt(v.vx * v.vx + v.vy * v.vy)
    // liczymy długość wektora prędkości
    // to jest długość wektora


    expect(length).toBeCloseTo(speed)
    // sprawdzamy czy długość wektora jest równa speed
    // czyli czy pocisk ma dokładnie taką prędkość jak ustawiliśmy
  })

})