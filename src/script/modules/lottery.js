/* globals Artists, exports, Filter */

(function(scope) {

  // Interface.
  scope.Lottery = {
    reset: resetSeating,
    run: runLottery
  };

  // Clear existing artist lottery/seated data.
  function resetSeating(artists) {
    artists.forEach(function(a) {
      a.lotteryOrder = null;
      a.standbyOrder = null;
      a.tableNumber = null;
    });
  }

  // Shuffle artists.
  function shuffleArtists(artists) {
    var count = artists.length;
    artists.forEach(function(a, i) {
      var randomIndex = Math.floor(Math.random() * count);
      var temp = artists[i];
      artists[i] = artists[randomIndex];
      artists[randomIndex] = temp;
    });
  }

  // Run the lottery for the specified number of slots available.
  function runLottery(slotsAvailable) {
    Artists.getAll().then(function(allArtists) {
      // Initialization.
      var eligibleArtists = Filter.lotteryEligible(allArtists);

      resetSeating(allArtists);
      shuffleArtists(eligibleArtists);

      // Populate the guaranteed artists first.
      var lotteryNumber = 1;
      eligibleArtists.forEach(function(a) {
        if (slotsAvailable > 0 && a.lotteryGuaranteed) {
          a.lotteryOrder = lotteryNumber++;
          slotsAvailable--;
        }
      });

      // Fill up the remaining slots. If no further slots are
      // avaialble, assign standby order.
      var standbyNumber = 1;
      eligibleArtists.forEach(function(a) {
        if (!a.lotteryOrder) {
          if (slotsAvailable > 0) {
            a.lotteryOrder = lotteryNumber++;
            slotsAvailable--;
          } else {
            a.standbyOrder = standbyNumber++;
            a.standbyDays = Artists.appendToday(a.standbyDays);
          }
        }
      });

      // Apply the changes.
      Artists.setAll(eligibleArtists);
    });
  }
})((typeof window !== 'undefined') ? window : exports);
