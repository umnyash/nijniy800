$(function () {
var swiperArticlesNewMain = !1;
$(".articlesNew-main__slider").length > 0 && (swiperArticlesNewMain = new Swiper(".articlesNew-main__slider", {
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slidesPerView: 3,
    spaceBetween: 60,
    speed: 800,
    navigation: {
        nextEl: '.articlesNew-main__slider .swiper-button-next',
        prevEl: '.articlesNew-main__slider .swiper-button-prev',
    },
    breakpoints: {
        1799: {
            spaceBetween: 40,
            slidesPerView: 3,
        },
        1024: {
            spaceBetween: 30,
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        478: {
            slidesPerView: 1,
            spaceBetween: 15,
        },
        300: {
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: false,
        }
    }
}));

$(document).on('click', '.articlesNew__item_vkvideo', function () {
    var el = $(this);
	
	$('.articlesNew__item_vkvideo').removeClass('active');
	el.addClass('active');	
    var el_link = el.attr('data-video');
	var el_embed_box = el.find('.articlesNew__item_vkvideo-embedbox');
	
	el_embed_box.append('<iframe/>');
	var el_embed_box_iframe = el_embed_box.find('iframe');
	
	el_embed_box_iframe.attr("src", "");
	el_embed_box_iframe.attr('src', el_link + '&rel=0&showinfo=0&autoplay=1');
	el_embed_box_iframe.attr("allow", "autoplay; encrypted-media; fullscreen; picture-in-picture");
});

});