# Day 17

## Jaki feature robiłem
pauza oraz restart

## Jakie funkcje napisałem
Zaimplementowałem system pauzy oraz restartu poziomu.

## Jakie testy napisałem
Sprawdziłem kluczowe zachowania systemu:

Czy ESC zatrzymuje grę
Czy wszystkie obiekty (np. przeciwnicy, animacje) faktycznie się zatrzymują
Czy UI pauzy się poprawnie wyświetla i znika
Czy po wznowieniu gra wraca do normalnego działania
Czy restart poprawnie resetuje poziom

## Co było trudne
Największym problemem było poprawne zatrzymanie wszystkich systemów gry.

## Co poprawiłem po pierwszej wersji
Po pierwszej implementacji wprowadziłem kilka usprawnień:

Dodałem blokadę wielokrotnego włączania/wyłączania pauzy (anti-spam ESC)
Poprawiłem UI (czytelniejsze przyciski, lepszy layout)
Naprawiłem bug, gdzie po restarcie niektóre wartości (np. ammo) się nie resetowały
Upewniłem się, że po wznowieniu gry wszystko działa płynnie (brak „zamrożonych” stanów)
Dodałem możliwość wznowienia gry przyciskiem w UI (nie tylko ESC)
