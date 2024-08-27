const allVideoItm = document.querySelectorAll(".allvideos-item")
if (allVideoItm) {
  allVideoItm.forEach(item => {
    let galleryThumbs = new Swiper(item.querySelector('.allvideos-slider-sub'), {
      observer: true,
      observeParents: true,
      spaceBetween: 10,
      slidesPerView: 3,
      navigation: {
        nextEl: item.querySelector('.slider-button-next'),
        prevEl: item.querySelector('.slider-button-prev'),
      },
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      });
    let galleryMain = new Swiper(item.querySelector('.allvideos-slider'), {
      observer: true,
      observeParents: true,
      spaceBetween: 10,
      speed:800,
      thumbs: {
      swiper: galleryThumbs
      }
      }); 
  });
}
$(function(){   
  $('.popup-video').on('click', function(){
    var src = $(this).data('src');
    var date = $(this).data('date');
    var title = $(this).data('title');
    var descr = $(this).data('description');    
    $('.video-modal__player iframe').attr("src", src);
    $('.video-modal__info .subtext-date').html(date);
    $('.video-modal__info .video-modal__title').html(title);
    $('.video-modal__info .video-modal__text').html(descr);
  });
});