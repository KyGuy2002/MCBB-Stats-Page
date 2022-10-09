
// Validate uuid
const pathArray = window.location.pathname.split('/');
const id = pathArray[2];
validatePlayer(id);


// Failed to validate username
async function usernameError(reason) {
  window.location.href = '/?usernameError='+reason; // Send home with error
}



// Username checks were ok.  Load user data
async function usernameValid(uuid, username) {

  // Make sure uuid is in url
  var page = document.location.pathname.split('/')[3];
  window.history.replaceState({}, document.title, '/stats/'+uuid+'/'+page);

  // Favicon and title
  document.querySelector('#favicon').href = 'https://crafatar.com/avatars/'+uuid+'?size=8&overlay'
  document.querySelector('title').innerHTML = username+" | MCBB Stats"

  // Stats nav
  document.querySelectorAll(".nav").forEach(function(e){
    e.href = '/stats/' + uuid + '/' + e.getAttribute('page')
    if (e.href == document.location){ // Highlight current page
      e.classList += " current";
    }
  })

  // General stats
  document.querySelector(".g-name").innerHTML = "Stats for " + username;
  document.querySelector(".g-uuid").innerHTML = uuid;
  loadPlayerModel(uuid);

  // Load all other data
  loadData(uuid, username);

}


async function loadingComplete() {

  // Show everything
  document.querySelectorAll(".box").forEach(function(e){
    e.style.animationPlayState = 'running';
  })

}