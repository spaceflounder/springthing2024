import { getCurrentRoom } from "./Navigation.ts";
import { contents } from "./contents.ts";
import { useGame } from "./GameManager.ts";
import { hookUseCommand } from "./Commands.ts";


type responseMatrixType = {
    'Hint': string,
    'Do': string,
    'Talk': string,
}


export const BuildCommonResponses = (r: responseMatrixType) => {

    const verbs: [string, keyof responseMatrixType][] = [
        ['!', 'Hint'],
        ['1', 'Do'],
        ['2', 'Talk'],
    ];

    for (const verb of verbs) {
        const [key, preview] = verb;
        if (preview) {
            hookUseCommand(key, preview, () => r[preview]);
        }
    }

    hookUseCommand('@', `About`, () => `About this game`);
    hookUseCommand('#', `Score`, () => `You have no points.`);
    hookUseCommand('3', `Look`, () => {
        const room = getCurrentRoom();
        return contents[room](useGame());
    });


}
