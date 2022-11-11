const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const container = document.querySelector(".top-players-container");
const entryTemplate = document.querySelector("template[has='entry']").content.firstElementChild;


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
initTopPlayers();
async function initTopPlayers() {
  appendSkeletonRows(6, container, entryTemplate);
  loadJson('/topPlayers', (json) => {
    fillRows(json);
  });
}




/**
 * Adds all provided rows (from json) to the page
 * @param json rows data.
 */
function fillRows(json) {
  for (let i = 0; i < json.length; i++) {
    let json1 = json[i];

    let element = container.querySelector('entry:nth-of-type('+(i+1)+')');
    element.removeAttribute('skeleton');

    element.setAttribute('href', '/stats/'+json1['uuid']+'/manhunt');
    element.querySelector('img').setAttribute('src', 'https://crafatar.com/avatars/'+json1['uuid']+'?size=8&overlay');
    element.querySelector('#tp-username').innerHTML = json1['name'];
    element.querySelector('#tp-category').innerHTML = json1['category'];
    element.querySelector('#tp-stat').innerHTML = json1['stat'];
    element.querySelector('#tp-value').innerHTML = json1['value'];
  }

  removeSkeletonRows(container, 'entry[skeleton]');
}