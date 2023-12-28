import { Game } from "../../Game.ts";
import { sendTo, useCapture, useCommon, useContinue, useDo, useHint, useLocal, useMatrix, useMovementResponse, useTalk } from "@infodom";
import { caps } from "@infodom";


const me = (g: Game) => {

    useLocal();
    useContinue(questions);

    return `

"You're that new adventurer," says ${g.bullworth}. "I've got a few
questions for you."
    
    `
}


const him = (g: Game) => {

    g.bullworth = 'Bullworth';
    g.bullWorthDesc = `Bullworth is glaring at you, blocking the door.`;

    return `
    
"My name is Bullworth," says the otter with a tiny smirk.
:::aside
You might next talk about :kbd[me].
::: 
    `

}


const talk = (g: Game) => {

    useCapture('topic', () => useMatrix(g.topic, {
        me,
        him,
    }, () => `
        
"I don't know much about that," says the otter.
        
        `)
    );

    return `
    
${caps(g.bullworth)} regards you carefully.
:::aside
You might type :kbd[me], or :kbd[him].
:::
    
    `
}


const letMeIn = () => {

    useLocal();
    useDo(`Let me in`, () => sendTo('InTheTeaRoom'));

    return `
    
"Ok. Just don't cause any trouble while you're in Skuldearth." The otter
points at you with two long claws. "I'm watching you."
    
    `
}


const nextQuestion = (g: Game) => {

    useCapture('playerWeapon', letMeIn);

    return `

"${caps(g.playerName)}... I think I've heard of you. Do you carry a
weapon?
:::aside
Type your favorite weapon of choice. You might type :kbd[sword], :kbd[sharp stick],
or something really weird like :kbd[ice cream cone].
:::
    `
    
}


const questions = (g: Game) => {

    useCapture('playerName', nextQuestion);
        
    return `

"You can't come in here until you answer a couple of
questions," says ${g.bullworth}. "Who are you?"
:::aside
Type your name in the prompt.
:::
`

}


const leave = (g: Game) => {

    useLocal();
    useContinue(() => sendTo('InTheVillage'))

    return `
    
"And stay out!" shouts ${g.bullworth} as you walk away.
    
    `

}


export default (g: Game) => {
    
    useCommon({
        Hint: `There are no hints available here at the present.`,
        Talk: `You talk to yourself for a moment, and have a pleasant conversation`,
        Do: `That accomplishes nothing.`,
        'Pick Up':`There's nothing here to take.`,
    });

    useHint(() => `
    
${caps(g.bullworth)} is blocking the way, maybe you
should talk to him.
    
    `);

    useMovementResponse(leave);

    useTalk(g => talk(g));

    useDo(`Enter`, questions);

    return g.bullWorthDesc;

}
