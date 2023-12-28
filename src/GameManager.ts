import { Game } from "../Game.ts";

let game = new Game();


export function resetGame() {
    game = new Game();
}

export function useGame() {
    return game;
}

