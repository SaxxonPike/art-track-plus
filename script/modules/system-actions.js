/* globals Artists, Database, Generator */

var SystemActions;

(function() {

  // Interface.
  SystemActions = {
    resetDatabase: resetDatabase,
    seedDatabase: seedDatabase
  };

  function confirmAction(actionName) {
    return prompt('Confirm this action by typing \'' + actionName +
      '\' into the box below.') === actionName;
  }

  function resetDatabase() {
    if (confirmAction('reset')) {
      Artists.clear();
    }
  }

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
