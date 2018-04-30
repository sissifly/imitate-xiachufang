$(function(){
  // $('#search').on('click', function(e){
  //   $(e.currentTarget).val('');
  // });
  $('.photo-search').on('click', function(){
    $('.layer-box').show();
    setTimeout(function () {
      $('.layer-box').hide();
    }, 2000);
  });
});