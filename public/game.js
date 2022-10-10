export default function CreateGame()
{
    const state = {
        Players: {},
        Fruits: {},
        screen:{
            width: 50,
            height: 50
        }
    };

    function Start()
    {
        const frequency = 250

        setInterval(AddFruit, frequency);
    }

    const observers = []

    function subscribe(observerFunction)
    {
        observers.push(observerFunction);
    }

    function notifyaAll(command)
    {
        for(const observerFunction of observers)
        {
            observerFunction(command)
        }
    }

    function AddPlayer(command)
    {
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)

        state.Players[playerId] = {
            points: 0,
            x: playerX,
            y: playerY
        }

        notifyaAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        })
    }

    function setSate(newState)
    {
        Object.assign(state, newState)
    }

    function RemovePlayer(command)
    {
        delete state.Players[command.playerId]
        notifyaAll({
            type: 'remove-player',
            playerId: command.playerId,
        })
    }

    function AddFruit(command)
    {
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 1000000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height)

        state.Fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }

        notifyaAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        })
    }

    function RemoveFruit(command)
    {
        delete state.Fruits[command.fruitId]
        notifyaAll({
            type: 'remove-fruit',
            fruitId: command.fruitId,
        })
    }
    
    function MovePlayer(command)
    {
        notifyaAll(command)
        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.Players[playerId]
        const acceptedMoves = {
            ArrowUp(player)
            {
                if(player.y - 1 >= 0) player.y -= 1
            },
            ArrowRight(player)
            {
                if(player.x + 1 < state.screen.width) player.x += 1
            },
            ArrowDown(player)
            {
                if(player.y +  1 < state.screen.height) player.y += 1
            },
            ArrowLeft(player)
            {
                if(player.x - 1 >=  0) player.x -= 1
            }
        }

        function CheckForFruitCollition(playerId)
        {
            const player = state.Players[playerId]
            for(const fruitId in state.Fruits)
            {
                const fruit = state.Fruits[fruitId]
                if(player.x === fruit.x && player.y === fruit.y)
                {
                    player.points += 1;
                    RemoveFruit({fruitId:fruitId})
                    notifyaAll({
                        type: 'eat-fruit',
                        playerId: command.playerId,
                    })
                }
            }
        }

        const moveFunction = acceptedMoves[keyPressed]
        if(player && moveFunction){
            moveFunction(player)
            CheckForFruitCollition(playerId)
        }
    }

    return{
        AddFruit,
        RemoveFruit,
        AddPlayer,
        RemovePlayer,
        MovePlayer,
        setSate,
        subscribe,
        Start,
        state
    }
}