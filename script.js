const desktopApps = document.querySelectorAll('.desktopApp');
desktopApps.forEach(desktopApp => {
    desktopApp.addEventListener('click', openWindow);
});

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

const iframe = document.querySelector('iframe');

function openWindow(event) {
    const app = event.currentTarget; // The .desktopApp div that was clicked
    const label = app.querySelector('label').textContent;

    // Example logic to dynamically change the window content
    const headerText = document.getElementById('headerText');
    const icon = document.querySelector('.windowHeader img');

    headerText.textContent = label;

    // Optional: customize based on label or index
    if (label === "About") {
        iframe.src = "about.html";
        icon.src = "Art/paper.png";
    } else if (label === "Games") {
        iframe.src = "games.html";
        icon.src = "Art/controller.png";
    } else if (label === "School") {
        iframe.src = "school.html";
        icon.src = "Art/books.png";
    } else if (label === "Projects") {
        iframe.src = "projects.html";
        icon.src = "Art/computer.png";
    } else if (label === "Settings") {
        iframe.src = "settings.html";
        icon.src = "Art/settings.png";
    } else if (label === "To-do list") {
        iframe.src = "todo.html";
        icon.src = "Art/todo.png";
    }

    if (label === "Settings" || label === "To-do list"){
        icon.style.scale = "0.6";
    }
    else {
        icon.style.scale = "1";
    }

    // Open window if hidden
    if (getComputedStyle(windowContainer).display === "none") {
        windowContainer.style.display = "block";
        setTimeout(() => {
            windowContainer.style.transform = "scale(1)";
        }, 10);
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

function windowSize() {
    windowContainer.classList.toggle('expanded');
    
    centerWindow();    
}

function centerWindow() {
    const windowWidth = windowContainer.offsetWidth;
    const windowHeight = windowContainer.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const left = (screenWidth - windowWidth) / 2;
    const top = (screenHeight - windowHeight) / 2 - 30;

    windowContainer.style.left = left + 'px';
    windowContainer.style.top = top + 'px';
}