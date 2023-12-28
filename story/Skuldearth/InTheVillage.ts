import { sendTo, useCommon, useDo, useNav } from "@infodom";


const sign = () => `

A heavy weathered sign atop the post reads:

:::center
Village of Skuldearth
:::

:::center
Go away, we're out of treasure
:::

`


export default () => {

    useCommon({
        Hint: `There are no hints available here at the present.`,
        Talk: `You talk to yourself for a moment, and have a pleasant conversation`,
        Do: `That accomplishes nothing.`,
        'Pick Up':`There's nothing here to take.`,
    });

    useNav('w', () => {
        sendTo('Prologue')
    });


    useNav('a', g => {

        if (g.bullworthOnGuard) {
            sendTo('WithBullworth');
        } else {
            sendTo('InTheTeaRoom');
        }

    });

    useNav('d', () => { sendTo('AtTheSpire') });

    useDo('Read Sign', sign);

    return `

A quiet cluster of shambled buildings forms a tiny village at the edge
of the forest. At more-or-less the center of town is a tall white
signpost.

    `;
}
