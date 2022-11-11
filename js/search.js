// Validate submit name form
async function submitName() {
    const input = document.getElementById("username-input");
    const headerInput = document.getElementById("username-input-header");
    if (input && input.value) validatePlayer(input.value, true);
    else if (headerInput.value) validatePlayer(headerInput.value, true);
}