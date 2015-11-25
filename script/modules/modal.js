/* globals Artists */

var Modal;

(function() {

  // Interface.
  Modal = {
    addArtist: addArtist,
    batchSignOut: batchSignOut,
    editArtist: editArtist,
    editArtistRaw: editArtistRaw,
    isRapidEntry: function() {
      return _rapidEntry;
    },
    resetDatabase: resetDatabase,
    runLottery: runLottery,
    seedDatabase: seedDatabase,
    setRawArtistId: setRawArtistId
  };

  // Private vars.
  var _rapidEntry = false;

  // Populate the Artist modal with data from the model.
  function mapArtistData(artistData) {
    $('#artist-id').text(artistData.id || 0);
    $('#artist-name').val(artistData.name || '');
    $('#artist-badge').val(artistData.badgeNumber || '');
    $('#artist-table').val(artistData.tableNumber || '');
    $('#artist-room').val(artistData.roomNumber || '');
    $('#artist-phone').val(artistData.phone || '');
    $('#artist-remarks').val(artistData.remarks || '');
    $('#artist-lottery-eligible').prop('checked', artistData.lotteryEligible || false);
    $('#artist-lottery-guaranteed').prop('checked', artistData.lotteryGuaranteed || false);
    $('#artist-seated-last').text(artistData.seatedLast || '');
    $('#artist-seated-days').text(artistData.seatedDays || '');
    $('#artist-standby-days').text(artistData.standbyDays || '');
  }

  // Show the Artist modal with empty fields.
  function addArtist(rapidEntry, doNotOpenModal) {
    _rapidEntry = !!rapidEntry;
    mapArtistData({
      lotteryEligible: true
    });
    $('#artist-detail-mode').text('New Artist ');
    $('.artist-add-only').show();
    $('.artist-edit-only').hide();
    if (!doNotOpenModal) {
      $('#artist-detail').modal();
    }
  }

  function batchSignOut() {
    $('#batch-sign-out').modal();
  }

  // Show the Artist modal with fields from an existing artist.
  function editArtist(id) {
    Artists.get(id).then(function(artistData) {
      mapArtistData(artistData);
      $('#artist-detail-mode').text('Edit Artist ');
      $('.artist-add-only').hide();
      $('.artist-edit-only').show();
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

  // Show the Run Lottery modal.
  function runLottery() {
    $('#run-lottery').modal();
  }

  // Show the Seed Database modal.
  function seedDatabase() {
    $('#generate-dialog').modal();
  }

  // Fill in the raw artist data text area.
  function setRawArtistId(selectedId) {
    var editor = $('[data-edit-raw=artist]');
    if (!!selectedId) {
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
})();

// Initialize modal actions.
$(function() {

  function getArtistFormId() {
    return Number($('#artist-id').text() || 0);
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
    Artists.set(artistData);
  }

  $('#artist-detail input[type=text]').last().keydown(function(e) {
    if (e.which === 13) {
      e.preventDefault();
      if (!Modal.isRapidEntry()) {
        $('[data-save=artist]:visible').trigger('click');
      } else {
        saveEditedArtist();
        Modal.addArtist(Modal.isRapidEntry(), true);
        window.setTimeout(function() {
          $('#artist-detail input').first().focus();
        }, 100);
      }
    }
  });

  $('[data-delete=artist]').click(function() {
    if (confirm('Really delete this artist?')) {
      Artists.delete(getArtistFormId());
    }
  });

  $('[data-save=artist]').click(function() {
    saveEditedArtist();
  });

  $('[data-standby=artist]').click(function() {
    Artists.setStandby(getArtistFormId());
  });

  $('[data-signin=artist]').click(function() {
    var seat = prompt('Enter the table number to sign this artist in.');
    if (seat) {
      Artists.setSeated(getArtistFormId(), seat);
    }
  });

  $('[data-signout=artist]').click(function() {
    var eligible = confirm('The artist will be entered for the next lottery.\nClick OK to confirm.\nClick CANCEL if you don\'t want this to happen.');
    Artists.setSignedOut(getArtistFormId(), eligible);
  });

  $('[data-select-raw=artist]').change(function() {
    var selectOption = $(this).find(':selected');
    var selectedId = Number(selectOption.attr('value') || 0);
    Modal.setRawArtistId(selectedId);
  });
});
