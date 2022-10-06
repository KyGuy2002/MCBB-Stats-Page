// Validate uuid
const pathArray = window.location.pathname.split('/');
const id = pathArray[2];
validatePlayer(id);


// Failed to validate username
async function usernameError(reason) {
  
  // Send home with error
  window.location.href = '/?usernameError='+reason;
}


// Username checks were ok
async function usernameValid(uuid, username) {
  console.log('Welcome back '+username+".  UUID: "+uuid)
}