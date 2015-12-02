/* global Promise */

(function(scope, docScope) {
  scope.FileTransfer = {
    download: download,
    upload: upload
  };

  // Send file contents to a user.
  function download(fileName, text) {
    return new Promise(function(resolve) {
      var anchor = docScope.createElement('a');
      anchor.href = scope.URL.createObjectURL(new Blob([text], {
        type: 'text/csv'
      }));
      anchor.download = fileName;
      docScope.body.appendChild(anchor);
      anchor.click();
      docScope.body.removeChild(anchor);
      resolve();
    });
  }

  // Retrieve file contents from a user.
  function upload(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(response) {
        resolve(response.target.result);
      };
      reader.onerror = function(error) {
        reject(error);
      };
      reader.readAsText(file);
    });
  }

})(window, document);
