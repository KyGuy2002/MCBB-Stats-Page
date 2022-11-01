const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


// Check if username error in url params
if (urlParams.has('usernameError')) {
  const error = urlParams.get('usernameError');
  window.history.replaceState({}, document.title, window.location.pathname);
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


// Init Top Players Data
loadJson('http://localhost:8080/topPlayers', (json) => {initTopPlayers(json)});
async function initTopPlayers(json) {
  let main = document.querySelector("#tp-0")
  main.style.visibility = 'visible';
  main.remove();
  let container = document.querySelector(".top-players-container");

  for (let i = 0; i < json.length; i++) {

    let json1 = json[i];

    let element = main.cloneNode(true);
    container.appendChild(element)
    let id = 'tp-'+(i+1);
    element.setAttribute('id', id);

    document.querySelector("#"+id).setAttribute('href', '/stats/'+json1['uuid']+'/manhunt');
    document.querySelector("#"+id+' img').setAttribute('src', 'https://crafatar.com/avatars/'+json1['uuid']+'?size=8&overlay');
    document.querySelector("#"+id+' #tp-username').innerHTML = json1['name'];
    document.querySelector("#"+id+' #tp-category').innerHTML = json1['category'];
    document.querySelector("#"+id+' #tp-stat').innerHTML = json1['stat'];
    document.querySelector("#"+id+' #tp-value').innerHTML = json1['value'];
  }
}