##Co zrobiłem
Wprowadziłem target (czerwony kwadrat), który pojawia się w losowych miejscach.

Zaimplementowałem system punktów oraz kolizję pocisku z targetem, która powoduje losowy respawn targeta.

##Jak działa spawn
Funkcja getRandomSpawn(width, height) losuje pozycję x i y w granicach mapy/ekranu.

Target początkowo pojawia się w losowej pozycji przy starcie gry.

Po trafieniu pociskiem, target zostaje przeniesiony w nową losową pozycję, dzięki czemu gra jest dynamiczna.

##Jak działa system punktów
Zmienna score przechowuje aktualną liczbę punktów gracza.

Każdy trafiony pocisk wywołuje funkcję handleBulletHitTarget, która zwiększa wynik przez increaseScore(score).

Aktualny wynik jest wyświetlany w konsoli przeglądarki (można później dodać wyświetlanie w grze).

##Jak działa kolizja
Kolizja pocisku z targetem sprawdzana jest w funkcji update() poprzez Phaser.Geom.Intersects.RectangleToRectangle.

Jeśli prostokąty pocisku i targeta się przecinają:

pocisk zostaje usunięty z tablicy i z gry,

target zostaje przeniesiony w losową pozycję,

gracz dostaje punkt.

##Co było trudne
Trudne było utrzymanie porządku komentarzy i logiki, żeby zachować czytelność kodu i jednocześnie dodać system punktów oraz losowy spawn targeta.
