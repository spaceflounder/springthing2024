import { sendTo, useNav } from "@infodom";

export default function() {

    useNav('w', 'Jungle', () => sendTo('WithToucan'))

    return `
    
# Write Love at the End

## A game by spaceflounder

### Spring Thing 2024 Edition

:::dropcap
I wasn't in the hospital anymore. It was hot and dark, and the ground
was damp and squishy. The stars were out, twinkling in a velvet sky.

There was a tight path through the trees just ahead.
:::
    
    `
}
