import { contents } from "./contents.ts";
import { useGame } from "./GameManager.ts";
import { MarkPrint } from "./Mark.ts";
import { getCurrentRoom } from "./Navigation.ts";


let stateOutput = '';


export function clearOutput() {
    const inner = document.querySelector<HTMLDivElement>('#output-inner')!;
    const output = document.querySelector<HTMLDivElement>('#output-wrapper')!;
    output.innerHTML = '';
    const n = document.createElement('div');
    n.innerHTML = inner.innerHTML;
    n.id = 'output-inner';
    n.className = 'fadeout';
    output.append(n);
}


export function rebuildDisplay(content: string) {
    const output = document.querySelector<HTMLDivElement>('#output-wrapper')!;
    const n = document.createElement('div');
    output.innerHTML = '';
    n.innerHTML = content;
    n.id = 'output-inner';
    n.className = 'fadein';
    output.append(n);
}



export function refreshOutput() {
    const room = getCurrentRoom();
    clearOutput();
    let content = contents[room](useGame());
    if (stateOutput !== '') {
        content = stateOutput;
        stateOutput = '';
    }
    if (typeof content === 'string') {
        content = MarkPrint(content);
        rebuildDisplay(content);
    }
}


export function displayOutput(content: string) {
    clearOutput();
    if (stateOutput !== '') {
        content = stateOutput;
        stateOutput = '';
    }
    content = MarkPrint(content);
    setTimeout(() => {
        rebuildDisplay(content);
    }, 90);
}
