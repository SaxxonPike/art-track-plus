/* globals exports */

(function(scope) {
  // Interface.
  scope.Artists = {
    addLottery: addLottery,
    appendToday: appendToday,
    clear: clearArtists,
    delete: deleteArtistById,
    get: getArtistById,
    getAll: getAllArtists,
    set: setArtist,
    setAll: setAllArtists,
    setSeated: setSeated,
    setStandby: setStandby,
    setSignedOut: setSignedOut
  };

  // Constants.
  var ARTISTS_TABLE_NAME = 'artists';

  function getDatabase() {
    return scope.Database;
  }

  // Return a copy of the array with the element added, without duplications.
  function addArrayEntry(arrayData, elementToAdd) {
    if (Array.isArray(arrayData)) {
      if (arrayData.indexOf(elementToAdd) < 0) {
        return arrayData.concat(elementToAdd);
      }
      return arrayData.slice();
    }
    return [elementToAdd];
  }

  // Get the maximum value for a field name.
  function getMaxFieldValue(artists, fieldName) {
    return Math.max.apply(0, artists.map(function(a) {
      return a[fieldName] || 0;
    }));
  }

  // Get a copy of the array with today's day string added.
  function appendToday(arr) {
    return addArrayEntry(arr, getTodayString());
  }

  // Get today's day string.
  function getTodayString() {
    return scope.Time.getTodayString();
  }

  // Get an artist by ID from a collection.
  function getArtistFromArray(artists, id) {
    return artists.find(function(artist) {
        return artist.id === id;
      }) || {
        id: id
      };
  }

  // Set an artist's status to seated, with the specified table number.
  function setSeated(id, tableNumber) {
    return getArtistById(id).then(
      function(artist) {
        return setArtist({
          id: id,
          tableNumber: tableNumber,
          seatedDays: appendToday(artist.seatedDays),
          seatedLast: moment().format(),
          standbyOrder: null,
          lotteryOrder: null
        });
      });
  }

  // Add an artist to the end of the standby list.
  function setStandby(id) {
    return getAllArtists().then(
      function(artists) {
        return setArtist({
          id: id,
          standbyOrder: getMaxFieldValue(artists, 'standbyOrder') + 1,
          lotteryOrder: null,
          tableNumber: null,
          roomNumber: null,
          standbyDays: appendToday(getArtistFromArray(artists, id).standbyDays)
        });
      });
  }

  // Set an artist to signed out.
  function setSignedOut(id, eligible) {
    return setArtist({
      id: id,
      tableNumber: null,
      lotteryOrder: null,
      standbyOrder: null,
      lotteryEligible: eligible,
      roomNumber: null
    });
  }

  // Add an artist to the end of the lottery list.
  function addLottery(id) {
    return getAllArtists().then(
      function(artists) {
        return setArtist({
          id: id,
          lotteryOrder: getMaxFieldValue(artists, 'lotteryOrder') + 1,
          standbyOrder: null,
          tableNumber: null,
          roomNumber: null
        });
      });
  }

  // Clear all artists from the database.
  function clearArtists() {
    return getDatabase().open().artists.clear()
      .then(incrementTableVersion);
  }

  // Delete an artist from the database by ID.
  function deleteArtistById(id) {
    return getDatabase().open().artists.delete(+id)
      .then(incrementTableVersion);
  }

  // Get all artists.
  function getAllArtists() {
    return getDatabase().open().artists.toArray();
  }

  // Get an artist by ID.
  function getArtistById(id) {
    return getDatabase().open().artists.get(+id);
  }

  // Set multiple artist data.
  function setAllArtists(artists) {
    var database = getDatabase();
    return database.transaction(function() {
      artists.forEach(function(artist) {
        var isNew = !artist.id;
        var data = Object.assign({}, artist);
        delete data.id;
        if (isNew) {
          database.open().artists.put(data);
        } else {
          database.open().artists.update(+artist.id, data);
        }
      });
      incrementTableVersion();
    });
  }

  // Set an artist's data. If the ID doesn't exist, a new record is made.
  function setArtist(artist) {
    return setAllArtists([artist]);
  }

  // Indicate that the table has changed.
  function incrementTableVersion() {
    return getDatabase().incrementTableVersion(ARTISTS_TABLE_NAME);
  }
})((typeof window !== 'undefined') ? window : exports);
