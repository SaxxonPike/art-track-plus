/* globals Database */

(function(scope) {

  // Interface.
  scope.Scheduler = {
    onArtistChange: onArtistChange,
  };

  // Handlers for when artist data changes.
  const artistChangeEvents = [];
  let artistTableVersion = -1;
  let isDatabaseBusy = false;

  // Initialize the timer event on load.
  $(function() {
    scope.setInterval(onTick, 500);
  });

  // Call all functions in an array.
  function invokeAll(events) {
    events.forEach(function(e) {
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
})(window);
