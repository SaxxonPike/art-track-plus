var Screen = {
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

  select: function(screenId) {
    $('.screen[id!="' + screenId + '"]').hide();
    $('.screen#' + screenId).show();
    Screen.reposition();
  }
};
