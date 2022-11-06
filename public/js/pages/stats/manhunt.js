async function loadData(uuid, username) {
  loadJson('http://localhost:8080/'+uuid+'/generalStats', (json) => {initGeneralStats(json, uuid, username)});

  loadJson('http://localhost:8080/'+uuid+'/manhunt/recentGames', (json) => {initRecentGames(json)});
  loadJson('http://localhost:8080/'+uuid+'/manhunt/levels', (json) => {initLevels(json)});
  loadJson('http://localhost:8080/'+uuid+'/manhunt/otherStats', (json) => {initOtherStats(json)});
}


function initRecentGames(json) {
  let main = document.querySelector("#rg-0")
  main.style.visibility = 'visible';
  main.remove();
  let container = document.querySelector("#rg-table");

  for (let i = 0; i < json.length; i++) {

    let json1 = json[i];

    let element = main.cloneNode(true);
    container.appendChild(element)
    let id = 'rg-'+(i+1);
    element.setAttribute('id', id);

    document.querySelector("#"+id+' #rg-date').innerHTML = json1['date'];
    document.querySelector("#"+id+' #rg-duration').innerHTML = json1['duration'];
    document.querySelector("#"+id+' #rg-role').innerHTML = json1['role'];
    document.querySelector("#"+id+' #rg-winner').innerHTML = json1['winner'];
    document.querySelector("#"+id+' #rg-mods').innerHTML = json1['mods'];
  }
}


function initLevels(json) {
  let main = document.querySelector("#l-0")
  main.style.visibility = 'visible';
  main.remove();
  let container = document.querySelector(".level-box-container");

  for (let i = 0; i < json.length; i++) {

    let json1 = json[i];

    let element = main.cloneNode(true);
    container.appendChild(element)
    let id = 'l-'+(i+1);
    element.setAttribute('id', id);

    document.querySelector("#"+id+' .lb-title').innerHTML = json1['title'];
    document.querySelector("#"+id+' .lb-next-value').innerHTML = json1['current'] + " / " + json1['next'];
    document.querySelector("#"+id+' .circle > h1').innerHTML = json1['level'];

    document.querySelector("#"+id+' #lb-t_what').innerHTML = json1['t_what'];
    document.querySelector("#"+id+' #lb-t_how').innerHTML = json1['t_how'];
  }
}


function initOtherStats(json) {
  let main = document.querySelector("#os-0")
  main.style.visibility = 'visible';
  main.remove();
  let container = document.querySelector("#os-container");

  for (let i = 0; i < json.length; i++) {

    let json1 = json[i];

    let element = main.cloneNode(true);
    container.appendChild(element)
    let id = 'os-'+(i+1);
    element.setAttribute('id', id);

    document.querySelector("#"+id+' #os-stat').innerHTML = json1['stat'];
    document.querySelector("#"+id+' #os-value').innerHTML = json1['value'];
    document.querySelector("#"+id+' #os-t_what').innerHTML = json1['t_what'];
    document.querySelector("#"+id+' #os-t_how').innerHTML = json1['t_how'];
  }
}