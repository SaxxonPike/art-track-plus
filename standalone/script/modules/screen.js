(function(scope) {
  scope.Screen = {
    reposition: reposition,
    select: select
  };

  // Center the screen element horizontally. This isn't the most
  // elegant solution...
  function reposition() {
    const width = $(scope).width();
    let leftMargin = 0;
    if (width > 960) {
      const containerWidth = $('.screen:visible').width();
      leftMargin = (width - containerWidth) / 2;
    }
    $('.screen').css('marginLeft', leftMargin);
  }

  // Select a screen by ID to show.
  function select(screenId) {
    // Hide other screens.
    $('.screen[id!="' + screenId + '"]').hide();

    const desiredScreen = $('.screen#' + screenId);
    if (desiredScreen.length > 0) {

      // Hide the nav if the screen calls for it.
      if (desiredScreen.hasClass('hide-nav')) {
        $('nav').remove();
        $('.screen').css('padding-top', 0);
      }

      // Show the desired screen.
      desiredScreen.show();
      reposition();

      // Apply SlimScroll if it hasn't already been added.
      const content = desiredScreen.find('.content');
      if (!content.hasClass('scroll-added')) {
        content.addClass('scroll-added');
        content.slimScroll({
          height: '100%',
          size: '12px',
          alwaysVisible: true
        });
      }
    }
  }
})(window);
