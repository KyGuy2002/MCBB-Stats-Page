async function loadData(uuid, username) {
  loadJson('http://localhost:8080/'+uuid+'/generalStats', (json) => {initGeneralStats(json, uuid, username)});

  loadJson('http://localhost:8080/'+uuid+'/themeparks/commonStats', (json) => {initCommonStats(json)});
  loadJson('http://localhost:8080/'+uuid+'/themeparks/otherStats', (json) => {initOtherStats(json)});

  initInventory(uuid);
}


function initCommonStats(json) {
  let main = document.querySelector("#cs-0");
  main.style.visibility = 'visible';
  main.remove();
  let container = document.querySelector("#cs-container");

  for (let i = 0; i < json.length; i++) {

    let json1 = json[i];

    let element = main.cloneNode(true);
    container.appendChild(element)
    let id = 'cs-'+(i+1);
    element.setAttribute('id', id);

    document.querySelector("#"+id+' #cs-stat').innerHTML = json1['stat'];
    document.querySelector("#"+id+' #cs-value').innerHTML = json1['value'];
    document.querySelector("#"+id+' #cs-t_what').innerHTML = json1['t_what'];
    document.querySelector("#"+id+' #cs-t_how').innerHTML = json1['t_how'];
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