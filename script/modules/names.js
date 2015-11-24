/* globals Artists, ArtistFilter, Modal */

var Names;

(function() {
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
      buildNames($('.lottery-names'), lotteryList, false, false, true);
      buildNames($('.standby-names'), standbyList, false, false, true);
      buildNames($('.seated-names'), seatedList);

      buildNames($('.lottery-sorted-names'), ArtistFilter.sortByName(lotteryList), true);
      buildNames($('.standby-sorted-names'), standbyList, true);
      buildNames($('.seated-sorted-names'), seatedList, true);

      $('.count-artists').text(artistData.length);
      $('.count-lottery').text(lotteryList.length);
      $('.count-standby').text(standbyList.length);
      $('.count-seated').text(seatedList.length);
    });
  }

  // Build a name list for use in the DOM.
  function buildNames(container, nameData, disableClick, withSymbols, withOrder) {
    container.empty();

    $.each(nameData, function(index, artist) {
      var nameElement = $('<a/>')
        .addClass('line')
        .text(artist.name + ' ');

      if (withOrder) {
        nameElement.prepend($('<span class="artist-order"/>')
          .text((index + 1).toString() + '.'));
      }

      if (artist.tableNumber) {
        var tableElement = $('<span class="artist-seat"/>');
        tableElement.text('#' + artist.tableNumber);
        nameElement.append(tableElement);
      }

      if (withSymbols) {
        var symbolElement = $('<span class="artist-symbols"/>');

        var standbyFlag = !artist.seatedLast &&
          (artist.standbyDays && artist.standbyDays.length >= 2);

        if (artist.lotteryOrder > 0) {
          symbolElement.append($('<i class="fa fa-check faded"/>'));
        }

        if (artist.standbyOrder > 0) {
          symbolElement.append($('<i class="fa fa-clock-o faded"/>'));
        }

        if (artist.tableNumber) {
          symbolElement.append($('<i class="fa fa-sign-in faded"/>'));
        }

        if (standbyFlag) {
          symbolElement.append($('<i class="fa fa-exclamation attention"/>'));
        }

        if (symbolElement.html().length > 0) {
          nameElement.append(symbolElement);
        }
      }

      container.append(nameElement);

      if (!disableClick) {
        nameElement
          .attr('href', '#')
          .click(createNameDetailClickHandler(artist.id));
      }
    });
  }

  // Create a click handler for opening name detail modals.
  function createNameDetailClickHandler(id) {
    return function() {
      openNameDetail(id);
    };
  }

  // Show name detail modal.
  function openNameDetail(id) {
    Modal.editArtist(Number(id));
  }
})();
