import { Info } from "../Info.ts";
import { useDo, useLocal } from "@infodom";
import { detectMobile } from "./DetectMobile.ts";
import { refreshOutput } from "./OutputManager.ts";
import { refreshInputManager } from "./InputManager.ts";

const ranks = [
    'Collector with no sense of self-preservation',
    'Above-average Slacker',
    'Misanthropic Caver',
    'Misguided Scholar',
    'Expert Treasure-getter',
    'Expert Treasure-getter',
];

function getScoreMsg() {

    const rankingNumber = Info.score / Info.maxPossibleScore;

    const rank = ranks[Math.floor(rankingNumber)] ?? ranks[5];

    return `
    
You've earned ${Info.score} out of ${Info.maxPossibleScore}, giving you the title:

#### ${rank}.
    
    `;
}


function desktopMsg() {
    return `Press the :kbd[c] button to undo and try again. `;
}



function mobileMsg() {
    return `Press the Whoops button to undo and try again. `;
}


export function youAreDead(content: string, epitaph: string) {

    const scoreMsg = getScoreMsg();

    const buttonMsg = (detectMobile()) ? mobileMsg() : desktopMsg();

    useLocal();

    useDo(`Whoops`, () => {
        refreshOutput();
        refreshInputManager();
    })

    return `
    
${content}

## ${epitaph}

${scoreMsg}

${buttonMsg}
    
    `
}
