const pathArray = window.location.pathname.split('/');
const lbId = pathArray[2];

let loaded = 0;
let loading = false;
let best;

let container = document.querySelector(".grid-container");

let entryTemplate = document.querySelector("#e-0");

let isEnd = false;

loadData(true);



window.addEventListener('scroll', () => {
    if (isEnd) return;
    if (loading) return;
    loading = true;
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 250) {

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
        console.log('end')
        let end = document.querySelector('#e-end');
        end.style.setProperty('display', 'block');
        container.appendChild(end.cloneNode(true));
        isEnd = true;
        entryTemplate.remove();
        end.remove();
    }

    if (initial) {
        best = json['data'][0]['value'];
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
        let barPercent = (100 * json1['value']) / best;
        if (barPercent >= 92) {
            document.querySelector("#"+id+' > .bar > #best').innerHTML = '';
        }
        else if (barPercent <= 8) {
            document.querySelector("#"+id+' > .bar > #none').innerHTML = '';
        }
        else {
            document.querySelector("#"+id+' > .bar > #best > #value').innerHTML = best;
        }
        document.querySelector("#"+id+' > .bar > #you > #value').innerHTML = json1['value'];
        document.querySelector("#"+id+' > .bar > #you').style.setProperty('left', 'calc('+barPercent+'% - 17px)');
    }
    
    loading = false;
    if (!isEnd) container.appendChild(entryTemplate);
}



let allFilters = ['Rank:Member', 'Rank:Pig', 'Rank:Squid', 'Rank:creeper', 'Rank:dragon', 'Rank:mod', 'Rank:owner'];
let currentFilters = ['Rank:Pig', 'Rank:Squid'];
addChipsToFiltersPage();

// When toggling a filter
async function modifyFilter(filter, added, fromFilterPage) { // TODO: call when modifying any filter
    console.log("filter: "+filter);
    if (added && !currentFilters.includes(filter)) { // Added
        currentFilters.push(filter);
    }
    else if (!added && currentFilters.includes(filter)) { // Removed
        currentFilters.remove(filter);
    }

    showHideFilter(filter, added, document.querySelector("#f-container"));
    
    if (!fromFilterPage) refreshFilters();
}

// When exiting the filter page or removing a filter
async function refreshFilters() { // TODO: Call when exiting filter page
    // Actually make a new request
}

// Edit filter display
async function showHideFilter(filter, show, container) { // TODO make filter page work & make filter page z-index 999
    if (show) {
        let main = document.querySelector("#f-item")

        let element = main.cloneNode(true);
        element.style.display = 'flex';
        container.appendChild(element);

        element.setAttribute("filter", filter);

        element.querySelector('h1').innerHTML = filter.split(':', 2)[1];
    }
    else {
        let element = document.querySelector("#f-item[filter='"+filter+"']")
        element.remove();
    }
}


// Open Filters page
let filtersPage = document.querySelector('.filtersPage');
let isFiltersPageOpen = false;
async function openFiltersPage() {
    if (isFiltersPageOpen) {
        closeFiltersPage();
        return;
    }
    isFiltersPageOpen = true;
    filtersPage.style.display = 'block';
}
async function addChipsToFiltersPage() {
    for (i = 0; i < allFilters.length; i++) {
        let f = allFilters[i];

        let container;

        // Rank
        if (f.split(':', 2)[1] = "Rank") container = document.querySelector('.filtersPage > .rank-container');
        
        showHideFilter(f, true, container);
    }
}
async function closeFiltersPage() {
    isFiltersPageOpen = false;
    filtersPage.style.display = 'none';
    refreshFilters();
}


// When clicking  TODO: "event.target" doesnt work...
// addEventListener('click', (event) => {;
//     if (!isFiltersPageOpen) return;

//     if (!event.target.closest('.filtersPage').length) {
//         // Close Filters page
//         closeFiltersPage();
//     }
// });