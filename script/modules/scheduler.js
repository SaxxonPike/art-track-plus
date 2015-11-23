var Scheduler;

(function() {

  // Interface.
  Scheduler = {
    onArtistChange: onArtistChange,
  };

  // Handlers for when artist data changes.
  var artistChangeEvents = [];
  var artistTableVersion = -1;
  var isDatabaseBusy = false;

  // Call all functions in an array.
  function invokeAll(events) {
    for (var i in events) {
      events[i]();
    }
  }

  // Schedule an event to run every time artist data changes.
  function onArtistChange(eventFunction) {
    artistChangeEvents.push(eventFunction);
  }

  // Main timer event.
  function onTick() {
    console.log("Refreshed.");
    if (!isDatabaseBusy) {
      Database.getTableVersion('artists').then(function(versions) {
        if (!versions) {
          versions = { id: 1 };
          Database.open().tableVersions.put(versions);
        }
        if (versions.artists != artistTableVersion) {
          console.log("Update requested. New version " + versions.artists);
          artistTableVersion = versions.artists;
          invokeAll(artistChangeEvents);
        }
        isDatabaseBusy = false;
      });
      isDatabaseBusy = true;
    }
  }

  // Initialize the timer event on load.
  window.setInterval(onTick, 500);
})();
