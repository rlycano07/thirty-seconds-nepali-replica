$(function () {
  $('#settings').click(function () {
    $('#clear-history').toggleClass('show');
  });

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }

});
