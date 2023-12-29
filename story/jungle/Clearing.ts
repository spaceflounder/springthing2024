import { sendTo, useNav } from "@infodom";


export default function() {

    useNav('s', 'Jungle', () => sendTo('WithToucan'));
    useNav('d', 'Boulder', () => sendTo('WithLion'));
    useNav('w', 'Ship', () => sendTo('WithToucan'));

    return `
    
The foliage thinned and opened to a wide low clearing. The trees around were
alive with the squeaks and squawks of a thousand animals at night. For
some reason, I wasn't afraid. I felt almost like I was one of them.
    
    `
}

