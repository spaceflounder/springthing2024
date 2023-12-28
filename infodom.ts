import { Game } from "@game";
import { BuildCommonResponses } from "./src/CommonResponses.ts";
import { hookUseCommand } from "./src/Commands.ts";
export { hookUseLocal as useLocal } from "./src/Commands.ts";

export { 
    refreshRoom as useRefresh,
    navigationSendTo as sendTo,
    setLocationHookDefaults as useMovementResponse,
} from './src/Navigation.ts';

export { hookForMatrix as useMatrix } from './src/InputManager.ts';

export { BuildCommonResponses as useCommon };

export { useGame } from './src/GameManager.ts';

export { youAreDead } from './src/GameOver.ts';

export { 
    compareTokens,
    hasSaid,
    enableCaptureMode as useCapture
} from './src/Parser.ts';

export function useNav(direction: string, callback: (g: Game) => string | void) {
    hookUseCommand(direction, '', callback);
}


export function useDo(preview: string, callback: (g: Game) => string | void) {
    hookUseCommand('1', preview, callback);
}


export function useTalk(callback: (g: Game) => string | void) {
    hookUseCommand('2', '', callback);
}


export function usePickUp(callback: (g: Game) => string | void) {
    hookUseCommand('3', '', callback);
}


export function useNo(callback: (g: Game) => string | void) {
    hookUseCommand('1', 'No', callback);
}


export function useYes(callback: (g: Game) => string | void) {
    hookUseCommand('3', 'Yes', callback);
}


export function useHint(callback: (g: Game) => string | void) {
    hookUseCommand('!', '', callback);
}


export function useContinue(callback: (g: Game) => string | void) {
    hookUseCommand('1', 'Continue', callback);
}

export function caps(s: string) {
    if (s.length > 1) {
        const firstLetter = s[0];
        return firstLetter.toLocaleUpperCase() + s.substring(1);
    }
    return s;
}

