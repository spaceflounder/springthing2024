import { useGame } from "../../src/GameManager.ts";
import { useCapture, useTalk, useMatrix, caps, sendTo, useNav, shuffle, useTopics, hasSaid, setTopics } from "@infodom";


const notMetToucan = () => {

    const g = useGame();
    g.quentin = 'Quentin';
    g.theQuentin = 'Quentin';

    setTopics(['hospital', 'jungle'])

    return `

"Who are you?" I asked. "I've never met a talking toucan before."

"Well, this is a special place," said the toucan. "My name is Quentin."

"I'm Bryan," I said. I'd noticed for the first time that my clothes were
the same as I was wearing in bed.

:::aside
You might ask next about the :kbd[hospital], or the :kbd[jungle]. During a
conversation you can discuss topics in any order, or discuss previous topics
to see the dialogue again.

Hit :kbd[2] on the keyboard to continue the conversation, or tap the :icon[chat]
button on touch screen.
:::
    
    `

}


const metToucan = () => {

    setTopics(['hospital', 'jungle']);

    return `
    
"I'm Quentin, remember?" said the toucan. "My, little boys are so
forgetful."
    
    `
}


const toucan = () => {

    const g = useGame();
    if (g.quentin !== 'Quentin') {
        return notMetToucan();
    } else {
        return metToucan();
    }

}


const jungle = () => {

    const g = useGame();
    setTopics(['mom']);

    return `

"What is this place?" I asked.
    
${caps(g.theQuentin)} smoothed his feathers. "This is my home, of course.
I can tell you're far from yours. How did you get here?"

"I have no idea," I said. "Just a minute ago I was in this really big
hospital."

`

}


const hospital = () => {

    const g = useGame();
    setTopics(['mom']);


    return `

"Am I far from the hospital?" I asked.
    
"Where is that?" asked ${g.theQuentin}. "Never heard of it."

:::aside
You might type :kbd[mom] next.
:::
`

}


const mom = () => {

    const g = useGame();

    return `

"Do you know where my mom is?" I asked.
    
"She's probably at wherever you're from," said ${g.theQuentin}. "But don't
fret. Mothers are never lost for long. Perhaps you should go find Madeline
and ask her? She's a mother herself.

`

}


const talk = () => {

    const g = useGame();

    useCapture('topic', () => useMatrix(g.topic, {
        toucan,
        jungle,
        hospital,
        mom,
    }, () => `
        
"Don't know much about that, my human friend," said ${g.theQuentin}.
        
`
    ));

    if (g.quentin !== 'Quentin') {
        g.commonTopics.push('toucan');
    }

    const topics = useTopics();

    const response = shuffle([
        `${caps(g.theQuentin)} gave me a cheerful squawk`,
        `${caps(g.theQuentin)} looked at me, as though expecting something`,
        `${caps(g.theQuentin)} stared at me eagerly`,
    ]);

    return `
    
${response[0]}.

${topics}
    
    `
}


export default function() {

    const g = useGame();

    useNav('w', 'Clearing', () => sendTo('Clearing'));

    if (!hasSaid('toucan')) {
        setTopics(['jungle'])
    }

    useTalk(talk);

    const firstTime = (!g.hasMetQuentin) ? `
    
The toucan peered at me with one big, inquisitive eye. "Hello! Welcome!
You must have just arrived here!"

:::aside

Hey! Hit :kbd[2] on the keyboard to begin a conversation, or tap the :chaticon
button on touch screen. Anytime you want to say something, you must
hit this button first.

:::
    
    ` : ''

    g.hasMetQuentin = true;
    return `
    
Dense old growth climbed to a high leafy ceiling, through which I could
make out just a glimmer of the moon. Perched on a low branch
was ${g.quentin}, polishing his beak with long, soft feathers.

${firstTime}
    
    `
}
