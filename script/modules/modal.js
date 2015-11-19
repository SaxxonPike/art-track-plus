var Modal;

(function(){
  Modal = {
    addArtist: addArtist,
    editArtist: editArtist
  };

  function mapArtistData(artistData) {
    $('#artist-id').text(artistData.id || 0);
    $('#artist-name').val(artistData.name || "");
    $('#artist-badge').val(artistData.badgeNumber || "");
    $('#artist-table').val(artistData.tableNumber || "");
    $('#artist-room').val(artistData.roomNumber || "");
    $('#artist-phone').val(artistData.phone || "");
    $('#artist-remarks').val(artistData.remarks || "");
    $('#artist-lottery-eligible').prop('checked', artistData.lotteryEligible || false);
    $('#artist-lottery-guaranteed').prop('checked', artistData.lotteryGuaranteed || false);
  }

  // Show the Artist modal with empty fields.
  function addArtist() {
    mapArtistData({
      id: 12345
    });
    $('#artist-detail').modal();
  }

  // Show the Artist modal with fields from an existing artist.
  function editArtist() {
    mapArtistData({});
    $('#artist-detail').modal();
  }
})();
