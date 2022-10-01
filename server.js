import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import { Server } from "socket.io";

const app = express()
const server = http.createServer(app)
const sockets =  new Server(server)

app.use(express.static('public'))

const game = createGame()
game.Start()
game.subscribe((command) => {
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player Connected on server with id: ${playerId}`)

    game.AddPlayer({playerId: playerId})

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.RemovePlayer({playerId: playerId})
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId;
        command.type = 'move-player';
        game.MovePlayer(command);
    })
})

server.listen(3000, () => {
    console.log(`> Server  listening on port: 3000`)
})