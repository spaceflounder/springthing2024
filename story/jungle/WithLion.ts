import { caps, sendTo, setTopics, shuffle, useCapture, useDo, useMatrix, useNav, useRefresh, useTalk, useTopics } from "@infodom";
import { useGame } from "../../src/GameManager.ts";


const notMet = () => {

    const g = useGame();
    g.bullworth = 'Bullworth';
    g.theBullworth = 'Bullworth';

    setTopics(['mom', 'jungle']);

    return `

"I'm Bryan," I said. "Pleased to meet you, Mr. Lion."

"You can call me Bullworth," said the lion. "Pleased to meet you, too.
Your mother taught you good manners."

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


const telescope = () => {

    const g = useGame();

    return `

"I found this telescope--" I started.
    
"That's for you," ${g.theBullworth} interjected. "You may keep it."

"Thank you," I said.

`

}


const jungle = () => {

    const g = useGame();
    setTopics(['mom']);

    return `

"What is this place?" I asked.
    
${caps(g.theBullworth)} waved his paws in the air. "The jungle, of course.
What'd you think it was, a barbershop?"

`

}


const hospital = () => {

    const g = useGame();
    setTopics(['mom', 'jungle']);


    return `

"Do you know how I can get back to the hospital?" I asked.

"I don't even know what that is," said ${g.theBullworth}. 

`

}


const mom = () => {

    const g = useGame();

    return `

"Do you know where my mom is?" I asked.
    
"Sorry, little one," said ${g.theBullworth}. "But if she's anything like
you, she's out looking for you too."

`

}



const talk = () => {

    const g = useGame();

    useCapture('topic', () => useMatrix(g.topic, {
        lion,
        jungle,
        hospital,
        telescope,
        mom,
    }, () => `
        
"That I don't know, little one," said ${g.theBullworth}.
        
`
    ));

    if (g.theBullworth !== 'Bullworth') {
        g.commonTopics.push('lion');
    }

    const topics = useTopics();

    const response = shuffle([
        `${caps(g.theBullworth)} turned his head and yawned`,
        `${caps(g.theBullworth)} flipped his tail playfully`,
        `${caps(g.theBullworth)} stared at me with a goofy smirk`,
    ]);

    return `
    
${response[0]}.

${topics}
    
    `
}


const telescopeMsg = `

Buried in the mud was a glint of dirty brass. I rubbed away the
dirt and unearthed an old telescope as a prize.

:::aside
You are now carrying the telescope.
:::

`

export default function() {

    const g = useGame();

    if (!g.telescope) {
        useDo('Telescope', () => {
            g.telescope = true;
            useRefresh();
            return telescopeMsg;
        });
    }

    useTalk(talk);
    useNav('a', 'Clearing', () => sendTo('Clearing'));

    const firstTime = (g.theBullworth !== 'Bullworth') ? `
    
"Greetings, little one," said ${g.theBullworth}. "You look a bit lost."
    
    ` : '';

    const suffix = shuffle([
        `playing with a grasshopper`,
        `half asleep`,
        `blinking cheerfully`,
    ]);

    return `
    
Under the shadow of a big boulder sat ${g.bullworth}, ${suffix[0]}.
    
${firstTime}

    `
}
