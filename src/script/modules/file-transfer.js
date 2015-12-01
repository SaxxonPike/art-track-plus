(function(scope, docScope) {
  scope.FileTransfer = {
    download: download,
    upload: upload
  };

  // Send file contents to a user.
  function download(fileName, text) {
    var anchor = docScope.createElement('a');
    anchor.href = scope.URL.createObjectURL(new Blob([text], {
      type: 'text/csv'
    }));
    anchor.download = fileName;
    docScope.body.appendChild(anchor);
    anchor.click();
    docScope.body.removeChild(anchor);
  }

  // Retrieve file contents from a user.
  function upload(file) {
    console.log(file);
  }

})(window, document);