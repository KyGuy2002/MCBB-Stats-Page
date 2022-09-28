async function submitName() {
  fetch('/submitName', {
      method: 'POST',
      mode:'no-cors',
      body: document.getElementById("name-input").value
  })
}