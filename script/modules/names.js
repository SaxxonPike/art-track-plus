var Names;

// NOTE: nameData consists of {name, id}

(function(){
  Names = {
    populate: populate
  };

  // Populate columns in all places in the app that contain artist lists.
  function populate() {
    Artists.getAll().then(function(artistData) {
      buildNames($('#artist-names'), Artists.sortByName(artistData), false, true);
      buildNames($('#lottery-names'), Artists.filterLottery(artistData));
      buildNames($('#standby-names'), Artists.filterStandby(artistData));
      buildNames($('#seated-names'), Artists.filterSeated(artistData));
    });
  }

  // Build a name list for use in the DOM.
  function buildNames(container, nameData, disableClick, withSymbols) {
    container.empty();

    for (var i in nameData) {

      var nameElement = $('<a/>')
        .addClass('line')
        .text(nameData[i].name);

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
