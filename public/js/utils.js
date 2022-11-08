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



async function copy(element) {
  navigator.clipboard.writeText(element.textContent);
}



// Get name from uuid or uuid from name
async function getOppositeID(id) {
  const response = await fetch('https://api.ashcon.app/mojang/v2/user/' + id);

  // Invalid name/uuid
  if (response.status == 400) {
    throw new Error('Invalid Name or UUID!');
  }
  // Invalid name/uuid
  if (response.status == 404) {
    throw new Error('Player Does Not Exist!');
  }
  // Other error
  if (response.status != 200) {
    throw new Error('Unknown Error!  Status Code: ' + response.status);
  }
  
  return await response.json();
}



// Add all classes (space seperated) to element
function addClasses(element, classes) {
  classes = classes.split(" ");
  for (let i = 0; i < classes.length; i++) {
    element.classList.add(classes[i]);
  }
}





// Render skeleton
async function renderSkeleton(amount, container, template) {
  for (i = 0; i < amount; i++) {
      container.appendChild(template.content.firstElementChild.cloneNode(true));
  }
}
async function deleteSkeleton(container, querySelector) {
  container.querySelectorAll(querySelector).forEach(entry => {
      entry.remove();
  })
}