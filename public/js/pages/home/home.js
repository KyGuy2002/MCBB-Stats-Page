async function submitName() {
  fetch('/submitName', {
      method: 'POST',
      mode:'no-cors',
      body: document.getElementById("name-input").value
  }, (res) => {

    if (res.statusCode == 204) {
      console.log("Not found!");
      return;
    }

    const username = res.body["name"];
    const uuid = res.body["id"];
    window.location.href = '/stats/'+uuid+"/manhunt"
  })
}