var Names;

// NOTE: nameData consists of {name, id}

(function(){
  Names = {
    populate: populate
  };

  // Populate columns in all places in the app that contain artist lists.
  function populate() {
    Artists.getAll().then(function(artistData) {
      var standbyList = ArtistFilter.filterStandby(artistData);
      var seatedList = ArtistFilter.filterSeated(artistData);
      var lotteryList = ArtistFilter.filterLottery(artistData);

      buildNames($('.artist-names'), ArtistFilter.sortByName(artistData), false, true);
      buildNames($('.lottery-names'), ArtistFilter.filterLottery(artistData));
      buildNames($('.standby-names'), standbyList);
      buildNames($('.seated-names'), seatedList);

      buildNames($('.lottery-sorted-names'), ArtistFilter.sortByName(lotteryList), true);
      buildNames($('.standby-sorted-names'), standbyList, true);
      buildNames($('.seated-sorted-names'), seatedList, true);
    });
  }

  // Build a name list for use in the DOM.
  function buildNames(container, nameData, disableClick, withSymbols) {
    container.empty();

    for (var i in nameData) {

      var artist = nameData[i];
      var nameElement = $('<a/>')
        .addClass('line')
        .text(artist.name + " ");

      if (withSymbols) {
        var standbyFlag = !artist.seatedLast &&
          (artist.standbyDays && artist.standbyDays.length >= 2);

        if (artist.lotteryOrder > 0) {
          nameElement.append($('<i class="fa fa-check"/>'));
        }

        if (artist.standbyOrder > 0) {
          nameElement.append($('<i class="fa fa-clock-o"/>'));
        }

        if (artist.tableNumber) {
          nameElement.append($('<i class="fa fa-sign-in"/>'));
        }

        if (standbyFlag) {
          nameElement.append($('<i class="fa fa-exclamation attention"/>'));
        }
      }

      container.append(nameElement);

      if (!disableClick) {
        nameElement
          .attr('href', '#')
          .click(createNameDetailClickHandler(nameData[i].id));
      }
    }
  }

  // Create a click handler for opening name detail modals.
  function createNameDetailClickHandler(id) {
    return (function() {
      openNameDetail(id);
    });
  }

  // Show name detail modal.
  function openNameDetail(id) {
    Modal.editArtist(Number(id));
  }
})();
