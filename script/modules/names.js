var Names;

// NOTE: nameData consists of {name, id}

(function(){
  Names = {
    clear: clear,
    populate: populate
  };

  function clear() {
    $('#artist-names').clear();
    $('#lottery-names').clear();
    $('#standby-names').clear();
    $('#seated-names').clear();
  }

  function populate() {
    var testNames = [
      { id: 1, name: "Test 1" },
      { id: 2, name: "Test 0" }
    ];

    buildSortedNames($('#artist-names'), testNames);
  }

  // Build a name list for use in the DOM.
  function buildNames(container, nameData, disableClick) {
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

  // Build a sorted name list for use in the DOM.
  function buildSortedNames(container, nameData) {
    var sortedNames = [];
    for (var i in nameData) {
      sortedNames.push(nameData[i]);
    }
    sortedNames.sort(nameSorter);
    return buildNames(container, sortedNames);
  }

  // Create a click handler for opening name detail modals.
  function createNameDetailClickHandler(id) {
    return (function() {
      openNameDetail(id);
    });
  }

  // Show name detail modal.
  function openNameDetail(id) {
    alert("Testing!");
  }

  // function used to sort name data arrays
  function nameSorter(a, b) {
    var nameA = a.name || "";
    var nameB = b.name || "";
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
})();
