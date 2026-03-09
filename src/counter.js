export function setupCounter(element) {
  let counter = 0 //- ta funkcja ustawia licznik na stronie. - licznik zaczyna od 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1)) //- kiedy klikniesz element zwiększa się o 1
  setCounter(0)
}
