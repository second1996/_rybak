/**
 * Catalog filters
 */
var products_filter = $('#catalog-products-filter');
var products_list = $('#catalog-products-list');
var products_filter_values = [];

products_filter.find('input[type="checkbox"]').on('change', function() {
	var cat_slug = $(this).attr('id').replace('product-cat-', '');
	if ($(this).attr('checked', true) && ! products_filter_values.includes(cat_slug)) {
		products_filter_values.push(cat_slug)
	} else {
		products_filter_values.splice(products_filter_values.indexOf(cat_slug), 1);
	}

	$.ajax({
		url: rybak_ajax_url,
		data: {
			'action': 'load_catalog_products_by_category_ajax',
			'categories': products_filter_values,
		},
		type: 'POST',
		beforeSend: function() {
			products_list.find('.pd-catalog-list').addClass('_is-loading');
			products_filter.parents('.filters').addClass('_is-loading');
		},
		success: function(data) {
			products_list.html('').append(data);
			products_list.find('.pd-catalog-list').removeClass('_is-loading');
			products_filter.parents('.filters').removeClass('_is-loading');
		},
		error: function(error) {
			console.error('Cant load locations', error);
		}
	});
})