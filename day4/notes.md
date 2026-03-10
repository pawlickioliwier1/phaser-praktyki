# Day 4

## Co robi update()
to funkcja która działa w każdej klatce gry dzięki niej gracz może się poruszać i reagować na klawisze

## Jak działa celowanie
najpierw pobieramy pozycję myszy w grze potem wywołujemy funkcję getAngleToPointer która oblicza kąt między graczem a kursorem używając Math.atan2. Na końcu przypisujemy wynik do player.rotation.
Efekt jest taki, że prostokąt gracza zawsze patrzy na kursor, nawet jeśli się porusza.

## Co testowałem
- funkcję getAngleToPointer

## Co zrozumiałem
- co robi Math.atan2
- po co wydzielać logikę do osobnych funkcji
- dlaczego warto pisać testy do nowej logiki

## Co było trudne
Na początku nie widziałem efektu obracania gracza bo sam kąt był liczony ale nie przypisywałem go do player.rotation

## Jak pomogło mi AI
Wyjaśniło w prosty sposób jak działa Math.atan2 dla punktów wokół gracza
Podało gotowy kod do testów funkcji getAngleToPointer dla wszystkich kierunków
