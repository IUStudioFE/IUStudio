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

var _getTokens = __webpack_require__(3);

var _getTokens2 = _interopRequireDefault(_getTokens);

var _parse = __webpack_require__(4);

var _parse2 = _interopRequireDefault(_parse);

var _generate = __webpack_require__(2);

var _generate2 = _interopRequireDefault(_generate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compile = function compile(template) {
  var tokens = (0, _getTokens2.default)(template);
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
exports.default = getTokens;
/**
 * @description get tokens from document
 * @author wing
 */

function getTokens(template) {
  console.log(template);
  var tokens = [];
  return tokens;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwYWQ2ODdlN2RhNGU2YWE4NzNmZiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudW1kLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9jb21waWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9nZW5lcmF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcGlsZXIvZ2V0VG9rZW5zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RhbmNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiY29tcGlsZSIsInRlbXBsYXRlIiwidG9rZW5zIiwiYXN0IiwiZ2VuZXJhdGUiLCJnZXRUb2tlbnMiLCJjb25zb2xlIiwibG9nIiwicGFyc2UiLCJJVVN0dWRpbyIsIm9wdHMiLCIkJG9wdHMiLCIkJGRhdGEiLCJkYXRhIiwiX2VsIiwiJCRlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImVsIiwicmVuZGVyIiwiZ2V0T3V0ZXJIVE1MIiwiZWxlbSIsIm91dHRlckhUTUwiLCJjb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjbG9uZU5vZGUiLCJpbm5lckhUTUwiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ2hFQTs7OztBQUlBQSxPQUFPQyxPQUFQLEdBQWlCLG1CQUFBQyxDQUFRLENBQVIsRUFBbUIsU0FBbkIsQ0FBakIsQzs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUMsVUFBVSxTQUFWQSxPQUFVLENBQVNDLFFBQVQsRUFBbUI7QUFDL0IsTUFBTUMsU0FBUyx5QkFBVUQsUUFBVixDQUFmO0FBQ0EsTUFBTUUsTUFBTSxxQkFBTUQsTUFBTixDQUFaO0FBQ0EsU0FBTyx3QkFBU0MsR0FBVCxDQUFQO0FBQ0gsQ0FKRCxDLENBUkE7Ozs7a0JBY2VILE87Ozs7Ozs7Ozs7OztrQkNUU0ksUTtBQUx4Qjs7Ozs7QUFLZSxTQUFTQSxRQUFULENBQWtCRCxHQUFsQixFQUF1QjtBQUNsQyxNQUFJQyxXQUFXLEVBQWY7QUFDQSxTQUFPQSxRQUFQO0FBQ0gsQzs7Ozs7Ozs7Ozs7O2tCQ0h1QkMsUztBQUx4Qjs7Ozs7QUFLZSxTQUFTQSxTQUFULENBQW1CSixRQUFuQixFQUE2QjtBQUN4Q0ssVUFBUUMsR0FBUixDQUFZTixRQUFaO0FBQ0EsTUFBSUMsU0FBUyxFQUFiO0FBQ0EsU0FBT0EsTUFBUDtBQUNILEM7Ozs7Ozs7Ozs7OztrQkNKdUJNLEs7QUFMeEI7Ozs7O0FBS2UsU0FBU0EsS0FBVCxDQUFlTixNQUFmLEVBQXVCO0FBQ2xDLE1BQUlDLE1BQU0sRUFBVjtBQUNBLFNBQU9BLEdBQVA7QUFDSCxDOzs7Ozs7Ozs7Ozs7O0FDSkQ7Ozs7OztzQ0FKQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0lBOzs7O0FBQ0E7Ozs7MEpBTEE7Ozs7OztJQU9xQk0sUSxHQUNqQixrQkFBWUMsSUFBWixFQUFrQjtBQUFBOztBQUNkLFNBQUtDLE1BQUwsR0FBY0QsUUFBUSxFQUF0QjtBQUNBLFNBQUtFLE1BQUwsR0FBYyxLQUFLRCxNQUFMLENBQVlFLElBQVosSUFBb0IsRUFBbEM7QUFDQSxRQUFNQyxNQUFNLEtBQUtDLElBQUwsR0FBWUMsU0FBU0MsYUFBVCxDQUF1QixLQUFLTixNQUFMLENBQVlPLEVBQW5DLENBQXhCO0FBQ0EsUUFBTUMsU0FBUyx1QkFBUSx5QkFBYUwsR0FBYixDQUFSLENBQWY7QUFDSCxDOztrQkFOZ0JMLFE7Ozs7Ozs7Ozs7OztRQ0hMVyxZLEdBQUFBLFk7QUFKaEI7Ozs7QUFJTyxTQUFTQSxZQUFULENBQXNCQyxJQUF0QixFQUE0QjtBQUMvQixRQUFHQSxLQUFLQyxVQUFSLEVBQW9CO0FBQ2hCLGVBQU9ELEtBQUtDLFVBQVo7QUFDSCxLQUZELE1BRU87QUFDSCxZQUFNQyxZQUFZUCxTQUFTUSxhQUFULENBQXVCLEtBQXZCLENBQWxCO0FBQ0FELGtCQUFVRSxXQUFWLENBQXNCSixLQUFLSyxTQUFMLENBQWUsSUFBZixDQUF0QjtBQUNBLGVBQU9ILFVBQVVJLFNBQWpCO0FBQ0g7QUFDSixDOzs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsImZpbGUiOiJJVVN0dWRpby5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIklVU3R1ZGlvXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIklVU3R1ZGlvXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDBhZDY4N2U3ZGE0ZTZhYTg3M2ZmIiwiLyoqXG4gKiBAZGVzY3JpcHRpb24gYXBwIGVudHJ5XG4gKiBAYXV0aG9yIHdpbmdcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2luZGV4JylbJ2RlZmF1bHQnXVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnVtZC5qcyIsIi8qKlxuICogQGRlc2NyaXB0aW9uIGNvbXBpbGVcbiAqIEBhdXRob3Igd2luZ1xuICovXG5pbXBvcnQgZ2V0VG9rZW5zIGZyb20gJy4vZ2V0VG9rZW5zJztcbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlJztcbmltcG9ydCBnZW5lcmF0ZSBmcm9tICcuL2dlbmVyYXRlJztcblxuY29uc3QgY29tcGlsZSA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgY29uc3QgdG9rZW5zID0gZ2V0VG9rZW5zKHRlbXBsYXRlKTtcbiAgICBjb25zdCBhc3QgPSBwYXJzZSh0b2tlbnMpO1xuICAgIHJldHVybiBnZW5lcmF0ZShhc3QpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb21waWxlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21waWxlci9jb21waWxlLmpzIiwiLyoqXG4gKiBAZGVzY3JpcHRpb24gZ2VuZXJhdGUgZnJvbSBhc3RcbiAqIEBhdXRob3Igd2luZ1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlKGFzdCkge1xuICAgIGxldCBnZW5lcmF0ZSA9ICcnO1xuICAgIHJldHVybiBnZW5lcmF0ZTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcGlsZXIvZ2VuZXJhdGUuanMiLCIvKipcbiAqIEBkZXNjcmlwdGlvbiBnZXQgdG9rZW5zIGZyb20gZG9jdW1lbnRcbiAqIEBhdXRob3Igd2luZ1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFRva2Vucyh0ZW1wbGF0ZSkge1xuICAgIGNvbnNvbGUubG9nKHRlbXBsYXRlKTtcbiAgICBsZXQgdG9rZW5zID0gW107XG4gICAgcmV0dXJuIHRva2Vucztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcGlsZXIvZ2V0VG9rZW5zLmpzIiwiLyoqXG4gKiBAZGVzY3JpcHRpb24gcGFyc2UgYXN0IGZyb20gdG9rZW5zXG4gKiBAYXV0aG9yIHdpbmdcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZSh0b2tlbnMpIHtcbiAgICBsZXQgYXN0ID0ge307XG4gICAgcmV0dXJuIGFzdDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcGlsZXIvcGFyc2UuanMiLCIvKipcbiAqIEBkZXNjcmlwdGlvbiBhcHAgZW50cnlcbiAqIEBhdXRob3Igd2luZ1xuICovXG5pbXBvcnQgSVVTdHVkaW8gZnJvbSAnLi9pbnN0YW5jZSc7XG5cbmV4cG9ydCBkZWZhdWx0IElVU3R1ZGlvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLyoqXG4gKiBAZGVzY3JpcHRpb24gSVVTdHVkaW8gaW5zdGFuY2VcbiAqIEBhdXRob3Igd2luZ1xuICovXG5pbXBvcnQgY29tcGlsZSBmcm9tICcuLi9jb21waWxlci9jb21waWxlJztcbmltcG9ydCB7IGdldE91dGVySFRNTCB9IGZyb20gJy4uL3V0aWxzLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElVU3R1ZGlvIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHRoaXMuJCRvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgdGhpcy4kJGRhdGEgPSB0aGlzLiQkb3B0cy5kYXRhIHx8IHt9O1xuICAgICAgICBjb25zdCBfZWwgPSB0aGlzLiQkZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuJCRvcHRzLmVsKTtcbiAgICAgICAgY29uc3QgcmVuZGVyID0gY29tcGlsZShnZXRPdXRlckhUTUwoX2VsKSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbnN0YW5jZS9pbmRleC5qcyIsIi8qKlxuICogQGRlc2NyaXB0aW9uIHV0aWxzIG9mIGRvbVxuICogQGF1dGhvciB3aW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPdXRlckhUTUwoZWxlbSkge1xuICAgIGlmKGVsZW0ub3V0dGVySFRNTCkge1xuICAgICAgICByZXR1cm4gZWxlbS5vdXR0ZXJIVE1MO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyLmlubmVySFRNTDtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvZG9tLmpzIiwiLyoqXG4gKiBAZGVzY3JpcHRpb24gdXRpbHNcbiAqIEBhdXRob3Igd2luZ1xuICovXG4gZXhwb3J0ICogZnJvbSAnLi9kb20nO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=