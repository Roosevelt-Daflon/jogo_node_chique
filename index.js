let c = document.getElementById("screen");
let ctx = c.getContext("2d");

const game = {
    Players: {
        'Player1':{x:1, y:5}
    },
    Frutas: {
        'Fruta1': {x:1, y:2}
    }
};

Render()

function Render(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 10, 10);

    for (PlayerId in game.Players) {
        const player = game.Players[PlayerId]
        ctx.fillStyle = "black";
        ctx.fillRect(player.x, player.y, 1, 1);
    }

    for (PlayerId in game.Players) {
        const player = game.Players[PlayerId]
        ctx.fillStyle = "black";
        ctx.fillRect(player.x, player.y, 1, 1);
    }
    
    //EWconsole.log(Event.key);

    requestAnimationFrame(Render);
}