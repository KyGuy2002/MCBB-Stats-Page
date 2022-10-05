let skinViewer = new skinview3d.SkinViewer({
    canvas: document.getElementById("skin_container"),
    width: 150,
    height: 230,
    autoRotate: true,
    skin: "/assets/images/skin.png"
});

// // Load a cape
// skinViewer.loadCape("img/cape.png");

// // Load an elytra (from a cape texture)
// skinViewer.loadCape("img/cape.png", { backEquipment: "elytra" });

skinViewer.autoRotate = true;
skinViewer.autoRotateSpeed = 0.2;
