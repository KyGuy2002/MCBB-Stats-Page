const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Check if username error in url params
if (urlParams.has('usernameError')) {
  const error = urlParams.get('usernameError');
  urlParams.delete('usernameError');
  usernameError(error);
}


// Validate submit name form
async function submitName() {
  validatePlayer(document.getElementById("username-input").value);
}


// Display failed to validate username error
async function usernameError(reason) {
  console.log(reason);
  const error = document.getElementById("username-error");
  error.innerHTML = reason;
}


// Username checks were ok
async function usernameValid(uuid, username) {
  window.location.href = '/stats/'+uuid+"/manhunt";
}