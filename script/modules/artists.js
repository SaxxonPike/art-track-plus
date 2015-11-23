var Artists;

(function() {
  // Interface.
  Artists = {
    addLottery: addLottery,
    clear: clearArtists,
    delete: deleteArtistById,
    get: getArtistById,
    getAll: getAllArtists,
    set: setArtist,
    setSeated: setSeated,
    setStandby: setStandby,
    setSignedOut: setSignedOut
  };

  // Return a copy of the array with the element added, without duplications.
  function addArrayEntry(arrayData, elementToAdd) {
    if (Array.isArray(arrayData)) {
      var result = $.merge([], arrayData);
      return $.merge(result, [elementToAdd]);
    }
    return [elementToAdd];
  }

  // Get the maximum value for a field name.
  function getMaxFieldValue(artists, fieldName) {
    var maxValue = 0;
    for (var i in artists) {
      if (artists[i][fieldName] > maxValue) {
        maxValue = artists[i][fieldName];
      }
    }
    return maxValue;
  }

  // Get a copy of the array with today's day string added.
  function appendToday(arr) {
    return addArrayEntry(arr, getTodayString());
  }

  // Get today's day string.
  function getTodayString() {
    return moment().format("dddd");
  }

  // Get an artist by ID from a collection.
  function getArtistFromArray(artists, id) {
    for (var i in artists) {
      var artist = artists[i];
      if (artist.id == id) {
        return artist;
      }
    }
    return { id: id };
  }

  // Set an artist's status to seated, with the specified table number.
  function setSeated(id, tableNumber) {
    return getArtistById(id).then(function(artist) {
      return setArtist({
        id: id,
        tableNumber: tableNumber,
        seatedDays: appendToday(artist.seatedDays),
        seatedLast: getTodayString(),
        standbyOrder: null
      });
    })
  }

  // Add an artist to the end of the standby list.
  function setStandby(id) {
    return getAllArtists().then(function(artists) {
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
      tableNumber: null,
      roomNumber: null
   });
  }

  // Add an artist to the end of the lottery list.
  function addLottery(id) {
    return getAllArtists().then(function(artists) {
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
    return Database.open().artists.clear()
      .then(incrementTableVersion);
  }

  // Delete an artist from the database by ID.
  function deleteArtistById(id) {
    return Database.open().artists.delete(id)
      .then(incrementTableVersion);
  }

  // Get all artists.
  function getAllArtists() {
    return Database.open().artists.toArray();
  }

  // Get an artist by ID.
  function getArtistById(id) {
    return Database.open().artists.get(id);
  }

  // Set an artist's data. If the ID doesn't exist, a new record is made.
  function setArtist(artistData) {
    var isNew = artistData.id === 0 || artistData.id === null || (typeof artistData.id == "undefined");
    var data = $.extend({}, artistData);
    delete data.id;
    Database.incrementTableVersion('artists');
    if (isNew) {
      return Database.open().artists.put(data);
    } else {
      return Database.open().artists.update(artistData.id, data);
    }
  }

  function incrementTableVersion() {
    return Database.incrementTableVersion('artists');
  }
})();