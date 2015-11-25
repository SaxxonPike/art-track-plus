/* globals ArtistFilter, Artists, Database */

var Lottery = (function() {

  // Interface.
  return {
    reset: resetSeating,
    run: runLottery
  };

  // Clear existing artist lottery/seated data.
  function resetSeating(artists) {
    $.each(artists, function(i, a) {
      a.lotteryOrder = null;
      a.standbyOrder = null;
      a.tableNumber = null;
    });
  }

  // Shuffle artists.
  function shuffleArtists(artists) {
    var count = artists.length;
    $.each(artists, function(i, a) {
      var randomIndex = Math.floor(Math.random() * count);
      var temp = artists[i];
      artists[i] = artists[randomIndex];
      artists[randomIndex] = temp;
    });
  }

  // Run the lottery for the specified number of slots available.
  function runLottery(slotsAvailable) {
    Artists.getAll().then(function(allArtists) {

      // Safeguard against wiping out the standby/checkin list.
      if (allArtists.filter(function(a) {
          return !!a.tableNumber;
        }).length > 0) {
        alert("Lottery can't be run. Artists are signed in yet.");
        return;
      }

      // Initialization.
      var eligibleArtists = ArtistFilter
        .filterLotteryEligible(allArtists);

      resetSeating(allArtists);
      shuffleArtists(eligibleArtists);

      // Populate the guaranteed artists first.
      var lotteryNumber = 1;
      $.each(eligibleArtists, function(i, a) {
        if (slotsAvailable <= 0) {
          return false;
        }
        if (!!a.lotteryGuaranteed) {
          a.lotteryOrder = lotteryNumber++;
          slotsAvailable--;
        }
      });

      // Fill up the remaining slots. If no further slots are
      // avaialble, assign standby order.
      var standbyNumber = 1;
      $.each(eligibleArtists, function(i, a) {
        if (!a.lotteryOrder) {
          if (slotsAvailable > 0) {
            a.lotteryOrder = lotteryNumber++;
            slotsAvailable--;
          } else {
            a.standbyOrder = standbyNumber++;
          }
        }
      });

      // Apply the changes.
      return Database.transaction(function() {
        $.each(eligibleArtists, function(i, a) {
          Artists.set(a);
        });
      });
    });
  }
})();
