/**
 * Load locations on selected city
 */
jQuery(function ($) {
  var filterCity = $('#stores-filters-city');
  var filterAddress = $('#stores-filters-address');
  var filterAddressHTML = filterAddress.html();
  var filterResults = $('#stores-filters-results');

  filterCity.on('select2:select', function () {
    var filter = $(this);
    $.ajax({
      url: rybak_ajax_url,
      data: {
        action: 'load_rybak_locations_ajax',
        store_city: filter.val(),
      },
      type: 'POST',
      beforeSend: function () {
        filterCity.addClass('_is-loading');
        filterAddress
          .removeClass('form-select--selected')
          .addClass('_is-loading')
          .html(filterAddressHTML);
        filterResults.parents('.stores-list-filters-results').addClass('_is-loading');
      },
      success: function (data) {
        var location = Object.values(JSON.parse(data)).sort();

        $.ajax({
          url: rybak_ajax_url,
          data: {
            action: 'load_rybak_locations_cards_ajax',
            store_city: filter.val(),
          },
          type: 'POST',
          success: function (data) {
            filterCity.removeClass('_is-loading');
            filterAddress.removeClass('_is-loading').append(
              `${location.map((item) => {
                return `<option value="вул. ${item}">вул. ${item}</option>`;
              })}`,
            );

            filterResults.parents('.stores-list-filters-results').removeClass('_is-loading');
            filterResults.html('').append(data);

            $('[data-toggle="tooltip"]').tooltip('update');
          },
        });
      },
      error: function (error) {
        console.error('Cant load locations', error);
        filterResults.parents('.stores-list-filters-results').removeClass('_is-loading');
        filterResults.html('').append('<div class="col">Не можливо завантажити локації...<br> Спробуйте, будь ласка, пізніше.</div>',);
      },
    });
  });

  filterAddress.on('select2:select', function () {
    var selectedAdress = $(this).val();

    $('.store-card').parent('.col').css('display', 'none');
    $('.store-card:contains(' + selectedAdress + ')').parent('.col').css('display', 'block');
    $('.store-card:visible').find('.store-card-trigger').click();
  });
});
