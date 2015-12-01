/* globals Promise */

(function(scope) {
  var db;

  // Interface.
  scope.Database = {
    backup: backupDatabase,
    delete: deleteDatabase,
    getSchema: getSchema,
    getTableVersion: getTableVersion,
    incrementTableVersion: incrementTableVersion,
    open: initialize,
    restore: restoreDatabase,
    transaction: performTransaction
  };

  // (Lazily) initialize Dexie.
  function initialize() {
    if (!db) {
      var dexie = new Dexie('ArtTrackPlus2');
      dexie.version(1)
        .stores({
          artists: [
            '++id',
            'name',
            'badgeNumber',
            'tableNumber',
            'roomNumber',
            'phone',
            'remarks',
            'lotteryEligible',
            'lotteryGuaranteed',
            'lotteryOrder',
            'seatedLast',
            'seatedDays',
            'standbyDays',
            'standbyOrder'
          ].join(),
          tableVersions: [
            '++id',
            'artists'
          ].join()
        });
      dexie.open().catch(handleError);
      Dexie.Promise.on('error', handleError);

      db = dexie;
    }

    return db;
  }

  // Get the schema for a table.
  function getSchema(tableName) {
    return initialize()[tableName].schema;
  }

  // Get stack trace.
  function getStackTrace() {
    var err = new Error();
    return err.stack;
  }

  // Error handler for Dexie.
  function handleError(error) {
    var errorMessage = 'Dexie has encountered an error: ' + error + '\n\n' +
      getStackTrace();
    console.error(errorMessage);
  }

  // Delete database.
  function deleteDatabase() {
    var database = initialize();
    db = null;
    return database.delete();
  }

  // Perform a database transaction.
  function performTransaction(callback) {
    return initialize().transaction('rw', ['artists', 'tableVersions'], callback);
  }

  // Get current table version.
  function getTableVersion() {
    return initialize().tableVersions.get(1);
  }

  // Increment table version.
  function incrementTableVersion(tableName) {
    return getTableVersion(tableName).then(function(versions) {
      if (!versions) {
        versions = {
          id: 1
        };
      }
      if (!versions[tableName]) {
        versions[tableName] = 0;
      }
      versions[tableName]++;
      return initialize().tableVersions.put(versions);
    });
  }

  // Back up the database
  function backupDatabase() {
    var output = {};
    var tables = initialize().tables;

    return Promise.all(tables.map(function(table) {
      return new Promise(function(resolve) {
        output[table.name] = [];
        table.toArray(function(rows) {
          rows.forEach(function(row) {
            output[table.name].push(row);
          });
          resolve();
        });
      });
    })).then(function() {
      return Promise.resolve(output);
    });
  }

  // Restore the database
  function restoreDatabase(tables) {
    return Promise.all(Object.keys(tables).map(function(tableName) {
      if (tableName.toLowerCase() !== 'tableversions') {
        var table = initialize()[tableName];
        return table.clear().then(function() {
          var rows = tables[tableName];
          Promise.all(rows.map(function(row) {
            return table.put(row);
          }));
          return incrementTableVersion(tableName);
        });
      }
    }));
  }
})(window);
