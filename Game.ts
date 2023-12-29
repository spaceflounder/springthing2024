import { Info } from "./Info.ts";
import { GameClass, GameClassInterface } from "./src/GameClass.ts";

export class Game extends GameClass implements GameClassInterface {

    room = Info.firstRoom;
    score = 0;
    maxScore = 100;
    playerName = 'Brogson';
    playerWeapon = 'a sword';

    quentin = 'a colorful toucan';
    theQuentin = 'the toucan';
    hasMetQuentin = false;

    telescope = false;

    bullworth = 'a big, stocky lion';
    theBullworth = 'the lion';
    bullWorthDesc = `The biggest, most muscular otter you've ever seen
    blocks the door before you can enter. He looks like he spends most
    of his time at the gym.`;
    hasMetBullworth = false;

    topic = '';

}
