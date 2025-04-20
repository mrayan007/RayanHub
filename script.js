let dateTime;

function updateDateTime() {
    dateTime = new Date();
    document.getElementById('dateTime').textContent = dateTime.toLocaleString();
}

setInterval(updateDateTime, 1000);