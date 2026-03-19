// src/counter.test.js
import { describe, it, expect, vi } from "vitest"
import { setupCounter } from "./counter"

describe("setupCounter", () => {
  it("ustawia initialną wartość i zwiększa po kliknięciu", () => {
    const element = { innerHTML: "" }
    element.addEventListener = vi.fn((_, handler) => {
      // zapamiętujemy handler, żeby móc go wywołać ręcznie:
      element._handler = handler
    })

    setupCounter(element)

    expect(element.innerHTML).toBe("count is 0")

    // symulujemy kliknięcie:
    element._handler()

    expect(element.innerHTML).toBe("count is 1")
  })
})