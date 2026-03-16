Day 7
##Co zrobiłem
Dodałem system życia gracza + kolizję z wrogiem (target) + prosty Game Over w konsoli.

##Jak działa system życia
Gracz ma 3 HP.
Przy kolizji z wrogiem traci 1 HP (co max 0,8 s dzięki cooldownowi).

##Jak działa Game Over
Gdy health <= 0 → w konsoli pojawia się „GAME OVER”.
Na razie tylko komunikat, gra dalej działa.

##Jak działa kolizja enemy
W update() sprawdzamy ręcznie przecięcie prostokątów gracza i targeta.
Jeśli kolizja + minął cooldown 800 ms → odejmujemy 1 HP i resetujemy timer
