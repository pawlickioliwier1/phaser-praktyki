export function getEnemyStats(type) {
  if (type === "fast") return { speed: 130, hp: 1, damage: 1 }
  // szybki – duża prędkość, 1 HP, 1 obrażenie

  if (type === "tank") return { speed: 45, hp: 5, damage: 2 }
  // tank – wolny, 5 HP (wytrzymały), 2 obrażenia

  return { speed: 80, hp: 2, damage: 1 }
  // normal – średnia prędkość, 2 HP, 1 obrażenie
}

export function chooseEnemyType(wave) {
  // Losowy typ per-wróg z rosnącym prawdopodobieństwem trudnych typów
  const roll = Math.random();

  if (wave === 1) return "normal";
  // fala 1 – tylko normalni

  if (wave === 2) return roll < 0.7 ? "normal" : "fast";
  // fala 2 – 70% normal, 30% fast

  if (wave === 3) {
    if (roll < 0.5) return "normal";
    if (roll < 0.9) return "fast";
    return "tank";  // 50% normal, 40% fast, 10% tank
  }

  if (wave === 4) {
    if (roll < 0.3) return "normal";
    if (roll < 0.75) return "fast";
    return "tank";  // 30% normal, 45% fast, 25% tank
  }

  // fala 5+ – głównie trudni przeciwnicy
  if (roll < 0.15) return "normal";
  if (roll < 0.55) return "fast";
  return "tank";  // 15% normal, 40% fast, 45% tank
}