export function getEnemyStats(type) {
  if (type === "fast") return { speed: 120, hp: 1, damage: 5 }
  if (type === "tank") return { speed: 50, hp: 3, damage: 15 }
  return { speed: 80, hp: 2, damage: 10 }
}

export function chooseEnemyType(wave) {
  if (wave >= 5) return "tank"
  if (wave >= 3) return "fast"
  return "normal"
}