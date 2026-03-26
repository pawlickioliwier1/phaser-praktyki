# Day 18

## Co robiłem dziś
Rozbudowane HP przeciwników

## Co poprawiłem w kodzie
Ulepszyłem system HP przeciwników, żeby był bardziej elastyczny i łatwiejszy do rozbudowy.

## Jakie edge case’y sprawdziłem
Sprawdziłem różne sytuacje, które mogą powodować błędy:

Otrzymanie obrażeń większych niż aktualne HP (overkill)
Zadanie obrażeń przeciwnikowi, który już nie żyje
HP spadające poniżej 0
Wielokrotne wywołanie Die()
Szybkie trafienia jeden po drugim (np. szybka broń)
Reset HP po restarcie gry

## Co jeszcze warto poprawić
Mam kilka pomysłów na dalszy rozwój systemu
