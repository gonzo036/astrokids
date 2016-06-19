$(document).ready(function() {
  
  $('.zodiac_sings li').click(
    function(e) {
    e.preventDefault(); // prevent the default action
    e.stopPropagation; // stop the click from bubbling
    $(this).closest('.zodiac_sings').find('.active').removeClass('active');
    $(this).addClass('active');

  });


});