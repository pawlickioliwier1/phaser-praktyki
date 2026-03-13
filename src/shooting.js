export function canShoot(lastShotTime, currentTime, cooldown) {
// export → pozwala używać tej funkcji w innych plikach
// function canShoot → funkcja sprawdzająca czy gracz może już strzelić

// lastShotTime → czas kiedy był ostatni strzał
// currentTime → aktualny czas w grze
// cooldown → ile czasu musi minąć między strzałami

  return currentTime - lastShotTime >= cooldown
  // odejmujemy czas ostatniego strzału od aktualnego czasu

  // jeśli wynik jest większy lub równy cooldownowi
  // to znaczy że minęło już wystarczająco dużo czasu

  // >= oznacza "większe lub równe"

  // funkcja zwraca:
  // true → można strzelać
  // false → cooldown jeszcze trwa

}