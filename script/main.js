$(function(){
  function InitializeResizeHandler() {
    $(window).resize(Screen.reposition);
  }

  function InitializeScreenNavigation() {
    $('a[data-screen]').each(function(i, e) {
      var linkElement = $(e);
      var screenId = linkElement.attr('data-screen');
      linkElement
        .attr("href", "#" + screenId)
        .click(function(ev) {
          ev.stopPropagation();
          Screen.select(screenId);
        });
    });
  }

  InitializeScreenNavigation();
  Screen.select("intro");
  InitializeResizeHandler();
});
