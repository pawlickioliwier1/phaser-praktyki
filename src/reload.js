// reload.js – logika przeładowania broni

// Maksymalna liczba naboi w magazynku
export const MAX_AMMO = 10;

// Czas przeładowania w milisekundach
export const RELOAD_TIME = 2000;

// Sprawdza czy gracz może strzelać (ammo > 0)
// Zwraca true → można strzelać, false → pusty magazynek
export function canShootWithAmmo(ammo) {
  return ammo > 0;
}

// Zużywa jeden nabój po strzale
// Zwraca nową wartość ammo (nigdy poniżej 0)
export function useAmmo(ammo) {
  return Math.max(0, ammo - 1);
}

// Kończy przeładowanie – przywraca pełny magazynek
// Zwraca obiekt z nowym ammo i flagą isReloading = false
export function finishReload(maxAmmo) {
  return { ammo: maxAmmo, isReloading: false };
}
