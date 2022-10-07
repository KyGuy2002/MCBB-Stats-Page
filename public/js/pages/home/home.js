const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Check if username error in url params
if (urlParams.has('usernameError')) {
  const error = urlParams.get('usernameError');
  window.history.pushState({}, document.title, window.location.pathname);
  usernameError(error);
}


// Display failed to validate username error
async function usernameError(reason) {
  const error = document.querySelector(".username-error");
  error.innerHTML = reason;
  error.classList.remove("username-error-visible");

  const input = document.querySelector(".username-input");
  input.classList.remove("username-input-error");

  setTimeout(function() { 
    error.classList.add("username-error-visible");
    input.classList.add("username-input-error");
   }, 10);
}


// Username checks were ok
async function usernameValid(uuid, username) {
  window.location.href = '/stats/'+uuid+"/manhunt";
}