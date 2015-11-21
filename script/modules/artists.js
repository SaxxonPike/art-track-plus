var Artists;

// This requires Database to be loaded.

(function() {
  // Interface.
  Artists = {
    clear: clearArtists,
    delete: deleteArtistById,
    get: getArtistById,
    getAll: getAllArtists,
    set: setArtist,

    sortByName: sortByName,
    filterStandby: filterStandby,
    filterLottery: filterLottery,
    filterSeated: filterSeated,
    filterLotteryEligible: filterLotteryEligible,
    filterLotteryGuaranteed: filterLotteryGuaranteed,
    filterTable: filterTable,

    setSeated: setSeated,
    setStandby: setStandby,
    setSignedOut: setSignedOut
  };

  function getMaxFieldValue(artists, fieldName) {
    var maxValue = 0;
    for (var i in artists) {
      if (artists[i][fieldName] > maxValue) {
        maxValue = artists[i][fieldName];
      }
    }
    alert(fieldName + ":" + maxValue);
    return maxValue;
  }

  function setSeated(id, tableNumber) {
    return setArtist({ id: id, tableNumber: tableNumber });
  }

  function setStandby(id) {
    return getAllArtists().then(function(artists) {
      return setArtist({
        id: id,
        standbyOrder: getMaxFieldValue(artists, 'standbyOrder') + 1,
        lotteryOrder: null,
        tableNumber: null,
        roomNumber: null
      });
    });
  }

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

  // Field sorters.
  var nameSorter = getValueSorter('name', '');
  var lotterySorter = getValueSorter('lotteryOrder', 0);
  var standbySorter = getValueSorter('standbyOrder', 0);

  // Field filters.
  var lotteryFilter = getValueFilter('lotteryOrder');
  var lotteryEligibleFilter = getValueFilter('lotteryEligible');
  var lotteryGuaranteedFilter = getValueFilter('lotteryGuaranteed');
  var roomFilter = getValueFilter('roomNumber');
  var standbyFilter = getValueFilter('standbyOrder');
  var tableFilter = getValueFilter('tableNumber');

  function sortByName(artists) {
    return nameSorter(artists);
  }

  function filterStandby(artists) {
    return standbySorter(standbyFilter(artists));
  }

  function filterLottery(artists) {
    return lotterySorter(lotteryFilter(artists));
  }

  function filterSeated(artists) {
    return nameSorter(tableFilter(artists));
  }

  function filterLotteryEligible(artists) {
    return lotteryEligibleFilter(artists);
  }

  function filterLotteryGuaranteed(artists) {
    return lotteryGuaranteedFilter(artists);
  }

  function filterTable(artists, tableNumber) {
    return getValueFilter('tableNumber', tableNumber)(artists);
  }

  // Clear all artists from the database.
  function clearArtists() {
    return Database.open().artists.clear();
  }

  // Delete an artist from the database by ID.
  function deleteArtistById(id) {
    return Database.open().artists.delete(id);
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
    if (isNew) {
      return Database.open().artists.put(data);
    } else {
      return Database.open().artists.update(artistData.id, data);
    }
  }

  // Build a value sorter for an object field.
  function getValueSorter(valueName, defaultForMissing) {
    return function(collection) {
      return collection.sort(function(a, b) {
        var valueA = a[valueName] || defaultForMissing;
        var valueB = b[valueName] || defaultForMissing;
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });
    };
  }

  // Build a value filter for an object field.
  function getValueFilter(valueName, filterValue) {
    if (typeof filterValue == 'undefined') {
      return function(data) {
        var result = [];
        for (var i in data) {
          if (data[i][valueName]) {
            result.push(data[i]);
          }
        }
        return result;
      }
    } else {
      return function(data) {
        var result = [];
        for (var i in data) {
          if (data[i][valueName] == filterValue) {
            result.push(data[i]);
          }
        }
        return result;
      }
    }
  }
})();
