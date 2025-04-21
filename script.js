let dateTime;

function updateDateTime() {
    dateTime = new Date();
    document.getElementById('dateTime').textContent = dateTime.toLocaleString();
}

setInterval(updateDateTime, 1000);

const windowContainer = document.querySelector('.windowContainer');

function closeWindow() {
    windowContainer.style.transform = "scale(0)";
    setTimeout(() => {
        windowContainer.style.display = "none";
    }, 200); // Match transition duration
}

const desktopApps = document.querySelectorAll('.desktopApp');
desktopApps.forEach(desktopApp => {
    desktopApp.addEventListener('click', openWindow);
})

function openWindow() {
    if (windowContainer.style.display === "none") {
        windowContainer.style.display = "block";
        setTimeout(() => {
            windowContainer.style.transform = "scale(1)";
        }, 10); // Allow display to take effect before scaling
    }
}

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Mouse down event
windowContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowContainer.getBoundingClientRect().left;
    offsetY = e.clientY - windowContainer.getBoundingClientRect().top;

    // Change cursor to grabbing
    windowContainer.classList.add('grabbing');
});

// Mouse move event
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const left = e.clientX - offsetX;
        const top = e.clientY - offsetY;
        
        // Update the position of the outsideBorder
        windowContainer.style.left = left + 'px';
        windowContainer.style.top = top + 'px';
    }
});

// Mouse up event
document.addEventListener('mouseup', () => {
    isDragging = false;
    windowContainer.classList.remove('grabbing');
});