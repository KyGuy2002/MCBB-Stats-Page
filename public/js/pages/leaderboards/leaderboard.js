const pathArray = window.location.pathname.split('/');
const lbId = pathArray[2];

let loaded = 0;
let loading = false;

let container = document.querySelector(".grid-container");

let entryTemplate = document.querySelector("#e-0");

let isEnd = false;

loadData(true);



window.addEventListener('scroll', () => {
    if (loading) return;
    loading = true;
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {

        loadData(false);
    } else loading = false;
}, { passive: true });



// Load data
async function loadData(initial) {
    document.querySelector('title').innerHTML = lbId+" | MCBB Stats" // Favicon
  
    loadJson('http://localhost:8080/api/leaderboard/'+lbId+'?amount=7&start='+loaded, (json) => {
        loaded = loaded + json['data'].length;
        showData(json, initial);
    });


    // Show everything
    document.querySelectorAll(".box").forEach(function(e){
        e.style.animationPlayState = 'running';
    })
}



function showData(json, initial) {

    if (json['data'].length == 0 && !isEnd) {
        let end = document.querySelector('#e-end');
        end.style.setProperty('display', 'block');
        container.appendChild(end.cloneNode(true));
        isEnd = true;
        entryTemplate.remove();
    }

    if (initial) {
        document.querySelector('title').innerHTML = json['name'] + " | MCBB Stats";
        document.querySelector('.page-title').innerHTML = json['name'];
        document.querySelector('.page-description').innerHTML = json['description'];

        // Top 3 box
        document.querySelector('.top-3-container > div:nth-child(2) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][0]['uuid']+'?size=8&overlay');
        document.querySelector('.top-3-container > div:nth-child(1) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][1]['uuid']+'?size=8&overlay');
        document.querySelector('.top-3-container > div:nth-child(3) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][2]['uuid']+'?size=8&overlay');
    }

    // Append leaderboard entries
    for (let i = 0; i < json['data'].length; i++) {
        let json1 = json['data'][i];

        let element = entryTemplate.cloneNode(true);
        entryTemplate.remove();
        element.classList.remove('loading');
        container.appendChild(element)
        let id = 'e-'+json1['pos'];
        element.setAttribute('id', id);

        // Data
        document.querySelector("#"+id+' > h1').innerHTML = json1['pos'];
        document.querySelector("#"+id+' > img').setAttribute('src', 'https://crafatar.com/avatars/'+json1['uuid']+'?size=8&overlay');
        document.querySelector("#"+id+' > .data > .username').innerHTML = json1['username'];
        document.querySelector("#"+id+' > .data > .stat > .value').innerHTML = json1['value'];
        document.querySelector("#"+id+' > .data > .stat > .label').innerHTML = json1['label'];

        // Progress bar
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
    
    loading = false;
    if (!isEnd) container.appendChild(entryTemplate);
}