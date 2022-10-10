import CreateGame from './game.js';
import CreateKeyboardListener from './keyboard-listener.js'
import renderScreen from './render-screen.js'


const game = CreateGame();
const keyboardListener = CreateKeyboardListener(document);
const lederBoardeList = document.getElementById('lista')


const socket = io()

function updateScoreBoard()
{
    lederBoardeList.innerHTML = ""
    for(const pId in game.state.Players)
    {
        const player = game.state.Players[pId]
        if(!player) continue
        console.log(player)
        lederBoardeList.innerHTML += `<li>Player Id: ${pId} - Pontos: ${player.points} </li>`
    }
}

socket.on('connect', () => {
    const playerId = socket.id
    console.log(`playerId = ${playerId}`)
    const screen = document.getElementById("screen");
    renderScreen(screen, game, requestAnimationFrame, playerId)
})

socket.on('setup', (state) => {
    const playerId = socket.id
    game.setSate(state)
    const screen = document.getElementById("screen");
    screen.setAttribute('width', state.screen.width)
    screen.setAttribute('height', state.screen.height)
    keyboardListener.registerPlayerId(playerId)
    keyboardListener.subscribe(game.MovePlayer);
    keyboardListener.subscribe((command) => {
        socket.emit('move-player', command)
    });
    updateScoreBoard();
})

socket.on('add-player', (command) => {
    game.AddPlayer(command)
    updateScoreBoard()
})

socket.on('remove-player', (command) => {
    game.RemovePlayer(command)
    updateScoreBoard();
})

socket.on('move-player', (command) =>{
    const playerId= socket.id
    if(playerId !== command.playerId)
    {
        game.MovePlayer(command)
    }
})

socket.on('add-fruit', (command) => {
    game.AddFruit(command)
})

socket.on('remove-fruit', (command) => {
    game.RemoveFruit(command)
    console.log(game.state)
})

socket.on('eat-fruit', (command) =>{
    updateScoreBoard()
})