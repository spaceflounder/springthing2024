import { useCommon } from "../../infodom.ts";
import { Game } from "../../Game.ts";


export default (g: Game) => {

    useCommon({
        Hint: `There are no hints available here at the present.`,
        Talk: `You talk to yourself for a moment, and have a pleasant conversation`,
        Do: `That accomplishes nothing.`,
        'Pick Up':`There's nothing here to take.`,
    });

    return `
    
At the spire.
    
    `
}
