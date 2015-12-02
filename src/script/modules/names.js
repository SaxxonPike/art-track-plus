/* globals Artists, Filter, Modal */

(function(scope) {
  scope.Names = {
    populate: populate
  };

  // Create an icon to go on the name list.
  function buildIcon(iconName) {
    return $('<i/>')
      .addClass('fa fa-' + iconName);
  }

  // Create a span element with the specified class.
  function buildSpan(className) {
    return $('<span/>')
      .addClass(className);
  }

  // Populate columns in all places in the app that contain artist lists.
  function populate() {
    Artists.getAll().then(function(artistData) {
      var allListByName = Filter.sorted(artistData);
      var standbyList = Filter.standbyInOrder(artistData);
      var seatedList = Filter.seated(artistData);
      var lotteryList = Filter.lotteryInOrder(artistData);
      var lotteryListByName = Filter.lottery(artistData);

      buildNames($('.artist-names'), allListByName, {
        withSymbols: true
      });
      buildNames($('.lottery-names'), lotteryList, {
        withOrder: true
      });
      buildNames($('.standby-names'), standbyList, {
        withOrder: true
      });
      buildNames($('.seated-names'), seatedList);

      buildNames($('.lottery-sorted-names'), lotteryListByName, {
        disableClick: true
      });
      buildNames($('.standby-sorted-names'), standbyList, {
        disableClick: true
      });
      buildNames($('.seated-sorted-names'), seatedList, {
        disableClick: true
      });

      buildNameOptions($('[data-select-raw=artist]'), allListByName);

      $('.count-artists').text(artistData.length);
      $('.count-lottery').text(lotteryList.length);
      $('.count-standby').text(standbyList.length);
      $('.count-seated').text(seatedList.length);
    });
  }

  // Build a name list for a Select element.
  function buildNameOptions(container, nameData) {
    var tempContainer = $('<div/>');
    tempContainer.append($('<option/>')
      .text('(select one...)'));

    nameData.forEach(function(artist) {
      tempContainer.append($('<option/>')
        .attr('value', artist.id)
        .text(artist.name)
      );
    });

    container.html(tempContainer.html());
  }

  // Build a name list for use in the DOM.
  function buildNames(container, nameData, options) {
    options = Object.assign({
      disableClick: false,
      withSymbols: false,
      withOrder: false
    }, options);

    container.empty();

    nameData.forEach(function(artist, index) {
      var nameElement = $('<a/>')
        .addClass('line')
        .text(artist.name + ' ');

      if (options.withOrder) {
        nameElement.prepend(buildSpan('artist-order')
          .text('' + (index + 1) + '.'));
      }

      if (artist.tableNumber) {
        var tableElement = buildSpan('artist-seat');
        tableElement.text('#' + artist.tableNumber);
        nameElement.append(tableElement);
      }

      if (options.withSymbols) {
        var symbolElement = buildSpan('artist-symbols');

        var standbyFlag = !artist.seatedLast &&
          (artist.standbyDays && artist.standbyDays.length >= 2);

        if (artist.lotteryOrder > 0) {
          symbolElement.append(buildIcon('check faded'));
        }

        if (artist.standbyOrder > 0) {
          symbolElement.append(buildIcon('clock-o faded'));
        }

        if (artist.tableNumber) {
          symbolElement.append(buildIcon('sign-in faded'));
        }

        if (standbyFlag) {
          symbolElement.append(buildIcon('exclamation attention'));
        }

        if (symbolElement.html().length > 0) {
          nameElement.append(symbolElement);
        }
      }

      container.append(nameElement);

      if (!options.disableClick) {
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
    Modal.editArtist(id);
  }
})(window);
