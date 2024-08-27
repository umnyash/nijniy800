var iSOtherContentLoaded = false;

function getOtherContent(data) {
  $.post(document.location.href, {
    action: 'getSunsetsEvents',
  }, function (result) {
    result = JSON.parse(result);

    window.sunsetEventsSwiper.removeAllSlides();
    window.sunsetEventsSwiper.appendSlide(result.data);

    iSOtherContentLoaded = true;

    if (data) {
      setTimeout(() => {
        let index = $(".sunsets-events-slide[data-switch=" + data + "]").index();
        window.sunsetEventsSwiper.slideTo(index);
      }, 100);
    }
  });
}


$(document).ready(function () {


  window.sunsetEventsSwiper = new Swiper(".sunsets-events-swiper", {
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 20,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: true,
    // },
    navigation: {
      nextEl: '.sunsets-events-swiper-navigation .swiper-button-next',
      prevEl: '.sunsets-events-swiper-navigation .swiper-button-prev',
    },
    breakpoints: {
      1439: {
        spaceBetween: 11,
        slidesPerView: 1,
      },
      1280: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
    on: {
      init: function () {
        let index = $(".sunsets-events-slide.future:eq(0)").index();
        // window.sunsetEventsSwiper.slideTo(index);
        this.slideTo(index);
      },
      slideChangeTransitionEnd: function () {
        let data = $(".sunsets-events-slide.swiper-slide-active").data("switch");
        if (data) {
          $(".sunsets-events__month").removeClass("active");
          $(".sunsets-events__month[data-switch=" + data + "]").addClass("active");
        }
        if (!iSOtherContentLoaded) {
          // getOtherContent();
        }
      },
    },
  });

  $(document).on("click", ".sunsets-events__month:not(.active)", function () {

    $(".sunsets-events__month").removeClass("active");
    $(this).addClass("active");
    let data = $(this).data("switch");
    let index = $(".sunsets-events-slide[data-switch=" + data + "]").index();
    window.sunsetEventsSwiper.slideTo(index);

    if (!iSOtherContentLoaded) {
      // getOtherContent(data);
    }
  });



});

/*Video start*/
$(document).on("click", ".video_wrap_pre", function() {
  var e = $(this).attr("data-video");
  $(this).fadeOut(300, function() {
      $(this).parent().find(".video_wrap_frame iframe").attr("src", e)
  })
})
/*Video start*/



  /* Start tourist-FAQ accordeon */
  $(document).on('click','.tourist-faq__head', function (e) {
    $(this).toggleClass('active').next().slideToggle();
    $('.tourist-faq__head').not(this).removeClass('active').next().slideUp();
  });
  /* End tourist-FAQ accordeon */




  /* Start show line */
    let t = 0;
    $(window).scroll(function() {
		
        var scrollTop = $(this).scrollTop();
		if( scrollTop <= $('.main__inner').outerHeight() - $('.footer__inner').outerHeight() ){
			$(".fixed-bottom-line").addClass("line-show") 
			
		} else {
			$(".fixed-bottom-line").removeClass("line-show")
		}
		
    })
/* End show line */


let elements = $('.scroll-anim-trigger');
let elemsTotal = elements.length;

for(let i=0; i<elemsTotal; ++i){
  let item = $(elements[i]);
  $(window).on('scroll', function() {
    let y_scroll_pos = window.pageYOffset;
    let scroll_pos_test = item.offset().top - ((item.offset().top / 100) * 25);
    if(y_scroll_pos > scroll_pos_test) {
      item.addClass('anim');
    }
});
}

  /* Start video-slider */

  if($(".slider-new-year .swiper-slide").length < 4){
    $('.slider-new-year .swiper-button-next').hide();
    $('.slider-new-year .swiper-button-prev').hide();
  }

  if ($(".slider-new-year .swiper-slide").length > 1) {
    swiperVideos = new Swiper(".slider-new-year .swiper-container", {
      observer: true,
      observeParents: true,
      spaceBetween: 25,
      slidesPerView: 3,
      speed: 1000,
      navigation: {
        nextEl: ".slider-new-year .swiper-button-next",
        prevEl: ".slider-new-year .swiper-button-prev",
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
      breakpoints: {
        1280: {
          spaceBetween: 25,
          slidesPerView: 3,
        },
        0: {
          spaceBetween: 23,
          slidesPerView: "auto",
        }
      }
    });
  }

  $(document).on("click",".video-slider-preview",function(){
    $(".video-slider__player").attr("src",urlToId($(this).data("src")));
  });


  $(document).on("click",".video-slider .pp__bg, .video-slider .pp-cross",function(){
    $(".video-slider__player").removeAttr("src");
  });


  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      $(".video-slider__player").removeAttr("src");
    }
};

function urlToId(url) {
  var video_id, ampersandPosition;
  if (url) {
      if (url.indexOf("https://youtu.be/") !== -1) {
          try {
              video_id = url.split('be/')[1];
              ampersandPosition = video_id.indexOf('&');
              if (ampersandPosition != -1) {
                  video_id = video_id.substring(0, ampersandPosition);
              }
          } catch (error) {}
      } else {
          try {
              video_id = url.split('v=')[1];
              ampersandPosition = video_id.indexOf('&');
              if (ampersandPosition != -1) {
                  video_id = video_id.substring(0, ampersandPosition);
              }
          } catch (error) {}
      }
  } else
      video_id = null;
  return "https://www.youtube.com/embed/" + video_id + "?autoplay=1&modestbranding=1&iv_load_policy=3";
}

    /* End video-slider */
