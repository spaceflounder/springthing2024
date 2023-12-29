import { useGame } from "./GameManager.ts";

export function hookApplyTopics(tops: string[]) {
    const g = useGame();
    g.commonTopics = tops;
}

export function hookTopics() {

    const g = useGame();
    let topics = g.commonTopics;
    topics = topics.filter(x => x);

    if (topics.length === 0) {
        return ``;
    }

    if (topics.length === 1) {
        return `

:::aside
You might type :kbd[${topics[0]}].
:::
        
        `
    }

    if (topics.length === 2) {
        return `
        
:::aside
You might type :kbd[${topics[0]}] or :kbd[${topics[1]}].
:::       
        
        `
    }

    if (topics.length > 2) {
        const lastTopic = topics.pop();
        return `
        
:::aside
You might type ${topics.map(t => `:kbd[${t}],`).join('')} or :kbd[${lastTopic}].
:::       
        
        `
    }

}
