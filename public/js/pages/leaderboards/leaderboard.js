const pathArray = window.location.pathname.split('/');
const id = pathArray[2];
loadData(id);

// Load data
async function loadData(lbId) {
    document.querySelector('title').innerHTML = lbId+" | MCBB Stats" // Favicon
  
    loadJson('http://localhost:8080/api/leaderboard/'+lbId, (json) => {

        let main = document.querySelector("#e-0")
        main.style.visibility = 'visible';
        main.remove();
        let container = document.querySelector(".grid-container");

        for (let i = 0; i < json.length; i++) {

            let json1 = json[i];
            let uuid = json1['uuid'];

            let element = main.cloneNode(true);
            container.appendChild(element)
            let id = 'e-'+(i+1);
            element.setAttribute('id', id);

            document.querySelector("#"+id+' > h1').innerHTML = i+1;
            document.querySelector("#"+id+' > img').setAttribute('src', 'https://crafatar.com/avatars/'+uuid+'?size=8&overlay');
            document.querySelector("#"+id+' > .data > .username').innerHTML = json1['username'];
            document.querySelector("#"+id+' > .data > .stat > .value').innerHTML = json1['value'];
            document.querySelector("#"+id+' > .data > .stat > .label').innerHTML = json1['label'];
            document.querySelector("#"+id+' > .bar > #you > #value').innerHTML = json1['value'];
            document.querySelector("#"+id+' > .bar > #best > #value').innerHTML = json[0]['value'];
            document.querySelector("#"+id+' > .bar > #you').style.left = "calc("+
            (100 * json1['value']) / json[0]['value']
            +" - 18px);";
        }

    });


    // Show everything
    document.querySelectorAll(".box").forEach(function(e){
        e.style.animationPlayState = 'running';
    })
}