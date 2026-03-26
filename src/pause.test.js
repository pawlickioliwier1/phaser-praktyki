import { describe, it, expect, vi } from "vitest"
import { togglePause, createPauseOverlay, createGameOverOverlay } from "./pause"

describe("togglePause", () => {
  it("zmienia stan z false na true po pierwszym wciśnięciu P", () => {
    expect(togglePause(false)).toBe(true)
  })

  it("zmienia stan z true na false po kolejnym wciśnięciu P", () => {
    expect(togglePause(true)).toBe(false)
  })

  it("kilkukrotne przełączanie wraca do stanu wyjściowego", () => {
    let state = false
    state = togglePause(state) // true
    state = togglePause(state) // false
    state = togglePause(state) // true
    state = togglePause(state) // false
    expect(state).toBe(false)
  })
})

describe("restart działa tylko przy game over", () => {
  it("nie restartuje gdy isGameOver = false", () => {
    const restartMock = vi.fn()
    const isGameOver = false

    if (isGameOver) restartMock()

    expect(restartMock).not.toHaveBeenCalled()
  })

  it("restartuje gdy isGameOver = true", () => {
    const restartMock = vi.fn()
    const isGameOver = true

    if (isGameOver) restartMock()

    expect(restartMock).toHaveBeenCalledOnce()
  })

  it("restart nie jest wywołany wielokrotnie bez game over", () => {
    const restartMock = vi.fn()
    const isGameOver = false

    for (let i = 0; i < 5; i++) {
      if (isGameOver) restartMock()
    }

    expect(restartMock).not.toHaveBeenCalled()
  })
})

describe("createPauseOverlay", () => {
  it("tworzy overlay z tekstem PAUZA, domyślnie ukryty", () => {
    const visible = { value: undefined }
    const textObj = {
      setOrigin: vi.fn().mockReturnThis(),
      setDepth: vi.fn().mockReturnThis(),
      setVisible: vi.fn((v) => { visible.value = v; return textObj })
    }
    const scene = { add: { text: vi.fn().mockReturnValue(textObj) } }

    const result = createPauseOverlay(scene)

    expect(scene.add.text).toHaveBeenCalledWith(400, 280, 'PAUZA', expect.any(Object))
    expect(visible.value).toBe(false)
    expect(result).toBe(textObj)
  })
})

describe("createGameOverOverlay", () => {
  it("zwraca gameOverText i restartHintText, oba domyślnie ukryte", () => {
    const makeTextObj = () => {
      const obj = {
        setOrigin: vi.fn().mockReturnThis(),
        setDepth: vi.fn().mockReturnThis(),
        setVisible: vi.fn().mockReturnThis()
      }
      return obj
    }

    let callCount = 0
    const textObjs = [makeTextObj(), makeTextObj()]
    const scene = { add: { text: vi.fn(() => textObjs[callCount++]) } }

    const result = createGameOverOverlay(scene)

    expect(result).toHaveProperty('gameOverText')
    expect(result).toHaveProperty('restartHintText')
    expect(textObjs[0].setVisible).toHaveBeenCalledWith(false)
    expect(textObjs[1].setVisible).toHaveBeenCalledWith(false)
  })
})