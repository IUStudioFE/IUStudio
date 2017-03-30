/**
 * @description parse ast from tokens
 * @author wing
 */

export default function parse(tokens) {
    let root = {
        type: 'ROOT',
        children: []
    }

    let state = {
        current: 0,
        tokens: tokens
    }

    while(state.current < tokens.length) {
        const child = walk(state);
        if(child) {
            root.children.push(child);
        }
    }
    
    return root;
}

const SINGLE_LABEL = ["br", "hr", "area", "base", "img", "input", "link", "meta", "basefont", "param", "col", "frame", "embed", "keygen", "source"];

function walk(state) {
    let currentToken = state.tokens[state.current];
    let prevToken = state.tokens[state.current - 1];
    let nextToken = state.tokens[state.current + 1];
    let thirdToken = state.tokens[state.current + 2];
    let fourthToken = state.tokens[state.current + 3];

    const increment = function(num) {
        state.current += num === undefined ? 1 : num;
        prevToken = state.tokens[state.current - 1];
        nextToken = state.tokens[state.current + 1];
        thirdToken = state.tokens[state.current + 2];
        fourthToken = state.tokens[state.current + 3];
        currentToken = state.tokens[state.current];
    }

    if(currentToken.type === "text") {
        increment();
        return prevToken.value;
    }

    if(currentToken.type === "comment") {
        increment();
        return;
    }
    
    // new Tag
    if(currentToken.type === "tagStart" && !currentToken.close && !fourthToken.close) {
        let node = createNode(nextToken.value, thirdToken.value, []);
        const tagType = nextToken.value;

        increment(4);

        if(SINGLE_LABEL.indexOf(node.type) !== -1) {
            return node;
        }

        const contentIndex = state.current;

        if(currentToken) {
            // 只要不是关闭的闭合标签，就把它放入到children中
            while((currentToken.type !== "tagStart" || ((currentToken.type === "tagStart") && !currentToken.close) )) {
                const childState = walk(state);
                if(childState) {
                    node.children.push(childState);
                }
                increment(0);
                if(!currentToken) {
                    throw new Error(`The element ${node.type} was left unclosed`);
                    break;
                }
            }
            increment();
        }
        return node;
    }
    increment();
    return;
}

function createNode(type, props, children) {
    return {
        type,
        props,
        children
    }
}
