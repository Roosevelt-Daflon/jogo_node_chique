export default function renderScreen(screen, game, requestAnimationFrame, CurrentplayerId){
    const ctx = screen.getContext('2d')
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, game.state.screen.width, game.state.screen.height);
    for (const playerId in game.state.Players) {
        const player = game.state.Players[playerId]
        ctx.fillStyle = "black";
        ctx.fillRect(player.x, player.y, 1, 1);
    }

    for (const fruitId in game.state.Fruits) {
        const fruits = game.state.Fruits[fruitId]
        ctx.fillStyle = "#8Acc00cc";
        ctx.fillRect(fruits.x, fruits.y, 1, 1);
    }
    
    const currentPlayer = game.state.Players[CurrentplayerId]

    if(currentPlayer)
    {
        ctx.fillStyle = "#F0DB4f"
        ctx.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, CurrentplayerId)
    });
}