/* globals Modal, Names, Scheduler, Screen, SystemActions */

$(function() {
  function InitializeFirstScreen() {
    var screenId = window.location.hash.substring(1);
    if (!screenId || screenId.length === 0) {
      screenId = 'main';
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
        .click(function() {
          Modal[modalId]();
        });
      if (!linkElement.attr('href')) {
        linkElement.attr('href', '#');
      }
    });
  }

  // Initialize all links with the "data-screen" attribute so they switch
  // screens when clicked.
  function InitializeScreenNavigation() {
    $('a[data-screen]').each(function(i, e) {
      var linkElement = $(e);
      var screenId = linkElement.attr('data-screen');
      linkElement
        .attr('href', '#' + screenId)
        .click(function() {
          Screen.select(screenId);
        });
    });
  }

  // Initialize links with system actions.
  function InitializeSystemActions() {
    $('[data-system-action]').each(function(i, e) {
      var linkElement = $(e);
      var action = linkElement.attr('data-system-action');
      linkElement
        .click(function() {
          SystemActions[action]();
        });
      if (!linkElement.attr('href')) {
        linkElement.attr('href', '#');
      }
    });
  }

  // Initialization.
  InitializeModalNavigation();
  InitializeScreenNavigation();
  InitializeFirstScreen();
  InitializeResizeHandler();
  InitializeSystemActions();

  // Hook events.
  Scheduler.onArtistChange(Names.populate);

  // This fixes layered modals. Courtesy of:
  // http://gurde.com/stacked-bootstrap-modals/
  $(function() {
    $(document)
      .on('show.bs.modal', '.modal', function() {
        $(this).appendTo($('body'));
      })
      .on('shown.bs.modal', '.modal.in', function() {
        setModalsAndBackdropsOrder();
      })
      .on('hidden.bs.modal', '.modal', function() {
        setModalsAndBackdropsOrder();
        if ($('.modal.in').length === 0) {
          $('body').removeClass('modal-open');
        }
      });

    function setModalsAndBackdropsOrder() {
      $('body').addClass('modal-open');
      var modalZIndex = $('.modal.in').length + 1050 + 1;
      var backdropZIndex = modalZIndex - 1;
      $('.modal-backdrop').addClass('hidden');
      $('.modal.in:last').css('z-index', modalZIndex);
      $('.modal-backdrop.in:last').css('z-index', backdropZIndex).removeClass('hidden');
    }
  });
});
