var SystemActions;

(function() {

  // Interface.
  SystemActions = {
    resetDatabase: resetDatabase,
    seedDatabase: seedDatabase
  };

  function confirmAction(actionName) {
    return prompt("Confirm this action by typing '" + actionName +
      "' into the box below.") === actionName;
  }

  function resetDatabase() {
    if (confirmAction('reset')) {
      Database.delete().then(function() {
        Names.populate();
      });
    }
  }

  function seedDatabase() {
    if (confirmAction('generate')) {
      Database.delete().then(function() {
        Database.transaction(function() {
          for (var i = 0; i < 500; i++) {
            var artist = { name: "Test " + i };
            Artists.set(artist);
          }
        }).then(function() {
          Names.populate();
        });
      });
    }
  }

})();
