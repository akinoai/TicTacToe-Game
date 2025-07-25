const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const playerX = document.querySelector('#playerX')
const playerO = document.querySelector('#playerO')
const restartBtn = document.querySelector('#restartBtn')

let player = 'X'
let isPauseGame = false
let isGameStart = false

const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '',]

const winCond = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
]

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index) {
    if (cell.textContent == '' &&
        !isPauseGame
    ) {
        isGameStart = true
        updateCell(cell, index)

        if (!checkWinner()){
            changePlayer()
            randomPick()
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = player
    inputCells[index] = player
    cell.style.color = (player == 'X') ? 'rgb(255, 0, 119)' : 'rgb(38, 42, 145)'
}

function changePlayer(){
    player = (player == 'X') ? 'O' : 'X'
}

function checkWinner(){
    for (const [a, b, c] of winCond){
        if (inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player
        ) {
            declareWinner([a, b, c])
            return true
            }
    }

    if (inputCells.every(cell => cell != '')){
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} WINS!`
    isPauseGame = true

    winningIndices.forEach((index) => 
        cells[index].style.background = 'rgb(253, 145, 199)')

    restartBtn.style.visibility = 'visible'
}

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach(cell => {
    cell.textContent = ''
    cell.style.background = ''
})
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'CHOOSE'
})

function declareDraw(){
    titleHeader.textContent = 'DRAW!'
    isPauseGame = true
    restartBtn.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer){
    if (!isGameStart) {
        player = selectedPlayer

        if(player == 'X') {
            playerX.classList.add('player-active')
            playerO.classList.remove('player-active')
        }
        else{
            playerX.classList.remove('player-active')
            playerO.classList.add('player-active')
        }
    }
}

function randomPick() {
    isPauseGame = true

    setTimeout(() => {
        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * inputCells.length)
        }

        while(
            inputCells[randomIndex] != ''
        )

        updateCell(cells[randomIndex], randomIndex, player)

        if (!checkWinner()) {
            changePlayer()
            isPauseGame = false
            return
        }

        player = (player == 'X') ? 'O' : 'X'

    }, 100)
}