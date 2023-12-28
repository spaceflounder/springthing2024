import { getCurrentRoom } from "./Navigation.ts";
import { contents } from "./contents.ts";
import { useGame } from "./GameManager.ts";
import { hookUseCommand } from "./Commands.ts";


type responseMatrixType = {
    'Hint': string,
    'Do': string,
    'Talk': string,
    'Pick Up': string,
}


export const BuildCommonResponses = (r: responseMatrixType) => {

    const verbs: [string, keyof responseMatrixType][] = [
        ['!', 'Hint'],
        ['1', 'Do'],
        ['2', 'Talk'],
        ['3', 'Pick Up'],
    ];

    for (const verb of verbs) {
        const [key, preview] = verb;
        if (key !== '1') {
            hookUseCommand(key, '', () => r[preview]);
        } else {
            hookUseCommand(key, preview, () => r[preview]);
        }
    }

    hookUseCommand('@', `About`, () => `About this game`);
    hookUseCommand('#', `Score`, () => `You have no points.`);
    hookUseCommand('4', ``, () => {
        const room = getCurrentRoom();
        return contents[room](useGame());
    });


}
