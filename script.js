const board = document.querySelector('.board');
const StartButton = document.querySelector('.btn-start')
const Modal = document.querySelector('.modal')
const startGameModal = document.querySelector('.start-game')
const gameOverModal = document.querySelector('.Game-Over')
const restartButton = document.querySelector('.btn-restart')

const highScoreElement = document.querySelector('#high-score');
const ScoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');


const blockheight = 50;
const blockwidth = 50;

let highScore = localStorage.getItem('highScore') || 0;
let score = 0;
let time = '00-00'

highScoreElement.innerText = highScore;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);
let intervalId = null;
let timeIntervalId = null;

let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }



const blocks = {}
let snake = [{
    x: 1 , y: 3 }
]
    let direction = 'down'


for(let row = 0; row < rows; row++){
    for( let col = 0; col < cols; col++){
        const block = document.createElement('div');
        block.classList.add('block')
        board.appendChild(block);
        blocks[`${row},${col}`] = block

    } 
}

function render() {
        let head = null
        blocks[`${food.y},${food.x}`].classList.add("food")


    if (direction === "left") {
    head = { x: snake[0].x - 1, y: snake[0].y };
}
else if (direction === "right") {
    head = { x: snake[0].x + 1, y: snake[0].y };
}
else if (direction === "up") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
}
else if (direction === "down") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
}


// Wall Collision
  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    
    clearInterval(intervalId);
    Modal.style.display = "flex"
    startGameModal.style.display = "none"
    gameOverModal.style.display = "flex"
    return;
  }

  //Food Collision
  if (head.x === food.x && head.y === food.y) {
    blocks[`${food.y},${food.x}`].classList.remove("food")
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)}
    blocks[`${food.y},${food.x}`].classList.add("food")
    snake.unshift(head)

    score += 10;
    ScoreElement.innerText = score
    if(score > highScore){
        highScore = score
        localStorage.setItem('highScore', highScore.toString())
    }

  }

    snake.forEach(segment => {
        blocks[`${segment.y},${segment.x}`].classList.remove("fill")
    });
        
    snake.unshift(head)
    snake.pop()
    snake.forEach(segment => {
        blocks[`${segment.y},${segment.x}`].classList.add("fill");
    });
}


StartButton.addEventListener('click', () => {
    Modal.style.display = "none"
    intervalId = setInterval(() => { render()},400);
    timeIntervalId = setInterval(() => {
        let [min, sec] = time.split('-').map(Number);

        if (sec === 59) {
            min += 1;
            sec = 0;
        } else {
            sec += 1;
        }
        time = `${min}-${sec}`
        timeElement.innerText = time
    }, 1000)
})


    restartButton.addEventListener('click', restartGame)


    function restartGame() {
        blocks[`${food.y},${food.x}`].classList.remove("food")
        snake.forEach(segment => {
            blocks[`${segment.y},${segment.x}`].classList.remove("fill")
        })
        score = 0
        time = '00-00'

        ScoreElement.innerText = score
        timeElement.innerText = time
        highScoreElement.innerText = highScore

        Modal.style.display = "none"
        direction = "down"
        snake = [{ x:1 , y:3 }]
        food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }
        intervalId = setInterval(() => { render()},400);
    
    }

window.


addEventListener('keydown', (e) => {
    if(e.key === "ArrowLeft"){
        direction = "left"
    }
    else if(e.key === "ArrowRight"){  
        direction = "right"
    }
    else if(e.key === "ArrowUp"){
        direction = "up"
    }
    else if(e.key === "ArrowDown"){
        direction = "down"
    }
})