// Config
const loadAmount = 7;




// Vars
const lbId = window.location.pathname.split('/')[2];

const container = document.querySelector("grid-container");
const entryTemplate = document.querySelector("template[has='entry']").content.firstElementChild;
const endTemplate = document.querySelector("template[has='end']").content.firstElementChild;

let loaded = 0;
let loading = false;
let best;
let isEnd = false;

let currentFilters = [];




//
//
// Load Data
//
//

// Start loading initial data
loadData(true, false);




// Load more entries on scroll
window.addEventListener('scroll', () => {
    if (isEnd) return;
    if (loading) return;
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 250) {

        loadData(false, false);
    };
}, { passive: true });



/**
   * Loads general data and leaderbaord entries
   * @param initial true if title, description, etc should be loaded.
   * @param restart true if all entries should be deleted and reloaded (used when editing filters)
   */
function loadData(initial, restart) {
    if (loading) return;
    if (restart) {
        document.querySelectorAll('entry.entry, end.end').forEach(function(element) {element.remove();});
        isEnd = false;
        loaded = 0;
    }
    appendSkeletonRows(loadAmount, container, entryTemplate);
    loading = true;
    loadJson('/api/leaderboard/'+lbId+'?amount='+loadAmount+'&start='+loaded+(currentFilters.length != 0 ? '&filters='+currentFilters : ''), (json) => {

        if (initial) { // Details
            container.removeAttribute('skeleton');
            document.querySelector('title').innerHTML = json['name'] + " | MCBB Stats";
            document.querySelector('.page-title').innerHTML = json['name'];
            document.querySelector('.page-description').innerHTML = json['description'];
        }

        if (restart || initial) { // Top 3 box
            best = json['data'][0]['value'];
            document.querySelector('.top-3-container > div:nth-child(2) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][0]['uuid']+'?size=8&overlay');
            document.querySelector('.top-3-container > div:nth-child(1) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][1]['uuid']+'?size=8&overlay');
            document.querySelector('.top-3-container > div:nth-child(3) > img').setAttribute('src', 'https://crafatar.com/avatars/'+json['data'][2]['uuid']+'?size=8&overlay');
        }

        fillRows(json['data']);
    });
}



/**
   * Adds all provided rows (from json) to the page
   * @param json rows data.
   */
function fillRows(json) {

    // If end, add end card and stop
    if (json.length == 0) {
        container.appendChild(endTemplate.cloneNode(true));
        isEnd = true;
        return;
    }

    // Fill leaderboard entries
    for (let i = 0; i < json.length; i++) {
        let current = i + loaded + 1;
        let json1 = json[i];

        let element = container.querySelector('entry:nth-of-type('+current+')');
        element.removeAttribute('skeleton');

        // Data
        element.querySelector('h1').innerHTML = json1['pos'];
        element.querySelector('img-div > img').setAttribute('src', 'https://crafatar.com/avatars/'+json1['uuid']+'?size=8&overlay');
        element.querySelector('data-div > h1').innerHTML = json1['username'];
        element.querySelector('data-div > stat-div > .value').innerHTML = json1['value'];
        element.querySelector('data-div > stat-div > .label').innerHTML = json1['label'];
        element.setAttribute('onClick', "window.location.href='/stats/"+json1['uuid']+"'");

        // Progress bar
        let barPercent = (100 * json1['value']) / best;
        if (barPercent >= 92) {
            element.querySelector('bar-line > #best').innerHTML = '';
        }
        else if (barPercent <= 8) {
            element.querySelector('bar-line > #none').innerHTML = '';
        }
        else {
            element.querySelector('bar-line > #best > #value').innerHTML = best;
        }
        element.querySelector('bar-line > #you > #value').innerHTML = json1['value'];
        element.querySelector('bar-line > #you').style.setProperty('left', 'calc('+barPercent+'% - 17px)');
    }

    loaded = loaded + json.length;
    loading = false;

    // If not full, add end card and remove extra skeleton rows
    if (json.length < loadAmount) {
        container.appendChild(endTemplate.cloneNode(true));
        isEnd = true;
        removeSkeletonRows(container, 'entry[skeleton]');
    }
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
async function clickedFilter(chipElement) {
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

    // When active chip (with X) is clicked. (Player)
    else if (mode == "player" && currentFilters.includes(filter)) {
        currentFilters.splice(currentFilters.indexOf(filter), 1);
        chipElement.remove();
        loadData(false, true);
    }

    // When non greyed out (no icon) chips are clicked in the filters page.
    else if (mode == "add" && !currentFilters.includes(filter)) {
        currentFilters.push(filter);
        chipElement.setAttribute("mode", 'greyed');
        chipElement.innerHTML = checkIcon + chipElement.innerHTML; // Add a check icon
        document.querySelector("div#f-container").appendChild(await chipBuilder(filter, 'remove'));
        // Don't refresh, since this can only happen within the filters page
    }

    toggleLine();
}


/**
   * Creates a filter chip
   *
   * @param filter The filter type and name.  Ex. Rank:Pig
   * @param mode "add", "remove", "greyed", or "player".
   * @return The filter chip element.
   */
async function chipBuilder(filter, mode) {
    let element = template.content.firstElementChild.cloneNode(true);
    let text = filter.split(':', 2)[1];

    // Everything
    element.setAttribute("filter", filter);
    element.setAttribute("mode", mode);
    element.querySelector('h1').innerHTML = text; // Set text

    // Not Add mode
    if (mode != "add") {
        element.innerHTML = (mode == "greyed" ? checkIcon : "") + element.innerHTML + (mode == "remove" || mode == "player" ? xIcon : ""); // Add icon if not in mode "add"
    }

    // Player mode
    if (mode == "player") {
        let playerDataArray = await getOppositeID(text);

        if (currentFilters.includes("Player:"+playerDataArray['uuid'])) throw new Error("Player Already Added!");

        currentFilters[currentFilters.indexOf(filter)] = "Player:"+playerDataArray['uuid'] // Replace item in current filters with UUID
        element.setAttribute("filter", "Player:"+playerDataArray['uuid']);
        element.querySelector('h1').innerHTML = playerDataArray['username']; // Set name
        element.innerHTML = "<img src='https://crafatar.com/avatars/"+playerDataArray['uuid']+"?size=8&overlay'>" + element.innerHTML; // Add player head image
    }

    return element;
}

// document.addEventListener('DOMContentLoaded', (event) => {
//     setTimeout(function() {
//         if (screen.width <= 550) {
//             console.log("ee")
//             const element = document.querySelector(".filtersPage");
//             var rect = element.getBoundingClientRect();
//             console.log(rect.top, rect.right, rect.bottom, rect.left);
//             // element.style.left = -(rect.left) + "px";
//         }
//     }, 1000);
// })

addChipsToFiltersPage();
/**
   * Copy all default chips to the filters page
   */
async function addChipsToFiltersPage() {
    for (i = 0; i < allFilters.length; i++) {
        let f = allFilters[i];
        document.querySelector('div.filtersPage > div#'+f.split(':', 2)[0]+'-container').appendChild(await chipBuilder(f, 'add'));
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


function toggleLine() {
    // Toggle line between filter chips and buttons
    let line = document.querySelector('div#f-container > div.vertical-divider');
    if (currentFilters.length == 0)  line.style.display = 'none';
    else line.style.display = 'block';
}






//
//
// Search
//
//
let searchBar = document.querySelector('.searchBar');
let isSearchBarOpen = false;
/**
   * Toggles search bar visibility
   */
function openSearchBar() {
    if (isSearchBarOpen) {
        closeSearchBar();
        return;
    }
    isSearchBarOpen = true;
    searchBar.style.display = 'block';
    searchBar.focus();
}


/**
   * Closes search bar
   */
function closeSearchBar() {
    removeError();
    isSearchBarOpen = false;
    searchBar.style.display = 'none';
    searchBar.value = "";
}


/**
   * Closes search bar when clicking away
   */
addEventListener('click', (event) => {
    if (!isSearchBarOpen) return;

    // Check if click is inside search bar
    if (document.querySelector(".search-chip-container").contains(event.target)) return;

    closeSearchBar();
});

const errorElement = document.querySelector(".search-error");
async function submitNameFilter() {
    let nameUUID = searchBar.value;

    try {
        currentFilters.push("Player:"+nameUUID);
        let child = await chipBuilder("Player:"+nameUUID, "player");
        document.querySelector("div#f-container").appendChild(child);
        toggleLine();
        loadData(false, true);
        closeSearchBar();

    } catch (e) {
        currentFilters.pop();

        removeError();

        setTimeout(function() {
            searchBar.classList.add("search-error-input");

            errorElement.innerHTML = e.message;
            errorElement.style.display = "block";
        }, 10);
    }
}

function removeError() {
    errorElement.style.display = "none";
    searchBar.classList.remove("search-error-input");
}