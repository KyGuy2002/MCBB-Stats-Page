function initInventory(uuid) {
    loadJson('/'+uuid+'/generalStats', (json) => {initInventoryCallback(json)});
}


function initInventoryCallback(json) {
  let main = document.querySelector("#i-0")
  main.style.visibility = 'visible';
  main.remove();
  let container = document.querySelector(".i-container");

  for (let i = 0; i < 36; i++) { // json.length

  //   let json1 = json[i];

    let element = main.cloneNode(true);
    container.appendChild(element)
    let id = 'i-'+(i+1);
    element.setAttribute('id', id);

  //   document.querySelector("#"+id+' .i-icon').innerHTML = json1['stat'];
  }
}