var Database;

(function() {
  var db;

  // Set true to report via alert() instead of console.error()
  var obviousErrorMode = true;

  // Interface.
  Database = {
    delete: deleteDatabase,
    open: openDatabase,
    transaction: performTransaction
  };

  // Error handler for Dexie.
  function handleError(error) {
    var errorMessage = "Dexie has encountered an error: " + error;
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
      var dexie = new Dexie("ArtTrackNeo");
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
          ].join(',')
        });
      dexie.open().catch(handleError);
      Dexie.Promise.on("error", handleError);

      db = dexie;
    }

    return db;
  }

  // Perform a database transaction.
  function performTransaction(callback) {
    return openDatabase().transaction('rw', 'artists', callback);
  }
})();
