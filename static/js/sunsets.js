$(document).ready(function () {
  let sunsetEventsSwiper = new Swiper(".sunsets-events-swiper", {
    observer: true,
    observeParents:true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.sunsets-events-swiper-navigation .swiper-button-next',
      prevEl: '.sunsets-events-swiper-navigation .swiper-button-prev',
    },
    breakpoints: {
      1439: {
        slidesPerView: 2,
        spaceBetween: 11,
      },
      1280: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
    on: {
      init: function () {
      }
    },
  });

  let month = $(".sunsets-events__month.active").attr("data-switch")
  let index = $(".sunsets-events-slide[data-switch=" + month + "]").index();
  sunsetEventsSwiper.slideTo(index)

  $(document).on("click", ".sunsets-events__month:not(.active)", function () {
    $(".sunsets-events__month").removeClass("active");
    $(this).addClass("active");
    let data = $(this).data("switch");
    let index = $(".sunsets-events-slide[data-switch=" + data + "]").index();
    sunsetEventsSwiper.slideTo(index);
  });
});
		
/*Video start*/	
$(document).on("click", ".video_wrap_pre", function() {	
  var e = $(this).attr("data-video");	
  $(this).fadeOut(300, function() {	
      $(this).parent().find(".video_wrap_frame iframe").attr("src", e + "?autoplay=1")	
  })	
})	
