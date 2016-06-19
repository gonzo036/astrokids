$(document).ready(function() {
  
  $('.zodiac_sings li').click(
    function(e) {
    e.preventDefault(); // prevent the default action
    e.stopPropagation; // stop the click from bubbling
    $(this).closest('.zodiac_sings').find('.active').removeClass('active');
    $(this).addClass('active');

  });


  // open menu footer
  $('.menu_close').click(function() {
    $(this).animate({'bottom': '-300'}, 400);
    $('.circle_menu_open').delay(700).fadeIn(400);
    $('.circle_menu_open').css('background', 'url(assets/item_1.png) no-repeat 0px -10px');
    $('.item_1').addClass('active');
    $('.menu_open').css('display', 'block').animate({'bottom': '0'}, 400);
  });
  // open menu footer

  $('.menu_open').mouseenter(function() {
    $(this).css('display', 'block');
  });

  // close menu footer
  $('.menu_open').mouseleave(function() {
    $('.menu_close').animate({'bottom': '25'}, 400);
    $('.circle_menu_open').delay(100).fadeOut(400);
    $('.item_1, .item_2, .item_3, .item_4 , .item_5').removeClass('active');
    $('.menu_open').fadeOut(400).animate({'bottom': '-100'}, 400);
    $('.circle_menu_open').animate({'left': '-4.855555555555%;'}, 600);
  });
  // close menu footer
    

  $('.menu_open li a').click(
    function(e) {
    e.preventDefault(); // prevent the default action
    e.stopPropagation; // stop the click from bubbling
    $(this).closest('ul').find('.active').removeClass('active');
    $(this).parent().addClass('active');


    // animate mini galaxy footer
    if($('.item_1').hasClass('active')){
      $('.circle_menu_open').animate({'left': '-4.855555555555%'}, 600);
      $('.circle_menu_open').css('background', 'url(assets/item_1.png) no-repeat 0px -10px');
    } else if ($('.item_2').hasClass('active')){
      $('.circle_menu_open').animate({'left': '19.855556%'}, 600);
      $('.circle_menu_open').css('background', 'url(assets/item_2.png) no-repeat center 0px');
    } else if ($('.item_3').hasClass('active')){
      $('.circle_menu_open').animate({'left': '44.1%'}, 600);
      $('.circle_menu_open').css('background', 'url(assets/item_3.png) no-repeat center 0px');
    } else if ($('.item_4').hasClass('active')){
      $('.circle_menu_open').animate({'left': '68.5%'}, 600);
      $('.circle_menu_open').css('background', 'url(assets/item_4.png) no-repeat center 0px');
    } else if ($('.item_5').hasClass('active')){
      $('.circle_menu_open').animate({'left': '92.8%'}, 600);
      $('.circle_menu_open').css('background', 'url(assets/item_5.png) no-repeat center 0px');
    }
    // animate mini galaxy footer

  });

  // controls left
  $('.open_control').click(function() {
    $(this).toggleClass('active');
    $('.controls_left .controls li').animate({'margin-left': '0'}, 400);

    if($('.open_control').hasClass('active'))
      {
      } else {
        $('.controls_left .controls li').animate({'margin-left': '-100'}, 400);
      }

  });
  // controls left
  
  



});