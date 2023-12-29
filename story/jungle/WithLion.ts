import { caps, sendTo, shuffle, useCapture, useMatrix, useNav, useTalk } from "@infodom";
import { useGame } from "../../src/GameManager.ts";


const notMet = () => {

    const g = useGame();
    g.bullworth = 'Bullworth';
    g.theBullworth = 'Bullworth';

    return `

"Who are you?" I asked. "I've never met a talking toucan before."

"Well, this is a special place," said the toucan. "My name is Quentin."

"I'm Bryan," I said. I'd noticed for the first time that my clothes were
the same as I was wearing in bed.

:::aside
You might ask next about the :kbd[hospital], or the :kbd[jungle]. During a
conversation you can discuss topics in any order, or discuss previous topics
to see the dialogue again.
:::
    
    `

}


const hasMet = () => {


    return `
    
"I'm Bullworth, the lion. Clearly I didn't make an impression the first time."
    
    `
}


const lion = () => {

    const g = useGame();
    if (g.bullworth !== 'Bullworth') {
        return notMet();
    } else {
        return hasMet();
    }

}



const talk = () => {

    const g = useGame();

    useCapture('topic', () => useMatrix(g.topic, {
        lion,
        jungle,
        hospital,
        mom,
    }, () => `
        
"That I don't know, little one," said ${g.theBullworth}.
        
`
    ));

    const response = shuffle([
        `${caps(g.theBullworth)} turned his head and yawned`,
        `${caps(g.theBullworth)} flipped his tail playfully`,
        `${caps(g.theBullworth)} stared at me with a goofy smirk`,
    ]);

    return `
    
${response[0]}.

:::aside
You might type :kbd[lion], or :kbd[jungle].
:::
    
    `
}

export default function() {

    const g = useGame();

    useTalk(talk);
    useNav('a', 'Clearing', () => sendTo('Clearing'));

    const suffix = shuffle([
        `playing with a grasshopper`,
        `half asleep`,
        `blinking cheerfully`,
    ]);

    return `
    
Under the shadow of a big boulder sat ${g.bullworth}, ${suffix[0]}.
    
    `
}
