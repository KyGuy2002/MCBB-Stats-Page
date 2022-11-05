const pathArray = window.location.pathname.split('/');
const lbId = pathArray[2];

let loaded = 0;
let loading = false;
let best;

let isEnd = false;

let container = document.querySelector(".grid-container");

let entryTemplate = document.querySelector("template#e-entry-template");
let endTemplate = document.querySelector("template#e-end-template");

let currentFilters = [];










//
//
// Load Data
//
//

// Start loading initial data
loadData(true, false);

// Show everything
// document.querySelectorAll(".box").forEach(function(e){
//     e.style.animationPlayState = 'running';
// })



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

        loadData(false, false);
    } else loading = false;
}, { passive: true });



/**
   * Loads general data and leaderbaord entries
   * @param initial true if title, description, etc should be loaded.
   * @param restart true if all entries should be deleted and reloaded (used when editing filters)
   */
function loadData(initial, restart) {
    if (restart) loaded = 0;
    loadJson('http://localhost:8080/api/leaderboard/'+lbId+'?amount=7&start='+loaded+(currentFilters.length != 0 ? '&filters='+currentFilters : ''), (json) => {

        if (initial) {
            best = json['data'][0]['value'];
            document.querySelector('title').innerHTML = json['name'] + " | MCBB Stats";
            document.querySelector('.page-title').innerHTML = json['name'];
            document.querySelector('.page-description').innerHTML = json['description'];
        }

        loaded = loaded + json['data'].length;
        if (restart) {
            // Delete all entries & end
            document.querySelectorAll('div.entry').forEach(function(element) {
                element.remove();
            })
            let end = document.querySelector('div#e-end');
            if (end != null) end.remove();
            isEnd = false;
        }
        if (restart || initial) {
            // Top 3 box
            document.querySelector('.top-3-container > div:nth-child(2) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][0]['uuid']+'?size=8&overlay');
            document.querySelector('.top-3-container > div:nth-child(1) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][1]['uuid']+'?size=8&overlay');
            document.querySelector('.top-3-container > div:nth-child(3) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][2]['uuid']+'?size=8&overlay');
        }

        appendRows(json['data']);
    });
}



/**
   * Adds all provided rows (from json) to the page
   * @param json rows data.
   */
function appendRows(json) {

    // All rows loaded.  Show end message
    if (json.length == 0 && !isEnd) {
        let element = endTemplate.content.firstElementChild.cloneNode(true);
        container.appendChild(element);
        isEnd = true;
    }

    // Append leaderboard entries
    for (let i = 0; i < json.length; i++) {
        let json1 = json[i];

        let element = entryTemplate.content.firstElementChild.cloneNode(true);
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
    // if (!isEnd) container.appendChild(entryTemplate);
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
        loadData(false, true);
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


let filtersPage = document.querySelector('.filtersPage');
let isFiltersPageOpen = false;
/**
   * Toggles filter page visibility
   */
function openFiltersPage() {
    if (isFiltersPageOpen) {
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
    loadData(false, true);
}


/**
   * Closes filters page when clicking away
   */
addEventListener('click', (event) => {;
    if (!isFiltersPageOpen) return;

    // Check if click is inside filters page
    if (document.querySelector(".filter-chip-container").contains(event.target)) return; // TODO: Clicking label passes this check...

    closeFiltersPage();
});