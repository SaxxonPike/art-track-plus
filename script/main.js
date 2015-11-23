/* globals Database, Modal, Names, Scheduler, Screen, SystemActions */

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
        .attr('href', '#')
        .click(function(ev) {
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
        .attr('href', '#' + screenId)
        .click(function(ev) {
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
        .click(function(ev) {
          SystemActions[action]();
        });
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

  // Preconnect database.
  Database.open();
});
