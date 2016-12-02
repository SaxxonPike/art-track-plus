/* globals exports */

(function(scope) {
  // Interface.
  scope.Time = {
    getTodayString: getTodayString
  };

  // Get today's day string.
  function getTodayString() {
    return moment().format('dddd');
  }
})((typeof window !== 'undefined') ? window : exports);
