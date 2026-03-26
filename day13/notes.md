# Day 16

## Jaki feature robiłem
reload

## Jakie funkcje napisałem
Funkcja sprawdzająca input (np. HandleReloadInput()), która wykrywa kliknięcie klawisza R
Reload() – główna funkcja rozpoczynająca przeładowanie
Coroutine (np. ReloadCoroutine()), która:
zatrzymuje możliwość strzelania
czeka określony czas (reload time)
uzupełnia magazyn
Funkcja CanReload() sprawdzająca:
czy magazynek nie jest pełny
czy gracz ma zapas amunicji (ammo reserve)
czy nie trwa już reload
Aktualizacja ammo po każdym strzale (Shoot() zmniejsza ammo w magazynku)

## Jakie testy napisałem
gdy ammo > 0 → można strzelać
gdy ammo = 0 → nie można strzelać
strzał zmniejsza ammo o 1
reload ustawia ammo na max

## Co było trudne
Najtrudniejsze było ogarnięcie synchronizacji między reloadem a strzelaniem.

## Jakie edge case’y sprawdziłem
Sprawdziłem sytuacje graniczne, które mogą powodować bugi
