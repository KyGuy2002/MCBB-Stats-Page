let container = document.querySelector(".grid-container");

let categoryTemplate = document.querySelector("#category-template");
let individualItemTemplate = document.querySelector("#individual-item-template");
let groupContainerTemplate = document.querySelector("#group-container-template");
let groupTemplate = document.querySelector("#group-template");
let groupedItemTemplate = document.querySelector("#grouped-item-template");

let currentFilters = [];







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
    loadJson('http://localhost:8080/api/leaderboard-list'+(currentFilters.length != 0 ? '?filters='+currentFilters : ''), (json) => {

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

            let group = groupTemplate.content.firstElementChild.cloneNode(true);
            groupContainer.appendChild(group);

            // Data
            group.querySelector('h1').innerHTML = gJson['name'];
            group.querySelector('h2').innerHTML = gJson['description'];
            group.style.background = "radial-gradient(circle at center, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.400)), url('"+gJson['image']+"')";
            group.style.backgroundPosition = "center";
            group.style.backgroundSize = "cover";
            group.style.backgroundRepeat = "no-repeat";



            // Grouped Items
            for (let i = 0; i < gJson['lbs'].length; i++) {
                let gIJson = gJson['lbs'][i];

                let groupedItem = groupedItemTemplate.content.firstElementChild.cloneNode(true);
                group.querySelector('ul').appendChild(groupedItem);

                // Data
                groupedItem.querySelector('h1').innerHTML = gIJson['name'] + "<i class='fa-solid fa-angle-right'></i>";
                groupedItem.setAttribute('onClick', "window.location.href = '/leaderboard/"+gIJson['lb_id']+"'");
            }
        }
    }
}