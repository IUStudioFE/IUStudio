/**
 * @description get tokens from document
 * @author wing
 */
export default function analy(template) {
   let state = {
      template: template,
      current: 0,
      tokens: []
    }
    analyState(state);
    return state.tokens;
}

// 调度器
function analyState(state) {
  const template = state.template;
  const len = template.length;
  while(state.current < len) {
    // 文字
    if(template.charAt(state.current) !== "<") {
      analyText(state);
      continue;
    }

    // 注释
    if(template.substr(state.current, 4) === "<!--") {
      analyComment(state);
      continue;
    }

    // tag
    analyTag(state);
  }
}

function analyText(state) {
  const template = state.template;
  const len = template.length;
  const endOfText = template.indexOf('<', state.current);

  // 只有文字
  if(endOfText === -1) {
    state.tokens.push({
      type: "text",
      value: template.slice(state.current)
    });
    state.current = len;
    return;
  }

  // 不是文字
  if(endOfText === state.current) {
    return;
  }

  // 
  state.tokens.push({
    type: 'text',
    value: template.slice(state.current, endOfText)
  });

  state.current = endOfText;
}

function analyComment(state) {
  const template = state.template;
  const len = template.length;
  state.current += 4;
  const endOfComment = template.indexOf('-->', state.current);

  // 未关闭的注释标签
  if(endOfComment === -1) {
    state.tokens.push({
      type: 'comment',
      value: template.slice(state.current)
    });
    state.current = len;
    return;
  }
  
  // 
  state.tokens.push({
    type: 'comment',
    value: template.slice(state.current, endOfComment)
  })
  state.current = endOfComment + 3;
}

 function analyTag(state) {
  const template = state.template;
  const len = template.length;

  // 
  const isClosingStart = template.charAt(state.current + 1) === '/';
  state.tokens.push({
    type: 'tagStart',
    close: isClosingStart
  });
  state.current += isClosingStart ? 2 : 1;

  // tag type and attributes
  const tagType = analyTagType(state);
  analyAttributes(state);
  
  // ending tag  表示的是< />为true <></> 为false
  const isClosingEnd = template.charAt(state.current) === "/";
  state.tokens.push({
    type: "tagEnd",
    close: false
  });

  state.current += isClosingEnd ? 2 : 1;
  if(isClosingEnd) {
    state.tokens.push({
      type: "tagStart",
      close: true
    })
    state.tokens.push({
      type: "tag",
      value: tagType
    })
    state.tokens.push({
      type: "attribute",
      value: {}
    })
    state.tokens.push({
      type: "tagEnd",
      close: false
    })
  }
}
 

function analyTagType(state) {
  const template = state.template;
  const len = template.length;
  let start = state.current;
  while(start < len) {
    const char = template.charAt(start);
    if((char === '/') || (char === '>') || (char === ' ')) {
      start++;
    } else {
      break;
    }
  }
  let end = start;
  while(end < len) {
    const char = template.charAt(end);
    if((char === '/') || (char === '>') || (char === ' ')) {
      break;
    } else {
      end++;
    }
  }

  const tagType = template.slice(start, end);
  state.tokens.push({
    type: 'tag',
    value: tagType
  })
  state.current = end;
  return tagType;
}

function analyAttributes(state) {
  const template = state.template;
  const len = template.length;
  let end = state.current;

  const attrs = {};

  let char = template.charAt(end);
  let nextChar = template.charAt(end + 1);

  const goNextChar = function() {
    end++;
    char = template.charAt(end);
    nextChar = template.charAt(end + 1);
  }

  while(end < len) {
    if((char === ">") || ((char === "/" && nextChar === ">"))) {
      break;
    }

    if(char === " ") {
      goNextChar();
      continue;
    }

    let attrName = "";
    let hasValue = false;

    while((char !== "=") && end < len) {
      if((char !== " ") || (char !== ">") || ((char === "/" && nextChar === ">"))) {
        attrName += char;
        hasValue = true;
      } else {
        break;
      }
      goNextChar();
    }

    let attrValue = {
      name: attrName,
      value: "",
      meta: {}
    }

    if(!hasValue) {
      attrs[attrName] = attrValue;
      continue;
    }

    goNextChar();
    
    let quote = ""
    if((char === "'") || (char === "\"")) {
      quote = char;
      goNextChar();
    } else {
      attrValue.value += char;
    }

    while(((char !== quote && ((char !== ">") || ((char !== "/") && (nextChar !== ">"))))) && (end < len)) {
      attrValue.value += char;
      goNextChar();
    }

    // 未来的指令操作

    attrs[attrName] = attrValue;
    goNextChar();
  }

  state.current = end;
  state.tokens.push({
    type: "attribute",
    value: attrs
  });
}