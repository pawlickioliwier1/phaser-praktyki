export function canShoot(lastShotTime, currentTime, cooldown) {

  return currentTime - lastShotTime >= cooldown

}