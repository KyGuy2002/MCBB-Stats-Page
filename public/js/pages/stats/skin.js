let skinViewer = new skinview3d.SkinViewer({
    canvas: document.getElementById("skin_container"),
    width: 150,
    height: 230,
    skin: '/assets/images/steve_skin.png'
});


async function loadPlayerModel(uuid) {
    skinViewer.loadSkin("https://crafatar.com/skins/"+uuid+"?default=MHF_Steve");
}
