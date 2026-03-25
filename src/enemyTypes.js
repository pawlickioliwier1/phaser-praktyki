export function getEnemyStats(type) {
  if (type === "fast") return { speed: 120, hp: 1, damage: 5 }
  // szybki przeciwnik – duża prędkość, mało HP, niskie obrażenia

  if (type === "tank") return { speed: 50, hp: 3, damage: 15 }
  // tank – wolny, dużo HP, duże obrażenia

  return { speed: 80, hp: 2, damage: 10 }
  // domyślny przeciwnik (normal) – średnie statystyki
}

export function chooseEnemyType(wave) {
  if (wave >= 5) return "tank"
  // od 5 fali pojawiają się tanki (trudniejsi przeciwnicy)

  if (wave >= 3) return "fast"
  // od 3 fali pojawiają się szybcy przeciwnicy

  return "normal"
  // początkowe fale – standardowi przeciwnicy
}