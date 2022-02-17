document.addEventListener('DOMContentLoaded', function () {
  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Home page: Advantages slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  const hAdvantagesSwiper = new Swiper('.h-advantages-slider', {
    autoplay: {
      delay: 3000,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    autoHeight: true,
    pagination: {
      el: '.h-advantages-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1240: {
        slidesPerView: 3,
      },
    },
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Home page: News slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  const hNewsSwiper = new Swiper('.h-news-slider', {
    autoplay: {
      delay: 4000,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    autoHeight: true,
    pagination: {
      el: '.h-news-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1620: {
        slidesPerView: 4,
      },
    },
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Page About: Chronology slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  const chronologySwiper = new Swiper('.a-chronology-slider', {
    grabCursor: true,
    speed: 1000,
    spaceBetween: 60,
    pagination: {
      el: '.a-chronology-pagination',
      type: 'custom',
      clickable: true,
      renderCustom: function (swiper, current, total) {
        let items = '';
        swiper.slides.forEach((el, index) => {
          const slideTitle = el.dataset.slideTitle;

          if ([current - 1] == index) {
            items += `<span class="swiper-pagination-bullet swiper-pagination-bullet-active">${slideTitle}</span>`;
          } else {
            items += `<span class="swiper-pagination-bullet">${slideTitle}</span>`;
          }
        });
        return items;
      },
    },
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Page About: Advantages slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  const aboutAdvantagesSwiper = new Swiper('.a-advantages-slider', {
    autoplay: {
      delay: 3000,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    autoHeight: true,
    pagination: {
      el: '.a-advantages-pagination',
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        autoHeight: false,
      },
      768: {
        slidesPerView: 3,
        autoHeight: false,
      },
    },
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Page About: Partners slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  const partnersSwiper = new Swiper('.a-partners-slider .swiper', {
    autoplay: {
      delay: 2000,
    },
    slidesPerView: 1,
    navigation: {
      prevEl: '.a-partners-navigation .swiper-button-prev',
      nextEl: '.a-partners-navigation .swiper-button-next',
    },
    pagination: {
      el: '.a-partners-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      375: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1240: {
        slidesPerView: 5,
      },
      1620: {
        slidesPerView: 6,
      },
    },
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Page Stores: Advantages slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  const storesAdvantagesSwiper = new Swiper('.stores-about-slider', {
    autoplay: {
      delay: 3000,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    autoHeight: true,
    pagination: {
      el: '.stores-about-pagination',
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        autoHeight: false,
      },
      768: {
        slidesPerView: 3,
        autoHeight: false,
      },
    },
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Single page Production: Product gallery slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  const productGalleryThumbsSwiper = new Swiper('.pd-single-gallery-thumbs', {
    direction: 'horizontal',
    slidesPerView: 4.5,
    spaceBetween: 16,
    autoHeight: false,
    freeMode: {
      sticky: true,
    },
    scrollbar: {
      el: '.pd-single-gallery-thumbs .swiper-scrollbar',
      draggable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 'auto',
        slidesPerView: 6.5,
      },
      1240: {
        slidesPerView: 4.5,
      },
      1620: {
        direction: 'vertical',
        slidesPerView: 5,
        autoHeight: true,
      },
    },
    on: {
      init: function (swiper) {
        if (swiper.slides.length < 2) {
          document.querySelector('.pd-single-gallery-thumbs').classList.add('d-none');
        }
      },
    },
  });

  const productGallerySwiper = new Swiper('.pd-single-gallery-slider', {
    slidesPerView: 1,
    thumbs: {
      swiper: productGalleryThumbsSwiper,
    },
    on: {
      init: function (swiper) {
        if (swiper.slides.length < 2) {
          swiper.destroy();
        }
      },
    },
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Single page News: Other news slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  const otherNewsSwiper = new Swiper('.news-single-other-slider', {
    autoplay: {
      delay: 4000,
    },
    slidesPerView: 1.2,
    spaceBetween: 30,
    pagination: {
      el: '.news-single-other-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 1.5,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2.5,
      },
      1620: {
        slidesPerView: 3,
      },
    },
  });
});
