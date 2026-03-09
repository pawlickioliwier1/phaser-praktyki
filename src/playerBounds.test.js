import { describe, it, expect } from 'vitest'
import { clampPlayerPosition } from './playerBounds'

describe('clampPlayerPosition', () => {

  it('ustawia x na 0, gdy gracz wychodzi poza lewą krawędź', () => {
    const result = clampPlayerPosition(-10, 50, 800, 600)
    expect(result).toEqual({ x: 0, y: 50 })
  })

  it('ustawia y na 0, gdy gracz wychodzi poza górną krawędź', () => {
    const result = clampPlayerPosition(100, -30, 800, 600)
    expect(result).toEqual({ x: 100, y: 0 })
  })

  it('ustawia x na sceneWidth, gdy gracz wychodzi poza prawą krawędź', () => {
    const result = clampPlayerPosition(900, 200, 800, 600)
    expect(result).toEqual({ x: 800, y: 200 })
  })

  it('ustawia y na sceneHeight, gdy gracz wychodzi poza dolną krawędź', () => {
    const result = clampPlayerPosition(400, 700, 800, 600)
    expect(result).toEqual({ x: 400, y: 600 })
  })

  it('nie zmienia pozycji, gdy gracz jest w środku planszy', () => {
    const result = clampPlayerPosition(300, 250, 800, 600)
    expect(result).toEqual({ x: 300, y: 250 })
  })

})
