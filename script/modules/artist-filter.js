var ArtistFilter = (function() {

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

  // Interface.
  return {
    sortByName: sortByName,
    filterStandby: filterStandby,
    filterLottery: filterLottery,
    filterSeated: filterSeated,
    filterLotteryEligible: filterLotteryEligible,
    filterLotteryGuaranteed: filterLotteryGuaranteed,
    filterTable: filterTable
  };

  // Sort artists by the name field.
  function sortByName(artists) {
    return nameSorter(artists);
  }

  // Filter for artists on standby, sorted by their standby order.
  function filterStandby(artists) {
    return standbySorter(standbyFilter(artists));
  }

  // Filter for artists picked for the lottery, sorted by their lottery order.
  function filterLottery(artists) {
    return lotterySorter(lotteryFilter(artists));
  }

  // Filter for artists who are seated, sorted by name.
  function filterSeated(artists) {
    return nameSorter(tableFilter(artists));
  }

  // Filter for artists who are eligible for being chosen for the lottery.
  function filterLotteryEligible(artists) {
    return lotteryEligibleFilter(artists);
  }

  // Filter for artists who are guaranteed to be picked for the lottery.
  function filterLotteryGuaranteed(artists) {
    return lotteryGuaranteedFilter(artists);
  }

  // Get seated artists with the specified table number.
  function filterTable(artists, tableNumber) {
    return getValueFilter('tableNumber', tableNumber)(artists);
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
    if (typeof filterValue === 'undefined') {
      return function(data) {
        return $.grep(data, function(v) {
          return v[valueName] !== null && (typeof v[valueName]) !== 'undefined';
        });
      };
    } else {
      return function(data) {
        return $.grep(data, function(v) {
          return v[valueName] === filterValue;
        });
      };
    }
  }
})();
