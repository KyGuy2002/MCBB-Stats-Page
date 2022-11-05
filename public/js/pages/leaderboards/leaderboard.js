const pathArray = window.location.pathname.split('/');
const lbId = pathArray[2];

let loaded = 0;
let loading = false;
let best;

let isEnd = false;

let container = document.querySelector(".grid-container");

let entryTemplate = document.querySelector("#e-0");
let endTemplate = document.querySelector("#e-end");

let currentFilters = [];



// Start loading initial data
loadData(true);



// Load more entries on scroll
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
  
    loadJson('http://localhost:8080/api/leaderboard/'+lbId+'?amount=7&start='+loaded+(currentFilters.length != 0 ? '&filters='+currentFilters : ''), (json) => {
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




// 
// 
// Filter Chips
// 
// 

let allFilters = ['Rank:Member', 'Rank:Pig', 'Rank:Squid', 'Rank:Creeper', 'Rank:Dragon', 'Rank:Mod', 'Rank:Builder', 'Rank:Dev', 'Rank:Owner', 'Rank:Parks'];

let xIcon = '<i class="fa-solid fa-xmark"></i>';
let checkIcon = '<i class="fa-solid fa-check"></i>';
let template = document.querySelector("template#filter-item-template");


/**
   * When clicking a filter chip (called from onClick attribute)
   *
   * @param chipElement The chip element.
   */
function clickedFilter(chipElement) {
    let filter = chipElement.getAttribute('filter');
    let mode = chipElement.getAttribute('mode');

    // When greyed out (with check) chips are clicked in the filters page.
    if (mode == "greyed" && currentFilters.includes(filter)) {
        currentFilters.splice(currentFilters.indexOf(filter), 1);
        chipElement.innerHTML = chipElement.innerHTML.replace(checkIcon, ''); // Remove the check icon
        document.querySelector("div#f-container > div.filter-item[filter='"+filter+"']").remove(); // Remove the active chip (outside of filters page)
        chipElement.setAttribute("mode", 'add');
        // Don't refresh, since this can only happen within the filters page
    }

    // When active chip (with X) is clicked.
    else if (mode == "remove" && currentFilters.includes(filter)) {
        currentFilters.splice(currentFilters.indexOf(filter), 1);
        chipElement.remove();
        let pageChip = document.querySelector("div.filtersPage div.filter-item[filter='"+filter+"']");
        pageChip.setAttribute('mode', 'add'); // Ungrey out the chip in filters page.
        pageChip.innerHTML = pageChip.innerHTML.replace(checkIcon, ''); // Remove the check icon
        refreshFilters();
    }

    // When non greyed out (no icon) chips are clicked in the filters page.
    else if (mode == "add" && !currentFilters.includes(filter)) {
        currentFilters.push(filter);
        chipElement.setAttribute("mode", 'greyed');
        chipElement.innerHTML = checkIcon + chipElement.innerHTML; // Add a check icon
        document.querySelector("div#f-container").appendChild(chipBuilder(filter, 'remove'));
        // Don't refresh, since this can only happen within the filters page
    }

    // Toggle line between filter chips and buttons
    let line = document.querySelector('div#f-container > div.vertical-divider');
    if (currentFilters.length == 0)  line.style.display = 'none';
    else line.style.display = 'block';
}


/**
   * Creates a filter chip
   *
   * @param filter The filter type and name.  Ex. Rank:Pig
   * @param mode "add", "remove", or "greyed".
   * @return The filter chip element.
   */
function chipBuilder(filter, mode) {
    let element = template.content.firstElementChild.cloneNode(true);

    element.setAttribute("filter", filter);
    element.setAttribute("mode", mode);

    element.querySelector('h1').innerHTML = filter.split(':', 2)[1]; // Set text

    if (mode != "add") element.innerHTML = (mode == "greyed" ? checkIcon : "") + element.innerHTML + (mode == "remove" ? xIcon : ""); // Add icon if not in mode "add"

    return element;
}


addChipsToFiltersPage();
/**
   * Copy all default chips to the filters page
   */
function addChipsToFiltersPage() {
    for (i = 0; i < allFilters.length; i++) {
        let f = allFilters[i];
        document.querySelector('div.filtersPage > div#'+f.split(':', 2)[0]+'-container').appendChild(chipBuilder(f, 'add'));
    }
}


/**
   * Reloads all leaderboard data with new filters
   */
function refreshFilters() {
    // TODO: Actually make a new request
}


let filtersPage = document.querySelector('.filtersPage');
let isFiltersPageOpen = false;
/**
   * Toggles filter page visibility
   */
function openFiltersPage() {
    console.log('openFiltersPage')
    if (isFiltersPageOpen) {
        console.log('already open, closing')
        closeFiltersPage();
        return;
    }
    isFiltersPageOpen = true;
    filtersPage.style.display = 'block';
}


/**
   * Closes filters page
   */
function closeFiltersPage() {
    isFiltersPageOpen = false;
    filtersPage.style.display = 'none';
    refreshFilters();
}


/**
   * Closes filters page when clicking away
   */
addEventListener('click', (event) => {;
    if (!isFiltersPageOpen) return;
    console.log('click, its open :)')

    // Check if click is inside filters page
    if (document.querySelector(".filter-chip-container").contains(event.target)) return; // TODO: Clicking label passes this check...

    closeFiltersPage();
});