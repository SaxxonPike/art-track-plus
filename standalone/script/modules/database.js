/* globals exports, Promise */

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
    select: selectDatabase,
    transaction: performTransaction
  };

  // Constants.
  var TABLE_VERSIONS_NAME = 'tableversions';

  // If true, we're already in a transaction scope.
  var _inTransactionScope = false;
  var _databaseName = 'ArtTrackPlus2';

  // (Lazily) initialize Dexie.
  function initialize() {
    if (!db) {
      var dexie = new Dexie(_databaseName);
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

      db = dexie;
    }

    return db;
  }

  // Get the schema for a table.
  function getSchema(tableName) {
    return initialize()[tableName].schema;
  }

  // Error handler for Dexie.
  function handleError(error) {
    var err = new Error();
    var errorMessage = 'Dexie has encountered an error: ' + error + '\n\n' +
      err.stack;
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
    var database = initialize();
    if (_inTransactionScope) {
      return callback();
    } else {
      return database.transaction('rw', database.tables.map(function(table) {
        return table.name;
      }), function() {
        _inTransactionScope = true;
        var result = callback();
        _inTransactionScope = false;
        return result;
      });
    }
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
        if (table.name.toLowerCase() === TABLE_VERSIONS_NAME) {
          resolve();
          return;
        }
        table.toArray(function(rows) {
          var tableRows = [];
          rows.forEach(function(row) {
            tableRows.push(row);
          });
          output[table.name] = tableRows;
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
      if (tableName.toLowerCase() !== TABLE_VERSIONS_NAME) {
        var table = initialize()[tableName];
        console.log('clear table ' + tableName);
        var clearTask = table.clear ? table.clear() : Promise.resolve();
        return clearTask.then(function() {
          var rows = tables[tableName];
          Promise.all(rows.map(function(row) {
            return table.put(row);
          }));
          return incrementTableVersion(tableName);
        });
      }
    }));
  }

  function selectDatabase(databaseName) {
    _databaseName = databaseName;
    if (db) {
      db.close();
      db = null;
    }
  }

})((typeof window !== 'undefined') ? window : exports);
