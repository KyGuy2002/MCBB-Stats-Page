


let container = document.querySelector(".grid-container");

let categoryTemplate = document.querySelector("#c-0");

let individualTemplate = document.querySelector("#i-0");

let groupTemplate = document.querySelector("#g-0");
let groupLbTemplate = document.querySelector("#glb-0");

loadData();



// Load data
async function loadData() {
    loadJson('http://localhost:8080/api/leaderboard-list', (json) => {
        showData(json);
    });


    // Show everything
    document.querySelectorAll(".box").forEach(function(e){
        e.style.animationPlayState = 'running';
    })
}



function showData(json) {

    // Append leaderboard categories
    for (let i = 0; i < json.length; i++) {
        let cJson = json[i];
        let cElement = categoryTemplate.cloneNode(true);
        container.appendChild(cElement)
        let id = 'c-'+(i+1);
        cElement.setAttribute('id', id);

        // Title
        document.querySelector("#"+id+' > h1').innerHTML = cJson['name'];

        // Add single items
        for (let i = 0; i < cJson['individuals'].length; i++) {
            let iJson = cJson['individuals'];

            let iElement = individualTemplate.cloneNode(true);
            cElement.appendChild(iElement)
            let id = 'i-'+(i+1);
            iElement.setAttribute('id', id);

            // Data
            document.querySelector("#"+id+' > div > h1').innerHTML = iJson['name'];
            document.querySelector("#"+id+' > div > h2').innerHTML = iJson['description'];
        }

        // Add groups
        for (let i = 0; i < cJson['groups'].length; i++) {
            let gJson = cJson['groups'];
            document.querySelector("#")

            let gElement = groupTemplate.cloneNode(true);
            .appendChild(gElement)
            let id = 'i-'+(i+1);
            iElement.setAttribute('id', id);

            // Data
            document.querySelector("#"+id+' > div > h1').innerHTML = iJson['name'];
            document.querySelector("#"+id+' > div > h2').innerHTML = iJson['description'];
        }



        // document.querySelector("#"+id+' > img').setAttribute('src', 'https://crafatar.com/avatars/'+json1['uuid']+'?size=8&overlay');
        // document.querySelector("#"+id+' > .data > .username').innerHTML = json1['username'];
        // document.querySelector("#"+id+' > .data > .stat > .value').innerHTML = json1['value'];
        // document.querySelector("#"+id+' > .data > .stat > .label').innerHTML = json1['label'];
    }
    
    loading = false;
    if (!isEnd) container.appendChild(entryTemplate);
}