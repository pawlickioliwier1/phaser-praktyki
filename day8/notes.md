##Day 9
##Jak działa system fal
Gra zaczyna od fali 1.
W każdej fali spawnuję 2 + numer_fali przeciwników za pomocą pętli.
Po zabiciu wszystkich → następna fala

##Jak rośnie trudność
Każda fala ma dokładnie +1 wroga więcej

##Co testowałem
poprawną liczbę wrogów w fali 1, 2, 5
spawn wielu kwadratów naraz
kolizję gracza z wieloma wrogami
usuwanie wrogów po trafieniu pociskiem
punkty i cooldown obrażeń

##Co było trudne
Zmiana z jednego target na tablicę enemies[]
Pętla usuwająca elementy w trakcie iteracji
Zachowanie this w funkcji spawnEnemies
