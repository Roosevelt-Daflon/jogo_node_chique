export default function CreateKeyboardListener(document)
{

    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId)
    {
        state.playerId = playerId
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
            type: 'move-player',
            playerId: state.playerId,
            keyPressed
        }

        notifyaAll(command)
    }

    return {
        subscribe,
        registerPlayerId
    }

}