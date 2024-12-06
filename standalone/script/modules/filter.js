/* globals exports */

(function(scope) {

  // Interface.
  scope.Filter = {
    checkedOutToday: checkedOutToday,
    lottery: lottery,
    lotteryEligible: lotteryEligible,
    lotteryGuaranteed: lotteryGuaranteed,
    lotteryInOrder: lotteryInOrder,
    seated: seated,
    seatedInOrder: seatedInOrder,
    sorted: sortArtistsByName,
    standby: standby,
    standbyInOrder: standbyInOrder
  };

  // Filter artists that have checked out today.
  function checkedOutToday(artists) {
    const todayString = scope.Time.getTodayString();
    return artists.filter(function(a) {
      return !!a.seatedDays &&
        !a.tableNumber &&
        a.seatedDays.indexOf(todayString) >= 0;
    });
  }

  // Filter artists that are in the lottery, then return them in ABC order.
  function lottery(artists) {
    return sortArtistsByName(filterArtists(artists, 'lotteryOrder'));
  }

  // Filter artists that are eligible for lottery pick.
  function lotteryEligible(artists) {
    return filterArtists(artists, 'lotteryEligible');
  }

  // Filter artists that are guaranteed for lottery pick.
  function lotteryGuaranteed(artists) {
    return filterArtists(artists, 'lotteryGuaranteed');
  }

  // Filter artists that are in the lottery, then return them in lottery order.
  function lotteryInOrder(artists) {
    return filterAndSortArtists(artists, 'lotteryOrder');
  }

  // Filter artists that are seated, then return them in ABC order.
  function seated(artists) {
    return sortArtistsByName(filterArtists(artists, 'tableNumber'));
  }

  // Filter artists that are seated, then return them in table number order.
  function seatedInOrder(artists) {
    return sortArtistsNumerically(filterArtists(artists, 'tableNumber'), 'tableNumber');
  }

  // Filter artists that are on standby, then return them in ABC order.
  function standby(artists) {
    return sortArtistsByName(filterArtists(artists, 'standbyOrder'));
  }

  // Filter artists that are on standby, then return them in table number order.
  function standbyInOrder(artists) {
    return filterAndSortArtists(artists, 'standbyOrder');
  }

  // Filter and sort an artist list.
  function filterAndSortArtists(artists, filterField, sortField) {
    return sortArtists(filterArtists(artists, filterField),
      sortField || filterField);
  }

  // Filter an artist list for values that are at all present.
  function filterArtists(artists, filterField) {
    return artists.filter(function(a) {
      return !!a[filterField];
    });
  }

  // Sort an artist list.
  function sortArtists(artists, sortField) {
    return artists.slice().sort(function(a, b) {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      return fieldA > fieldB ? 1 : (fieldA < fieldB ? -1 : 0);
    });
  }

  // Sort an artist list, with numeric values.
  function sortArtistsNumerically(artists, sortField) {
    return artists.slice().sort(function(a, b) {
      const fieldA = +a[sortField];
      const fieldB = +b[sortField];
      return fieldA > fieldB ? 1 : (fieldA < fieldB ? -1 : 0);
    });
  }

  // Sort names without case sensitivity.
  function sortArtistsByName(artists) {
    return artists.slice().sort(function(a, b) {
      const fieldA = (a.name || '').toLocaleLowerCase();
      const fieldB = (b.name || '').toLocaleLowerCase();
      return fieldA > fieldB ? 1 : (fieldA < fieldB ? -1 : 0);
    });
  }
})((typeof window !== 'undefined') ? window : exports);
