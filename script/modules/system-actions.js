/* globals Artists, Database, Generator, Lottery, Modal */

var SystemActions;

(function() {

  // Interface.
  SystemActions = {
    batchSignOut: batchSignOut,
    exportCsv: exportCsv,
    findArtistByBadge: findArtistByBadge,
    findArtistByTable: findArtistByTable,
    newArtistRapidEntry: newArtistRapidEntry,
    resetDatabase: resetDatabase,
    runLottery: runLottery,
    saveArtistRaw: saveArtistRaw,
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

  // Export everything as a CSV file.
  function exportCsv() {
    Artists.getAll().then(function(users) {
      var undef;
      var schema = Database.getSchema('artists').instanceTemplate;
      var csv = '';

      // build CSV columns
      var csvColumns = [];
      for (var k in schema) {
        if (k !== 'id') {
          csvColumns.push(k);
        }
      }
      csv += csvColumns.join(',') + '\r\n';

      // build CSV rows
      for (var i in users) {
        var user = users[i];
        var csvRow = [];
        for (var j in csvColumns) {
          var column = csvColumns[j];
          var columnValue = user[column];
          if (columnValue === false) {
            columnValue = 'false';
          } else if (columnValue === true) {
            columnValue = 'true';
          } else if (columnValue === undef || columnValue === null) {
            columnValue = '';
          } else if (Array.isArray(columnValue)) {
            columnValue = columnValue.join('+');
          } else {
            columnValue = String(columnValue);
          }
          columnValue = '"' + columnValue.replace(/"/g, '""') + '"';
          csvRow.push(columnValue);
        }
        csv += csvRow.join(',') + '\r\n';
      }

      // build data URI and start downloading
      var anchor = window.document.createElement('a');
      anchor.href = window.URL.createObjectURL(new Blob([csv], {
        type: 'text/csv'
      }));
      anchor.download = 'Artists.csv';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });
  }

  // Find an artist. Pass in a function that returns TRUE for criteria.
  function findArtist(predicate) {
    return Artists.getAll().then(function(artists) {
      var filteredArtists = _.filter(artists, predicate);
      if (filteredArtists.length > 0) {
        Modal.editArtist(filteredArtists[0].id);
      } else {
        alert('Couldn\'t find who you were looking for.');
      }
    });
  }

  // Find an artist by field===value
  function findArtistBy(fieldName, value) {
    var valueString = String(value);
    return findArtist(function(a) {
      return !!a[fieldName] &&
        a[fieldName].toString() === valueString;
    });
  }

  // Find an artist by badge number.
  function findArtistByBadge() {
    var badgeNumber = prompt('Enter badge number.');
    if (!!badgeNumber) {
      findArtistBy('badgeNumber', badgeNumber);
    }
  }

  // Find an artist by table number.
  function findArtistByTable() {
    var tableNumber = prompt('Enter table number.');
    if (!!tableNumber) {
      findArtistBy('tableNumber', tableNumber);
    }
  }

  // Create new artists with rapid entry capability.
  function newArtistRapidEntry() {
    Modal.addArtist(true);
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

  // Save raw artist data.
  function saveArtistRaw() {
    try {
      var artistId = Number($('[data-select-raw]').find(':selected').attr('value'));
      if (artistId) {
        var artist = JSON.parse($('[data-edit-raw]').val());
        artist.id = artistId;
        Artists.set(artist).then(function() {
          alert('The artist was saved successfully.');
        });
      }
    } catch (e) {
      alert('The artist could not be saved:\n' + e.message);
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
