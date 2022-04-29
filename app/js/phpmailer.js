/**
 * phpmailer handler
 */
$('.form').submit(function () {
  var form = $(this);
  var formBtn = form.find('.form-submit');
  var msg = form.serialize();
  $.ajax({
    type: 'POST',
    url: rybak_phpmailer_url,
    data: msg,
    beforeSend: function () {
      formBtn.text('Відправляємо...').attr('disabled', true);
    },
    error: function (xhr, str) {
      console.error('Виникла помилка при відправці форми: ' + xhr.responseCode);
    },
    success: function () {
      location.href = '/thanks';
      form[0].reset();
    },
    complete: function () {
      formBtn.text('Форму надіслано').attr('disabled', false);
    }
  });
  return false;
});