import { sendTo, useContinue, useHint } from "@infodom";


const helpResponse = () => `
*Write Love at the End* is a text-based game played with hotkeys.
If you're playing with
a keyboard, you can control the story flow by typing keys as displayed
on the input bar below. If you are using a mouse or touch screen, you can
tap or click commands on the bar. Each command moves the story forward
by a few sentences. For example, by holding the shift key, you can see
a command button appear with a :kbd[!] in the upper right corner. Pressing
the :kbd[!] key will show this help text.

Sooner or later, you'll enter into a conversation with one the game's
characters. Usually, if you want to say something, you'll have to hit the 
:kbd[2] key, which will appear on the input bar below.

You can then select topics to move the conversation forward by
typing them in. The characters don't live in the real world, so
they only understand the context of the game's story. Don't fret; the game
will suggest all the information you need to carry on conversations and
complete the game. It may be a good idea to try a variety of conversation
topics with different characters.

To begin the game, :kbd[1] key or click it on the input bar.

`;


export default function() {

    useContinue(() => sendTo('Title'));
    useHint(helpResponse);

    return `

:::dropcap
Welcome to the jungle! If this is your first time playing, type :kbd[!] or click
the Help button to get an idea how to play. This text-based game is very
different from others you may have played, so this may be good idea!

Otherwise, hit the :kbd[1] key to venture into the unknown...
:::    
    
    `;
}
