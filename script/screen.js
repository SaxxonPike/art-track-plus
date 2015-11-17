var Screen = {

  // Center the screen.
  reposition: function() {
    var width = $(window).width();
    var leftMargin = 0;
    if (width > 960)
    {
      var containerWidth = $(".screen:visible").width();
      leftMargin = (width - containerWidth) / 2;
    }
    $(".screen").css("marginLeft", leftMargin);
  },

  // Select a screen by ID.
  select: function(screenId) {
    // Hide other screens.
    $('.screen[id!="' + screenId + '"]').hide();

    var desiredScreen = $('.screen#' + screenId);
    if (desiredScreen.length > 0) {

      // Show the desired screen.
      desiredScreen.show();
      Screen.reposition();

      // Apply SlimScroll if it hasn't already been added.
      var content = desiredScreen.find('.content');
      if (!content.hasClass('scroll-added')) {
        content.addClass('scroll-added');
        content.slimScroll({
            height: '100%'
        });
      }
    }
  }
};
