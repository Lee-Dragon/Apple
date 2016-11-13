$(function(){
  //pc端的搜索
  $('#search').on('click',function(){

    $('.header').addClass('searching');
    $('.mask').show().css({'z-index':0,'opacity':1})
  });
  $('.bag').on('click',function(){
    $('.header').removeClass('searching').find('.mask').hide();
  })
  //移动端的搜索
  $('.phone-list .menu').on('click',function(){
    $('.header').toggleClass('drop');
    
  })
  //轮播开始
  var slides = $('.wrapper a');
  var dots=$('.dot-nav .dot');
  var moving=false;

  var moveTo=function(el,dir){
    $('.header').css('background','rgba(0,0,0,0.8)')
    moving=true;
    var active=slides.filter('.active');

    if (dir==='right') {
      //当前移出动画
      active.removeClass('active')
          .addClass('leave')
          .delay(800).queue(function(){
              $(this).removeClass('leave').dequeue();
            moving=false;
          });
      //下一张移入动画
      $(el).addClass('active').addClass('right');
      slides.get(0).offsetWidth;//强制重绘页面来显示动画
      $(el).removeClass('right');
    }else if (dir==='left') {
      //当前图片的动画
      active.removeClass('active')
          .addClass('right')
          .delay(800)
          .queue(function(){
            $(this).removeClass('right').dequeue();
            moving=false;
            // $(el).addClass('active')


          });

      $(el).addClass('active').addClass('enter');
      slides.get(0).offsetWidth;//强制重绘页面来显示动画
      $(el).removeClass('enter')
    }

    //轮播点颜色对应
    dots.removeClass('active').eq( slides.index(el) ).addClass('active');

  }
  var moveRight=function(){
    if (moving) {
      return
    }
    var active=slides.filter('.active')
    var el=active.next().length ? active.next() : slides.eq(0);
    moveTo(el,'right')
  }
  var moveLeft=function(){
    if (moving) {
      return
    }
    var active=slides.filter('.active')
    var el=active.prev().length ? active.prev() : slides.eq(-1);
    moveTo(el,'left')
  }
  $('.rbtn').on('click',moveRight);
  $('.lbtn').on('click',moveLeft);

  dots.on('click',function(){
    var active=slides.filter('.active')
    if (moving) {
      return
    }
    var i=slides.index(active);
    var n=$(this).index();
    if (i===n) {
      return;
    }
    if (i>n) {
      moveTo(slides.eq(n),'left')
    }else{
      moveTo(slides.eq(n),'right')
    }
  })
  // setInterval(moveRight,4000)
  //底部导航
  var flag=true;
  $('.footer-drop .part h3').on('click',function(){
    if (flag) {

      flag=false;
      $(this).addClass('ing');
      $(this).next().addClass('active').slideDown();;
    }else{
      flag=true;
      $(this).removeClass('ing')
      $(this).next().removeClass('active').css('display','none')
    }

  })


})//加载结束
