/* globals ArtistFilter, Artists, Database */

var Lottery = (function() {

  // Interface.
  return {
    run: runLottery
  };

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
      var guaranteedArtists = ArtistFilter
        .filterLotteryGuaranteed(eligibleArtists);
      var eligibleCount = eligibleArtists.length;
      var lotteryNumber = 1;
      var standbyNumber = 1;

      // Clear existing artist lottery/seated data.
      $.each(allArtists, function(i, a) {
        a.lotteryOrder = null;
        a.standbyOrder = null;
        a.tableNumber = null;
      });

      // Populate the guaranteed artists first.
      $.each(guaranteedArtists, function(i, a) {
        if (slotsAvailable > 0) {
          a.lotteryOrder = lotteryNumber++;
          slotsAvailable--;
          eligibleCount--;
        }
      });

      // Use randomization to pick the remaining lottery slots.
      var slots = [];
      var i;
      for (i = 0; i < eligibleCount; i++) {
        slots.push(i);
      }

      // Swap the entire array randomly. It's a good enough shuffle.
      for (i = 0; i < eligibleCount; i++) {
        var randomIndex = Math.floor(Math.random() * eligibleCount);
        var temp = eligibleArtists[i];
        eligibleArtists[i] = eligibleArtists[randomIndex];
        eligibleArtists[randomIndex] = temp;
      }

      // Draw the winners off the top.
      i = 0;
      while (eligibleCount > 0) {
        if (slotsAvailable > 0) {
          eligibleArtists[i].lotteryOrder = lotteryNumber++;
        } else {
          eligibleArtists[i].standbyOrder = standbyNumber++;
        }
        i++;
        slotsAvailable--;
        eligibleCount--;
      }

      // Apply the changes.
      return Database.transaction(function() {
        $.each(eligibleArtists, function(i, a) {
          Artists.set(a);
        });
      });
    });
  }
})();
