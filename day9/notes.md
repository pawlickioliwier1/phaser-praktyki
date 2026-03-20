# Day 11

## Co to jest walidacja
Walidacja = sprawdzanie, czy dane, które dostała funkcja, są poprawne i mają sens w kontekście tego, co funkcja ma robić.

## Co to jest wyjątek
Wyjątek (exception) = specjalny rodzaj błędu, który mówi: „coś poszło bardzo źle i nie mogę / nie chcę kontynuować normalnie”.

## Kiedy rzucamy Error
Rzucamy throw new Error(...) wtedy, gdy:

dane wejściowe są kompletnie bez sensu i dalsze działanie funkcji nie ma prawa się udać
chcemy poinformować programistę (lub testera), że coś zrobił źle już na etapie developmentu
nie chcemy cicho zwracać dziwnego wyniku (np. NaN, undefined, -5 zamiast 0)

## Czego się nauczyłem
Walidacja wejścia (input validation) to podstawa bezpiecznego kodu
typeof + sprawdzanie zakresu (≤ 0, < 0) to najczęstsze sposoby walidacji
throw new Error("opis problemu") pomaga szybko znaleźć bugi
Testy z expect(...).toThrow() sprawdzają, czy funkcja poprawnie odmawia współpracy przy złych danych
Lepiej rzucić wyraźny błąd na początku funkcji niż później dostać tajemnicze NaN albo crash w dziwnym miejscu
Math.max(0, ...) + walidacja = bardzo popularna kombinacja przy zdrowiu / punktach / wymiarach
