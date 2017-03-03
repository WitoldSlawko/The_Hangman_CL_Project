# The_Hangman_CL_Project

Moim pomysłem, na warsztat zaliczeniowy jest gra w popularnego wisielca, czyli odgadywanie hasła poprzez podawanie pojedynczej litery z wyznaczonym limitem błędów - tutaj 7 prób.

W grze jest 20 kategorii, które są pobierane AJAXem, metodą get z api. Jeśli link wygaśnie, można odkomentować z w index.html tag script z hm_words.js i zakomnetować treść ajaxa w app.js. Też będzie działać.

Moim pomysłem, na warsztat zaliczeniowy jest gra w popularnego wisielca, czyli odgadywanie hasła poprzez podawanie pojedynczej litery z wyznaczonym limitem błędów - tutaj 7 prób.

Podawanie liter jest możliwe poprzez wybranie myszką buttona z literą, lub kliknięcie litery z klawiatury. Następnie kliknięcie buttona ENTER na stronie lub nacisniecie tego klawisza spowoduje sprawdzenie, czy litera jest w haśle, jeśli jest pojawi się ona pod odpowiednim miejscem, jeśli nie tracimy "życie" o 1.

W trakcie gry można się poddać -> nacisnąć button z horągiewką (surrender) i zobaczymy hasło, ale gra zostanie przegrana (game over) i counter LOST wzrośnie o 1. Wtedy należy wybrać nową categorię ze slaidera lub nacisnać button z zakręconą strzałką, wylosujemy wtedy nowe hasło z kategorii, przy której zakończono obecną grę.

Są komunikaty dźwiękowe, informujące o przegranej (booooo) czy wygranej grze (brawa) jak i czy dobra czy zła litera została wybrana.

Slider categorii, button surrender i refresh, po najecheniu kursorem wyświetli pseudoelement z opisem.
