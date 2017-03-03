$(document).ready(function(){
    
    // Podstawowe zmienne z pozyskane z elementów DOM : ----------------------------
    
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
      
    var hm_url = "https://api.myjson.com/bins/193uyt/";
    
    var json = (function () {
        $.ajax({
            'async': false,
            'global': true,
            'url': hm_url,
            'dataType': "json"
        }).done(function(data){
            json = data;
        });
        return json;
    })(); 
    
    //console.log(json);

    var animals_pool = json['0'].animals_pool;
    var body_pool = json['0'].body_pool;
    var buildings_pool = json['0'].buildings_pool;
    var city_pool = json['0'].city_pool;
    var clothes_pool = json['0'].clothes_pool;
    var computer_pool = json['0'].computer_pool;
    var cosmetics_pool = json['0'].cosmetics_pool;
    var criminals_pool = json['0'].criminals_pool;
    var family_pool = json['0'].family_pool;
    var fruits_pool = json['0'].fruits_pool;
    var geography_pool = json['0'].geography_pool;
    var house_pool = json['0'].house_pool;
    var jobs_pool = json['0'].jobs_pool;
    var music_pool = json['0'].music_pool;
    var subjects_pool = json['0'].subjects_pool;
    var sports_pool = json['0'].sports_pool;
    var trees_pool = json['0'].trees_pool;
    var vehicles_pool = json['0'].vehicles_pool;
    var weather_pool = json['0'].weather_pool;
    var zodiac_pool = json['0'].zodiac_pool;
    
	$('button').css('type','button');
    
    var sel = $('select');
    var selected = $('.selected');
    
    var old_path = 'url(../images/hangman_slides.png)';
    var new_path = 'url(../images/hm_win.png)';
	
	var myWord = 0;
    var run_iteration = 0;
    
    var life_number = 7;
    heart_count.text(life_number);
    
    var win_number = 0;
    win_count.text(win_number);
    
    var lose_number = 0;
    lose_count.text(lose_number);
    
    // Funkcja wyłączająca wybraną już literę
	function checking(letter){
		$('button').each(function(){
			if (letter == $(this).text()){
				$(this).css('background-color','red');
				$(this).off('click');
				//console.log($(this).text());
				$('.selected').text('');
			}
		});
	}
	
    // Funkcja wybru kategorii i wyświetlenia zamaskowanych liter hasła - kwadraty
	function first_run(){
        run_iteration = 0;
        if ($('.categories option:selected').text() == 'Animals'){
            myWord = animals_pool[Math.floor(Math.random() * animals_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Body'){
            myWord = body_pool[Math.floor(Math.random() * body_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Buildings'){
            myWord = buildings_pool[Math.floor(Math.random() * buildings_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'City'){
            myWord = city_pool[Math.floor(Math.random() * city_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Clothes'){
            myWord = clothes_pool[Math.floor(Math.random() * clothes_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Computer'){
            myWord = computer_pool[Math.floor(Math.random() * computer_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Cosmetics'){
            myWord = cosmetics_pool[Math.floor(Math.random() * cosmetics_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Criminals'){
            myWord = criminals_pool[Math.floor(Math.random() * criminals_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Family'){
            myWord = family_pool[Math.floor(Math.random() * family_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Fruits'){
            myWord = fruits_pool[Math.floor(Math.random() * fruits_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Geography'){
            myWord = geography_pool[Math.floor(Math.random() * geography_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'House'){
            myWord = house_pool[Math.floor(Math.random() * house_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Jobs'){
            myWord = jobs_pool[Math.floor(Math.random() * jobs_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Music'){
            myWord = music_pool[Math.floor(Math.random() * music_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Subjects'){
            myWord = subjects_pool[Math.floor(Math.random() * subjects_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Sports'){
            myWord = sports_pool[Math.floor(Math.random() * sports_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Trees'){
            myWord = trees_pool[Math.floor(Math.random() * trees_pool.length)];
            //sel.attr('disabled', 'disabled');
        }
        else if ($('.categories option:selected').text() == 'Vehicles'){
            myWord = vehicles_pool[Math.floor(Math.random() * vehicles_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Weather'){
            myWord = weather_pool[Math.floor(Math.random() * weather_pool.length)];
        }
        else if ($('.categories option:selected').text() == 'Zodiac'){
            myWord = zodiac_pool[Math.floor(Math.random() * zodiac_pool.length)];
        }
        
        if ($('.categories option:selected').text() != 'Select ...'){
           sel.attr('disabled', 'disabled');
           $('.first_opt').css('display','none');
           myWord = myWord.toUpperCase();
		   letters.children().each(function(){
                $(this).remove();
           })
           
           surrender.one('click', game_over);
           surrender.css('background-color', 'green');
           accept.on('click', testing);
		   console.log(myWord); // CHEAT !!! :)
		}

		for (var a=0; a < myWord.length; a++){
			var square = $('<div>');
			square.addClass('center');
			square.addClass('square');
			letters.append(square);
		}
        sprite.removeClass('new_path');
        sprite.addClass('old_path');
        sprite.css('width','150px');
        sprite.css('background-position', '0px 0px');
        
        life_number = 7;
        heart_count.text(life_number);
    
	}
    
    // Funkcja sprawdzająca, czy wybrana litera A-Z jest pod dowolną pozycją w szukanym haśle : --------
	function testing(){
		if(selected.text() !== ''){
		var value_letter = $('.selected').text();
		//console.log('moja litera', value_letter);
		checking(value_letter);
		var squares = $('.letters').children('div');
		var check = 0;
        var iteration = 0;
		for (var b=0; b < squares.length; b++){
			if (value_letter == myWord.charAt(b)){
				squares.eq(b).text(value_letter);
				check += 1;
                //$.playSound('../The_Hangman/sounds/correct');
                $.playSound('./sounds/correct');
			}
            if (squares.eq(b).text() !== ''){
                iteration += 1;
            }
		}
		if (check == 0) {
				run_iteration -= 150;
				//console.log(run_iteration);
				sprite.animate({backgroundPositionX: run_iteration + 'px'},1000);
				life_number -= 1;
				heart_count.text(life_number);
				if (run_iteration == (-1050)){
					game_over();
				}
                else {
                    //$.playSound("../The_Hangman/sounds/wrong");
                    $.playSound("./sounds/wrong");
                }
			}
			if (iteration == squares.length){

				sprite.removeClass('old_path');
				sprite.addClass('new_path');
				sprite.css('width','160px');
				sprite.css('background-position','left');
				$('.row').find('button').each(function(){
					$(this).off('click');
					$(this).css('background-color','green');
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
        refresh.one('click', reroll);
        refresh.css('background-color','green');
        sel.removeAttr('disabled');
			}
		};
        // Jeśli dana wybrana litera została już sprawdzona, odczepiana zostaje już litera 
		if (value_letter === 'Q'){
			$(document).unbind('keyup', key_q);
		}
		else if (value_letter === 'W'){
			$(document).unbind('keyup', key_w);
		}
		else if (value_letter === 'E'){
			$(document).unbind('keyup', key_e);
		}
		else if (value_letter === 'R'){
			$(document).unbind('keyup', key_r);
		}
		else if (value_letter === 'T'){
			$(document).unbind('keyup', key_t);
		}
		else if (value_letter === 'Y'){
			$(document).unbind('keyup', key_y);
		}
		else if (value_letter === 'U'){
			$(document).unbind('keyup', key_u);
		}
		else if (value_letter === 'I'){
			$(document).unbind('keyup', key_i);
		}
		else if (value_letter === 'O'){
			$(document).unbind('keyup', key_o);
		}
		else if (value_letter === 'P'){
			$(document).unbind('keyup', key_p);
		}
		else if (value_letter === 'A'){
			$(document).unbind('keyup', key_a);
		}
		else if (value_letter === 'S'){
			$(document).unbind('keyup', key_s);
		}
		else if (value_letter === 'D'){
			$(document).unbind('keyup', key_d);
		}
		else if (value_letter === 'F'){
			$(document).unbind('keyup', key_f);
		}
		else if (value_letter === 'G'){
			$(document).unbind('keyup', key_g);
		}
		else if (value_letter === 'H'){
			$(document).unbind('keyup', key_h);
		}
		else if (value_letter === 'J'){
			$(document).unbind('keyup', key_j);
		}
		else if (value_letter === 'K'){
			$(document).unbind('keyup', key_k);
		}
		else if (value_letter === 'L'){
			$(document).unbind('keyup', key_l);
		}
		else if (value_letter === 'Z'){
			$(document).unbind('keyup', key_z);
		}
		else if (value_letter === 'X'){
			$(document).unbind('keyup', key_x);
		}
		else if (value_letter === 'C'){
			$(document).unbind('keyup', key_c);
		}
		else if (value_letter === 'V'){
			$(document).unbind('keyup', key_v);
		}
		else if (value_letter === 'B'){
			$(document).unbind('keyup', key_b);
		}
		else if (value_letter === 'N'){
			$(document).unbind('keyup', key_n);
		}
		else if (value_letter === 'M'){
			$(document).unbind('keyup', key_m);
		}
	}
    
	surrender.off('click'); // Wyłącznie klikania z guzika surrender
	
    // Funkcja, która powiadomi o przegranej grze
    function game_over(e){
        surrender.off('click');
        sel.removeAttr('disabled');
        refresh.one('click', reroll);
        refresh.css('background-color','green');
		var squares = $('.letters').children('div');
		for (var c=0; c < myWord.length; c++){
			squares.eq(c).text(myWord.charAt(c));
		}
        $('.row').find('button').each(function(){
            $(this).off('click');
            $(this).css('background-color','red');
        });
        accept.off('click');
        accept.css('background-color','red');
        sprite.css('background-position','right');
        locking();
        lose_count.text(parseInt(lose_count.text())+1);
        //$.playSound("../The_Hangman/sounds/loose");
        $.playSound("./sounds/loose");
	};
		
	accept.off('click'); // Wyłączenie klikania z guzika akceptacji - z napisem ENTER
	
    function reroll(){
        accept.on('click', testing);
        refresh.off('click');
		first_run();
		pressing();
        surrender.css('background-color','gainsboro');
        refresh.css('background-color', 'red');
	};
    
    refresh.off('click'); // Wyłączenie klikania z guzika odświeżania - czyli losowania nowego hasła
	
    // Funkcje key_.. , gdzie '..' to dany znak litery, rozponaje, ktory klawisz zostal wcisniety z klawiatury
	function key_q(q){
		if (q.key == 'q'){
			selected.text('Q');
		}
	}
	
	function key_w(w){
		if (w.key == 'w'){
			selected.text('W');
		}
	}
	
	function key_e(e){
		if (e.key == 'e'){
			selected.text('E');
		}
	}
	
	function key_r(r){
		if (r.key == 'r'){
			selected.text('R');
		}
	}
	
	function key_t(t){
		if (t.key == 't'){
			selected.text('T');
		}
	}
	
	function key_y(y){
		if (y.key == 'y'){
			selected.text('Y');
		}
	}
	
	function key_u(u){
		if (u.key == 'u'){
			selected.text('U');
		}
	}
	
	function key_i(i){
		if (i.key == 'i'){
			selected.text('I');
		}
	}
	
	function key_o(o){
		if (o.key == 'o'){
			selected.text('O');
		}
	}
	
	function key_p(p){
		if (p.key == 'p'){
			selected.text('P');
		}
	}
	
	function key_a(a){
		if (a.key == 'a'){
			selected.text('A');
		}
	}
	
	function key_s(s){
		if (s.key == 's'){
			selected.text('S');
		}
	}
	
	function key_d(d){
		if (d.key == 'd'){
			selected.text('D');
		}
	}
	
	function key_f(f){
		if (f.key == 'f'){
			selected.text('F');
		}
	}
	
	function key_g(g){
		if (g.key == 'g'){
			selected.text('G');
		}
	}
	
	function key_h(h){
		if (h.key == 'h'){
			selected.text('H');
		}
	}
	
	function key_j(j){
		if (j.key == 'j'){
			selected.text('J');
		}
	}
	
	function key_k(k){
		if (k.key == 'k'){
			selected.text('K');
		}
	}
	
	function key_l(l){
		if (l.key == 'l'){
			selected.text('L');
		}
	}
	
	function key_z(z){
		if (z.key == 'z'){
			selected.text('Z');
		}
	}
	
	function key_x(x){
		if (x.key == 'x'){
			selected.text('X');
		}
	}
	
	function key_c(c){
		if (c.key == 'c'){
			selected.text('C');
		}
	}
	
	function key_v(v){
		if (v.key == 'v'){
			selected.text('V');
		}
	}
	
	function key_b(b){
		if (b.key == 'b'){
			selected.text('B');
		}
	}
	
	function key_n(n){
		if (n.key == 'n'){
			selected.text('N');
		}
	}
	
	function key_m(m){
		if (m.key == 'm'){
			selected.text('M');
		}
	}
	
	function key_enter(ent){
		if (ent.keyCode == 13){
			testing();
		}
	}
    
    // Funkcja przypisujaca eventy do documentu
	function pressing(){
		$('button').css('background-color','gainsboro');
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
		$('.button_Q').on('click',function(){
			$('.selected').text('Q');
		});
		$('.button_W').on('click',function(){
			$('.selected').text('W');
		});
		$('.button_E').on('click',function(){
			$('.selected').text('E');
		});
		$('.button_R').on('click',function(){
			$('.selected').text('R');
		});
		$('.button_T').on('click',function(){
			$('.selected').text('T');
		});
		$('.button_Y').on('click',function(){
			$('.selected').text('Y');
		});
		$('.button_U').on('click',function(){
			$('.selected').text('U');
		});
		$('.button_I').on('click',function(){
			$('.selected').text('I');
		});
		$('.button_O').on('click',function(){
			$('.selected').text('O');
		});
		$('.button_P').on('click',function(){
			$('.selected').text('P');
		}); // ----------------------
		$('.button_A').on('click',function(){
			$('.selected').text('A');
		});
		$('.button_S').on('click',function(){
			$('.selected').text('S');
		});
		$('.button_D').on('click',function(){
			$('.selected').text('D');
		});
		$('.button_F').on('click',function(){
			$('.selected').text('F');
		});
		$('.button_G').on('click',function(){
			$('.selected').text('G');
		});
		$('.button_H').on('click',function(){
			$('.selected').text('H');
		});
		$('.button_J').on('click',function(){
			$('.selected').text('J');
		});
		$('.button_K').on('click',function(){
			$('.selected').text('K');
		});
		$('.button_L').on('click',function(){
			$('.selected').text('L');
		}); //-----------------
		$('.button_Z').on('click',function(){
			$('.selected').text('Z');
		});
		$('.button_X').on('click',function(){
			$('.selected').text('X');
		});
		$('.button_C').on('click',function(){
			$('.selected').text('C');
		});
		$('.button_V').on('click',function(){
			$('.selected').text('V');
		});
		$('.button_B').on('click',function(){
			$('.selected').text('B');
		});
		$('.button_N').on('click',function(){
			$('.selected').text('N');
		});
		$('.button_M').on('click',function(){
			$('.selected').text('M');
		});
	}
    // Odczepienie eventów do wciskania klawiszy, potrzebne przy win i game_over, by user wiedział kiedy gra sie skonczyla
    function locking(){   
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
    
    select_slider.on('change',reroll); // Przypiecie losowania hasla do wybrania jednej opcji z slidera 
	
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
  