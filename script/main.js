$(function(){
  function InitializeFirstScreen() {
    var screenId = window.location.hash.substring(1);
    if (!screenId || screenId.length == 0) {
      screenId = "main";
    }
    Screen.select(screenId);
  }

  // Initialize the window handler which repositions content on resize.
  function InitializeResizeHandler() {
    $(window).resize(Screen.reposition);
  }

  // Initialize all links with the "data-modal" attribute so they pop up when
  // activated.
  function InitializeModalNavigation() {
    $('a[data-modal]').each(function(i, e) {
      var linkElement = $(e);
      var modalId = linkElement.attr('data-modal');
      linkElement
        .attr("href", "#")
        .click(function(ev) {
          ev.stopPropagation();
          Modal[modalId]();
        });
    });
  }

  // Initialize all links with the "data-screen" attribute so they switch
  // screens when clicked.
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

  // Initialization.
  InitializeModalNavigation();
  InitializeScreenNavigation();
  InitializeFirstScreen();
  InitializeResizeHandler();

  Names.populate();
});
