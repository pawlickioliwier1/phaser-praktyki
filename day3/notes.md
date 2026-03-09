# Day 3

## Co to jest test
Test to kawałek kodu który automatycznie sprawdza czy inny kawałek kodu działa tak jak powinien.  

## Po co są testy
- Żeby szybko zauważyć, kiedy coś psujemy podczas pisania nowego kodu
- Żeby można było zmieniać kod bez strachu, że coś się zepsuje w innym miejscu
- Żeby mieć pewność, że stara funkcjonalność nadal działa po zmianach (tzw. regresje)
- Żeby dokumentować, jak dana funkcja / logika MA działać (testy są żywą specyfikacją)
- W większych projektach – żeby w ogóle dało się utrzymywać kod przez lata

## Co testowałem dzisiaj
- ograniczanie pozycji gracza do sceny  
  konkretnie funkcję `clampPlayerPosition(x, y, sceneWidth, sceneHeight)`

## Co zrozumiałem
- co robi expect()
- co robi toEqual()
- dlaczego testujemy logikę, a nie cały Phaser

## Co było trudne
- Na początku nie wiedziałem, jak w ogóle uruchomić testy w projekcie z Phaserem (czy trzeba coś specjalnego skonfigurować)
- Najtrudniejsze było zrozumienie, że nie testujemy x i y obiektu player, tylko czystą funkcję matematyczną clampPlayerPosition

## Jak pomogło mi AI
Bardzo konkretnie pomogło w tych miejscach:

- Pokazało mi, jak napisać pierwsze sensowne testy
- Wyjaśniło mi do czego sluzy toEqual() oraz expect()
