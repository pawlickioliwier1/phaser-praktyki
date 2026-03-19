// playerHealth.js – funkcje do obsługi życia gracza

// Odejmuje obrażenia od aktualnego zdrowia
export function takeDamage(health, damage) {
  return health - damage;
}

// Zwraca true, jeśli gracz ma jeszcze życie (> 0)
export function isAlive(health) {
  return health > 0;
}