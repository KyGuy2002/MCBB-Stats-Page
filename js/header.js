let box = document.querySelector('.info-box');
let aboutOpen = false;
function toggleAbout() {
    aboutOpen = !aboutOpen;
    box.setAttribute('expanded', aboutOpen);
}

/**
* Closes modal when clicking away
*/
addEventListener('click', (event) => {;
    if (!aboutOpen) return;

    // Check if click is inside modal
    if (box.contains(event.target) || document.querySelector('i.h-info') == event.target) return;

    toggleAbout();
});