$(function(){
  // 以图搜图
  $('.photo-search').on('click', function(){
    $('.layer-box').show();
    setTimeout(function () {
      $('.layer-box').hide();
    }, 2000);
  });
  $('.search-input').on('click', function(e){
    // 搜索框激活
    $('.home-init').hide();
    $('.search-icon').hide();
    $(e.currentTarget).parent().removeClass('search-box').addClass('search-status');
    $('.triangle-icon').show();
    $('.search-text').show();
    $('.search-input').addClass('input-active');

    // 显示搜索历史
    $('.search-history').show();
  });
  // 关闭搜索框
  $('.triangle-icon').on('click', function(e){
    $(e.currentTarget).parent().removeClass('search-status').addClass('search-box');
    $('.home-init').show();
    $('.search-icon').show();
    $(e.currentTarget).hide();
    $('.search-text').hide();
    $('.search-input').removeClass('input-active');
    // 隐藏搜索历史
    $('.search-history').hide();
  });


  $('.search-key').on('click', function(e){
    window.location.href = 'searchResult.html';
  });
  $('.search-text').on('click', function(e){
    console.log('2');
    if($('.search-input').val()!== ''){
      window.location.href = 'searchResult.html';
    } else {
      $('.layer-tip-text').html('请输入搜索内容');
      $('.layer-box').show();
      setTimeout(function () {
        $('.layer-box').hide();
      }, 1000);
    }
  });

});
