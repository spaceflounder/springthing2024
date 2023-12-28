import { contents } from "./contents.ts";
import { clearAllCommands, hookUseCommand } from "./Commands.ts";
import { refreshInputManager } from "./InputManager.ts";
import { refreshOutput } from "./OutputManager.ts";
import { useGame } from '@infodom';
import { Game } from '@game';


export function navigationSendTo(destination: keyof typeof contents) {
    const game = useGame();
    game.room = destination;
    refreshRoom();
}

export function getCurrentRoom() {
    const game = useGame();
    return game.room;
}

export function refreshRoom() {
    clearAllCommands();
    refreshOutput();
    refreshInputManager();
}


export function setLocationHookDefaults(callback: (g: Game) => (string | void)) {
    hookUseCommand('w', ``, callback);
    hookUseCommand('s', ``, callback);
    hookUseCommand('a', ``, callback);
    hookUseCommand('d', ``, callback);
}
