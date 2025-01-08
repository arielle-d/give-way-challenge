// Basic Game Loop
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let av = { x: 50, y: 300, width: 50, height: 30, speed: 2 };
let hazards = [
    { x: 300, y: 300, width: 30, height: 30 },
    { x: 600, y: 300, width: 30, height: 30 },
];

function drawAV() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(av.x, av.y, av.width, av.height);
}

function drawHazards() {
    ctx.fillStyle = 'red';
    hazards.forEach((hazard) => {
        ctx.fillRect(hazard.x, hazard.y, hazard.width, hazard.height);
    });
}

function detectCollision() {
    hazards.forEach((hazard) => {
        if (
            av.x < hazard.x + hazard.width &&
            av.x + av.width > hazard.x &&
            av.y < hazard.y + hazard.height &&
            av.y + av.height > hazard.y
        ) {
            alert('Hazard detected! Question goes here.');
            av.speed = 0; // Pause game
        }
    });
}

function update() {
    av.x += av.speed;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAV();
    drawHazards();
    detectCollision();
    requestAnimationFrame(update);
}

update();

let score = 0;

function updateScore(isCorrect) {
    if (isCorrect) {
        score += 10;
    }
    console.log('Score:', score); // Replace with on-screen display later
}

let gameState = 'START';

function changeState(newState) {
    gameState = newState;
    if (gameState === 'PLAY') {
        update();
    }
}

let questions = [
    { question: 'What is a hazard?', options: ['A', 'B', 'C'], correct: 'A' },
    { question: 'What to do when AV detects a hazard?', options: ['Stop', 'Go', 'Ignore'], correct: 'Stop' },
];

// Function to show question (to be connected to UI later)
function showQuestion(index) {
    let q = questions[index];
    console.log(q.question, q.options); // Replace with UI pop-up
}