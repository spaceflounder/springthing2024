import { useDo, usePickUp, useTalk, useLocal, useMatrix, useCapture, useCommon, sendTo, useMovementResponse, useNo, useYes, useNav } from "@infodom";
import { Game } from "../../Game.ts";


const receiveTea = (g: Game) => `

Hot golden-brown liquid gold pours into a steaming mug, and the teamaster
hands it to you.

`


const tea = (g: Game) => {

    useLocal();
    useNo(() => `"Suit yourself."`);
    useYes(receiveTea);

    return `

"Care for a cup?"
    
    `
}


const painting = () => {

    return `

"Creepy, huh?" says the teamaster. "The big pirate is some kind of local folk 
hero, but I don't know enough about the history to tell you anything."
    
    `
}


const cave = () => {

    return `

"We don't talk about that," hushes the teamaster. "Don't bring it up."

    `
}


const me = (g: Game) => {

    useLocal();
    useNo(() => `"Suit yourself."`);
    useYes(receiveTea);

    return `

"Pleased to meet you, ${g.playerName}," says the teamaster. "Care for a cup?"
    
    `
}


const Talk = (g: Game) => {

    useCapture('topic', () => useMatrix(g.topic, {
        tea,
        painting,
        cave,
        me
    }, () => `
    
"Can't say too much on that subject," said the teamaster.
    
    `));

    return `
    
The teamaster looks at you attentively.
:::aside
You might discuss :kbd[tea], or the :kbd[painting], or :kbd[me].
:::
    
    `
}


export default (g: Game) => {

    useTalk(Talk);
    useNav('d', () => sendTo('InTheTeaRoom'));

    return `
    
The teamaster stands behind a long expanse of well-polished oak. She appears to
be around 40 or 50--her precise age is hard to guess--clad in grubby overalls
and sporting a very pointy earth-tone hat. Her ample ceramic kettle resembles
a huge white owl head, also with a pointy earth-tone hat. She deftly pours into
steaming mugs from a couple of feet in the air, without losing a drop.
    
    `
}
