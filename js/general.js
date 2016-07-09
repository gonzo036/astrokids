var intervalBG = null;
var intervalStar = null;
var posX = 0;
var posY = 0;
var StarOwnerX = 0;
var StarOwnerY = 0;
var validCreation = 0;

//Vars Center Fn
var width = $("body").width()/2;
var height = $("body").height()/2;
var X = 0;
var Y = 0;
var posYStar;
var posXStar;
var centerX;
var centerY;

$(document).ready(function() {

  // validation



  // validation




  $('.bg_black').delay(700).fadeOut(700);

  $('.zodiac_sings li').mouseover(
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
  $('#container').click(function() {
    $('.menu_close').animate({'bottom': '0'}, 400);
    $('.circle_menu_open').delay(100).fadeOut(400);
    $('.item_1, .item_2, .item_3, .item_4 , .item_5').removeClass('active');
    $('.menu_open').fadeOut(400).animate({'bottom': '-100'}, 400);
    $('.circle_menu_open').animate({'left': '-27'}, 600);
  });
  // close menu footer
    

  $('.menu_open li a').mouseover(
    function(e) {
    e.preventDefault(); // prevent the default action
    e.stopPropagation; // stop the click from bubbling
    $(this).closest('ul').find('.active').removeClass('active');
    $(this).parent().addClass('active');


    // animate mini galaxy footer
    if($('.item_1').hasClass('active')){
      $('.circle_menu_open').animate({'left': '-29'}, 600);
      $('.circle_menu_open').css('background', 'url(assets/item_1.png) no-repeat 0px -10px');
    } else if ($('.item_2').hasClass('active')){
      $('.circle_menu_open').animate({'left': '115'}, 600);
      $('.circle_menu_open').css('background', 'url(assets/item_2.png) no-repeat center 0px');
    } else if ($('.item_3').hasClass('active')){
      $('.circle_menu_open').animate({'left': '260'}, 600);
      $('.circle_menu_open').css('background', 'url(assets/item_3.png) no-repeat center 0px');
    } else if ($('.item_4').hasClass('active')){
      $('.circle_menu_open').animate({'left': '404'}, 600);
      $('.circle_menu_open').css('background', 'url(assets/item_4.png) no-repeat center 0px');
    } else if ($('.item_5').hasClass('active')){
      $('.circle_menu_open').animate({'left': '552'}, 600);
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
  // end controls left

  // controls right
  var top_zodiac = 0;
  var valid_anim = 0;
  
  var interval1

  function animUP(){
    if(valid_anim == 0){
      top_zodiac = top_zodiac+98;
      if(top_zodiac>=0)top_zodiac=0;
      $('.zodiac_sings').animate({'margin-top': top_zodiac}, 600);
    }
  }
  function animDown(){
    if(valid_anim == 0){
      top_zodiac = top_zodiac-98;
      if(top_zodiac<=-784)top_zodiac=-784;
      $('.zodiac_sings').animate({'margin-top': top_zodiac}, 600);
    }
  }
  $('.control_up').mouseenter(function() {
    valid_anim = 0;
    animUP();
    interval1 = setInterval(function(){
      animUP();
    },600,true);
    
  });
  $('.control_up').mouseleave(function() {
    valid_anim = 1;
    clearInterval(interval1);
  });
  $('.control_down').mouseenter(function() {
    valid_anim = 0;
    animDown();
    interval1 = setInterval(function(){
      animDown();
    },600,true);
  });
  $('.control_down').mouseleave(function() {
    valid_anim = 1;
    clearInterval(interval1);
  });
  // Open Zodiac

  $('.zodiac_button').click(function() {
    $(this).animate({'margin-left': '300'}, 400);
    $('.control_up').css('display', 'block').animate({'margin-left': '10'}, 400);
    $('.control_down').css('display', 'block').animate({'margin-left': '10'}, 400);
    $('.content_zodiac_sings').css('display', 'block').animate({'margin-left': '0'}, 400);
  });

  $('#container').click(function() {
    $('.zodiac_button').animate({'margin-left': '0'}, 400);
    $('.control_up').css('display', 'block').animate({'margin-left': '300'}, 400);
    $('.control_down').css('display', 'block').animate({'margin-left': '300'}, 400);
    $('.content_zodiac_sings').css('display', 'block').animate({'margin-left': '400'}, 400);
  });

  //Animacion estrellas
  
  var X1 = 0;
  var Y1 = 0;
  var X2 = 0;
  var Y2 = 0;
  var X3 = 0;
  var Y3 = 0;
  var pX = 0;
  var pY =0;
  
  $(document).mousemove(function(event) {
    posX = event.pageX;
    posY = event.pageY;
    
  });
  window.addEventListener("touchstart", function(event){
    console.log(event.touches); // good
  });
  window.addEventListener("touchmove", function(event){
    event.preventDefault();
    posX = event.targetTouches[0].pageX;
    posY = event.targetTouches[0].pageY;
  });

    
  intervalBG = setInterval(function(){
    pX = 2000;
    pY = 0
    var width = $("body").width()/2;
    var height = $("body").height()/2;
    X1 = Number(Number((pX-width)/400))+X1;
    Y1 = Number(Number((pY-height)/400))+Y1;
    X2 = Number(Number((pX-width)/800))+X2;
    Y2 = Number(Number((pY-height)/800))+Y2;
    X3 = Number(Number((pX-width)/1200))+X3;
    Y3 = Number(Number((pY-height)/1200))+Y3;
    $('#xyz').css('backgroundPosition', String(X1+"px "+Y1+"px"));
    $('#xy').css('backgroundPosition', String(X2+"px "+Y2+"px"));
    $('#x').css('backgroundPosition', String(X3+"px "+Y3+"px"));

  }, 30);
  var signo_actual;
  var signosJson ={
    "signos":[
        {"Nombre":"Aquarius","MesInicio":"0" , "DiaInicio":"21","DiaFinal":"18","Constelacion":"aurora01.jpg"}, 
        {"Nombre":"Piscis","MesInicio":"1" , "DiaInicio":"19","DiaFinal":"20","Constelacion":"aurora01.jpg"}, 
        {"Nombre":"Aries", "MesInicio":"2" , "DiaInicio":"21","DiaFinal":"20","Constelacion":"aurora01.jpg"}, 
        {"Nombre":"Taurus", "MesInicio":"3" , "DiaInicio":"21","DiaFinal":"21","Constelacion":"aurora02.jpg"}, 
        {"Nombre":"Gemini","MesInicio":"4" , "DiaInicio":"22","DiaFinal":"21","Constelacion":"aurora02.jpg"},   
        {"Nombre":"Cancer", "MesInicio":"5" , "DiaInicio":"22","DiaFinal":"22","Constelacion":"aurora02.jpg"},   
        {"Nombre":"Leo", "MesInicio":"6" , "DiaInicio":"23","DiaFinal":"23","Constelacion":"aurora03.jpg"}, 
        {"Nombre":"Virgo","MesInicio":"7" , "DiaInicio":"24","DiaFinal":"23","Constelacion":"aurora03.jpg"}, 
        {"Nombre":"Libra", "MesInicio":"8" , "DiaInicio":"24","DiaFinal":"23","Constelacion":"aurora03.jpg"}, 
        {"Nombre":"Scorpio", "MesInicio":"9" , "DiaInicio":"24","DiaFinal":"22","Constelacion":"aurora04.jpg"}, 
        {"Nombre":"Sagittarius", "MesInicio":"10" , "DiaInicio":"23","DiaFinal":"21","Constelacion":"aurora04.jpg"}, 
        {"Nombre":"Capricorn", "MesInicio":"11" , "DiaInicio":"22","DiaFinal":"20","Constelacion":"aurora04.jpg"}
    ]
  };
  function desaparecer(elemento){
    TweenLite.to(elemento, 1, {opacity:"0", ease:Power2.easeInOut, onComplete:function(){$(elemento).css('display', 'none');}});
  }
  function aparecer(elemento){
    $(elemento).css('display', 'block');
    TweenLite.to(elemento, 1, {opacity:"1", ease:Power2.easeInOut});
  }
  function getConstelacion(){
      var day = parseInt($('#day').val());
      var month = parseInt($('#month').val());
      var year =  parseInt($('#year').val());
      var signo = signosJson.signos[month-1];
      if( signo.DiaInicio > day)
      signo = signosJson.signos[(month+12-2)%12];
      signo_actual = Number(signo.MesInicio);
      $("#date_const").text(String(validMonth(signo_actual))+" "+String(signo.DiaInicio)+" / "+String(validMonth(Number(signo_actual)+1))+" "+String(signo.DiaFinal))
      $("#name_const").text(String(signo.Nombre)+" Constellation");
      $('.sign_net').text(String(signo.Nombre));

      TweenLite.to(".form_name", 1, {opacity:"0", ease:Power2.easeInOut, onComplete:function(){$('.form_name').css('display', 'none');}});
      $('.tutorial').css('display', 'block');
      TweenLite.to(".tutorial", 1, {opacity:"1", ease:Power2.easeInOut, onComplete:Tutorial});
      //Update paara servicio
      signo_actual = Number(signo_actual-1);
      if(signo_actual == -1){
        signo_actual = 11
      }else if(signo_actual == 0){
        signo_actual = 12
      };

  }
  function validMonth(month){
    var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    if(month == 12)month = 0;
    return month_names[month];
  }
  function Tutorial(){
      TweenLite.to(".tutorial", 1, {delay:5, ease:Power2.easeInOut, onComplete:Constela});
      $('.logo, .social').animate({'top': '0'}, 500);
      $('#turorial_1').delay(1000).addClass('activate').animate({'opacity': '1'}, 500);
      $('#turorial_2').delay(2500).addClass('activate').animate({'opacity': '1'}, 500);
      $('#turorial_3').delay(3500).addClass('activate').animate({'opacity': '1'}, 500);

      if ($('#turorial_1').hasClass('active')) 
      {
        $(this).delay(1000).removeClass('activate')
      }
  }
  function Constela(){
      desaparecer($(".tutorial"));
      aparecer($(".constelaciones"));
      loadStar();
      //Al final de la carga de las estrellas se presenta el universo
      
  }
  function Centrador(object){



    var centradorX = -X-centerX;
    var centradorY = -Y-(centerY+187);

  }
  function Crear(){
    TweenLite.to("#fondo_preload", 1, {opacity:0, onComplete:function(){clearInterval(intervalBG);$('#fondo_preload').css('display', 'none');}});
    desaparecer($(".constelaciones"));
    aparecer($(".name_star")); 
    aparecer($(".stars"));
  
    width = $("body").width()/2;
    height = $("body").height()/2;

    $('.coords').css('display', 'block');
    function intervalStar(){
      intervalStar = setInterval(function(){ 
        
        posYStar = posY-23;
        posXStar = posX-23;

        centerX = (posX-width)
        centerY =(posY-height)

        

        TweenLite.to(".name_star", 0.1, {top:posYStar, left:posXStar, ease:Power2.easeInOut});
        
        //TweenLite.to("body", 0.1, {backgroundPosition:String(Number(-X)+"px "+Number(-Y)+"px"), ease:Power2.easeInOut});

        if(centerX <= -200 || centerX >= 200 || centerY <= -200 || centerY >= 200){
          X = Number(Number((posX-width))/80)+X;
          Y = Number(Number((posY-height))/80)+Y;
          if(X<=-1000) X=-1000;
          if(X>=1000) X=1000;
          if(Y<=-1000) Y=-1000;
          if(Y>=1000) Y=1000;
          $('body').css('backgroundPosition', String(Number(-X+200)+"px "+Number(-Y+200)+"px"));
          TweenLite.to(".stars", 0.1, {top:String(-Number(Y+200)+"px"), left:String(-Number(X+200)+"px"), ease:Power2.easeInOut});
        }
        //$('.stars').css('top', String(-Y+"px"));
        //$('.stars').css('left', String(-X+"px"));
          
      }, 20);
    }
    intervalStar();
    $('body').on('click', function() {
      if(validCreation ==0){
        $(this).off('click');
        $('body').on('click', function() {
          
          clearInterval(intervalStar);
          desaparecer($('.form_name'));
          $( ".owner" ).remove();
          Crear();
          
        });
        clearInterval(intervalStar);
        var stars = $('.stars');
        StarOwnerX = Number(X+posXStar);
        StarOwnerY = Number(Y+posYStar);
        stars.append('<div class="star owner" position_x="'+ StarOwnerX + '" position_y="'+ StarOwnerY + '" style="left: '+ StarOwnerX + 'px; top:'+  StarOwnerY + 'px; display: block; position: absolute;"><img id="seleccionador" src="assets/img_form_top.png" alt=""><spam></><spam></p></div>');
        var centradorX = -X-centerX;
        var centradorY = -Y-(centerY+187);
        desaparecer($('.name_star'));
        $('#form1').css('display', 'block');
        $('#form2').css('display', 'none');
        $('.form_name').removeClass('big_1');
        aparecer($('.form_name'));
        TweenLite.to('.stars', 1, {top:Number(centradorY), left:Number(centradorX), ease:Power2.easeInOut});
      }else{
        alert("You are trying over another star! Please move");
      }
    });

    
  }

  $('#start').click(function() {
    $('.logo, .social').animate({'top': '0'}, 500);
    clearInterval(intervalStar);
    desaparecer($('.name_star'));
    desaparecer($('.stars'));
    desaparecer($('.star_social'));
    desaparecer($('.constelaciones'));
    desaparecer($('.tutorial'));
    desaparecer($('#form1, #form2, .form_name'));
  });
  function SaveStar(){
    var day = parseInt($('#day').val());
    var month = parseInt($('#month').val());
    var year =  parseInt($('#year').val());
    var name = String($('#name_input').val());
    var url = "http://stars.360astrokids.com/api/v1/constellations/"+signo_actual+"/stars";
    var data = {
        "name": String(name),
        "position_x": Number(StarOwnerX),
        "position_y": Number(StarOwnerY),
        "date_birth": String(year+"-"+month+"-"+day),
        "color": "red",
        "size": "M"
    };
    //Listo para instalar el servicio de guardado
    $.post(url,data,endSaveStar(data, status));
  }
  function endSaveStar(data, status){
    //Animacion de explosion va aquí
    console.log(JSON.stringify(data)+" "+status);
    $('#seleccionador').attr('src','assets/star.png');
    aparecer($(".star_social"));
  }

  $('#form2').submit(function(e) {
    e.preventDefault();
    //alert($(this).validationEngine(('validate')))
    //$('#explore').click(function() {
    if ($(this).validationEngine('validate')) {
        getConstelacion();
    }
  });

  $('#form1').submit(function(e) {
    e.preventDefault();
    //alert($(this).validationEngine(('validate')))
    //$('#explore').click(function() {
    if ($(this).validationEngine('validate')) {
        alert("Creating Star...");
        $('.name_net').text($('#name_input').val());
        desaparecer($(".form_name"));
        SaveStar();
      }
  });

  $('#form_child_today').submit(function(e) {
    e.preventDefault();
    //alert($(this).validationEngine(('validate')))
    //$('#explore').click(function() {
    if ($(this).validationEngine('validate')) {
        getConstelacion();
    }
  });


  var allStars;
  var showStars = false;

  function loadStar(){
      var stars = $('.stars')
      var colors = ['color-blue','color-orange','color-purple','color-red','color-green','color-no-color','color-no-color','color-no-color','color-no-color','color-no-color','color-no-color','color-no-color','color-no-color','color-no-color'];
      var sizes = ['age-one','age-two','age-three','age-four','age-five','age-six','age-seven'];
      var url_stars = "http://stars.360astrokids.com/api/v1/constellations/"+signo_actual+"/stars";
      alert(url_stars);
      $.get(url_stars).done(function( data ) {
        //Fin constelaciones
        Crear();
        showStars = true;
        allStars = data.stars;
        alert(data.stars);
        //***limitador***
        //allStars.length = 10;
        if(allStars.length >=0){
          for(i= 0;i<allStars.length;++i){
            var posx = allStars[i].position_x % 2000;
            var posy = allStars[i].position_y % 2000;
            stars.append('<div class="star" style="left: '+ posx + 'px; top:'+  posy + 'px; display: block; position: absolute;"><img  src="assets/star_u.png" alt=""><p>'+allStars[i].name+'</p></div>')
          }
          loadEventsStars();
        }
      });
    };
    //Carga de eventos para las estrellas
    function loadEventsStars(){
      $('.star').mouseover(function() {
        validCreation = 1;
        $(this).children('p').animate({'opacity': '1'}, 200);
      });
      $('.star').mouseleave(function() {
        validCreation = 0;
        $(this).children('p').animate({'opacity': '0'}, 200);
      });
    }

});

