var Database;

(function() {
  var db;

  // Set true to report via alert() instead of console.error()
  var obviousErrorMode = false;

  // Interface.
  Database = {
    delete: deleteDatabase,
    getTableVersion: getTableVersion,
    incrementTableVersion: incrementTableVersion,
    open: openDatabase,
    transaction: performTransaction
  };

  // Get stack trace.
  function getStackTrace() {
    var err = new Error();
    return err.stack;
  }

  // Error handler for Dexie.
  function handleError(error) {
    var errorMessage = "Dexie has encountered an error: " + error + "\n\n" + getStackTrace();
    if (obviousErrorMode) {
      alert(errorMessage);
    } else {
      console.error(errorMessage);
    }
  }

  // Delete database.
  function deleteDatabase() {
    var database = openDatabase();
    db = null;
    return database.delete();
  }

  // (Lazily) initialize Dexie.
  function openDatabase() {
    if (!db) {
      console.log("Init DB.");
      var dexie = new Dexie("ArtTrackNeo1");
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
      Dexie.Promise.on("error", handleError);
      console.log("Init DB finished.");

      db = dexie;
    }

    return db;
  }

  // Perform a database transaction.
  function performTransaction(callback) {
    return openDatabase().transaction('rw', ['artists', 'tableVersions'], callback);
  }

  // Get current table version.
  function getTableVersion(tableName) {
    return openDatabase().tableVersions.get(1);
  }

  // Increment table version.
  function incrementTableVersion(tableName) {
    return getTableVersion(tableName).then(function(versions) {
      if (!versions) {
        versions = { id: 1 };
      }
      if (!versions[tableName]) {
        versions[tableName] = 0;
      }
      versions[tableName]++;
      return openDatabase().tableVersions.put(versions);
    });
  }
})();
