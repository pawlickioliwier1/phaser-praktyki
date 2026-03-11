# Day 5


## Co to jest wektor ruchu
Wektor ruchu to liczby opisujące kierunek i prędkość obiektu w grze.

## Jak działa getBulletVelocity
getBulletVelocity liczy prędkość pocisku w stronę kursora

## Co robi cooldown strzału
Cooldown to czas, który musi upłynąć między kolejnymi strzałami.

## Jakie testy napisałem
Funkcja getBulletVelocity:

pocisk leci w prawo, w lewo, do góry, w dół

długość wektora = speed

Funkcja canShoot (cooldown):

można strzelić po zakończeniu cooldownu

nie można strzelić gdy cooldown jeszcze trwa

można strzelić dokładnie na granicy cooldownu

## Co było trudne
Ustawienie cooldownu w Phaserze tak, żeby strzały faktycznie były blokowane, ale gra dalej działała płynnie
