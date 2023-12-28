import { caps, useDo, useCapture, useMatrix, useLocal, useRefresh, useCommon, useContinue, useTalk, usePickUp, useHint, sendTo, useNav } from "@infodom";
import { hasSaid } from "../../src/Parser.ts";
import { Game } from "../../Game.ts";


const painting = () => !hasSaid('painting') ? `

"Well, I can tell ye that it's of a famous buccaneer. Cap'n
Oglethorpe Waddles be his name. Some say he was a man, some say he was a 
piratical gnome, but the strangest tales say he were a huge and terrible
turtle of horrific strength."

His voice lowers. "His flag
wasn't a skull and crossbones--no sir. It was a fish with a fancy gentleman's
moustache. They say that when the moustache fish comes fer ye, yer time is
up.

"Not far from here is the old cave where they say he hid twenty treasures,
guarded by the traps of the most wicked invention." 

:::aside
You might ask next about the :kbd[cave].
:::

` : `

"Aye, yer still curious about that painting. Can't say I blame ye.
It's of a famous buccaneer. Cap'n
Oglethorpe Waddles be his name. Some say he was a man, some say he was a 
piratical gnome, but the strangest tales say he were a huge and terrible
turtle of horrific strength."

His voice lowers. "His flag
wasn't a skull and crossbones--no sir. It was a fish with a fancy gentleman's
moustache. They say that when the moustache fish comes fer ye, yer time is
up.

"Not far from here is the old cave where they say he hid twenty treasures,
guarded by the traps of the most wicked invention." 

:::aside
You might ask next about the :kbd[cave].
:::


`


const cave = (g: Game) => {

    g.meetAtForest = true;
    useLocal();
    useContinue(() => useRefresh());

    return `
    
${caps(g.abbot)} claps his hands. "Ah! The cave!" His eyes twinkle. "If yer
interested--and I'm sure ye are--I can lead ye there. We'll discuss my price
after yer rich." He chuckles. "Meet me in the forest by the ocean, just
outside our vil'age here."

With that, he trudges out the door.
    
`

}


const me = (g: Game) => {

    g.abbot = 'Abbot';
    g.abbotDesc = `
    
Abbot sits here alone at his table, nursing a stale beer.
    
    `

    return `
    
"Please to meet ye, ${g.playerName}. 'Round these parts, they calls
me ${g.abbot}. I've heard of ye. Yer that new adventurer they say has
come hunt fer lost gold in *the cave*.

:::aside
You might ask next about the :kbd[cave].
:::
    
    `
}


const talk = (g: Game) => {

    useCapture('topic', () => useMatrix(g.topic, {
        me,
        painting,
        cave,
    }, () => `
        
"Don't know much about that, mate," says ${g.abbot}.
        
`
    ));
    return `
    
${caps(g.abbot)} favors you with a quiet nod.

:::aside
You might type :kbd[me], :kbd[painting].
:::
    
    `
}


const normal = (g: Game) => {
    
    useCommon({
        Hint: `There are no hints available here at the present.`,
        Talk: `You talk to yourself for a moment, and have a pleasant conversation`,
        Do: `That accomplishes nothing.`,
        'Pick Up':`There's nothing here to take.`,
    });


    useHint(() => `
    
${caps(g.abbot)} knows a ton of stuff, just ask him.
    
    `);

    useTalk(talk);


    useDo(`Sit`, () => `
    
${caps(g.abbot)} gives you another bleak nod, then a shrug.
            
    `);


    usePickUp(() => `
    
"Hands off me tea," says ${g.abbot}.
        
    `);

    return g.abbotDesc;

}


const abbotGone = (g: Game) => {

    useCommon({
        Hint: `There are no hints available here at the present.`,
        Talk: `You talk to yourself for a moment, and have a pleasant conversation`,
        Do: `That accomplishes nothing.`,
        'Pick Up':`There's nothing here to take.`,
    });

    return `
    
${caps(g.abbot)}'s table is empty.
    
    `
}


export default (g: Game) => {

    useNav('s', () => sendTo('InTheTeaRoom'));

    return (g.meetAtForest) ? abbotGone(g) : normal(g);

}
