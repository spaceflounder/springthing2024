import { useGame } from "@infodom";
import { Game } from "../Game.ts";
import { contents } from "./contents.ts";
import { getCurrentRoom } from "./Navigation.ts";
import { displayOutput } from "./OutputManager.ts";
import { refreshInputManager } from "./InputManager.ts";


type captureCallbackType = (game: Game) => (string | void);

let captureModeEnabled = false;
let captureResponseCallback: captureCallbackType = () => {};
let inputCapturesKey: keyof Game;


function cleanToken(t: string) {
    const a = t.replace(/\s/g, "");
    const b = a.trim();
    const c = b.toLocaleLowerCase();
    return c;
}


export function compareTokens(a: string, b: string) {
    const s1 = cleanToken(a);
    const s2 = cleanToken(b);
    return s1 === s2;
}


export function handleInputCapture(input: string) {

    const game = useGame();
    const room = game.room;
    /// @ts-ignore shut up typescript
    game[inputCapturesKey] = input;
    if (!game.hasSaid[room]) {
        game.hasSaid[room] = [];
    }
    game.hasSaid[room].push(cleanToken(input));
    captureModeEnabled = false;
    const content = captureResponseCallback(useGame());
    if (content) {
        displayOutput(content);
    }
    refreshInputManager();

}


export function enableCaptureMode(captureTo: keyof Game, callback: captureCallbackType) {
    captureModeEnabled = true;
    inputCapturesKey = captureTo;
    captureResponseCallback = callback;
}


export function disableCaptureMode() {
    captureModeEnabled = false;
    captureResponseCallback = () => {};
}


export function isCaptureModeEnabled() {
    return captureModeEnabled;
}


export function hasSaid(topic: string, room?: keyof typeof contents) {

    const game = useGame();
    if (!room) {
        room = getCurrentRoom();
    }
    if (game.hasSaid[room]) {
        return game.hasSaid[room].filter((f: string) => cleanToken(f) === cleanToken(topic)).length > 1;
    }
    return false;

}
