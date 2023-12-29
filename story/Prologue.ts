import { sendTo, useCommon, useNav } from "@infodom";


export default () => {

    useCommon({
        Hint: `There are no hints available here at the present.`,
        Talk: `You talk to yourself for a moment, and have a pleasant conversation`,
        Do: `That accomplishes nothing.`,
    });

    useNav('w', 'Deep Woods', () => {
        sendTo('InTheDeepWoods')
    });

    useNav('s', 'Village', () => {
        sendTo('InTheVillage')
    });

    useNav('a', 'Otter', () => {
        sendTo('WithBullworth')
    });

    useNav('d', 'Meadow', () => {
        sendTo('InTheMeadow')
    });

    return `

Stiff salty air blows in from the seashore, gently rustling the
tall grass and wildflowers clinging to the sandy soil. 
    
    `
}
