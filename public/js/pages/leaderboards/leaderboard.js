const pathArray = window.location.pathname.split('/');
const id = pathArray[2];
loadData(id);

// Load data
async function loadData(lbId) {
    document.querySelector('title').innerHTML = lbId+" | MCBB Stats" // Favicon
  
    loadJson('http://localhost:8080/api/leaderboard/'+lbId, (json) => {

        document.querySelector('.page-title').innerHTML = json['name'];
        document.querySelector('title').innerHTML = json['name'] + " | MCBB Stats";
        document.querySelector('.page-description').innerHTML = json['description'];

        let main = document.querySelector("#e-0")
        main.style.visibility = 'visible';
        main.remove();
        let container = document.querySelector(".grid-container");

        // Top 3 box
        document.querySelector('.top-3-container > div:nth-child(2) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][0]['uuid']+'?size=8&overlay');
        document.querySelector('.top-3-container > div:nth-child(1) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][1]['uuid']+'?size=8&overlay');
        document.querySelector('.top-3-container > div:nth-child(3) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][2]['uuid']+'?size=8&overlay');

        // Create leaderboard entries
        for (let i = 0; i < json['data'].length; i++) {

            let json1 = json['data'][i];
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

            let barPercent = (100 * json1['value']) / json['data'][0]['value'];
            if (barPercent >= 92) {
                document.querySelector("#"+id+' > .bar > #best').innerHTML = '';
            }
            else if (barPercent <= 8) {
                document.querySelector("#"+id+' > .bar > #none').innerHTML = '';
            }
            else {
                document.querySelector("#"+id+' > .bar > #best > #value').innerHTML = json['data'][0]['value'];
            }

            document.querySelector("#"+id+' > .bar > #you > #value').innerHTML = json1['value'];
            document.querySelector("#"+id+' > .bar > #you').style.setProperty('left', 'calc('+barPercent+'% - 17px)');
        }

    });


    // Show everything
    document.querySelectorAll(".box").forEach(function(e){
        e.style.animationPlayState = 'running';
    })
}