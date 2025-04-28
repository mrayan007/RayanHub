const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const scoreText = document.querySelector('span');
context.imageSmoothingEnabled = false;

function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Collisions(snake, food, score) {
    if (snake.head.x === food.coordinates.x && snake.head.y === food.coordinates.y) {
        food.spawn();
        snake.grow();
        score.value += 1;
        console.log(score.value);
        scoreText.innerHTML = score.value.toString();
    }

    if(snake.head.x < 0) {
        snake.head.x = canvas.width;
    }
    else if (snake.head.x === canvas.width) {
        snake.head.x = -snake.size;
    }
    else if (snake.head.y < 0) {
        snake.head.y = canvas.height;
    }
    else if (snake.head.y === canvas.height) {
        snake.head.y = -snake.size;
    }
}

class Food {
    constructor() {
        this.size = 20;
        this.coordinates = {x: 0, y: 0};
        context.fillStyle = 'red';
    }

    spawn() {
        context.clearRect(this.coordinates.x, this.coordinates.y, this.size, this.size);

        this.coordinates.x = RandomInt(0, (canvas.width / this.size) - 1) * this.size;
        this.coordinates.y = RandomInt(0, (canvas.height / this.size) - 1) * this.size;

        context.fillStyle = 'red';
        context.fillRect(this.coordinates.x, this.coordinates.y, this.size, this.size);
    }
}

class Snake {
    constructor() {
        this.size = 20;
        this.length = 0;
        this.body = [];
        this.head = {x: 0, y: 0};
        this.direction = "right";
    }

    directionChange(event) {
        if (event.key === 'ArrowRight' && this.direction !== 'left') {
            this.direction = 'right';
        }
        if (event.key === 'ArrowLeft' && this.direction !== 'right') {
            this.direction = 'left';
        }
        if (event.key === 'ArrowUp' && this.direction !== 'down') {
            this.direction = 'up';
        }
        if (event.key === 'ArrowDown' && this.direction !== 'up') {
            this.direction = 'down';
        }
    }

    move() {
        // First, clear the head
        context.clearRect(this.head.x, this.head.y, this.size, this.size);
    
        // Clear the tail
        if (this.body.length > 0) {
            const tail = this.body[this.body.length - 1];
            context.clearRect(tail.x, tail.y, this.size, this.size);
        }
    
        // Move body parts
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        if (this.body.length > 0) {
            this.body[0].x = this.head.x;
            this.body[0].y = this.head.y;
        }
    
        // Move the head
        switch (this.direction) {
            case 'right':
                this.head.x += this.size;
                break;
            case 'left':
                this.head.x -= this.size;
                break;
            case 'up':
                this.head.y -= this.size;
                break;
            case 'down':
                this.head.y += this.size;
                break;
        }
    
        // Draw head
        context.fillStyle = 'black';
        context.fillRect(this.head.x, this.head.y, this.size, this.size);
    
        // Draw body
        for (let part of this.body) {
            context.fillStyle = 'black';
            context.fillRect(part.x, part.y, this.size, this.size);
        }
    }    

    grow() {
        const last = this.body.length > 0 ? this.body[this.body.length - 1] : { x: this.head.x, y: this.head.y };
        this.body.push({ x: last.x, y: last.y });
        this.length++;
    }
}

function Main() {
    let score = {value: 0};

    let food = new Food();
    food.spawn();

    let snake = new Snake();

    document.addEventListener('keydown', (event) => snake.directionChange(event));

    setInterval(() => {
        snake.move();
        Collisions(snake, food, score);
    }, 200);
}

Main();