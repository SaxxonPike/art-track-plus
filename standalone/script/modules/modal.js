/* globals Artists, Elements, Filter, Promise */

(function(scope) {

  // Interface.
  scope.Modal = {
    addArtist: addArtist,
    alert: showAlert,
    batchSignOut: batchSignOut,
    bulkArtistRoom: bulkArtistRoom,
    confirm: showConfirm,
    confirmConfirm: confirmConfirm,
    editArtist: editArtist,
    editArtistRaw: editArtistRaw,
    prompt: showPrompt,
    promptConfirm: promptConfirm,
    resetDatabase: resetDatabase,
    restoreDatabase: restoreDatabase,
    runLottery: runLottery,
    seedDatabase: seedDatabase,
    setRawArtistId: setRawArtistId,
    showCheckedOutArtists: showCheckedOutArtists,
    showYesNoCancel: showYesNoCancel
  };

  // Private vars.
  var _promptConfirm = [];
  var _rapidEntry = false;

  // Register a modal response handler.
  function registerConfirm(handler) {
    _promptConfirm.push(handler);
  }

  // Execute confirm dialog confirmation events.
  function confirmConfirm(value) {
    if (_promptConfirm.length > 0) {
      _promptConfirm.pop()(value);
    }
  }

  // Execute prompt confirmation events.
  function promptConfirm() {
    if (_promptConfirm.length > 0) {
      _promptConfirm.pop()($('#prompt-dialog input').val());
    }
  }

  // Populate the Artist modal with data from the model.
  function mapArtistData(artistData) {
    $('#artist-detail .artist-symbols').html(Elements.buildSymbols(artistData));
    $('#artist-id').text(artistData.id || '0');
    $('#artist-name').val(artistData.name || '');
    $('#artist-badge').val(artistData.badgeNumber || '');
    $('#artist-table').val(artistData.tableNumber || '');
    $('#artist-room').val(artistData.roomNumber || '');
    $('#artist-phone').val(artistData.phone || '');
    $('#artist-remarks').val(artistData.remarks || '');
    $('#artist-lottery-eligible').prop('checked', artistData.lotteryEligible || false);
    $('#artist-lottery-guaranteed').prop('checked', artistData.lotteryGuaranteed || false);
    $('#artist-seated-last').text(artistData.seatedLast ?
      moment(artistData.seatedLast).calendar() : 'Never');
    $('#artist-seated-days').text(artistData.seatedDays || 'Never');
    $('#artist-standby-days').text(artistData.standbyDays || 'Never');
  }

  // Configure visibility on the artist detail modal.
  function configureArtistDetail(isAddingArtist) {
    isAddingArtist = !!isAddingArtist;
    $('#artist-table').prop('disabled', isAddingArtist);
    $('#artist-room').prop('disabled', isAddingArtist);
    if (isAddingArtist) {
      $('.artist-add-only').show();
      $('.artist-edit-only').hide();
    } else {
      $('.artist-add-only').hide();
      $('.artist-edit-only').show();
    }
  }

  // Show the Artist modal with empty fields.
  function addArtist(rapidEntry, doNotOpenModal) {
    _rapidEntry = !!rapidEntry;
    mapArtistData({
      lotteryEligible: true
    });
    configureArtistDetail(true);
    $('#artist-detail-mode').text('New Artist ');
    if (!doNotOpenModal) {
      $('#artist-detail').modal();
    }
  }

  function batchSignOut() {
    $('#batch-sign-out').modal();
  }

  // Show the Rapid Room Entry modal.
  function bulkArtistRoom() {
    Artists.getAll().then(function(artists) {
      var container = $('<div/>');

      // Filter out artists who are not already seated.
      artists = Filter.seatedInOrder(artists);

      // Generate HTML elements for seated artists.
      artists.forEach(function(a) {
        var nameField = $('<p/>')
          .addClass('form-control-static')
          .text(a.name);

        var tableField = $('<p/>')
          .addClass('form-control-static')
          .text(a.tableNumber);

        var inputBox = $('<input/>')
          .addClass('form-control')
          .attr('type', 'text')
          .attr('id', 'bulk-artist-room-number-' + a.id)
          .attr('value', a.roomNumber)
          .attr('data-artist-id', a.id);

        container.append(
          $('<tr/>').append($('<td/>').append(nameField))
            .append($('<td/>').append(tableField))
            .append($('<td/>').append(inputBox)));
      });

      // Apply HTML and events.
      $('#bulk-artist-room-table').html(container.html());
      $('#bulk-artist-room-table input[type=text]').last().keydown(function(e) {
        if (e.which === 13) {
          e.preventDefault();
          scope.setTimeout(function() {
            $('[data-save=rooms]').focus();
          }, 10);
        }
      });

      // Show modal.
      $('#bulk-artist-room').modal();

      // Dynamically add SlimScroll bar to the modal (it can't be added on load)
      $('#bulk-artist-room .room-content').each(function() {
        var div = $(this);
        if (!div.hasClass('scroll-added')) {
          div.addClass('scroll-added');
          div.slimScroll({
            height: '100%'
          });
        }
      });
    });
  }

  // Show the Artist modal with fields from an existing artist.
  function editArtist(id) {
    Artists.get(id).then(function(artistData) {
      mapArtistData(artistData);
      $('#artist-detail-mode').text((artistData.name || 'Edit Artist') + ' ');
      configureArtistDetail(false);
      $('#artist-detail').modal();
    });
  }

  // Show the Raw Edit modal.
  function editArtistRaw() {
    $('#raw-editor').modal();
  }

  // Show the Reset Database confirmation modal.
  function resetDatabase() {
    $('#reset-dialog').modal();
  }

  // Show the Restore Database modal.
  function restoreDatabase() {
    $('#import-dialog-file').replaceWith($('#import-dialog-file').clone());
    $('#import-dialog').modal();
  }

  // Show the Run Lottery modal.
  function runLottery() {
    // Safeguard against wiping out the standby/checkin list.
    Artists.getAll().then(function(artists) {
      if (artists.some(function(a) {
          return !!a.tableNumber;
        })) {
        showAlert('Lottery can\'t be run. Artists are signed in yet.');
      } else {
        $('#run-lottery').modal();
      }
    });
  }

  // Show the Seed Database modal.
  function seedDatabase() {
    $('#generate-dialog').modal();
  }

  // Fill in the raw artist data text area.
  function setRawArtistId(selectedId) {
    var editor = $('[data-edit-raw=artist]');
    if (selectedId) {
      Artists.get(selectedId).then(function(artist) {
        if (artist) {
          delete artist.id;
          editor.val(JSON.stringify(artist, null, 2));
        } else {
          editor.val('');
        }
      });
    } else {
      editor.val('');
    }
  }

  // Show the alert modal.
  function showAlert(message, caption) {
    return new Promise(function(resolve, reject) {
      if (message) {
        $('#alert-title').text(caption || 'Notice');
        $('#alert-body').text(message);
        $('#alert-dialog').modal({
          backdrop: 'static'
        });
        registerConfirm(resolve);
      } else {
        reject();
      }
    });
  }

  // Show checked out artists modal.
  function showCheckedOutArtists() {
    Artists.getAll().then(function(artists) {
      var names = Filter.checkedOutToday(artists)
        .map(function(a) { return a.name; });
      names.sort();
      var elements = names.map(function(a) {
        return $('<div/>').text(a);
      });
      $('#checked-out-artists-body').html(elements);
      $('#checked-out-artists').modal();
    });
  }

  // Show the confirm modal.
  function showConfirm(message, caption) {
    return new Promise(function(resolve, reject) {
      if (message) {
        $('#confirm-title').text(caption || 'Confirmation Needed');
        $('#confirm-body').text(message);
        $('#confirm-dialog').modal({
          backdrop: 'static'
        });
        registerConfirm(function(value) {
          if (value === true) {
            resolve(value);
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    });
  }

  // Show the prompt modal.
  function showPrompt(message, caption) {
    return new Promise(function(resolve, reject) {
      if (message) {
        $('#prompt-dialog input').val('');
        $('#prompt-title').text(caption || 'Input Needed');
        $('#prompt-body').text(message);
        $('#prompt-dialog').modal({
          backdrop: 'static'
        });
        registerConfirm(function(value) {
          if (value === null || value === (void 0)) {
            reject();
          } else {
            resolve(value);
          }
        });
      } else {
        reject();
      }
    });
  }

  // Show the yes/no/cancel modal.
  function showYesNoCancel(message, caption) {
    return new Promise(function(resolve, reject) {
      if (message) {
        $('#yes-no-cancel-title').text(caption || 'Confirmation Needed');
        $('#yes-no-cancel-body').text(message);
        $('#yes-no-cancel-dialog').modal({
          backdrop: 'static'
        });
        registerConfirm(function(value) {
          if (value === true || value === false) {
            resolve(value);
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    });
  }

  // Initialize modal actions.
  $(function() {

    function getArtistFormId() {
      return Number($('#artist-id').text());
    }

    function saveEditedArtist() {
      var artistData = {};
      artistData.id = getArtistFormId();
      artistData.name = $('#artist-name').val();
      artistData.badgeNumber = $('#artist-badge').val();
      artistData.tableNumber = $('#artist-table').val();
      artistData.roomNumber = $('#artist-room').val();
      artistData.phone = $('#artist-phone').val();
      artistData.remarks = $('#artist-remarks').val();
      artistData.lotteryEligible = $('#artist-lottery-eligible').prop('checked');
      artistData.lotteryGuaranteed = $('#artist-lottery-guaranteed').prop('checked');
      if (artistData.tableNumber) {
        artistData.lotteryOrder = 0;
        artistData.standbyOrder = 0;
      }
      return Artists.set(artistData);
    }

    function saveEditedRooms() {
      var artistRooms = [];

      $('#bulk-artist-room-table input[type=text]').each(function() {
        var inputElement = $(this);
        var artistId = inputElement.attr('data-artist-id');
        if (artistId) {
          artistRooms.push({
            id: artistId,
            roomNumber: inputElement.val()
          });
        }
      });

      Artists.setAll(artistRooms);
    }

    function toggleArtistModal() {
      $('#artist-detail').modal('toggle');
    }

    $('#artist-detail input[type=text]').last().keydown(function(e) {
      if (e.which === 13) {
        e.preventDefault();
        if (!_rapidEntry) {
          $('[data-save=artist]:visible').trigger('click');
        } else {
          saveEditedArtist();
          addArtist(_rapidEntry, true);
          scope.setTimeout(function() {
            $('#artist-detail input').first().focus();
          }, 10);
        }
      }
    });

    $('[data-delete=artist]').click(function() {
      showConfirm(
        'Really delete this artist?',
        'Delete Artist Confirmation')
        .then(function(confirmed) {
          if (confirmed) {
            Artists.delete(getArtistFormId());
            toggleArtistModal();
          }
        });
    });

    $('[data-save=artist]').click(function(e) {
      if ($('#artist-name').val().trim()) {
        saveEditedArtist();
        toggleArtistModal();
      } else {
        showAlert(
          'A name is required for this artist.',
          'Save Artist Failed');
        e.preventDefault();
      }
    });

    $('[data-save=rooms]').click(function() {
      saveEditedRooms();
    });

    $('[data-standby=artist]').click(function() {
      var performAction = function(artist) {
        Artists.setStandby(artistId).then(function() {
          Artists.getAll().then(function(artists) {
            var index = Filter.standbyInOrder(artists).length;
            showAlert(
              'The artist is #' + index + ' in standby.',
              'Add ' + artist.name + ' to Standby List'
            ).then(function() {
              toggleArtistModal();
            });
          });
        });
      };

      var artistId = getArtistFormId();
      Artists.get(artistId).then(function(artist) {
        var caption = 'Add ' + artist.name + ' to Standby List';
        if (artist.standbyOrder) {
          showConfirm(
            'This artist is already on standby. Performing this action will move them to the bottom of the list.',
            caption)
            .then(function(confirmed) {
              if (confirmed) {
                performAction(artist);
              }
            });
        } else {
          performAction(artist);
        }
      });
    });

    $('[data-signin=artist]').click(function() {
      Artists.get(getArtistFormId()).then(function(artist) {
        showPrompt(
          'Enter a table number.',
          'Sign In for ' + artist.name)
          .then(function(seat) {
            if (seat) {
              Artists.setSeated(getArtistFormId(), seat);
            }
            toggleArtistModal();
          });
      });
    });

    $('[data-signout=artist]').click(function() {
      Artists.get(getArtistFormId()).then(function(artist) {
        var caption = 'Signing out ' + artist.name;
        if (artist.tableNumber || artist.standbyOrder || artist.lotteryOrder) {
          showYesNoCancel(
            'Would this artist like to be included in tomorrow\'s lottery?',
            caption)
            .then(function(eligible) {
              Artists.setSignedOut(getArtistFormId(), !!eligible);
              toggleArtistModal();
            });
        } else {
          showAlert(
            'This artist is already signed out.',
            caption
          ).then(toggleArtistModal);
        }
      });
    });

    $('[data-select-raw=artist]').change(function() {
      var selectOption = $(this).find(':selected');
      var selectedId = selectOption.attr('value');
      setRawArtistId(selectedId);
    });

    $('[data-prompt-confirm]').click(function() {
      promptConfirm();
    });

    $('[data-confirm-confirm]').click(function() {
      confirmConfirm(true);
    });

    $('[data-confirm-deny]').click(function() {
      confirmConfirm(false);
    });

    $('[data-confirm-cancel]').click(function() {
      confirmConfirm(null);
    });

    $('#prompt-dialog input').keydown(function(e) {
      if (e.which === 13) {
        e.preventDefault();
        $('[data-prompt-confirm]').trigger('click');
      }
    });
  });
})(window);
