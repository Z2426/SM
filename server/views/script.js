// Get the message parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');
const status = urlParams.get('status');
console.log(status);

// Get the card, status icon, and status message elements
const card = document.querySelector(".card");
const statusIcon = document.getElementById('statusIcon');
const statusMessage = document.getElementById('statusMessage');

// Display appropriate content and set background color based on the message parameter
if (status === 'success') {
    statusIcon.innerHTML = '✔️';
    statusMessage.textContent = message;
    card.classList.add("success");
    statusIcon.classList.add('success');
    statusMessage.classList.add('success');
} else if (status === 'error') {
    statusIcon.innerHTML = '❌';
    statusMessage.textContent = message;
    card.classList.add("error");
    statusIcon.classList.add('error');
    statusMessage.classList.add('error');
}
