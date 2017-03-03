$(document).ready(function(){
  
  var switcher = $('.play_me');
  
  var body_bg = $('body');
  var main_bg = $('main');
  
  switcher.on('click',function(){
    
    $('section.intro').slideUp(1000);
    
    $('section.category_btns').slideDown(1000);
    $('section.score').slideDown(1000);
    $('section.typing').slideDown(1000);
    $('section.keyboard').slideDown(1000);
    
    body_bg.css('background-image',"url(images/limbo.jpg)");
    body_bg.css('background-size','cover');
    body_bg.css('background-repeat','no-repeat');
    
  })
  
});