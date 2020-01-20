let canvas;
let context;

let gbArrayHeight = 20;
let gbArrayWidth = 12;
let startX = 4;
let startY = 0;
let coordinateArray = [...Array(gbArrayHeight)].map(e => Array(gbArrayWidth).fill(0))
let curTetromino = [[1,0], [0,1], [1,1], [2,1]];

let tetrominos = [];
let tetrominoColors = ['purple', 'cyan', 'blue', 'yellow', 'orange', 'green', 'red'];
let currentTetrominoColor = 'red';

let gameBoardArray = [...Array(gbArrayHeight)].map(e => Array(gbArrayWidth).fill(0))

let DIRECTION = {
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
}

let direction 

class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

document.addEventListener('DOMContentLoaded', SetupCanvas)

function CreateCoordinateArray() {
    let i = 0,  j = 0;
    for (let y = 9; y <= 446; y += 23) {
        for (let x = 11; x <= 264; x += 23) {
            coordinateArray[i][j] = new Coordinates(x,y);
            i++;
        }
        j++;
        i = 0;
    }
}

function SetupCanvas() {
    canvas = document.getElementById('myCanvas')
    context = canvas.getContext('2d')
    canvas.width = 936
    canvas.height = 956

    context.scale(2,2)

    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.strokeStyle = 'black'
    context.strokeRect(8, 8, 280, 462)

    document.addEventListener('keydown', HandleKeyPress)
    CreateTetromino()
    CreateTerominos()

    CreateCoordinateArray();
    DrawTetromina();
}

function DrawTetromina() {
    for(i=0; i < curTetromino.length; i++) {
        let x = curTetromino[i][0] + startX
        let y = curTetromino[i][1] + startY
        gameBoardArray[x][y] = 1
        let coorX = coordinateArray[x][y].x  
        let coorY = coordinateArray[x][y].y
        context.fillStyle = currentTetrominoColor
        context.fillRect(coorX, coorY, 21, 21)
    }
}

function HandleKeyPress(key) {
    if(key.keyCode === 65) {
        direction = DIRECTION.LEFT
        DeleteTetromino()
        startX--
        DrawTetromina()
    } else if (key.keyCode === 68) {
        direction = DIRECTION.RIGHT;
        console.log('right')
        DeleteTetromino()
        startX++
        DrawTetromina()
    } else if (key.keyCode === 83) {
        direction = DIRECTION.DOWN;
        console.log('down')
        DeleteTetromino()
        startY++
        DrawTetromina()
    } 
}

function DeleteTetromino() {
    for(let i = 0; i < curTetromino.length; i++) {
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;
        gameBoardArray[x][y] = 0;
        let coorX = coordinateArray[x][y].x
        let coorY = coordinateArray[x][y].y
        context.fillStyle = 'white';
        context.fillRect(coorX, coorY, 21, 21)
    }
}

function CreateTerominos() {
       tetrominos.push([[1,0], [0,1], [1,1], [2,1]]) 
       tetrominos.push([[0,0], [1,0], [2,0], [3,0]]) 
       tetrominos.push([[0,0], [0,1], [1,1], [2,1]]) 
       tetrominos.push([[0,0], [1,0], [0,1], [1,1]]) 
       tetrominos.push([[2,0], [0,1], [1,1], [2,1]]) 
       tetrominos.push([[1,0], [2,0], [0,1], [1,1]]) 
       tetrominos.push([[0,0], [1,0], [1,1], [2,1]]) 
    }

function CreateTetromino() { 
    let randomTetromino = Math.floor(Math.random() * tetrominos.length);
    currentTetromino = tetrominos[randomTetromino];
    curTetrominColor = tetrominoColors[randomTetromino]
}    