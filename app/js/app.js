document.addEventListener('DOMContentLoaded', function () {
  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * AOS: Animate On Scroll Init
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  AOS.init({
    startEvent: 'load',
    duration: 850,
    once: true,
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Fancybox config
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  $.fancybox.defaults.animationEffect = 'fade';
  $.fancybox.defaults.buttons = ['zoom', 'thumbs', 'close'];
  $.fancybox.defaults.smallBtn = true;

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Go up button
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  const go_up_btn = $('#go-up-button');

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 1000) {
      go_up_btn.addClass('_is-shown');
    } else {
      go_up_btn.removeClass('_is-shown');
    }
  });

  go_up_btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 1000);
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Smooth scroll (anchors)
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  $('a[data-anchor]').bind('click.smoothscroll', function () {
    const target = $(this).attr('href'),
      bl_top = $(target).offset().top - 75;

    $('body, html').animate({ scrollTop: bl_top }, 1000);

    return false;
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Site header: Toggle mobile menu
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  function mmenuBackdrop() {
    if (!$('.mmenu-backdrop').length) {
      $('body').append('<div class="mmenu-backdrop fade"></div>');
      $('.mmenu-backdrop')
        .delay(5)
        .queue(function () {
          $(this).addClass('show').dequeue();
          $(this).on('click', function () {
            mmenuBackdrop();
            $('body').removeClass('lock-scroll');
            $('.mmenu').removeClass('_is-active');
          });
        });
    } else {
      $('.mmenu-backdrop').remove();
    }
  }

  // Open menu
  $('.header .menu-burger .btn-burger').on('click', function () {
    mmenuBackdrop();

    $('body').addClass('lock-scroll');
    $('.mmenu').addClass('_is-active');
  });

  // Close menu
  $('.mmenu .mmenu-heading .btn-close').on('click', function () {
    mmenuBackdrop();

    $('body').removeClass('lock-scroll');
    $('.mmenu').removeClass('_is-active');
  });

  // Toggle submenu
  $('.mmenu .menu-item-has-children > .menu-link').on('click', function (e) {
    e.preventDefault();
    $(this).parent('.menu-item-has-children').toggleClass('_is-opened');
    $(this).siblings('ul').slideToggle();
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * BS Accordion: Scroll to open vacancy item
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  $('.vacancy .vacancy-body').on('shown.bs.collapse', function () {
    const vCard = $(this).closest('.vacancy');
    const vHeadingHeight = vCard.find('.vacancy-heading').outerHeight();

    $('html,body').animate(
      {
        scrollTop: vCard.offset().top - vHeadingHeight,
      },
      500,
    );
  });
  $('.collapse').on('hidden.bs.collapse shown.bs.collapse', function () {
    // Recalculate all offsets and positions of elements
    AOS.refresh();
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Select2: Shops map filters dropdown
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  $('body').on('shown.bs.modal', '.modal', function () {
    $(this)
      .find('select')
      .each(function () {
        const dropdownParent = $(document.body);

        if ($(this).parents('.modal.in:first').length !== 0) {
          dropdownParent = $(this).parents('.modal.in:first');
        }

        $(this).select2({
          dropdownParent: dropdownParent,
        });
      });
  });

  $('select')
    .select2({
      width: '100%',
    })
    .on('select2:opening', function () {
      $(this)
        .data('select2')
        .$dropdown.find(':input.select2-search__field')
        .attr('placeholder', 'Пошук...');
    })
    .on('select2:select', function (e) {
      e.currentTarget.classList.add('form-select--selected');
    });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * BS Modal: Vacancy varying modal
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  $('#vacancyModal').on('show.bs.modal', function (e) {
    const button = $(e.relatedTarget);
    const vacancyName = button.data('vacancy');
    const modal = $(this);

    modal.find('#rybak-vacancy').val(vacancyName);
  });

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * BS Tooltip: Init
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  $('[data-toggle="tooltip"]').tooltip();

  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Countup.js: About advantages counter
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  const advNumbers = document.querySelectorAll('[data-end-value]');

  advNumbers.forEach((number) => {
    const endVal = number.dataset.endValue;
    const numAnim = new countUp.CountUp(number, endVal);

    document.addEventListener('aos:in:counter-number', () => {
      if (!numAnim.error) {
        numAnim.start();
      } else {
        console.error(numAnim.error);
      }
    });
  });
});
