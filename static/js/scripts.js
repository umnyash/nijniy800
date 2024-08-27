document.querySelector(".preloader") && document.addEventListener("DOMContentLoaded", (e=>{
  setTimeout((()=>{
      enableScroll(),
      document.documentElement.classList.add("loaded")
      document.body.classList.add("loaded")
  }
  ), 100)
}
));
const mobMenu = document.querySelector(".mobile-menu")
const modal = document.querySelectorAll(".pp")
const modalOpenBtn = document.querySelectorAll("[data-pp]")
const successModal = document.querySelector("[data-mod=pp_success]")
const errorModal = document.querySelector("[data-mod=pp_error]")

//disable scroll
function disableScroll() {
  let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (document.querySelectorAll(".fixed-block")) {
      document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
  }
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("noscroll")
}
//enable scroll
function enableScroll() {
  if (document.querySelectorAll(".fixed-block")) {
      document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("noscroll")
}
//open modal
function openModal(modal) {
  let activeModal = document.querySelector(".pp.show")
  if (!activeModal && !mobMenu.classList.contains("active") ) {
      disableScroll()
  }
  if (activeModal) {
    activeModal.classList.remove("show")
  }
  modal.classList.add("show")
}
//close modal
function closeModal(modal) {
  modal.classList.remove("show")
  setTimeout(() => {
    if (!mobMenu.classList.contains("active")) {
      enableScroll()
    }
  }, 400);
  if ( modal.querySelector("iframe")) {
    modal.querySelectorAll("iframe").forEach(vid => vid.setAttribute("src",""))
  }
}
// open modal btn
modalOpenBtn.forEach(btn => {
  btn.addEventListener("click", e => {
      e.preventDefault()
      let href = btn.getAttribute("data-pp")
      openModal(document.querySelector(`[data-mod=${href}]`))
  })
})
// close modal btn
modal.forEach(mod => {
  mod.addEventListener("click", e => {
      if ( ( mod.querySelector(".pp_content") && !mod.querySelector(".pp_content").contains(e.target)) || 
         (mod.querySelector(".pp__content")&& !mod.querySelector(".pp__content").contains(e.target)) || 
         (mod.querySelector(".pp__close") && mod.querySelector(".pp__close").contains(e.target)) || 
         (mod.querySelector(".close_btn") && mod.querySelector(".close_btn").contains(e.target)) ||
         (mod.querySelector(".pp-cross") && mod.querySelector(".pp-cross").contains(e.target)) ) {
        closeModal(mod)
      }
  })
})
//setSuccessTxt
function setSuccessTxt(title = false, subtitle = false) {
  successModal.querySelector(".success-container__title").textContent = title ? title : "Спасибо!"
  successModal.querySelector(".success-container__descr").textContent = subtitle ? subtitle : ""
}
//setErrorTxt
function setErrorTxt(title = false, btnTxt = false) {
  errorModal.querySelector(".success-container__title").textContent = title ? title : "Что-то пошло не так"
  errorModal.querySelector(".success-container__descr").textContent = subtitle ? subtitle : ""
}
//formsuccess
function formSuccess(form) {
  if (form.querySelector("label.error")) {
    form.querySelectorAll("label.error").forEach(err => err.textContent="")
  }
  form.querySelectorAll("input").forEach(inp => {
    inp.classList.remove("error")
      if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
          inp.value = ""
      }
      if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
          inp.checked = false
      }
  })
  if (form.querySelector("textarea")) {
    form.querySelector("textarea").classList.remove("error")
    form.querySelector("textarea").value = ""
  }
  if(form.classList.contains("js-contact-form")) {
    setSuccessTxt("Спасибо!", "Ваша анкета успешно отправлена, мы свяжемся с вами")
  } else {
    setSuccessTxt()
  }
  openModal(successModal)
  
}
// fixed header
const header = document.querySelector(".header")
function scrollPos() {
  return window.pageYOffset || document.documentElement.scrollTop;
}
let lastScroll = scrollPos();
window.addEventListener("scroll", () => {
  if (scrollPos() > 1) {
      if ((scrollPos() > 150 && scrollPos() > lastScroll && !header.classList.contains("unshow"))) {
          header.classList.add("unshow")
      } else if ((scrollPos() < lastScroll && header.classList.contains("unshow")) || scrollPos() < 150) {
          header.classList.remove("unshow")
      }
  } 
  lastScroll = scrollPos()
}) 
//swiper1
const swiper1 = document.querySelectorAll(".swiper-1")
if (swiper1) {
  swiper1.forEach(item => {
    let itemSwiper = new Swiper(item.querySelector(".swiper"), {
      observer: true,
      observeParents: true,
      grabCursor: false,
		  allowTouchMove:false,
		  effect: 'fade',
		  fadeEffect: {
		    crossFade: true
		  },
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: true,
      },
      speed: 1000,
      
    });
  })
}
//swiper3
const swiper3 = document.querySelectorAll(".swiper-3")
if (swiper3) {
  swiper3.forEach(item => {
    let itemSwiper = new Swiper(item.querySelector(".swiper"), {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: false,
      navigation: {
        nextEl: item.querySelector('.swiper-button-next'),
        prevEl: item.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        1799: {
            spaceBetween: 60,
            slidesPerView: 3,
        },
        1024: {
            spaceBetween: 40,
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        }
      },
      speed: 800
    });
  })
}
//talisman poll
const itemPoll = document.querySelectorAll(".item-poll")
if (itemPoll) {
  itemPoll.forEach(item => {
    item.querySelectorAll(".item-poll__btn").forEach(btn => {
      btn.addEventListener("click", () => {
        let title = item.querySelector(".item-poll__title").textContent
        let content = item.querySelector(".item-poll__modal").innerHTML
        document.querySelector("[data-mod=pp_poll]").querySelector("h2").textContent = title
        document.querySelector("[data-mod=pp_poll] .pp-content__text").innerHTML = content      
        openModal(document.querySelector("[data-mod=pp_poll]"))
      })
    })
  })
}
// sunsetModal
const itemSunEv = document.querySelectorAll(".sunsets-events-slide.pp_")
const sunsetMod = document.querySelector("[data-mod=sunsets-modal]")
if (itemSunEv && sunsetMod) {
  itemSunEv.forEach(item => {
    item.addEventListener("click", () => {
      let content = item.querySelector(".sunset-events__modContent").innerHTML
      sunsetMod.querySelector(".eventpass-modal__content").innerHTML = content 
      if (sunsetMod.querySelector("[data-src]")) {
        let src = sunsetMod.querySelector("[data-src]").getAttribute("data-src")
        sunsetMod.querySelector("[data-src]").setAttribute("src",src)
        sunsetMod.querySelector("[data-src]").removeAttribute("data-src")
      }
      openModal(sunsetMod)
    })
  })
}
// partnersModal
const itemPartner = document.querySelectorAll(".partners-box__item.pp_")
const partnersMod = document.querySelector("[data-mod=pp-partner]")
if (itemPartner && partnersMod) {
  itemPartner.forEach(item => {
    item.addEventListener("click", () => {
      let content = item.querySelector(".partners-box__modContent").innerHTML
      partnersMod.querySelector(".pp-content").innerHTML = content 
      openModal(partnersMod)
    })
  })
}
$(function () {
  /* Hover-effect */
  if ($('.articles .articlesNew__item').length > 0) {
    const tilt = $('.articles .articlesNew__item').tilt({
      perspective: 1500,
    });

    function activateDestroyTilt() {
      if (window.innerWidth < 1025) {
        tilt.tilt.destroy.call(tilt);
      }
    }
    activateDestroyTilt();

    $(window).resize(function () {
      activateDestroyTilt();
    });
  }
});
$(document).on('click','.talisman-stages__tabs_item', function(){
  let el = $(this);
  let attr = el.attr("data-tab");
  if (!el.hasClass("active")){
    $('.talisman-stages__tabs_item').removeClass("active");      
    el.addClass("active");      

    $('.talisman-stages__content_item').fadeOut(300);      
    setTimeout(() => {
      $(".talisman-stages__content_item[data-tab="+attr+"]").fadeIn(300);       
    }, 300);
  }

});
