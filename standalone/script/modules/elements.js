(function(scope) {
  // Interface.
  scope.Elements = {
    buildIcon: buildIcon,
    buildSpan: buildSpan,
    buildSymbols: buildSymbols
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

  // Build Font Awesome symbols.
  function buildSymbols(artist) {
    const symbolElement = buildSpan('artist-symbols');

    const standbyFlag = !artist.seatedLast &&
        (artist.standbyDays && artist.standbyDays.length >= 2);

    if (artist.lotteryOrder > 0) {
      symbolElement.append(buildIcon('check').attr('title', 'Picked For Lottery'));
    }

    if (artist.standbyOrder > 0) {
      symbolElement.append(buildIcon('clock-o').attr('title', 'On Standby'));
    }

    if (artist.tableNumber) {
      symbolElement.append(buildIcon('sign-in').attr('title', 'Signed In'));
    }

    if (standbyFlag) {
      symbolElement.append(buildIcon('exclamation attention').attr('title', 'This artist has been on standby for at least two days.'));
    }

    return symbolElement;
  }
})(window);
