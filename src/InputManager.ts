import { Game } from "../Game.ts";
import { getCommandList } from "./Commands.ts";
import { detectMobile } from "./DetectMobile.ts";
import { useGame } from "./GameManager.ts";
import { MarkPrint } from "./Mark.ts";
import { displayOutput } from "./OutputManager.ts";
import { handleInputCapture, isCaptureModeEnabled } from "./Parser.ts";
import { CommandType } from "./types/CommandType.ts";


let permitInput = true;


const alternate: { [key: string]: string } = {
    '1': '<span class="material-symbols-rounded">check</span>',
    '2': '<span class="material-symbols-rounded">back_hand</span>',
}


const graphic: { [key: string]: string } = {
    'w': '<span class="material-symbols-rounded">arrow_upward_alt</span>',
    's': '<span class="material-symbols-rounded">arrow_downward_alt</span>',
    'a': '<span class="material-symbols-rounded">arrow_left_alt</span>',
    'd': '<span class="material-symbols-rounded">arrow_right_alt</span>',
    '1': '<span class="material-symbols-rounded">back_hand</span>',
    '2': '<span class="material-symbols-rounded">chat</span>',
    '3': '<span class="material-symbols-rounded">search</span>',
    '4': '<span class="material-symbols-rounded">visibility</span>',
    '5': '<span class="material-symbols-rounded">chat</span>',
    '6': '<span class="material-symbols-rounded">chat</span>',
    '7': '<span class="material-symbols-rounded">chat</span>',
    '8': '<span class="material-symbols-rounded">chat</span>',
    '9': '<span class="material-symbols-rounded">chat</span>',
    'z': `<span class="material-symbols-rounded">check_circle</span>`,
    'c': `<span class="material-symbols-rounded">keyboard_return</span>`,
    '!': `<span class="material-symbols-rounded">info</span>`,
    '@': `<span class="material-symbols-rounded">auto_stories</span>`,
    '#': `<span class="material-symbols-rounded">trophy</span>`,
    'q': '<span class="material-symbols-rounded">back_hand</span>',
    'e': '<span class="material-symbols-rounded">autorenew</span>',
    'x': '<span class="material-symbols-rounded">search</span>'
};


function isMetaCommand(c: CommandType) {
    const ids = '!@#$%^&*';
    return (ids.indexOf(c.id) > -1);
}


function isMovementCommand(c: CommandType) {
    const ids = 'wsad';
    return (ids.indexOf(c.id) > -1);
}


function isActionCommand(c: CommandType) {
    const ids = 'qezxc';
    return (ids.indexOf(c.id) > -1);
}


function isVerbalCommand(c: CommandType) {
    const ids = '1234567890';
    return (ids.indexOf(c.id) > -1);
}


function isInTopRow(c: CommandType) {
    const k = c.id;
    const keys = '!@#';
    return (keys.indexOf(k) > -1);
}


function isInSecondTopRow(c: CommandType) {
    const k = c.id;
    const keys = '1234567890';
    return (keys.indexOf(k) > -1);
}


function isInUpperRow(c: CommandType) {
    const k = c.id;
    const keys = 'qwe';
    return (keys.indexOf(k) > -1);
}


function isInMiddleRow(c: CommandType) {
    const k = c.id;
    const keys = 'asd';
    return (keys.indexOf(k) > -1);
}


function isInBottomRow(c: CommandType) {
    const k = c.id;
    const keys = 'zxc';
    return (keys.indexOf(k) > -1);
}


export function hookForMatrix(key: string, 
    matrix: {[key: string]: (game: Game) => string | void},
    fallback: (game: Game) => (string | void)) {
        const keys = Object.keys(matrix);
        if (keys.indexOf(key) === -1) {
            const f = fallback(useGame());
            if (f) {
                return f;
            }
        } else {
            return matrix[key](useGame());
        }
}


function createCommandKeyIcons(c: CommandType) {
    const element = document.createElement('div');
    const inner = document.createElement('div');
    const k = c.id;
    const second = document.createElement('div');
    const first = document.createElement('div');
    second.className = 'command-key';
    first.className = 'command-key';
    if (c.preview === 'Continue' || c.preview === 'Cancel') {
        second.innerHTML = alternate[k];
    } else {
        second.innerHTML = graphic[k];
    }
    first.innerHTML = `${k}`;
    inner.className = 'inner-key-wrapper';
    inner.append(second);
    inner.append(first);
    element.className = 'command-key-wrapper';
    element.append(inner);
    return element;
}


function createMobileCommandKeyIcons(c: CommandType) {
    const element = document.createElement('div');
    const inner = document.createElement('div');
    const only = document.createElement('div');
    only.className = 'command-key';
    only.innerHTML = graphic[c.id];
    inner.className = 'inner-key-wrapper';
    inner.append(only);
    element.className = 'command-key-wrapper';
    element.append(inner);
    return element;
}



function createCommandPreview(p: string) {
    const element = document.createElement('div');
    element.className = 'command-preview';
    element.innerHTML = MarkPrint(p);
    return element;
}


function createMobileCommandPreview(p: string) {
    const element = document.createElement('div');
    element.className = 'mobile-command-preview';
    element.innerHTML = MarkPrint(p);
    return element;
}


function createDesktopButton(c: CommandType) {
    const element = document.createElement('button');
    if (isMetaCommand(c)) {
        element.className = 'desktop-command-wrapper meta';
    }
    if (isActionCommand(c)) {
        element.className = 'desktop-command-wrapper action';
    }
    if (isMovementCommand(c)) {
        element.className = 'desktop-command-wrapper movement';
    }
    if (isVerbalCommand(c)) {
        element.className = 'desktop-command-wrapper verbal';
    }
    const k = createCommandKeyIcons(c);
    element.onclick = () => executeCommand(c);
    element.append(k);
    if (c.preview !== '') {
        const p = createCommandPreview(c.preview);
        element.append(p);    
    }
    return element;
}


function createMobileButton(c: CommandType) {
    const element = document.createElement('button');
    if (isMetaCommand(c)) {
        element.className = 'mobile-command-wrapper meta';
    }
    if (isActionCommand(c)) {
        element.className = 'mobile-command-wrapper action';
    }
    if (isMovementCommand(c)) {
        element.className = 'mobile-command-wrapper movement';
    }
    if (isVerbalCommand(c)) {
        element.className = 'mobile-command-wrapper verbal';
    }
    const k = createMobileCommandKeyIcons(c);
    element.onclick = () => executeCommand(c);
    element.append(k);
    if (c.preview !== '') {
        const p = createMobileCommandPreview(c.preview);
        element.append(p);    
    }
    return element;
}


function createCommandButton(c: CommandType) {
    if (detectMobile()) {
        return createMobileButton(c);
    } else {
        return createDesktopButton(c);
    }
}


function executeCommand(c: CommandType) {

    permitInput = false;
    const content = c.callback();
    if (content) {
        displayOutput(content);
    }
    refreshInputManager();
    permitInput = true;
    
}


function sortByKeyOrder(a: CommandType, b: CommandType) {
    const order = `!@#$1234567890qweasdzxc`;
    return order.indexOf(a.id) - order.indexOf(b.id);
}


function handleTopRow(commands: CommandType[], shift: boolean, top: HTMLDivElement, second: HTMLDivElement) {
    const containsInfoButton = () => {
        let infoButton = false;
        let oneButton = false;
        for (const c of commands) {
            if (c.id === '!') {
                infoButton = true;
            }
            if (c.id === '1') {
                oneButton = true;
            }
        }
        if (infoButton === true && oneButton === false) {
            return true;
        }
        return false;
    }
    if (containsInfoButton()) {
        commands.filter(isInTopRow).
            sort(sortByKeyOrder).
            map(c => top.appendChild(createCommandButton(c)));
    } else {
        if (shift) {
            commands.filter(isInTopRow).
            sort(sortByKeyOrder).
            map(c => top.appendChild(createCommandButton(c)));    
        } else {
            commands.filter(isInSecondTopRow).
            sort(sortByKeyOrder).
            map(c => second.appendChild(createCommandButton(c)));    
        }
    }
}


function standardControlPad(shift: boolean) {
    const commands = getCommandList();
    const element = document.
        querySelector<HTMLDivElement>('#input-manager-wrapper')!;
    const leftSide = document.createElement('div');
    const rightSide = document.createElement('div');
    const topRow = document.createElement('div');
    const topSecondRow = document.createElement('div');
    const upperRow = document.createElement('div');
    const middleRow = document.createElement('div');
    const lowerRow = document.createElement('div');
    leftSide.className = 'control-side-container';
    rightSide.className = 'control-side-container';
    topRow.className = 'input-manager-row';
    topSecondRow.className = 'input-manager-row';
    upperRow.className = 'input-manager-row';
    middleRow.className = 'input-manager-row';
    lowerRow.className = 'input-manager-row';
    if (detectMobile()) {
        commands.filter(isInTopRow).
        sort(sortByKeyOrder).
        map(c => topRow.appendChild(createCommandButton(c)));
    commands.filter(isInSecondTopRow).
        sort(sortByKeyOrder).
        map(c => topSecondRow.appendChild(createCommandButton(c)));
    } else {
        handleTopRow(commands, shift, topRow, topSecondRow);
    }

    commands.filter(isInUpperRow).
        sort(sortByKeyOrder).
        map(c => upperRow.appendChild(createCommandButton(c)));
    
        commands.filter(isInMiddleRow).
        sort(sortByKeyOrder).
        map(c => middleRow.appendChild(createCommandButton(c)));
    
        commands.filter(isInBottomRow).
        sort(sortByKeyOrder).
        map(c => lowerRow.appendChild(createCommandButton(c)));
    element.innerHTML = '';
    leftSide.append(topRow);
    leftSide.append(topSecondRow);
    rightSide.append(upperRow);
    rightSide.append(middleRow);
    rightSide.append(lowerRow);
    element.append(leftSide);
    element.append(rightSide);
}


function captureInputForm() {
    const element = document.
        querySelector<HTMLDivElement>('#input-manager-wrapper')!;
    const row = document.createElement('div');
    const form = document.createElement('form');
    const commandLine = document.createElement('input');
    commandLine.autocapitalize = 'off';
    commandLine.className = 'command-input';
    element.innerHTML = '';
    form.className = 'input-form';
    form.appendChild(commandLine);
    form.onsubmit = e => {
        e.preventDefault();
        if (commandLine.value.trim() !== '') {
            handleInputCapture(commandLine.value)
        }
    }
    row.append(form);
    element.append(row);
    commandLine.focus();
}


export function refreshInputManager(shift?: boolean) {
    shift = (shift) ?? false;
    const capture = isCaptureModeEnabled();
    if (!capture) {
        standardControlPad(shift);
    } else {
        captureInputForm();
    }
}


function processKey(c: string) {
    if (c === 'Enter') {
        c = 'enter';
    }
    c = c.toLocaleLowerCase();
    c = c.trim();
    return c;
}


export function setupInputManager() {
    let shiftKey = false;
    document.addEventListener('keyup', e => {
        const captureMode = isCaptureModeEnabled();
        if (permitInput && !captureMode) {
            const key = processKey(e.key);
            const commands = getCommandList();
            for (const c of commands) {
                if (c.id === key) {
                    executeCommand(c);
                    return;
                }
            }
        }
        if (e.key === 'Shift' && shiftKey === true) {
            shiftKey = false;
            if (!captureMode) {
                refreshInputManager(shiftKey);
            }
        }
    });
    document.addEventListener('keydown', e => {
        const captureMode = isCaptureModeEnabled();
        if (e.key === 'Shift' && shiftKey === false) {
            shiftKey = true;
            if (!captureMode) {
                refreshInputManager(shiftKey);
            }
        }
    });
}
  