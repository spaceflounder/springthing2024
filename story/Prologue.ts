import { sendTo, useCommon, useNav } from "@infodom";


export default () => {

    useCommon({
        Hint: `There are no hints available here at the present.`,
        Talk: `You talk to yourself for a moment, and have a pleasant conversation`,
        Do: `That accomplishes nothing.`,
        'Pick Up':`There's nothing here to take.`,
    });

    useNav('w', () => {
        sendTo('InTheDeepWoods')
    });

    useNav('s', () => {
        sendTo('InTheVillage')
    });

    useNav('a', () => {
        sendTo('WithBullworth')
    });

    useNav('d', () => {
        sendTo('InTheMeadow')
    });

    return `

Stiff salty air blows in from the seashore, gently rustling the
tall grass and wildflowers clinging to the sandy soil. 
    
    `
}
