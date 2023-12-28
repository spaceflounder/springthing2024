import { useNav, useCommon, sendTo, useDo } from "@infodom";


const painting = () => {

    return `
    
A big weird painting sits on the wall. It depicts a piratical figure (perhaps
a gnome?) in a cave with a rather incredible hat. His sword and face make him
look rather fearsome.
:::image[captain.png]
    
    `
}


export default () => {

    useCommon({
        Hint: `There are no hints available here at the present.`,
        Talk: `You talk to yourself for a moment, and have a pleasant conversation`,
        Do: `Hey! Language!`,
        'Pick Up':`There's nothing here to take.`,
    });

    useNav('a', () => sendTo('AtTheCounter'));
    useNav('d', () => sendTo('InTheVillage'));
    useNav('w', () => sendTo('WithAbbot'));
    useNav('s', () => `You manage to find the brick wall with your face.`);

    useDo(`Painting`, painting);

    return `
    
Precious little light pours in through caked orange windows on a rough,
filthy timber floor. The air nearly sparkles with dust, and smells of
musty old leather stained by sour tea.
    
    `
}
