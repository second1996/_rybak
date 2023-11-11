document.addEventListener('DOMContentLoaded', function () {
  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Testimonials Form
   *-------------------------------------------------------------------------------------------------------------------------------------------
  */
  $('.testimonials-feedback-form .form-media-item .action-btn').on('click', function() {
    const input = $(this).parent().find('input[type="file"]');
    input.trigger('click');
  });

  $('.testimonials-feedback-form .form-media input[type="file"]').on('change', function() {
    const input = $(this);
    const inputFiles = input[0].files;
    const filesList = $('.form-media-list');
    const fileType = input.data('type');

    if (filesList.find(`[data-type="${fileType}"]`)) {
      filesList.find(`[data-type="${fileType}"]`).remove();
    }

    for (var i = 0; i < inputFiles.length; i++) {
      filesList.prepend(`<div class="form-media-list-item" data-type="${fileType}">
        <svg class="icon icon-${fileType}">
          <use xlink:href="./images/symbol-defs.svg#${fileType}"></use>
        </svg>
        <span>${inputFiles[i].name}</span>
      </div>`);
    }
  })
});
