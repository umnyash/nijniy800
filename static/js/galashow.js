const fixedBlock = ".info-block-galashow";
const fixedLink = ".galashow-fixed-link";
const generalVideo = "general_video"
var wWidth = window.innerWidth;
var swiperFour;
var swiperFive;
var galaGalleryBottom;
var galaGalleryTop;
var swiperRecords;
var swiperVideos;

function toggleFixedBlock(block) {
  if (window.innerWidth > 1279) {
    if (window.scrollY > window.innerHeight) {
      block.addClass("show");
    }
    else {
      block.removeClass("show");
    }
  }
  else return false;
}

function toggleFixedLink(block) {
  if (window.scrollY > 100) {
    block.addClass("show");
  }
  else {
    block.removeClass("show");
  }
}

function showVideo(videoId) {
  let vid = document.getElementById(videoId);
  let vidContainer = vid.parentElement;
  vidContainer.classList.add("show");
  vid.removeEventListener("loadeddata", showVideo);
}

function listenVideo() {
  document.getElementById(generalVideo).addEventListener("loadeddata", showVideo(generalVideo));
}

function changeVideos() {

  let template;
  let size = 'large';

  if (window.innerWidth < 1280) {
    size = "medium";
    if (window.innerWidth < 1024) {
      size = "small";
    }
  }
  template =
    `
   <video id="general_video" width="1920" height="970" class="galashow-general-video" preload="auto" loop autoplay muted playsinline poster="static/videos/galashow/${size}/general-bg.jpg">
      <source src="static/videos/galashow/${size}/video.mp4" type="video/mp4;">
      <source src="static/videos/galashow/${size}/video.webm" type="video/webm;">
    </video>
  `

  if (wWidth < 1280) {
    $("#general video").remove();
    $("#general").prepend(template);
    listenVideo();
  }
  else {
    wWidth = 0;
  }

}

function calcTopOffset() {
  let el = $(".galashow-fixed-link");
  if (window.innerWidth > 1279) {
    let container = $(".galashow-general-section");
    if (container.height() > window.innerHeight) {
      el.css("top", `calc(${container.height()}px - ${el.height()}px)`)
    }
  }
  else {
    el.removeAttr("style")
  }
}

function initSliders() {
  swiperFour = new Swiper('.swiper-container_gala-four .swiper-container', {
    observer: true,
    observeParents:true,
    spaceBetween: 30,
    loop: true,
    speed: 1000,
    slidesPerView: 4,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.swiper-container_gala-four .swiper-button-next',
      prevEl: '.swiper-container_gala-four .swiper-button-prev',
    },
    breakpoints: {
      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: "auto",
        spaceBetween: 25,
      },
      0: {
        slidesPerView: "auto",
        spaceBetween: 25,
      }
    }
  });

  swiperFive = new Swiper('.swiper-container_gala-five .swiper-container', {
    observer: true,
    observeParents:true,
    spaceBetween: 22,
    loop: true,
    speed: 1000,
    slidesPerView: 5,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.swiper-container_gala-five .swiper-button-next',
      prevEl: '.swiper-container_gala-five .swiper-button-prev',
    },
    breakpoints: {
      1280: {
        slidesPerView: 5,
        spaceBetween: 22,
      },
      1024: {
        slidesPerView: "auto",
        spaceBetween: 20,
      },
      0: {
        slidesPerView: "auto",
        spaceBetween: 20,
      }
    }
  });

  /* gallery */
  galaGalleryBottom = new Swiper(".gala-gallery-bottom", {
    observer: true,
    observeParents: true,
    spaceBetween: 14,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,

    breakpoints: {
      768: {
        spaceBetween: 14,
        slidesPerView: 5,
      },
      0: {
        spaceBetween: 10,
        slidesPerView: 3,
      }
    }
  });

  galaGalleryTop = new Swiper(".gala-gallery-top", {
    spaceBetween: 50,
    navigation: {
      nextEl: ".gala-gallery-top .swiper-button-next",
      prevEl: ".gala-gallery-top .swiper-button-prev",
    },
    thumbs: {
      swiper: galaGalleryBottom,
    },
  });

  $(document).on('click', '.pp_[data-img-id]', function (e) {
    let id = $(this).data("img-id");
    console.log("id", id);
    let index = $(".gala-gallery-top [data-img-id=" + id + "]").index();
    console.log("id", index);
    galaGalleryTop.slideTo(index);
  });
  /* records */

  if ($(".galashow-record-section .swiper-slide").length > 1) {
    $(".galashow-record-section").addClass("active")
    swiperRecords = new Swiper(".galashow-record-section .swiper-container", {
      observer: true,
      observeParents:true,
      spaceBetween: 50,
      speed: 1000,
      navigation: {
        nextEl: ".galashow-record-section .swiper-button-next",
        prevEl: ".galashow-record-section .swiper-button-prev",
      },
      on: {
        slideChangeTransitionEnd: function () {
          $(".galashow-record-section .swiper-slide").removeClass("active").find(".record-section__video").attr("src","");
        },
      },
    });
  }
  /* video-slider */

  if ($(".video-slider-box .swiper-slide").length > 1) {
    swiperVideos = new Swiper(".video-slider-box .swiper-container", {
      observer: true,
      observeParents:true,
      spaceBetween: 25,
      slidesPerView: 3,
      speed: 1000,
      navigation: {
        nextEl: ".video-slider-box .swiper-button-next",
        prevEl: ".video-slider-box .swiper-button-prev",
      },
      loop: true,
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
} else video_id = null;
// console.log("video_id",video_id);
return "https://www.youtube.com/embed/" + video_id + "?autoplay=1&modestbranding=1&iv_load_policy=3";
}

$(document).ready(function () {

  listenVideo();

  toggleFixedBlock($(fixedBlock));
  toggleFixedLink($(fixedLink));

  initSliders();

  /* Start iframe */
  $(document).on('click', '.galashow-record', function (e) {
    $(this).find(".record-section__video").attr("src", urlToId($(this).data("src")));
    $(this).addClass("active");
  });
  /* End iframe */

});

window.addEventListener('DOMContentLoaded', (event) => {
  changeVideos();
  // calcTopOffset();
});

$(window).on("scroll", function () {
  toggleFixedBlock($(fixedBlock));
  toggleFixedLink($(fixedLink));
});
$(window).on("resize", function () {
  changeVideos();
  // calcTopOffset();
  toggleFixedBlock($(fixedBlock));
  toggleFixedLink($(fixedLink));
});
$(window).on("orientationchange", function () {
  changeVideos();
  // calcTopOffset();
  toggleFixedBlock($(fixedBlock));
  toggleFixedLink($(fixedLink));
});

let projectsMap = !1;

ymaps.ready(function () {
  initProjectsMap();


  $(".areas-map-info___close").click(function (e) {
    e.preventDefault();
    projectsMap.geoObjects.each(function (el, i) {
      el.options.set({
        iconImageHref: 'static/img/galashow/project-map-marker.svg',
      })
    });
    $(".areas-map-info").fadeOut(300);
  });

});

let geoArray = [];

function initProjectsMap() {

  /* Карта */

  /* Тестовые данные */



  projectsMap = new ymaps.Map('gala-map', {
    center: [56.305357, 44.003675],
    zoom: 11,
    controls: [],
  });

  // Добавим элемент управления с собственной меткой геолокации на карте.
  let geolocationControl = new ymaps.control.GeolocationControl({
    // options: {
    //   position: {
    //     right: 26,
    //     top: 261,
    //   }
    // }
  });
  projectsMap.controls.add(geolocationControl);
  // Создадим элемент управления масштабом маленького размера и добавим его на карту.
  let zoomControl = new ymaps.control.ZoomControl({
    // options: {
    //   size: 'small',
    //   position: {
    //     right: 26,
    //     top: 184,
    //   },
    // }
  });
  projectsMap.controls.add(zoomControl);
  // Отключим зумм посредством скролла.
  projectsMap.behaviors.disable("scrollZoom");

  // Макет создается через фабрику макетов с помощью текстового шаблона.
  const hintHtml = `<div class='my-hint'>{{ properties.name }}</div>`

  HintLayout = ymaps.templateLayoutFactory.createClass(hintHtml, {
    // Определяем метод getShape, который
    // будет возвращать размеры макета хинта.
    // Это необходимо для того, чтобы хинт автоматически
    // сдвигал позицию при выходе за пределы карты.
    getShape: function () {
      var el = this.getElement(),
        result = null;
      if (el) {
        var firstChild = el.firstChild;
        result = new ymaps.shape.Rectangle(
          new ymaps.geometry.pixel.Rectangle([
            [0, 0],
            [firstChild.offsetWidth, firstChild.offsetHeight]
          ])
        );
      }
      return result;
    }
  }
  );


  fanzonesMap.forEach(element => {
    let findCoords = element.coords;

    geoArray.push({
      type: 'Feature',
      properties: {
        id: element.externalId,
        name: element.name,
        price: element.price,
        url: element.url,
        photo: element.photo,
        timeInterval: element.timeInterval,
        headliner: element.headliner,
        place: element.place,
      },
      geometry: {
        type: 'Point',
        coordinates: findCoords
      },
      options: {
        hideIconOnBalloonOpen: false,
        iconLayout: 'default#image',
        iconImageHref: 'static/img/galashow/project-map-marker.svg',
        iconImageSize: [30, 42],
        iconImageOffset: [-15, -42],
        hintLayout: HintLayout
      }
    });


    window.myObjects = ymaps.geoQuery({
      type: "FeatureCollection",
      features: geoArray
    }).addToMap(projectsMap);
  });


  projectsMap.geoObjects.events.add('click', function (e) {
    const currMarker = e.get('target');

    const photo = currMarker.properties.get('photo');
    const timeInterval = currMarker.properties.get('timeInterval');
    const headliner = currMarker.properties.get('headliner');
    const place = currMarker.properties.get('place');

    $(".areas-map-info").fadeOut(0).delay(100).fadeIn(300);

    $(".areas-map-info__pic img").attr("src", photo);
    $(".areas-map-info__caption").text(timeInterval);
    $(".areas-map-info__title").text(headliner);
    $(".areas-map-info__address").text(place);

    projectsMap.geoObjects.each(function (el, i) {
      el.options.set({
        iconImageHref: 'static/img/galashow/project-map-marker.svg',
      })
    });

    currMarker.options.set({
      iconImageHref: 'static/img/galashow/project-map-marker_orange.svg',
    });
  });



}