$(function () {
  $('#clear-history').click(function () {
    // Clear local storage
    localStorage.clear();
    // Refresh the page
    location.reload();
  });
});
