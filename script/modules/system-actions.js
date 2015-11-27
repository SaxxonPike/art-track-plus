/* globals Artists, Database, Generator, Lottery, Modal */

(function(scope) {

  // Interface.
  scope.SystemActions = {
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
  function confirmAction(actionName, caption, callback) {
    return Modal.prompt(
      'Confirm by typing \'' + actionName + '\' into the box below.',
      caption || 'Confirmation',
      function(value) {
        if (value === actionName) {
          callback();
        }
      });
  }

  // Sign out all artists. Mark those who have not signed out ineligible.
  // Artists still on standby are marked eligible for lottery.
  function batchSignOut() {
    confirmAction(
      'close',
      'Close Out Day',
      function() {
        return Artists.getAll().then(function(artists) {
          return Database.transaction(function() {
            var promise;
            artists.forEach(function(a) {
              if (!!a.tableNumber) {
                promise = Artists.setSignedOut(a.id, false);
              } else if (!!a.standbyOrder || !!a.lotteryOrder) {
                promise = Artists.setSignedOut(a.id, true);
              }
            });
            return promise;
          });
        });
      });
  }

  // Export everything as a CSV file.
  function exportCsv() {
    return Artists.getAll().then(function(users) {
      var csv = '';

      // build CSV columns
      var csvColumns = [
        'name',
        'badgeNumber',
        'tableNumber',
        'roomNumber',
        'phone',
        'remarks',
        'seatedLast',
        'seatedDays',
        'standbyDays'
      ];
      csv += csvColumns.join(',') + '\r\n';

      // build CSV rows
      users.forEach(function(user) {
        var csvRow = [];
        csvColumns.forEach(function(column) {
          var columnValue = user[column];
          if (columnValue === false) {
            columnValue = 'N';
          } else if (columnValue === true) {
            columnValue = 'Y';
          } else if (columnValue !== 0 && !columnValue) {
            columnValue = null;
          } else if (Array.isArray(columnValue)) {
            columnValue = columnValue.join('|');
          } else {
            columnValue = '' + columnValue;
          }
          if (columnValue !== null) {
            columnValue = '"' + columnValue.replace(/"/g, '""') + '"';
          } else {
            columnValue = '';
          }
          csvRow.push(columnValue);
        });
        csv += csvRow.join(',') + '\r\n';
      });

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
      var filteredArtists = artists.filter(predicate);
      if (filteredArtists.length > 0) {
        Modal.editArtist(filteredArtists[0].id);
      } else {
        Modal.alert(
          'No matching artists were found.',
          'Search Results'
        );
      }
    });
  }

  // Find an artist by field===value
  function findArtistBy(fieldName, value) {
    var valueString = '' + value;
    return findArtist(function(a) {
      return !!a[fieldName] &&
        ('' + a[fieldName]) === valueString;
    });
  }

  // Find an artist by badge number.
  function findArtistByBadge() {
    Modal.prompt(
      'Enter badge number.',
      'Find Artist by Badge Number',
      function(badgeNumber) {
        if (!!badgeNumber) {
          findArtistBy('badgeNumber', badgeNumber);
        }
      });
  }

  // Find an artist by table number.
  function findArtistByTable() {
    Modal.prompt(
      'Enter table number.',
      'Find Artist by Table Number',
      function(tableNumber) {
        if (!!tableNumber) {
          findArtistBy('tableNumber', tableNumber);
        }
      });
  }

  // Create new artists with rapid entry capability.
  function newArtistRapidEntry() {
    Modal.addArtist(true);
  }

  // Clear out all artists.
  function resetDatabase() {
    confirmAction(
      'reset',
      'Wipe Everything',
      Artists.clear);
  }

  // Run the lottery for a given number of slots.
  function runLottery() {
    Modal.prompt(
      'How many seats?',
      'Run Lottery',
      function(seats) {
        if (seats) {
          var slotsAvailable = +seats;
          if (slotsAvailable > 0) {
            Lottery.run(slotsAvailable);
          }
        }
      });
  }

  // Save raw artist data.
  function saveArtistRaw() {
    try {
      var artistId = +$('[data-select-raw]').find(':selected').attr('value');
      if (artistId) {
        var artist = JSON.parse($('[data-edit-raw]').val());
        artist.id = artistId;
        Artists.set(artist).then(function() {
          Modal.alert('The artist was saved successfully.');
        });
      }
    } catch (e) {
      Modal.alert('The artist could not be saved:\n' + e.message);
    }
  }

  // Fill the database with mock data.
  function seedDatabase() {
    confirmAction(
      'generate',
      'Generate Test Data',
      function() {
        Artists.clear().then(function() {
          var artists = [];
          for (var i = 0; i < 200; i++) {
            artists.push(Generator.getRandomArtist());
          }
          return Artists.setAll(artists);
        });
      });
  }

})(window);
