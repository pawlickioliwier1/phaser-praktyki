export function takeDamage(health, damage) {
  return health - damage
}

export function isAlive(health) {
  return health > 0
}