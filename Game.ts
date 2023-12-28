import { Info } from "./Info.ts";
import { GameClass, GameClassInterface } from "./src/GameClass.ts";

export class Game extends GameClass implements GameClassInterface {

    room = Info.firstRoom;
    score = 0;
    maxScore = 100;
    playerName = 'Brogson';
    playerWeapon = 'a sword';

    abbot = 'the ruffian';
    abbotDesc = `A funny looking little ruffian with a 
    crusty beard sits at a nearby table. His clothes--neon plaids and
    sepia polka-dots--appear to be clashing on purpose.`

    bullworth = 'the otter';
    bullWorthDesc = `The biggest, most muscular otter you've ever seen
    blocks the door before you can enter. He looks like he spends most
    of his time at the gym.`
    bullworthOnGuard = true;

    meetAtForest = false;
    topic = '';

}
