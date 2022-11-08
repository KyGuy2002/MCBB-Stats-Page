let container = document.querySelector(".grid-container");

let categoryTemplate = document.querySelector("#category-template");
let individualItemTemplate = document.querySelector("#individual-item-template");
let groupContainerTemplate = document.querySelector("#group-container-template");
let groupTemplate = document.querySelector("#group-template");
let groupedItemTemplate = document.querySelector("#grouped-item-template");

let filtersPage = document.querySelector(".filtersPage");







//
//
// Load Data
//
//

// Start loading data
loadData(false);




/**
   * Loads leaderboard list
   * @param restart true if all items should be deleted and reloaded (used when editing filters)
   */
function loadData(restart) {
    loadJson('/api/leaderboard-list', (json) => {

        if (restart) {
            // Delete all items
            document.querySelectorAll('div.section').forEach(function(element) {
                element.remove();
            })
        }

        appendRows(json);
    });
}



/**
   * Adds all provided rows/leaderboards (from json) to the page
   * @param json rows data.
   */
function appendRows(json) {

    // Append leaderboard entries
    for (let i = 0; i < json.length; i++) {
        let cJson = json[i];

        let category = categoryTemplate.content.firstElementChild.cloneNode(true);
        container.appendChild(category)

        // Data
        category.querySelector('h1.section-title').innerHTML = cJson['name'];
        category.setAttribute('id', "Category-"+cJson['name']);

        // Filters Page
        filtersPage.innerHTML = filtersPage.innerHTML + '<a href="#Category-'+cJson['name']+'">'+cJson['name']+' <i class="fa-solid fa-angle-right"></i></a>'



        // Individual Items
        for (let i = 0; i < cJson['individuals'].length; i++) {
            let iJson = cJson['individuals'][i];

            let individual = individualItemTemplate.content.firstElementChild.cloneNode(true);
            category.appendChild(individual);

            // Data
            individual.setAttribute('onClick', "window.location.href = '/leaderboard/"+iJson['lb_id']+"'");
            addClasses(individual.querySelector('i.icon'), iJson['icon']);
            individual.querySelector('div > h1').innerHTML = iJson['name'];
            individual.querySelector('div > h2').innerHTML = iJson['description'];
            individual.style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.980), rgba(0, 0, 0, 0.300)), url('"+iJson['image']+"')";
            individual.style.backgroundPosition = "center";
            individual.style.backgroundSize = "cover";
            individual.style.backgroundRepeat = "no-repeat";
        }



        // Group Container
        let groupContainer = groupContainerTemplate.content.firstElementChild.cloneNode(true);
        category.appendChild(groupContainer);



        // Groups
        for (let i = 0; i < cJson['groups'].length; i++) {
            let gJson = cJson['groups'][i];

            let groupWrapper = groupTemplate.content.firstElementChild.cloneNode(true);
            groupContainer.appendChild(groupWrapper);
            let groupCard = groupWrapper.querySelector('.groups-item');

            // Data
            groupCard.querySelector('h1').innerHTML = gJson['name'];
            groupCard.querySelector('h2').innerHTML = gJson['description'];
            groupCard.style.background = "radial-gradient(circle at center, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.400)), url('"+gJson['image']+"')";
            groupCard.style.backgroundPosition = "center";
            groupCard.style.backgroundSize = "cover";
            groupCard.style.backgroundRepeat = "no-repeat";



            // Grouped Items
            for (let i = 0; i < gJson['lbs'].length; i++) {
                let gIJson = gJson['lbs'][i];

                let groupedItem = groupedItemTemplate.content.firstElementChild.cloneNode(true);
                groupWrapper.querySelector('ul').appendChild(groupedItem);

                // Data
                groupedItem.querySelector('h1').innerHTML = gIJson['name'] + "<i class='fa-solid fa-angle-right'></i>";
                groupedItem.setAttribute('onClick', "window.location.href = '/leaderboard/"+gIJson['lb_id']+"'");
            }
        }
    }
}






//
//
// Jump To Page
//
//
let jumpToPage = document.querySelector('.filtersPage');
let isJumpToPageOpen = false;
/**
   * Toggles jump to page visibility
   */
function openJumpToPage() {
    if (isJumpToPageOpen) {
        closeJumpToPage();
        return;
    }
    isJumpToPageOpen = true;
    jumpToPage.style.display = 'block';
}


/**
   * Closes jump to page
   */
function closeJumpToPage() {
    isJumpToPageOpen = false;
    jumpToPage.style.display = 'none';
}


/**
   * Closes jump to page when clicking away
   */
addEventListener('click', (event) => {;
    if (!isJumpToPageOpen) return;

    // Check if click is inside filters page
    if (document.querySelector(".filter-chip-container").contains(event.target)) return; // TODO: Clicking label passes this check...

    closeJumpToPage();
});





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
async function submitSearch() {
    let value = searchBar.value;

    try {
        
        closeSearchBar();

    } catch (e) {
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