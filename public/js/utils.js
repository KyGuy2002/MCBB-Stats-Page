async function loadJson(url, callback) {
  fetch(url)
  .then(response => {

    // Other error
    if (response.status != 200) {
      throw 'Unknown Error!  Status Code: '+response.status
    }
    
    return response.json();
  })
  .then(json => {
    callback(json)
    return;
  });
}