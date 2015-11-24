/* globals Artists, Database, Generator, Lottery */

var SystemActions;

(function() {

  // Interface.
  SystemActions = {
    batchSignOut: batchSignOut,
    resetDatabase: resetDatabase,
    runLottery: runLottery,
    seedDatabase: seedDatabase
  };

  // Make the user type in a word. Returns true if they actually did it.
  function confirmAction(actionName) {
    return prompt('Confirm this action by typing \'' + actionName +
        '\' into the box below.') === actionName;
  }

  // Sign out all artists. Mark those who have not signed out ineligible.
  // Artists still on standby are marked eligible for lottery.
  function batchSignOut() {
    if (confirmAction('close')) {
      Artists.getAll().then(function(artists) {
        Database.transaction(function() {
          $.each(artists, function(i, a) {
            if (!!a.tableNumber) {
              Artists.setSignedOut(a.id, false);
            } else if (!!a.standbyOrder || !!a.lotteryOrder) {
              Artists.setSignedOut(a.id, true);
            }
          });
        });
      });
    }
  }

  // Clear out all artists.
  function resetDatabase() {
    if (confirmAction('reset')) {
      Artists.clear();
    }
  }

  // Run the lottery for a given number of slots.
  function runLottery() {
    var input = prompt('How many seats?');
    if (input) {
      var slotsAvailable = Number(input);
      if (slotsAvailable > 0) {
        Lottery.run(slotsAvailable);
      }
    }
  }

  // Fill the database with mock data.
  function seedDatabase() {
    if (confirmAction('generate')) {
      Artists.clear().then(function() {
        Database.transaction(function() {
          for (var i = 0; i < 200; i++) {
            Artists.set(Generator.getRandomArtist());
          }
        });
      });
    }
  }

})();
