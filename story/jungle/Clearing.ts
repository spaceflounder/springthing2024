import { sendTo, useDo, useNav, useGame } from "@infodom";


const telescopeMsg = `

I scanned the night sky with the telescope. None of the stars looked
familiar. For some reason, I felt the need to get higher up.

`


export default function() {

    const g = useGame();

    useNav('s', 'Jungle', () => sendTo('WithToucan'));
    useNav('d', 'Boulder', () => sendTo('WithLion'));
    useNav('w', 'Ship', () => sendTo('WithToucan'));

    (g.telescope) && useDo('Telescope', () => telescopeMsg);

    return `
    
The foliage thinned and opened to a wide low clearing. The jungle around me
was alive with squeaks and squawk, the symphony of a thousand animals at night. For
some reason, I wasn't afraid. I felt like I was one of them.
    
    `
}

