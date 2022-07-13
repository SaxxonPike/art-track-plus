/* globals Artists, Database, FileTransfer, Generator, Lottery, Modal, Promise */

(function(scope) {

  // Interface.
  scope.SystemActions = {
    batchSignOut: batchSignOut,
    databaseBackup: databaseBackup,
    databaseRestore: databaseRestore,
    exportCsv: exportCsv,
    findArtistByBadge: findArtistByBadge,
    findArtistByTable: findArtistByTable,
    findCheckedOutArtists: findCheckedOutArtists,
    newArtistRapidEntry: newArtistRapidEntry,
    resetDatabase: resetDatabase,
    runLottery: runLottery,
    saveArtistRaw: saveArtistRaw,
    seedDatabase: seedDatabase
  };

  // Make the user type in a word. Returns true if they actually did it.
  function confirmAction(actionName, caption) {
    return Modal.prompt(
      'Confirm by typing \'' + actionName + '\' into the box below.',
      caption || 'Confirmation')
      .then(function(value) {
        return new Promise(function(resolve, reject) {
          if (value === actionName) {
            resolve(value);
          } else {
            reject();
          }
        });
      });
  }

  // Sign out all artists. Mark those who have not signed out ineligible.
  // Artists still on standby are marked eligible for lottery.
  function batchSignOut() {
    return confirmAction(
      'close',
      'Close Out Day')
      .then(function() {
        return Artists.getAll().then(function(artists) {
          return Database.transaction(function() {
            return Dexie.Promise.all(artists.map(function(a) {
              if (a.tableNumber) {
                return Artists.setSignedOut(a.id, false);
              } else if (a.standbyOrder || a.lotteryOrder) {
                return Artists.setSignedOut(a.id, true);
              }
            }));
          });
        });
      });
  }

  // Export everything as a CSV file.
  function exportCsv() {
    return Modal.showYesNoCancel(
      'Will you be exporting this CSV for use in Microsoft Excel?',
      'Export CSV')
      .then(function(excelMode) {
        return Artists.getAll().then(function(users) {
          let csv = '';

          // build CSV columns
          const csvColumns = [
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
            const csvRow = [];
            csvColumns.forEach(function(column) {
              let columnValue = user[column];
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
              if (excelMode && columnValue.length > 0 && columnValue.indexOf(',') < 0) {
                columnValue = '=' + columnValue;
              }
              csvRow.push(columnValue);
            });
            csv += csvRow.join(',') + '\r\n';
          });

          // send file to user
          FileTransfer.download('Artists.csv', csv);
        });
      }
    );
  }

  // Find an artist. Pass in a function that returns TRUE for criteria.
  function findArtist(predicate) {
    return Artists.getAll().then(function(artists) {
      const filteredArtists = artists.filter(predicate);
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
    const valueString = '' + value;
    return findArtist(function(a) {
      return a[fieldName] &&
        ('' + a[fieldName]) === valueString;
    });
  }

  // Find an artist by badge number.
  function findArtistByBadge() {
    return Modal.prompt(
      'Enter badge number.',
      'Find Artist by Badge Number')
      .then(function(badgeNumber) {
        if (badgeNumber) {
          findArtistBy('badgeNumber', badgeNumber);
        }
      });
  }

  // Find an artist by table number.
  function findArtistByTable() {
    return Modal.prompt(
      'Enter table number.',
      'Find Artist by Table Number')
      .then(function(tableNumber) {
        if (tableNumber) {
          findArtistBy('tableNumber', tableNumber);
        }
      });
  }

  // Find all checked out artists for today.
  function findCheckedOutArtists() {
    Modal.showCheckedOutArtists();
  }

  // Create new artists with rapid entry capability.
  function newArtistRapidEntry() {
    Modal.addArtist(true);
  }

  // Clear out all artists.
  function resetDatabase() {
    return confirmAction(
      'reset',
      'Wipe Everything')
      .then(Artists.clear);
  }

  // Run the lottery for a given number of slots.
  function runLottery() {
    return Modal.prompt(
      'How many seats?',
      'Run Lottery')
      .then(function(seats) {
        if (seats) {
          const slotsAvailable = +seats;
          if (slotsAvailable > 0) {
            Lottery.run(slotsAvailable);
          }
        }
      });
  }

  // Save raw artist data.
  function saveArtistRaw() {
    try {
      const artistId = +$('[data-select-raw]').find(':selected').attr('value');
      if (artistId) {
        const artist = JSON.parse($('[data-edit-raw]').val());
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
    return confirmAction(
      'generate',
      'Generate Test Data')
      .then(function() {
        Artists.clear().then(function() {
          const artists = [];
          for (let i = 0; i < 200; i++) {
            artists.push(Generator.getRandomArtist());
          }
          return Artists.setAll(artists);
        });
      });
  }

  // Backup database to JSON
  function databaseBackup() {
    return Database.backup().then(function(data) {
      const fileName = 'backup-' + moment().format('x') + '.json';
      return FileTransfer.download(fileName, JSON.stringify(data));
    });
  }

  // Restore database from JSON
  function databaseRestore() {
    const files = $('#import-dialog-file')[0].files;
    if (files[0]) {
      return FileTransfer.upload(files[0]).then(
        function(fileData) {
          let jsonData;
          try {
            jsonData = JSON.parse(fileData);
          } catch (e) {
            return Promise.reject(e);
          }
          return Promise.resolve(jsonData);
        }
      ).then(Database.restore).then(
        Modal.alert(
          'The database was restored successfully.',
          'Database Restore')
      )
        .catch(function(e) {
          Modal.alert(
            'There was a problem restoring the database:\n' + e,
            'Database Restore Failed');
        });
    }
    return Promise.reject();
  }

})(window);
