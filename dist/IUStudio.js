(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["IUStudio"] = factory();
	else
		root["IUStudio"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @description app entry
 * @author wing
 */
module.exports = __webpack_require__(5)['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lexer = __webpack_require__(3);

var _parse = __webpack_require__(4);

var _parse2 = _interopRequireDefault(_parse);

var _generate = __webpack_require__(2);

var _generate2 = _interopRequireDefault(_generate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compile = function compile(template) {
  var tokens = getTokens(template);
  var ast = (0, _parse2.default)(tokens);
  return (0, _generate2.default)(ast);
}; /**
    * @description compile
    * @author wing
    */
exports.default = compile;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generate;
/**
 * @description generate from ast
 * @author wing
 */

function generate(ast) {
  var generate = '';
  return generate;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = analy;
/**
 * @description get tokens from document
 * @author wing
 */
function analy(template) {
  var state = {
    template: template,
    current: 0,
    tokens: []
  };
  analyState(state);
  return state.tokens;
}

// 调度器
function analyState(state) {
  var template = state.template;
  var len = template.length;
  while (state.current < len) {
    // 文字
    if (template.charAt(state.current) !== "<") {
      analyText(state);
      continue;
    }

    // 注释
    if (template.substr(state.current, 4) === "<!--") {
      analyComment(state);
      continue;
    }

    // tag
    analyTag(state);
  }
}

function analyText(state) {
  var template = state.template;
  var len = template.length;
  var endOfText = template.indexOf('<', state.current);

  // 只有文字
  if (endOfText === -1) {
    state.tokens.push({
      type: "text",
      value: template.slice(state.current)
    });
    state.current = len;
    return;
  }

  // 不是文字
  if (endOfText === state.current) {
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
  var template = state.template;
  var len = template.length;
  state.current += 4;
  var endOfComment = template.indexOf('-->', state.current);

  // 未关闭的注释标签
  if (endOfComment === -1) {
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
  });
  state.current = endOfComment + 3;
}

function analyTag(state) {
  var template = state.template;
  var len = template.length;

  // 
  var isClosingStart = template.charAt(state.current + 1) === '/';
  state.tokens.push({
    type: 'tagStart',
    close: isClosingStart
  });
  state.current += isClosingStart ? 2 : 1;

  // tag type and attributes
  var tagType = analyTagType(state);
  analyAttributes(state);

  // ending tag  表示的是< />为true <></> 为false
  var isClosingEnd = template.charAt(state.current) === "/";
  state.tokens.push({
    type: "tagEnd",
    close: false
  });

  state.current += isClosingEnd ? 2 : 1;
  if (isClosingEnd) {
    state.tokens.push({
      type: "tagStart",
      close: true
    });
    state.tokens.push({
      type: "tag",
      value: tagType
    });
    state.tokens.push({
      type: "attribute",
      value: {}
    });
    state.tokens.push({
      type: "tagEnd",
      close: false
    });
  }
}

function analyTagType(state) {
  var template = state.template;
  var len = template.length;
  var start = state.current;
  while (start < len) {
    var char = template.charAt(start);
    if (char === '/' || char === '>' || char === ' ') {
      start++;
    } else {
      break;
    }
  }
  var end = start;
  while (end < len) {
    var _char = template.charAt(end);
    if (_char === '/' || _char === '>' || _char === ' ') {
      break;
    } else {
      end++;
    }
  }

  var tagType = template.slice(start, end);
  state.tokens.push({
    type: 'tag',
    value: tagType
  });
  state.current = end;
  return tagType;
}

function analyAttributes(state) {
  var template = state.template;
  var len = template.length;
  var end = state.current;

  var attrs = {};

  var char = template.charAt(end);
  var nextChar = template.charAt(end + 1);

  var goNextChar = function goNextChar() {
    end++;
    char = template.charAt(end);
    nextChar = template.charAt(end + 1);
  };

  while (end < len) {
    if (char === ">" || char === "/" && nextChar === ">") {
      break;
    }

    if (char === " ") {
      goNextChar();
      continue;
    }

    var attrName = "";
    var hasValue = false;

    while (char !== "=" && end < len) {
      if (char !== " " || char !== ">" || char === "/" && nextChar === ">") {
        attrName += char;
        hasValue = true;
      } else {
        break;
      }
      goNextChar();
    }

    var attrValue = {
      name: attrName,
      value: "",
      meta: {}
    };

    if (!hasValue) {
      attrs[attrName] = attrValue;
      continue;
    }

    goNextChar();

    var quote = "";
    if (char === "'" || char === "\"") {
      quote = char;
      goNextChar();
    } else {
      attrValue.value += char;
    }

    while (char !== quote && (char !== ">" || char !== "/" && nextChar !== ">") && end < len) {
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;
/**
 * @description parse ast from tokens
 * @author wing
 */

function parse(tokens) {
  var ast = {};
  return ast;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _instance = __webpack_require__(6);

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _instance2.default; /**
                                       * @description app entry
                                       * @author wing
                                       */

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _compile = __webpack_require__(1);

var _compile2 = _interopRequireDefault(_compile);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @description IUStudio instance
                                                                                                                                                           * @author wing
                                                                                                                                                           */


var IUStudio = function IUStudio(opts) {
    _classCallCheck(this, IUStudio);

    this.$$opts = opts || {};
    this.$$data = this.$$opts.data || {};
    var _el = this.$$el = document.querySelector(this.$$opts.el);
    var render = (0, _compile2.default)((0, _utils.getOuterHTML)(_el));
};

exports.default = IUStudio;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOuterHTML = getOuterHTML;
/**
 * @description utils of dom
 * @author wing
 */
function getOuterHTML(elem) {
    if (elem.outterHTML) {
        return elem.outterHTML;
    } else {
        var container = document.createElement('div');
        container.appendChild(elem.cloneNode(true));
        return container.innerHTML;
    }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = __webpack_require__(7);

Object.keys(_dom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dom[key];
    }
  });
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxNzFhNTBiM2Y5YTNiMjc0NTNmMSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudW1kLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9jb21waWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9nZW5lcmF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcGlsZXIvbGV4ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBpbGVyL3BhcnNlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdGFuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJjb21waWxlIiwidGVtcGxhdGUiLCJ0b2tlbnMiLCJnZXRUb2tlbnMiLCJhc3QiLCJnZW5lcmF0ZSIsImFuYWx5Iiwic3RhdGUiLCJjdXJyZW50IiwiYW5hbHlTdGF0ZSIsImxlbiIsImxlbmd0aCIsImNoYXJBdCIsImFuYWx5VGV4dCIsInN1YnN0ciIsImFuYWx5Q29tbWVudCIsImFuYWx5VGFnIiwiZW5kT2ZUZXh0IiwiaW5kZXhPZiIsInB1c2giLCJ0eXBlIiwidmFsdWUiLCJzbGljZSIsImVuZE9mQ29tbWVudCIsImlzQ2xvc2luZ1N0YXJ0IiwiY2xvc2UiLCJ0YWdUeXBlIiwiYW5hbHlUYWdUeXBlIiwiYW5hbHlBdHRyaWJ1dGVzIiwiaXNDbG9zaW5nRW5kIiwic3RhcnQiLCJjaGFyIiwiZW5kIiwiYXR0cnMiLCJuZXh0Q2hhciIsImdvTmV4dENoYXIiLCJhdHRyTmFtZSIsImhhc1ZhbHVlIiwiYXR0clZhbHVlIiwibmFtZSIsIm1ldGEiLCJxdW90ZSIsInBhcnNlIiwiSVVTdHVkaW8iLCJvcHRzIiwiJCRvcHRzIiwiJCRkYXRhIiwiZGF0YSIsIl9lbCIsIiQkZWwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJlbCIsInJlbmRlciIsImdldE91dGVySFRNTCIsImVsZW0iLCJvdXR0ZXJIVE1MIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUE7Ozs7QUFJQUEsT0FBT0MsT0FBUCxHQUFpQixtQkFBQUMsQ0FBUSxDQUFSLEVBQW1CLFNBQW5CLENBQWpCLEM7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxVQUFVLFNBQVZBLE9BQVUsQ0FBU0MsUUFBVCxFQUFtQjtBQUMvQixNQUFNQyxTQUFTQyxVQUFVRixRQUFWLENBQWY7QUFDQSxNQUFNRyxNQUFNLHFCQUFNRixNQUFOLENBQVo7QUFDQSxTQUFPLHdCQUFTRSxHQUFULENBQVA7QUFDSCxDQUpELEMsQ0FSQTs7OztrQkFjZUosTzs7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V0FBVixDQUFzQkosS0FBS0ssU0FBTCxDQUFlLElBQWYsQ0FBdEI7QUFDQSxlQUFPSCxVQUFVSSxTQUFqQjtBQUNIO0FBQ0osQzs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoiSVVTdHVkaW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJJVVN0dWRpb1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJJVVN0dWRpb1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNzFhNTBiM2Y5YTNiMjc0NTNmMSIsIi8qKlxuICogQGRlc2NyaXB0aW9uIGFwcCBlbnRyeVxuICogQGF1dGhvciB3aW5nXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pbmRleCcpWydkZWZhdWx0J11cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC51bWQuanMiLCIvKipcbiAqIEBkZXNjcmlwdGlvbiBjb21waWxlXG4gKiBAYXV0aG9yIHdpbmdcbiAqL1xuaW1wb3J0IHsgbGV4IH0gZnJvbSAnLi9sZXhlcic7XG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wYXJzZSc7XG5pbXBvcnQgZ2VuZXJhdGUgZnJvbSAnLi9nZW5lcmF0ZSc7XG5cbmNvbnN0IGNvbXBpbGUgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IHRva2VucyA9IGdldFRva2Vucyh0ZW1wbGF0ZSk7XG4gICAgY29uc3QgYXN0ID0gcGFyc2UodG9rZW5zKTtcbiAgICByZXR1cm4gZ2VuZXJhdGUoYXN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcGlsZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcGlsZXIvY29tcGlsZS5qcyIsIi8qKlxuICogQGRlc2NyaXB0aW9uIGdlbmVyYXRlIGZyb20gYXN0XG4gKiBAYXV0aG9yIHdpbmdcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZShhc3QpIHtcbiAgICBsZXQgZ2VuZXJhdGUgPSAnJztcbiAgICByZXR1cm4gZ2VuZXJhdGU7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBpbGVyL2dlbmVyYXRlLmpzIiwiLyoqXG4gKiBAZGVzY3JpcHRpb24gZ2V0IHRva2VucyBmcm9tIGRvY3VtZW50XG4gKiBAYXV0aG9yIHdpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYW5hbHkodGVtcGxhdGUpIHtcbiAgIGxldCBzdGF0ZSA9IHtcbiAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICB0b2tlbnM6IFtdXG4gICAgfVxuICAgIGFuYWx5U3RhdGUoc3RhdGUpO1xuICAgIHJldHVybiBzdGF0ZS50b2tlbnM7XG59XG5cbi8vIOiwg+W6puWZqFxuZnVuY3Rpb24gYW5hbHlTdGF0ZShzdGF0ZSkge1xuICBjb25zdCB0ZW1wbGF0ZSA9IHN0YXRlLnRlbXBsYXRlO1xuICBjb25zdCBsZW4gPSB0ZW1wbGF0ZS5sZW5ndGg7XG4gIHdoaWxlKHN0YXRlLmN1cnJlbnQgPCBsZW4pIHtcbiAgICAvLyDmloflrZdcbiAgICBpZih0ZW1wbGF0ZS5jaGFyQXQoc3RhdGUuY3VycmVudCkgIT09IFwiPFwiKSB7XG4gICAgICBhbmFseVRleHQoc3RhdGUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8g5rOo6YeKXG4gICAgaWYodGVtcGxhdGUuc3Vic3RyKHN0YXRlLmN1cnJlbnQsIDQpID09PSBcIjwhLS1cIikge1xuICAgICAgYW5hbHlDb21tZW50KHN0YXRlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhZ1xuICAgIGFuYWx5VGFnKHN0YXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhbmFseVRleHQoc3RhdGUpIHtcbiAgY29uc3QgdGVtcGxhdGUgPSBzdGF0ZS50ZW1wbGF0ZTtcbiAgY29uc3QgbGVuID0gdGVtcGxhdGUubGVuZ3RoO1xuICBjb25zdCBlbmRPZlRleHQgPSB0ZW1wbGF0ZS5pbmRleE9mKCc8Jywgc3RhdGUuY3VycmVudCk7XG5cbiAgLy8g5Y+q5pyJ5paH5a2XXG4gIGlmKGVuZE9mVGV4dCA9PT0gLTEpIHtcbiAgICBzdGF0ZS50b2tlbnMucHVzaCh7XG4gICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgIHZhbHVlOiB0ZW1wbGF0ZS5zbGljZShzdGF0ZS5jdXJyZW50KVxuICAgIH0pO1xuICAgIHN0YXRlLmN1cnJlbnQgPSBsZW47XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8g5LiN5piv5paH5a2XXG4gIGlmKGVuZE9mVGV4dCA9PT0gc3RhdGUuY3VycmVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFxuICBzdGF0ZS50b2tlbnMucHVzaCh7XG4gICAgdHlwZTogJ3RleHQnLFxuICAgIHZhbHVlOiB0ZW1wbGF0ZS5zbGljZShzdGF0ZS5jdXJyZW50LCBlbmRPZlRleHQpXG4gIH0pO1xuXG4gIHN0YXRlLmN1cnJlbnQgPSBlbmRPZlRleHQ7XG59XG5cbmZ1bmN0aW9uIGFuYWx5Q29tbWVudChzdGF0ZSkge1xuICBjb25zdCB0ZW1wbGF0ZSA9IHN0YXRlLnRlbXBsYXRlO1xuICBjb25zdCBsZW4gPSB0ZW1wbGF0ZS5sZW5ndGg7XG4gIHN0YXRlLmN1cnJlbnQgKz0gNDtcbiAgY29uc3QgZW5kT2ZDb21tZW50ID0gdGVtcGxhdGUuaW5kZXhPZignLS0+Jywgc3RhdGUuY3VycmVudCk7XG5cbiAgLy8g5pyq5YWz6Zet55qE5rOo6YeK5qCH562+XG4gIGlmKGVuZE9mQ29tbWVudCA9PT0gLTEpIHtcbiAgICBzdGF0ZS50b2tlbnMucHVzaCh7XG4gICAgICB0eXBlOiAnY29tbWVudCcsXG4gICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2Uoc3RhdGUuY3VycmVudClcbiAgICB9KTtcbiAgICBzdGF0ZS5jdXJyZW50ID0gbGVuO1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgLy8gXG4gIHN0YXRlLnRva2Vucy5wdXNoKHtcbiAgICB0eXBlOiAnY29tbWVudCcsXG4gICAgdmFsdWU6IHRlbXBsYXRlLnNsaWNlKHN0YXRlLmN1cnJlbnQsIGVuZE9mQ29tbWVudClcbiAgfSlcbiAgc3RhdGUuY3VycmVudCA9IGVuZE9mQ29tbWVudCArIDM7XG59XG5cbiBmdW5jdGlvbiBhbmFseVRhZyhzdGF0ZSkge1xuICBjb25zdCB0ZW1wbGF0ZSA9IHN0YXRlLnRlbXBsYXRlO1xuICBjb25zdCBsZW4gPSB0ZW1wbGF0ZS5sZW5ndGg7XG5cbiAgLy8gXG4gIGNvbnN0IGlzQ2xvc2luZ1N0YXJ0ID0gdGVtcGxhdGUuY2hhckF0KHN0YXRlLmN1cnJlbnQgKyAxKSA9PT0gJy8nO1xuICBzdGF0ZS50b2tlbnMucHVzaCh7XG4gICAgdHlwZTogJ3RhZ1N0YXJ0JyxcbiAgICBjbG9zZTogaXNDbG9zaW5nU3RhcnRcbiAgfSk7XG4gIHN0YXRlLmN1cnJlbnQgKz0gaXNDbG9zaW5nU3RhcnQgPyAyIDogMTtcblxuICAvLyB0YWcgdHlwZSBhbmQgYXR0cmlidXRlc1xuICBjb25zdCB0YWdUeXBlID0gYW5hbHlUYWdUeXBlKHN0YXRlKTtcbiAgYW5hbHlBdHRyaWJ1dGVzKHN0YXRlKTtcbiAgXG4gIC8vIGVuZGluZyB0YWcgIOihqOekuueahOaYrzwgLz7kuLp0cnVlIDw+PC8+IOS4umZhbHNlXG4gIGNvbnN0IGlzQ2xvc2luZ0VuZCA9IHRlbXBsYXRlLmNoYXJBdChzdGF0ZS5jdXJyZW50KSA9PT0gXCIvXCI7XG4gIHN0YXRlLnRva2Vucy5wdXNoKHtcbiAgICB0eXBlOiBcInRhZ0VuZFwiLFxuICAgIGNsb3NlOiBmYWxzZVxuICB9KTtcblxuICBzdGF0ZS5jdXJyZW50ICs9IGlzQ2xvc2luZ0VuZCA/IDIgOiAxO1xuICBpZihpc0Nsb3NpbmdFbmQpIHtcbiAgICBzdGF0ZS50b2tlbnMucHVzaCh7XG4gICAgICB0eXBlOiBcInRhZ1N0YXJ0XCIsXG4gICAgICBjbG9zZTogdHJ1ZVxuICAgIH0pXG4gICAgc3RhdGUudG9rZW5zLnB1c2goe1xuICAgICAgdHlwZTogXCJ0YWdcIixcbiAgICAgIHZhbHVlOiB0YWdUeXBlXG4gICAgfSlcbiAgICBzdGF0ZS50b2tlbnMucHVzaCh7XG4gICAgICB0eXBlOiBcImF0dHJpYnV0ZVwiLFxuICAgICAgdmFsdWU6IHt9XG4gICAgfSlcbiAgICBzdGF0ZS50b2tlbnMucHVzaCh7XG4gICAgICB0eXBlOiBcInRhZ0VuZFwiLFxuICAgICAgY2xvc2U6IGZhbHNlXG4gICAgfSlcbiAgfVxufVxuIFxuXG5mdW5jdGlvbiBhbmFseVRhZ1R5cGUoc3RhdGUpIHtcbiAgY29uc3QgdGVtcGxhdGUgPSBzdGF0ZS50ZW1wbGF0ZTtcbiAgY29uc3QgbGVuID0gdGVtcGxhdGUubGVuZ3RoO1xuICBsZXQgc3RhcnQgPSBzdGF0ZS5jdXJyZW50O1xuICB3aGlsZShzdGFydCA8IGxlbikge1xuICAgIGNvbnN0IGNoYXIgPSB0ZW1wbGF0ZS5jaGFyQXQoc3RhcnQpO1xuICAgIGlmKChjaGFyID09PSAnLycpIHx8IChjaGFyID09PSAnPicpIHx8IChjaGFyID09PSAnICcpKSB7XG4gICAgICBzdGFydCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgbGV0IGVuZCA9IHN0YXJ0O1xuICB3aGlsZShlbmQgPCBsZW4pIHtcbiAgICBjb25zdCBjaGFyID0gdGVtcGxhdGUuY2hhckF0KGVuZCk7XG4gICAgaWYoKGNoYXIgPT09ICcvJykgfHwgKGNoYXIgPT09ICc+JykgfHwgKGNoYXIgPT09ICcgJykpIHtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmQrKztcbiAgICB9XG4gIH1cblxuICBjb25zdCB0YWdUeXBlID0gdGVtcGxhdGUuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIHN0YXRlLnRva2Vucy5wdXNoKHtcbiAgICB0eXBlOiAndGFnJyxcbiAgICB2YWx1ZTogdGFnVHlwZVxuICB9KVxuICBzdGF0ZS5jdXJyZW50ID0gZW5kO1xuICByZXR1cm4gdGFnVHlwZTtcbn1cblxuZnVuY3Rpb24gYW5hbHlBdHRyaWJ1dGVzKHN0YXRlKSB7XG4gIGNvbnN0IHRlbXBsYXRlID0gc3RhdGUudGVtcGxhdGU7XG4gIGNvbnN0IGxlbiA9IHRlbXBsYXRlLmxlbmd0aDtcbiAgbGV0IGVuZCA9IHN0YXRlLmN1cnJlbnQ7XG5cbiAgY29uc3QgYXR0cnMgPSB7fTtcblxuICBsZXQgY2hhciA9IHRlbXBsYXRlLmNoYXJBdChlbmQpO1xuICBsZXQgbmV4dENoYXIgPSB0ZW1wbGF0ZS5jaGFyQXQoZW5kICsgMSk7XG5cbiAgY29uc3QgZ29OZXh0Q2hhciA9IGZ1bmN0aW9uKCkge1xuICAgIGVuZCsrO1xuICAgIGNoYXIgPSB0ZW1wbGF0ZS5jaGFyQXQoZW5kKTtcbiAgICBuZXh0Q2hhciA9IHRlbXBsYXRlLmNoYXJBdChlbmQgKyAxKTtcbiAgfVxuXG4gIHdoaWxlKGVuZCA8IGxlbikge1xuICAgIGlmKChjaGFyID09PSBcIj5cIikgfHwgKChjaGFyID09PSBcIi9cIiAmJiBuZXh0Q2hhciA9PT0gXCI+XCIpKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYoY2hhciA9PT0gXCIgXCIpIHtcbiAgICAgIGdvTmV4dENoYXIoKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGxldCBhdHRyTmFtZSA9IFwiXCI7XG4gICAgbGV0IGhhc1ZhbHVlID0gZmFsc2U7XG5cbiAgICB3aGlsZSgoY2hhciAhPT0gXCI9XCIpICYmIGVuZCA8IGxlbikge1xuICAgICAgaWYoKGNoYXIgIT09IFwiIFwiKSB8fCAoY2hhciAhPT0gXCI+XCIpIHx8ICgoY2hhciA9PT0gXCIvXCIgJiYgbmV4dENoYXIgPT09IFwiPlwiKSkpIHtcbiAgICAgICAgYXR0ck5hbWUgKz0gY2hhcjtcbiAgICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBnb05leHRDaGFyKCk7XG4gICAgfVxuXG4gICAgbGV0IGF0dHJWYWx1ZSA9IHtcbiAgICAgIG5hbWU6IGF0dHJOYW1lLFxuICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICBtZXRhOiB7fVxuICAgIH1cblxuICAgIGlmKCFoYXNWYWx1ZSkge1xuICAgICAgYXR0cnNbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgZ29OZXh0Q2hhcigpO1xuICAgIFxuICAgIGxldCBxdW90ZSA9IFwiXCJcbiAgICBpZigoY2hhciA9PT0gXCInXCIpIHx8IChjaGFyID09PSBcIlxcXCJcIikpIHtcbiAgICAgIHF1b3RlID0gY2hhcjtcbiAgICAgIGdvTmV4dENoYXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0clZhbHVlLnZhbHVlICs9IGNoYXI7XG4gICAgfVxuXG4gICAgd2hpbGUoKChjaGFyICE9PSBxdW90ZSAmJiAoKGNoYXIgIT09IFwiPlwiKSB8fCAoKGNoYXIgIT09IFwiL1wiKSAmJiAobmV4dENoYXIgIT09IFwiPlwiKSkpKSkgJiYgKGVuZCA8IGxlbikpIHtcbiAgICAgIGF0dHJWYWx1ZS52YWx1ZSArPSBjaGFyO1xuICAgICAgZ29OZXh0Q2hhcigpO1xuICAgIH1cblxuICAgIC8vIOacquadpeeahOaMh+S7pOaTjeS9nFxuXG4gICAgYXR0cnNbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuICAgIGdvTmV4dENoYXIoKTtcbiAgfVxuXG4gIHN0YXRlLmN1cnJlbnQgPSBlbmQ7XG4gIHN0YXRlLnRva2Vucy5wdXNoKHtcbiAgICB0eXBlOiBcImF0dHJpYnV0ZVwiLFxuICAgIHZhbHVlOiBhdHRyc1xuICB9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcGlsZXIvbGV4ZXIuanMiLCIvKipcbiAqIEBkZXNjcmlwdGlvbiBwYXJzZSBhc3QgZnJvbSB0b2tlbnNcbiAqIEBhdXRob3Igd2luZ1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKHRva2Vucykge1xuICAgIGxldCBhc3QgPSB7fTtcbiAgICByZXR1cm4gYXN0O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21waWxlci9wYXJzZS5qcyIsIi8qKlxuICogQGRlc2NyaXB0aW9uIGFwcCBlbnRyeVxuICogQGF1dGhvciB3aW5nXG4gKi9cbmltcG9ydCBJVVN0dWRpbyBmcm9tICcuL2luc3RhbmNlJztcblxuZXhwb3J0IGRlZmF1bHQgSVVTdHVkaW87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvKipcbiAqIEBkZXNjcmlwdGlvbiBJVVN0dWRpbyBpbnN0YW5jZVxuICogQGF1dGhvciB3aW5nXG4gKi9cbmltcG9ydCBjb21waWxlIGZyb20gJy4uL2NvbXBpbGVyL2NvbXBpbGUnO1xuaW1wb3J0IHsgZ2V0T3V0ZXJIVE1MIH0gZnJvbSAnLi4vdXRpbHMvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSVVTdHVkaW8ge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgdGhpcy4kJG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICB0aGlzLiQkZGF0YSA9IHRoaXMuJCRvcHRzLmRhdGEgfHwge307XG4gICAgICAgIGNvbnN0IF9lbCA9IHRoaXMuJCRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy4kJG9wdHMuZWwpO1xuICAgICAgICBjb25zdCByZW5kZXIgPSBjb21waWxlKGdldE91dGVySFRNTChfZWwpKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luc3RhbmNlL2luZGV4LmpzIiwiLyoqXG4gKiBAZGVzY3JpcHRpb24gdXRpbHMgb2YgZG9tXG4gKiBAYXV0aG9yIHdpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE91dGVySFRNTChlbGVtKSB7XG4gICAgaWYoZWxlbS5vdXR0ZXJIVE1MKSB7XG4gICAgICAgIHJldHVybiBlbGVtLm91dHRlckhUTUw7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXIuaW5uZXJIVE1MO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9kb20uanMiLCIvKipcbiAqIEBkZXNjcmlwdGlvbiB1dGlsc1xuICogQGF1dGhvciB3aW5nXG4gKi9cbiBleHBvcnQgKiBmcm9tICcuL2RvbSc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==