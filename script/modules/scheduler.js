/* globals Database */

var Scheduler = (function() {

  // Handlers for when artist data changes.
  var artistChangeEvents = [];
  var artistTableVersion = -1;
  var isDatabaseBusy = false;

  // Initialize the timer event on load.
  $(function() {
    window.setInterval(onTick, 500);
  });

  // Interface.
  return {
    onArtistChange: onArtistChange,
  };

  // Call all functions in an array.
  function invokeAll(events) {
    $.each(events, function(i, e) {
      e();
    });
  }

  // Schedule an event to run every time artist data changes.
  function onArtistChange(eventFunction) {
    artistChangeEvents.push(eventFunction);
  }

  // Main timer event.
  function onTick() {
    if (!isDatabaseBusy) {
      Database.getTableVersion('artists').then(function(versions) {
        if (!versions) {
          versions = {
            id: 1
          };
          Database.open().tableVersions.put(versions);
        }
        if (versions.artists !== artistTableVersion) {
          console.log('Update requested. New version ' + versions.artists);
          artistTableVersion = versions.artists;
          invokeAll(artistChangeEvents);
        }
        isDatabaseBusy = false;
      });
      isDatabaseBusy = true;
    }
  }
})();
