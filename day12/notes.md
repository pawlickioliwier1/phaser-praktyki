# Day 15

## Wybrane ficzery
-Rozbudowane HP przeciwników
-Reload system
-Pause + restart

## Plan feature 1
Chcę rozbudować system życia przeciwników tak, żeby był bardziej dynamiczny i dawał większą kontrolę nad balansem gry.

## Plan feature 2
System przeładowania broni, żeby gameplay był bardziej realistyczny i wymagał zarządzania zasobami.

## Plan feature 3
Dodanie systemu pauzy i restartu poziomu dla lepszego UX.

## Jakie testy napiszę
HP system:

Czy przeciwnik poprawnie traci HP po trafieniu
Czy umiera przy 0 HP
Czy różne typy przeciwników mają różne wartości HP

Reload system:

Czy nie można strzelać przy 0 ammo
Czy reload poprawnie uzupełnia magazyn
Czy nie da się reloadować w nieskończoność (bez ammo reserve)
Czy nie można strzelać podczas reloadu

Pause + restart:

Czy pauza faktycznie zatrzymuje grę
Czy UI działa poprawnie
Czy restart resetuje wszystko (HP, ammo, pozycje)
Czy nie ma bugów po wielokrotnym restartowaniu
