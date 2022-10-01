let c = document.getElementById("screen");
let ctx = c.getContext("2d");

const game = CreateGame();
const keyboardListener = CreateKeyboardListener();
keyboardListener.subscribe(game.MovePlayer);

Render()

function CreateKeyboardListener()
{

    const state = {
        observers: []
    }

    function subscribe(observerFunction)
    {
        state.observers.push(observerFunction);
    }

    function notifyaAll(command)
    {
        console.log(`Notifying ${state.observers.length} observers`)
        for(const observerFunction of state.observers)
        {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', HandleKey);
    function HandleKey(event)
    {
        const keyPressed = event.key;

        const command = {
            playerId: 'player1',
            keyPressed
        }

        notifyaAll(command)
    }

    return {
        subscribe
    }

}

function CreateGame()
{
    const state = {
        Players: {},
        Fruits: {}
    };

    function AddPlayer(command)
    {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.Players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function RemovePlayer(command)
    {
        delete state.Players[command.playerId]
    }

    function AddFruit(command)
    {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.Fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function RemoveFruit(command)
    {
        delete state.Fruits[command.fruitId]
    }
    
    function MovePlayer(command)
    {
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
                if(player.x + 1 < screen.width) player.x += 1
            },
            ArrowDown(player)
            {
                if(player.y +  1 < screen.height) player.y += 1
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
                    console.log("bateuuuuuuu")
                    RemoveFruit({fruitId:fruitId})
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
        state
    }
}

function Render(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 10, 10);

    

    for (PlayerId in game.state.Players) {
        const player = game.state.Players[PlayerId];
        ctx.fillStyle = "black";
        ctx.fillRect(player.x, player.y, 1, 1);
    }

    for (FruitId in game.state.Fruits) {
        const fruits = game.state.Fruits[FruitId]
        ctx.fillStyle = "green";
        ctx.fillRect(fruits.x, fruits.y, 1, 1);
    }
    
    //EWconsole.log(Event.key);

    requestAnimationFrame(Render);
}