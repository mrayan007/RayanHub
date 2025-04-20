const iframe = document.getElementById('iframe');
// const headerText = document.getElementById('headerText');

// Function to update the date and time every second
function updateDateTime() {
    document.getElementById('dateTime').innerHTML = new Date().toLocaleString();
}
// Run the updateDateTime function every second (1000 ms)
setInterval(updateDateTime, 1000);

const outsideBorder = document.getElementById('outsideBorder');
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Mouse down event
outsideBorder.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - outsideBorder.getBoundingClientRect().left;
    offsetY = e.clientY - outsideBorder.getBoundingClientRect().top;

    // Change cursor to grabbing
    outsideBorder.classList.add('grabbing');
});

// Mouse move event
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const left = e.clientX - offsetX;
        const top = e.clientY - offsetY;
        
        // Update the position of the outsideBorder
        outsideBorder.style.left = left + 'px';
        outsideBorder.style.top = top + 'px';
    }
});

// Mouse up event
document.addEventListener('mouseup', () => {
    isDragging = false;
    outsideBorder.classList.remove('grabbing');
});

function closeWindow() {
    outsideBorder.style.transform = "scale(0)";
    setTimeout(() => {
        outsideBorder.style.display = "none";
    }, 200); // Match transition duration
}

function openWindow() {
    if (outsideBorder.style.display === "none") {
        outsideBorder.style.display = "block";
        setTimeout(() => {
            outsideBorder.style.transform = "scale(1)";
        }, 10); // Allow display to take effect before scaling
    }
}

document.getElementById("changeHeader").addEventListener("click", function() {
    // Access and modify the headerText span in the parent
    window.parent.document.getElementById("headerText").textContent = "Portfolio";
});