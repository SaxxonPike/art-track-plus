$(function() {
  JoelPurra.PlusAsTab.setOptions({
    key: 13
  });

  $(document).on('shown.bs.modal', '.modal', function() {
    $(this).find('[autofocus]').focus();
  });
});
