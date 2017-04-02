$(document).ready(function () {

  // Podstawowe zmienne pozyskane z elementów DOM : ----------------------------

  var refresh = $('.refresh');
  var surrender = $('.surrender');

  var hangman = $('.hangman_outer');
  var sprite = $('.hangman_inner');
  var letters = $('.letters');

  var select_slider = $('.categories');
  var heart_count = $('.life_count');

  var win_count = $('.win_count');
  var lose_count = $('.lose_count');

  var accept = $('.accept');

  var cat_warn = $('.category_warning');

  var scores = $('.scores');
  var new_player_add = $('.new_player');
  var delete_players = $('.delete_players');

  var picker = $('.picking');

  var hm_words = "https://english-words-6f7d0.firebaseio.com/.json";
  var hm_scores = "https://hangman-scores-f6aa4.firebaseio.com/.json";

  var animals_pool;
  var body_pool;
  var buildings_pool;
  var city_pool;
  var clothes_pool;
  var computer_pool;
  var cosmetics_pool;
  var criminals_pool;
  var family_pool;
  var fruits_pool;
  var geography_pool;
  var house_pool;
  var jobs_pool;
  var music_pool;
  var subjects_pool;
  var sports_pool;
  var trees_pool;
  var vehicles_pool;
  var weather_pool;
  var zodiac_pool;

  var json = (function () {
    var response;
    $.ajax({
      //'async': false,
      'global': true,
      'url': hm_words,
      'dataType': "json"
    }).done(function (data) {
      //response = data[0];
      response = get_words(data[0]);
    });
    return response;
  })();

  function get_words(words) {
    animals_pool = words.animals_pool;
    body_pool = words.body_pool;
    buildings_pool = words.buildings_pool;
    city_pool = words.city_pool;
    clothes_pool = words.clothes_pool;
    computer_pool = words.computer_pool;
    cosmetics_pool = words.cosmetics_pool;
    criminals_pool = words.criminals_pool;
    family_pool = words.family_pool;
    fruits_pool = words.fruits_pool;
    geography_pool = words.geography_pool;
    house_pool = words.house_pool;
    jobs_pool = words.jobs_pool;
    music_pool = words.music_pool;
    subjects_pool = words.subjects_pool;
    sports_pool = words.sports_pool;
    trees_pool = words.trees_pool;
    vehicles_pool = words.vehicles_pool;
    weather_pool = words.weather_pool;
    zodiac_pool = words.zodiac_pool;
  }
  /*
  var animals_pool = json.animals_pool;
  var body_pool = json.body_pool;
  var buildings_pool = json.buildings_pool;
  var city_pool = json.city_pool;
  var clothes_pool = json.clothes_pool;
  var computer_pool = json.computer_pool;
  var cosmetics_pool = json.cosmetics_pool;
  var criminals_pool = json.criminals_pool;
  var family_pool = json.family_pool;
  var fruits_pool = json.fruits_pool;
  var geography_pool = json.geography_pool;
  var house_pool = json.house_pool;
  var jobs_pool = json.jobs_pool; 
  var music_pool = json.music_pool;
  var subjects_pool = json.subjects_pool;
  var sports_pool = json.sports_pool;
  var trees_pool = json.trees_pool;
  var vehicles_pool = json.vehicles_pool;
  var weather_pool = json.weather_pool;
  var zodiac_pool = json.zodiac_pool;
  */
  $('button').css('type', 'button');

  var sel = $('select.categories');
  var selected = $('.selected');

  var old_path = 'url(../images/hangman_slides.png)';
  var new_path = 'url(../images/hm_win.png)';

  var myWord = 0;
  var run_iteration = 0;

  var new_li;

  var life_number = 7;
  heart_count.text(life_number);

  var win_number = 0;
  win_count.text(win_number);

  var lose_number = 0;
  lose_count.text(lose_number);

  scores.on('click', function () {
    var json_2 = (function () {
      var response_2;
      $.ajax({
        //'async': false,
        'global': true,
        'url': hm_scores,
        'dataType': "json"
      }).done(function (data_2) {
        response_2 = get_scores(data_2);
      });
      return response_2;
    })();

  });

  function get_scores(players_scores) {
    $('ul').empty();
    for (var property in players_scores) {
      new_li = $('<li>');
      new_li.text(players_scores[property].name + ' W:' + players_scores[property].won + ' L:' + players_scores[property].lost);
      new_li.appendTo($('ul'));
    }
  }

  /*
    scores.on('click',function(){
        
    var json_2 = (function () {
      var response_2;
      $.ajax({
        'async': false,
        'global': true,
        'url': hm_scores,
        'dataType': "json"
      }).done(function(data_2){
        response_2 = data_2;
      });
      return response_2;
    })();
  
    $('ul').empty();
    for (var property in json_2) {
      var new_li = $('<li>');
      new_li.text(json_2[property].name+' W:'+json_2[property].won+' L:'+json_2[property].lost);
      new_li.appendTo($('ul'));
    }
    });
    */
  delete_players.on('click', function () {
    var json_2 = (function () {
      $.ajax({
        //'async': false,
        'global': true,
        'url': hm_scores,
        'dataType': "json"
      }).done(function (data_2) {
        json_2 = data_2;
      });
      return json_2;
    })();

    for (var property in json_2) {

      $.ajax({
        url: "https://hangman-scores-f6aa4.firebaseio.com/" + property + ".json",
        dataType: 'json',
        type: 'DELETE'
      }).done(function (response) {
        console.log(response);
      })
    }
    $('ul').empty();
  });

  new_player_add.on('click', function () {

    var new_player_info = {
      name: $('.adding_player').val(),
      won: win_count.text(),
      lost: lose_count.text()
    };

    $('.adding_player').val('');
    win_count.text(0);
    lose_count.text(0);

    $.ajax({
      url: hm_scores,
      type: 'POST',
      data: JSON.stringify(new_player_info),
      contentType: "application/json; charset=utf-8",
      dataType: 'json'
    }).done(function (response) {
      //console.log(response);
    }).fail(function (error) {
      //console.log(error);
    })

  });

  // Funkcja wyłączająca wybraną już literę
  function checking(letter) {
    $('button').each(function () {
      if (letter == $(this).text()) {
        $(this).css('background-color', 'red');
        $(this).off('click');
        //console.log($(this).text());
        $('.selected').text('');
      }
    });
  }

  // Funkcja wybru kategorii i wyświetlenia zamaskowanych liter hasła - kwadraty
  function first_run() {
    run_iteration = 0;
    switch ($('.categories').val()) {
      case 'Animals':
        myWord = animals_pool[Math.floor(Math.random() * animals_pool.length)];
        break;
      case 'Body':
        myWord = body_pool[Math.floor(Math.random() * body_pool.length)];
        break;
      case 'Buildings':
        myWord = buildings_pool[Math.floor(Math.random() * buildings_pool.length)];
        break;
      case 'City':
        myWord = city_pool[Math.floor(Math.random() * city_pool.length)];
        break;
      case 'Clothes':
        myWord = clothes_pool[Math.floor(Math.random() * clothes_pool.length)];
        break;
      case 'Computer':
        myWord = computer_pool[Math.floor(Math.random() * computer_pool.length)];
        break;
      case 'Cosmetics':
        myWord = cosmetics_pool[Math.floor(Math.random() * cosmetics_pool.length)];
        break;
      case 'Criminals':
        myWord = criminals_pool[Math.floor(Math.random() * criminals_pool.length)];
        break;
      case 'Family':
        myWord = family_pool[Math.floor(Math.random() * family_pool.length)];
        break;
      case 'Fruits':
        myWord = fruits_pool[Math.floor(Math.random() * fruits_pool.length)];
        break;
      case 'Geography':
        myWord = geography_pool[Math.floor(Math.random() * geography_pool.length)];
        break;
      case 'House':
        myWord = house_pool[Math.floor(Math.random() * house_pool.length)];
        break;
      case 'Jobs':
        myWord = jobs_pool[Math.floor(Math.random() * jobs_pool.length)];
        break;
      case 'Music':
        myWord = music_pool[Math.floor(Math.random() * music_pool.length)];
        break;
      case 'Subjects':
        myWord = subjects_pool[Math.floor(Math.random() * subjects_pool.length)];
        break;
      case 'Sports':
        myWord = sports_pool[Math.floor(Math.random() * sports_pool.length)];
        break;
      case 'Trees':
        myWord = trees_pool[Math.floor(Math.random() * trees_pool.length)];
        break;
      case 'Vehicles':
        myWord = vehicles_pool[Math.floor(Math.random() * vehicles_pool.length)];
        break;
      case 'Weather':
        myWord = weather_pool[Math.floor(Math.random() * weather_pool.length)];
        break;
      case 'Zodiac':
        myWord = zodiac_pool[Math.floor(Math.random() * zodiac_pool.length)];
        break;
    }

    if ($('.categories option:selected').text() != 'Select ...') {
      sel.attr('disabled', 'disabled');
      $('.first_opt').css('display', 'none');
      myWord = myWord.toUpperCase();
      letters.children().each(function () {
        $(this).remove();
      })
      cat_warn.removeClass('animate_c_w');
      surrender.one('click', game_over);
      surrender.css('background-color', 'green');
      accept.on('click', testing);
      console.log(myWord); // CHEAT !!! :)
    }

    for (var a = 0; a < myWord.length; a++) {
      var square = $('<div>');
      square.addClass('center');
      square.addClass('square');
      letters.append(square);
    }
    sprite.removeClass('new_path');
    sprite.addClass('old_path');
    sprite.css('width', '150px');
    sprite.css('background-position', '0px 0px');

    life_number = 7;
    heart_count.text(life_number);

  }

  // Funkcja sprawdzająca, czy wybrana litera A-Z jest pod dowolną pozycją w szukanym haśle : --------
  function testing() {
    if (selected.text() !== '') {
      var value_letter = $('.selected').text();
      //console.log('moja litera', value_letter);
      checking(value_letter);
      var squares = $('.letters').children('div');
      var check = 0;
      var iteration = 0;
      for (var b = 0; b < squares.length; b++) {
        if (value_letter == myWord.charAt(b)) {
          squares.eq(b).text(value_letter);
          check += 1;
          //$.playSound('../The_Hangman/sounds/correct');
          $.playSound('./sounds/correct');
        }
        if (squares.eq(b).text() !== '') {
          iteration += 1;
        }
      }
      if (check == 0) {
        run_iteration -= 150;
        //console.log(run_iteration);
        sprite.animate({
          backgroundPositionX: run_iteration + 'px'
        }, 1000);
        life_number -= 1;
        heart_count.text(life_number);
        if (run_iteration == (-1050)) {
          game_over();
        } else {
          //$.playSound("../The_Hangman/sounds/wrong");
          $.playSound("./sounds/wrong");
        }
      }
      if (iteration == squares.length) {

        sprite.removeClass('old_path');
        sprite.addClass('new_path');
        sprite.css('width', '160px');
        sprite.css('background-position', 'left');
        $('.row').find('button').each(function () {
          $(this).off('click');
          $(this).css('background-color', 'green');
        });
        win_number += 1;
        win_count.text(win_number);
        $(document).unbind('keyup', key_q);
        $(document).unbind('keyup', key_w);
        $(document).unbind('keyup', key_e);
        $(document).unbind('keyup', key_r);
        $(document).unbind('keyup', key_t);
        $(document).unbind('keyup', key_y);
        $(document).unbind('keyup', key_u);
        $(document).unbind('keyup', key_i);
        $(document).unbind('keyup', key_o);
        $(document).unbind('keyup', key_p);
        $(document).unbind('keyup', key_a);
        $(document).unbind('keyup', key_s);
        $(document).unbind('keyup', key_d);
        $(document).unbind('keyup', key_f);
        $(document).unbind('keyup', key_g);
        $(document).unbind('keyup', key_h);
        $(document).unbind('keyup', key_j);
        $(document).unbind('keyup', key_k);
        $(document).unbind('keyup', key_l);
        $(document).unbind('keyup', key_z);
        $(document).unbind('keyup', key_x);
        $(document).unbind('keyup', key_c);
        $(document).unbind('keyup', key_v);
        $(document).unbind('keyup', key_b);
        $(document).unbind('keyup', key_n);
        $(document).unbind('keyup', key_m);
        $(document).unbind('keyup', key_enter);
        //$.playSound("../The_Hangman/sounds/win");
        $.playSound("./sounds/win");
        surrender.off('click');
        refresh.css('background-color', 'green');
        sel.removeAttr('disabled');
        locking();
        picker.attr('disabled', 'disabled');
        refresh.one('click', reroll);
      }
    };
    // Jeśli dana wybrana litera została już sprawdzona, odczepiana zostaje już litera
		
		switch (value_letter){
			case 'Q':
				$(document).unbind('keyup', key_q);
      	$('.pick_Q').attr('disabled', 'disabled');
				break;
			case 'W':
				$(document).unbind('keyup', key_w);
      	$('.pick_W').attr('disabled', 'disabled');
				break;
			case 'E':
				$(document).unbind('keyup', key_e);
      	$('.pick_E').attr('disabled', 'disabled');
				break;
			case 'R':
				$(document).unbind('keyup', key_r);
      	$('.pick_R').attr('disabled', 'disabled');
				break;
			case 'T':
				$(document).unbind('keyup', key_t);
      	$('.pick_T').attr('disabled', 'disabled');
				break;
			case 'Y':
				$(document).unbind('keyup', key_y);
      	$('.pick_Y').attr('disabled', 'disabled');
				break;
			case 'U':
				$(document).unbind('keyup', key_u);
      	$('.pick_U').attr('disabled', 'disabled');
				break;
			case 'I':
				$(document).unbind('keyup', key_i);
      	$('.pick_I').attr('disabled', 'disabled');
				break;
			case 'O':
				$(document).unbind('keyup', key_o);
      	$('.pick_O').attr('disabled', 'disabled');
				break;
			case 'P':
				$(document).unbind('keyup', key_p);
      	$('.pick_P').attr('disabled', 'disabled');
				break;
			case 'A':
				$(document).unbind('keyup', key_a);
      	$('.pick_A').attr('disabled', 'disabled');
				break;
			case 'S':
				$(document).unbind('keyup', key_s);
      	$('.pick_S').attr('disabled', 'disabled');
				break;
			case 'D':
				$(document).unbind('keyup', key_d);
      	$('.pick_D').attr('disabled', 'disabled');
				break;
			case 'F':
				$(document).unbind('keyup', key_f);
      	$('.pick_F').attr('disabled', 'disabled');
				break;
			case 'G':
				$(document).unbind('keyup', key_g);
      	$('.pick_G').attr('disabled', 'disabled');
				break;
			case 'H':
				$(document).unbind('keyup', key_h);
      	$('.pick_H').attr('disabled', 'disabled');
				break;
			case 'J':
				$(document).unbind('keyup', key_j);
      	$('.pick_J').attr('disabled', 'disabled');
				break;
			case 'K':
				$(document).unbind('keyup', key_k);
      	$('.pick_K').attr('disabled', 'disabled');
				break;
			case 'L':
				$(document).unbind('keyup', key_l);
      	$('.pick_L').attr('disabled', 'disabled');
				break;
			case 'Z':
				$(document).unbind('keyup', key_z);
      	$('.pick_Z').attr('disabled', 'disabled');
				break;
			case 'X':
				$(document).unbind('keyup', key_x);
      	$('.pick_X').attr('disabled', 'disabled');
				break;
			case 'C':
				$(document).unbind('keyup', key_c);
      	$('.pick_C').attr('disabled', 'disabled');
				break;
			case 'V':
				$(document).unbind('keyup', key_v);
      	$('.pick_V').attr('disabled', 'disabled');
				break;
			case 'B':
				$(document).unbind('keyup', key_b);
      	$('.pick_B').attr('disabled', 'disabled');
				break;
			case 'N':
				$(document).unbind('keyup', key_n);
      	$('.pick_N').attr('disabled', 'disabled');
				break;
			case 'M':
				$(document).unbind('keyup', key_m);
      	$('.pick_M').attr('disabled', 'disabled');
				break;
		}
		
		/*
    if (value_letter === 'Q') {
      $(document).unbind('keyup', key_q);
      $('.pick_Q').attr('disabled', 'disabled');
    } else if (value_letter === 'W') {
      $(document).unbind('keyup', key_w);
      $('.pick_W').attr('disabled', 'disabled');
    } else if (value_letter === 'E') {
      $(document).unbind('keyup', key_e);
      $('.pick_E').attr('disabled', 'disabled');
    } else if (value_letter === 'R') {
      $(document).unbind('keyup', key_r);
      $('.pick_R').attr('disabled', 'disabled');
    } else if (value_letter === 'T') {
      $(document).unbind('keyup', key_t);
      $('.pick_T').attr('disabled', 'disabled');
    } else if (value_letter === 'Y') {
      $(document).unbind('keyup', key_y);
      $('.pick_Y').attr('disabled', 'disabled');
    } else if (value_letter === 'U') {
      $(document).unbind('keyup', key_u);
      $('.pick_U').attr('disabled', 'disabled');
    } else if (value_letter === 'I') {
      $(document).unbind('keyup', key_i);
      $('.pick_I').attr('disabled', 'disabled');
    } else if (value_letter === 'O') {
      $(document).unbind('keyup', key_o);
      $('.pick_O').attr('disabled', 'disabled');
    } else if (value_letter === 'P') {
      $(document).unbind('keyup', key_p);
      $('.pick_P').attr('disabled', 'disabled');
    } else if (value_letter === 'A') {
      $(document).unbind('keyup', key_a);
      $('.pick_A').attr('disabled', 'disabled');
    } else if (value_letter === 'S') {
      $(document).unbind('keyup', key_s);
      $('.pick_S').attr('disabled', 'disabled');
    } else if (value_letter === 'D') {
      $(document).unbind('keyup', key_d);
      $('.pick_D').attr('disabled', 'disabled');
    } else if (value_letter === 'F') {
      $(document).unbind('keyup', key_f);
      $('.pick_F').attr('disabled', 'disabled');
    } else if (value_letter === 'G') {
      $(document).unbind('keyup', key_g);
      $('.pick_G').attr('disabled', 'disabled');
    } else if (value_letter === 'H') {
      $(document).unbind('keyup', key_h);
      $('.pick_H').attr('disabled', 'disabled');
    } else if (value_letter === 'J') {
      $(document).unbind('keyup', key_j);
      $('.pick_J').attr('disabled', 'disabled');
    } else if (value_letter === 'K') {
      $(document).unbind('keyup', key_k);
      $('.pick_K').attr('disabled', 'disabled');
    } else if (value_letter === 'L') {
      $(document).unbind('keyup', key_l);
      $('.pick_L').attr('disabled', 'disabled');
    } else if (value_letter === 'Z') {
      $(document).unbind('keyup', key_z);
      $('.pick_Z').attr('disabled', 'disabled');
    } else if (value_letter === 'X') {
      $(document).unbind('keyup', key_x);
      $('.pick_X').attr('disabled', 'disabled');
    } else if (value_letter === 'C') {
      $(document).unbind('keyup', key_c);
      $('.pick_C').attr('disabled', 'disabled');
    } else if (value_letter === 'V') {
      $(document).unbind('keyup', key_v);
      $('.pick_V').attr('disabled', 'disabled');
    } else if (value_letter === 'B') {
      $(document).unbind('keyup', key_b);
      $('.pick_B').attr('disabled', 'disabled');
    } else if (value_letter === 'N') {
      $(document).unbind('keyup', key_n);
      $('.pick_N').attr('disabled', 'disabled');
    } else if (value_letter === 'M') {
      $(document).unbind('keyup', key_m);
      $('.pick_M').attr('disabled', 'disabled');
    }
		*/
	}

  surrender.off('click'); // Wyłącznie klikania z guzika surrender

  // Funkcja, która powiadomi o przegranej grze
  function game_over(e) {
    surrender.off('click');
    sel.removeAttr('disabled');
    refresh.one('click', reroll);
    refresh.css('background-color', 'green');
    var squares = $('.letters').children('div');
    for (var c = 0; c < myWord.length; c++) {
      squares.eq(c).text(myWord.charAt(c));
    }
    $('.row').find('button').each(function () {
      $(this).off('click');
      $(this).css('background-color', 'red');
    });
    accept.off('click');
    accept.css('background-color', 'red');
    sprite.css('background-position', 'right');
    locking();
    $('.picking').attr('disabled','disabled');
    lose_count.text(parseInt(lose_count.text()) + 1);
    //$.playSound("../The_Hangman/sounds/loose");
    $.playSound("./sounds/loose");
  };

  accept.off('click'); // Wyłączenie klikania z guzika akceptacji - z napisem ENTER

  function reroll() {
    accept.on('click', testing);
    refresh.off('click');
    first_run();
    pressing();
    surrender.css('background-color', 'gainsboro');
    refresh.css('background-color', 'red');
    $('.pick').removeAttr('disabled');
    $('.picking').removeAttr('disabled');
  };

  refresh.off('click'); // Wyłączenie klikania z guzika odświeżania - czyli losowania nowego hasła

  // Funkcje key_.. , gdzie '..' to dany znak litery, rozponaje, ktory klawisz zostal wcisniety z klawiatury
  function key_q(q) {
    if (q.key == 'q') {
      selected.text('Q');
    }
  }

  function key_w(w) {
    if (w.key == 'w') {
      selected.text('W');
    }
  }

  function key_e(e) {
    if (e.key == 'e') {
      selected.text('E');
    }
  }

  function key_r(r) {
    if (r.key == 'r') {
      selected.text('R');
    }
  }

  function key_t(t) {
    if (t.key == 't') {
      selected.text('T');
    }
  }

  function key_y(y) {
    if (y.key == 'y') {
      selected.text('Y');
    }
  }

  function key_u(u) {
    if (u.key == 'u') {
      selected.text('U');
    }
  }

  function key_i(i) {
    if (i.key == 'i') {
      selected.text('I');
    }
  }

  function key_o(o) {
    if (o.key == 'o') {
      selected.text('O');
    }
  }

  function key_p(p) {
    if (p.key == 'p') {
      selected.text('P');
    }
  }

  function key_a(a) {
    if (a.key == 'a') {
      selected.text('A');
    }
  }

  function key_s(s) {
    if (s.key == 's') {
      selected.text('S');
    }
  }

  function key_d(d) {
    if (d.key == 'd') {
      selected.text('D');
    }
  }

  function key_f(f) {
    if (f.key == 'f') {
      selected.text('F');
    }
  }

  function key_g(g) {
    if (g.key == 'g') {
      selected.text('G');
    }
  }

  function key_h(h) {
    if (h.key == 'h') {
      selected.text('H');
    }
  }

  function key_j(j) {
    if (j.key == 'j') {
      selected.text('J');
    }
  }

  function key_k(k) {
    if (k.key == 'k') {
      selected.text('K');
    }
  }

  function key_l(l) {
    if (l.key == 'l') {
      selected.text('L');
    }
  }

  function key_z(z) {
    if (z.key == 'z') {
      selected.text('Z');
    }
  }

  function key_x(x) {
    if (x.key == 'x') {
      selected.text('X');
    }
  }

  function key_c(c) {
    if (c.key == 'c') {
      selected.text('C');
    }
  }

  function key_v(v) {
    if (v.key == 'v') {
      selected.text('V');
    }
  }

  function key_b(b) {
    if (b.key == 'b') {
      selected.text('B');
    }
  }

  function key_n(n) {
    if (n.key == 'n') {
      selected.text('N');
    }
  }

  function key_m(m) {
    if (m.key == 'm') {
      selected.text('M');
    }
  }

  function key_enter(ent) {
    if (ent.keyCode == 13) {
      testing();
    }
  }
  // Funkcja przypisujaca eventy do documentu
  function pressing() {
    $('button').css('background-color', 'gainsboro');
    surrender.css('background-color', 'green');
    $(document).keyup(key_q);
    $(document).keyup(key_w);
    $(document).keyup(key_e);
    $(document).keyup(key_r);
    $(document).keyup(key_t);
    $(document).keyup(key_y);
    $(document).keyup(key_u);
    $(document).keyup(key_i);
    $(document).keyup(key_o);
    $(document).keyup(key_p);
    $(document).keyup(key_a);
    $(document).keyup(key_s);
    $(document).keyup(key_d);
    $(document).keyup(key_f);
    $(document).keyup(key_g);
    $(document).keyup(key_h);
    $(document).keyup(key_j);
    $(document).keyup(key_k);
    $(document).keyup(key_l);
    $(document).keyup(key_z);
    $(document).keyup(key_x);
    $(document).keyup(key_c);
    $(document).keyup(key_v);
    $(document).keyup(key_b);
    $(document).keyup(key_n);
    $(document).keyup(key_m);
    $(document).keyup(key_enter);

    // Przypisania wyboru litery do klikania z myszki w guziki na stronie, odwzorowany uklady jak na klawiaturze qwerty
    $('.button_Q').on('click', function () {
      $('.selected').text('Q');
    });
    $('.button_W').on('click', function () {
      $('.selected').text('W');
    });
    $('.button_E').on('click', function () {
      $('.selected').text('E');
    });
    $('.button_R').on('click', function () {
      $('.selected').text('R');
    });
    $('.button_T').on('click', function () {
      $('.selected').text('T');
    });
    $('.button_Y').on('click', function () {
      $('.selected').text('Y');
    });
    $('.button_U').on('click', function () {
      $('.selected').text('U');
    });
    $('.button_I').on('click', function () {
      $('.selected').text('I');
    });
    $('.button_O').on('click', function () {
      $('.selected').text('O');
    });
    $('.button_P').on('click', function () {
      $('.selected').text('P');
    }); // ----------------------
    $('.button_A').on('click', function () {
      $('.selected').text('A');
    });
    $('.button_S').on('click', function () {
      $('.selected').text('S');
    });
    $('.button_D').on('click', function () {
      $('.selected').text('D');
    });
    $('.button_F').on('click', function () {
      $('.selected').text('F');
    });
    $('.button_G').on('click', function () {
      $('.selected').text('G');
    });
    $('.button_H').on('click', function () {
      $('.selected').text('H');
    });
    $('.button_J').on('click', function () {
      $('.selected').text('J');
    });
    $('.button_K').on('click', function () {
      $('.selected').text('K');
    });
    $('.button_L').on('click', function () {
      $('.selected').text('L');
    }); //-----------------
    $('.button_Z').on('click', function () {
      $('.selected').text('Z');
    });
    $('.button_X').on('click', function () {
      $('.selected').text('X');
    });
    $('.button_C').on('click', function () {
      $('.selected').text('C');
    });
    $('.button_V').on('click', function () {
      $('.selected').text('V');
    });
    $('.button_B').on('click', function () {
      $('.selected').text('B');
    });
    $('.button_N').on('click', function () {
      $('.selected').text('N');
    });
    $('.button_M').on('click', function () {
      $('.selected').text('M');
    });
  }
  // Odczepienie eventów do wciskania klawiszy, potrzebne przy win i game_over, by user wiedział kiedy gra sie skonczyla
  function locking() {
    $(document).unbind('keyup', key_q);
    $(document).unbind('keyup', key_w);
    $(document).unbind('keyup', key_e);
    $(document).unbind('keyup', key_r);
    $(document).unbind('keyup', key_t);
    $(document).unbind('keyup', key_y);
    $(document).unbind('keyup', key_u);
    $(document).unbind('keyup', key_i);
    $(document).unbind('keyup', key_o);
    $(document).unbind('keyup', key_p);
    $(document).unbind('keyup', key_a);
    $(document).unbind('keyup', key_s);
    $(document).unbind('keyup', key_d);
    $(document).unbind('keyup', key_f);
    $(document).unbind('keyup', key_g);
    $(document).unbind('keyup', key_h);
    $(document).unbind('keyup', key_j);
    $(document).unbind('keyup', key_k);
    $(document).unbind('keyup', key_l);
    $(document).unbind('keyup', key_z);
    $(document).unbind('keyup', key_x);
    $(document).unbind('keyup', key_c);
    $(document).unbind('keyup', key_v);
    $(document).unbind('keyup', key_b);
    $(document).unbind('keyup', key_n);
    $(document).unbind('keyup', key_m);
    $(document).unbind('keyup', key_enter);
  }

  function picking() {
    if ($('.picking option:selected').text() != 'Select ...') {
      $('.first_pick').hide(0);
    }
    switch ($('.picking option:selected').text()){
			case 'Q':
				$('.selected').text('Q');
				break;
			case 'W':
				$('.selected').text('W');
				break;
			case 'E':
				$('.selected').text('E');
				break;
			case 'R':
				$('.selected').text('R');
				break;
			case 'T':
				$('.selected').text('T');
				break;
			case 'Y':
				$('.selected').text('Y');
				break;
			case 'U':
				$('.selected').text('U');
				break;
			case 'I':
				$('.selected').text('I');
				break;
			case 'O':
				$('.selected').text('O');
				break;
			case 'P':
				$('.selected').text('P');
				break;
			case 'A':
				$('.selected').text('A');
				break;
			case 'S':
				$('.selected').text('S');
				break;
			case 'D':
				$('.selected').text('D');
				break;
			case 'F':
				$('.selected').text('F');
				break;
			case 'G':
				$('.selected').text('G');
				break;
			case 'H':
				$('.selected').text('H');
				break;
			case 'J':
				$('.selected').text('J');
				break;
			case 'K':
				$('.selected').text('K');
				break;
			case 'L':
				$('.selected').text('L');
				break;
			case 'Z':
				$('.selected').text('Z');
				break;
			case 'X':
				$('.selected').text('X');
				break;
			case 'C':
				$('.selected').text('C');
				break;
			case 'V':
				$('.selected').text('V');
				break;
			case 'B':
				$('.selected').text('B');
				break;
			case 'N':
				$('.selected').text('N');
				break;
			case 'M':
				$('.selected').text('M');
				break;
    }
		/*
    if ($('.picking option:selected').text() == 'Q') {
      $('.selected').text('Q');
    } else if ($('.picking option:selected').text() == 'W') {
      $('.selected').text('W');
    } else if ($('.picking option:selected').text() == 'E') {
      $('.selected').text('E');
    } else if ($('.picking option:selected').text() == 'R') {
      $('.selected').text('R');
    } else if ($('.picking option:selected').text() == 'T') {
      $('.selected').text('T');
    } else if ($('.picking option:selected').text() == 'Y') {
      $('.selected').text('Y');
    } else if ($('.picking option:selected').text() == 'U') {
      $('.selected').text('U');
    } else if ($('.picking option:selected').text() == 'I') {
      $('.selected').text('I');
    } else if ($('.picking option:selected').text() == 'O') {
      $('.selected').text('O');
    } else if ($('.picking option:selected').text() == 'P') {
      $('.selected').text('P');
    } else if ($('.picking option:selected').text() == 'A') {
      $('.selected').text('A');
    } else if ($('.picking option:selected').text() == 'S') {
      $('.selected').text('S');
    } else if ($('.picking option:selected').text() == 'D') {
      $('.selected').text('D');
    } else if ($('.picking option:selected').text() == 'F') {
      $('.selected').text('F');
    } else if ($('.picking option:selected').text() == 'G') {
      $('.selected').text('G');
    } else if ($('.picking option:selected').text() == 'H') {
      $('.selected').text('H');
    } else if ($('.picking option:selected').text() == 'J') {
      $('.selected').text('J');
    } else if ($('.picking option:selected').text() == 'K') {
      $('.selected').text('K');
    } else if ($('.picking option:selected').text() == 'L') {
      $('.selected').text('L');
    } else if ($('.picking option:selected').text() == 'Z') {
      $('.selected').text('Z');
    } else if ($('.picking option:selected').text() == 'X') {
      $('.selected').text('X');
    } else if ($('.picking option:selected').text() == 'C') {
      $('.selected').text('C');
    } else if ($('.picking option:selected').text() == 'V') {
      $('.selected').text('V');
    } else if ($('.picking option:selected').text() == 'B') {
      $('.selected').text('B');
    } else if ($('.picking option:selected').text() == 'N') {
      $('.selected').text('N');
    } else if ($('.picking option:selected').text() == 'M') {
      $('.selected').text('M');
    }
		*/
  }


  select_slider.on('change', reroll); // Przypiecie losowania hasla do wybrania jednej opcji z slidera 

  picker.on('change', picking);

  // Uruchomienie, wczesniej opisanych trzech funkcji
  first_run();
  pressing();
  locking();

  // Graficznie pokazania przed wyborem kategorii ze slidera, ze klawisze surrender, ktory wywoluje game over i refresh, który wywołuje reroll pytania sa niedostepne
  refresh.css('background-color', 'red');
  surrender.css('background-color', 'red');

  // Wylaczenie z dzialania klawiszy z literami, przy pierwszym uruchomieniu, czyli przed wyborem kategorii ze slidera
  $('.row').children('button').off('click');

});
