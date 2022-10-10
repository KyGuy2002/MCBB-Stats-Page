function initGeneralStats(json, uuid, username) {

    document.querySelector(".g-name").innerHTML = "Stats for " + username;
    document.querySelector(".g-uuid").innerHTML = uuid;

    loadPlayerModel(uuid);
  
    document.querySelector("#gs-first_joined").innerHTML = json['first_joined'];
    document.querySelector("#gs-last_online").innerHTML = json['last_online'];
    document.querySelector("#gs-current_loc").innerHTML = json['current_loc'];
    document.querySelector("#gs-rank").innerHTML = json['rank'];
}