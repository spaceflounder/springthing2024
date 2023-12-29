import { contents } from "./contents.ts";




export interface GameClassInterface {

    maxScore: number;
    room: keyof typeof contents;

}


export class GameClass {

    score = 0;
    // deno-lint-ignore no-explicit-any
    hasSaid: any = {}
    commonTopics: string[] = [];

}

