$(function(){
  // Show or hide items based on whether or not the user has agreed to the
  // license terms.
  function InitializeAgreement(agreed) {
    if (agreed === true) {
      $('.must-agree').show();
    } else {
      $('.must-agree').hide();
    }
  }

  function InitializeFirstScreen() {
    var screenId = window.location.hash.substring(1);
    if (!screenId || screenId.length == 0) {
      screenId = "intro";
    }
    Screen.select(screenId);
  }

  // Initialize the window handler which repositions content on resize.
  function InitializeResizeHandler() {
    $(window).resize(Screen.reposition);
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
  InitializeScreenNavigation();
  InitializeFirstScreen();
  InitializeResizeHandler();
  InitializeAgreement(false);
});
