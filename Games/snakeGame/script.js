const canvas = document.querySelector('canvas');

canvas.width = 500;
canvas.height = 500;

const canvasWidth = canvas.width; 
const canvasHeight = canvas.height;

const context = canvas.getContext('2d');

const apple = new Image();
apple.src = 'apple.png';

let appleX;
let appleY;

let snakeX = canvasWidth / 2;
let snakeY = canvasHeight / 2;
let snakeDirection = "";

let snake = [ { snakeX, snakeY } ];

function generateApple() {
    apple.onload = function() {
        appleX = RandInt(0, canvasWidth);
        appleY = RandInt(0, canvasHeight);
        context.drawImage(apple, appleX, appleY, 20, 20);
    };
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            snakeDirection = 'up';	
            break;
        case 'ArrowDown':
            snakeDirection = 'down';
            break;
        case 'ArrowLeft':
            snakeDirection = 'left';
            break;
        case 'ArrowRight':
            snakeDirection = 'right';
            break;
    }
}

function handleDirection() {
    switch (snakeDirection) {
        case 'up':
            snakeY -= 20;
            break;
        case 'down':
            snakeY += 20;
            break;
        case 'left':
            snakeX -= 20;
            break;
        case 'right':
            snakeX += 20;
            break;
    }
}

function eatApple() {
    if ((snakeX - appleX) < 20 && (snakeX - appleX) > -20 && (snakeY - appleY) < 20 && (snakeY - appleY) > -20) {
        generateApple();
    }
}

function drawSnake() {
    document.addEventListener('keydown', handleKeyPress);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    handleDirection();
    context.fillStyle = 'green';
    context.fillRect(snakeX, snakeY, 20, 20);
}

function RandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameLoop() {
    generateApple();
    context.fillStyle = 'green';
    context.fillRect(snakeX, snakeY, 20, 20);
    
}

gameLoop();