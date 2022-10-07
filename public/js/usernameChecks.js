// Validate name or uuid
async function validatePlayer(id) {
  
  // Check if player exists & get UUID & Name
  fetch('https://api.ashcon.app/mojang/v2/user/'+id)
  .then(response => {

    // Invalid name/uuid
    if (response.status == 400) {
      throw 'Invalid Name or UUID!'
    }

    // Invalid name/uuid
    if (response.status == 404) {
      throw 'Player Does Not Exist!'
    }

    // Other error
    if (response.status != 200) {
      throw 'Unknown Error!  Status Code: '+response.status
    }
    
    return response.json();
  })
  .then(json => {
    validatePlayerExistsCallback(json['uuid'], json['username'])
    return;
  })
  .catch(error => {
    usernameError(error)
    return;
  });
}



// Validate player - Check if ever joined
async function validatePlayerExistsCallback(uuid, username) {

    // Check if player has ever joined
    fetch('https://api.ashcon.app/mojang/v2/user/'+uuid) // https://api.mcblockbuilds.net/
    .then(res => {

      if (res.status == 404) {
        throw "Player Has Never Joined The Server!"
      }

      if (res.status != 200) {
        throw "Unknown Error!  Status Code: '+response.status"
      }

      usernameValid(uuid, username);
      return;
    })
    .catch(error => {
      usernameError(error)
      return;
    });
}