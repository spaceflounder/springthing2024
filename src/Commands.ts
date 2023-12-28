import { Game } from "../Game.ts";
import { useGame } from "./GameManager.ts";
import { CommandType } from "./types/CommandType.ts";

let returnLocalCommandsOnly = false;
let localCommands: string[] = [];
let restrictedCommands: string[] = [];
let commands: CommandType[] = [];

export function getCommandList() {
    if (returnLocalCommandsOnly) {
        return commands.filter(c => localCommands.indexOf(c.id) > -1);
    }
    if (restrictedCommands.length === 0) {
        return commands;
    } else {
        return commands.filter(c => restrictedCommands.indexOf(c.id) > -1);
    }
}


export function clearAllCommands() {
    commands = [];
    restrictedCommands = [];
}


function addLocalCommand(id: string) {
    localCommands.push(id);
}


export function hookUseProceed(
    id: string,
    callback: () => void | string
) {
    const c = {
        id,
        preview: '',
        callback,
        options: {
            check: true
        },
    }
    addLocalCommand(id);
    commands = commands.filter(x => x.id !== c.id);
    commands = [...commands, c];
    /*
<span class="material-symbols-rounded">
check_circle
</span>
    */
}


export function hookUseCommand(
    id: string,
    preview: string,
    callback: (game: Game) => void | string
) {
    const c = {
        id,
        preview,
        callback: () => {
            const game = useGame();
            returnLocalCommandsOnly = false;
            return callback(game);
        }
    }
    addLocalCommand(id);
    commands = commands.filter(x => x.id !== c.id);
    commands = [...commands, c];
}


export function hookUseLocal() {
    returnLocalCommandsOnly = true;
    localCommands = [];
}

