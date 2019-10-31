/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./browser/test1.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./browser/test1.ts":
/*!**************************!*\
  !*** ./browser/test1.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_creatElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/creatElement */ "./src/creatElement.ts");
/* harmony import */ var _src_mount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/mount */ "./src/mount.ts");
/* harmony import */ var _src_useState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/useState */ "./src/useState.ts");




let _setName;

let _setAge;

let _setB;

let A = function () {
  const [name, setName] = Object(_src_useState__WEBPACK_IMPORTED_MODULE_2__["useState"])('a');
  const [age, setAge] = Object(_src_useState__WEBPACK_IMPORTED_MODULE_2__["useState"])(20);
  _setName = setName;
  _setAge = setAge;
  return `${name}:${age}`;
};

let B = function () {
  const [, setB] = Object(_src_useState__WEBPACK_IMPORTED_MODULE_2__["useState"])('');
  _setB = setB;
  return Object(_src_creatElement__WEBPACK_IMPORTED_MODULE_0__["default"])(A, undefined);
};

const b = Object(_src_creatElement__WEBPACK_IMPORTED_MODULE_0__["default"])(B, undefined);
Object(_src_mount__WEBPACK_IMPORTED_MODULE_1__["default"])(b, document.getElementById('app'));

_setAge(21);

_setName('aa');

_setB();

/***/ }),

/***/ "./src/creatElement.ts":
/*!*****************************!*\
  !*** ./src/creatElement.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
function createElement(type, props, children) {
  if (typeof type === 'string') {
    return {
      type,
      props,
      children: children
    };
  } else {
    return {
      type,
      states: [],
      props: props,
      children: children
    };
  }
}

/***/ }),

/***/ "./src/inflate.ts":
/*!************************!*\
  !*** ./src/inflate.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return inflate; });
/* harmony import */ var _useState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useState */ "./src/useState.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.ts");


function inflate(element, subsequent = false) {
  if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isFunctionElement"])(element)) {
    const {
      states,
      props,
      type
    } = element;
    Object(_useState__WEBPACK_IMPORTED_MODULE_0__["setStates"])(states, (index, value) => {
      states[index] = value;
      inflate(element, true);
    });
    const renderElement = type(Object.assign({}, props, {
      children: element.children
    }));

    if (subsequent && Object(_util__WEBPACK_IMPORTED_MODULE_1__["isFunctionElement"])(renderElement) && Object(_util__WEBPACK_IMPORTED_MODULE_1__["isFunctionElement"])(element.renderElement) && renderElement.type === element.renderElement.type) {
      renderElement.states = element.renderElement.states;
      console.log(renderElement.states);
    }

    element.renderElement = renderElement;

    if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isElement"])(renderElement)) {
      renderElement.parent = element;
      inflate(renderElement, subsequent);
    }
  } else {
    if (element.children instanceof Array) {
      element.children.forEach(child => {
        if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isElement"])(child)) {
          inflate(child, subsequent);
        }
      });
    } else if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isElement"])(element.children)) {
      inflate(element.children, subsequent);
    } // else nothing to do

  }
}

/***/ }),

/***/ "./src/mount.ts":
/*!**********************!*\
  !*** ./src/mount.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mount; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _inflate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inflate */ "./src/inflate.ts");



function _mount(element, parent) {
  if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["isElement"])(element)) {
    mount(element, parent);
  } else {
    parent.appendChild(document.createTextNode(String(element)));
  }
}

function mount(element, parent) {
  Object(_inflate__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

  if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["isFunctionElement"])(element)) {
    const {
      renderElement
    } = element;

    _mount(renderElement, parent);
  } else {
    const dom = document.createElement(element.type);
    parent.appendChild(dom);

    if (element.children instanceof Array) {
      element.children.forEach(child => {
        _mount(child, dom);
      });
    } else {
      _mount(element.children, dom);
    }
  }
}

/***/ }),

/***/ "./src/useState.ts":
/*!*************************!*\
  !*** ./src/useState.ts ***!
  \*************************/
/*! exports provided: setStates, useState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStates", function() { return setStates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return useState; });
let _states = [];
let _index = 0;

let _setState;

function setStates(states, setState) {
  _states = states;
  _index = 0;
  _setState = setState;
}
function useState(initialValue) {
  const _innerIndex = _index;
  const _innerSetState = _setState;

  if (_states.length <= _index) {
    _states.push(initialValue);
  }

  const value = _states[_index];
  _index++;
  return [value, newVal => {
    _innerSetState(_innerIndex, newVal);
  }];
}

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: isElement, isFunctionElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return isElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunctionElement", function() { return isFunctionElement; });
function isElement(element) {
  return typeof element === 'object' && element !== null;
}
function isFunctionElement(element) {
  return typeof element === 'object' && element !== null && typeof element.type === 'function';
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYnJvd3Nlci90ZXN0MS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY3JlYXRFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9pbmZsYXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tb3VudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXNlU3RhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiXSwibmFtZXMiOlsiX3NldE5hbWUiLCJfc2V0QWdlIiwiX3NldEIiLCJBIiwibmFtZSIsInNldE5hbWUiLCJ1c2VTdGF0ZSIsImFnZSIsInNldEFnZSIsIkIiLCJzZXRCIiwiY3JlYXRlRWxlbWVudCIsInVuZGVmaW5lZCIsImIiLCJtb3VudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0eXBlIiwicHJvcHMiLCJjaGlsZHJlbiIsInN0YXRlcyIsImluZmxhdGUiLCJlbGVtZW50Iiwic3Vic2VxdWVudCIsImlzRnVuY3Rpb25FbGVtZW50Iiwic2V0U3RhdGVzIiwiaW5kZXgiLCJ2YWx1ZSIsInJlbmRlckVsZW1lbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJjb25zb2xlIiwibG9nIiwiaXNFbGVtZW50IiwicGFyZW50IiwiQXJyYXkiLCJmb3JFYWNoIiwiY2hpbGQiLCJfbW91bnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiU3RyaW5nIiwiZG9tIiwiX3N0YXRlcyIsIl9pbmRleCIsIl9zZXRTdGF0ZSIsInNldFN0YXRlIiwiaW5pdGlhbFZhbHVlIiwiX2lubmVySW5kZXgiLCJfaW5uZXJTZXRTdGF0ZSIsImxlbmd0aCIsInB1c2giLCJuZXdWYWwiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FB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SCxTQUFPLEdBQUd2QixNQUFWO0FBQ0F3QixRQUFNLEdBQUcsQ0FBVDtBQUNBQyxXQUFTLEdBQUdDLFFBQVo7QUFDRDtBQUVNLFNBQVN4QyxRQUFULENBQXFCeUMsWUFBckIsRUFBOEQ7QUFDbkUsUUFBTUMsV0FBVyxHQUFHSixNQUFwQjtBQUNBLFFBQU1LLGNBQWMsR0FBR0osU0FBdkI7O0FBQ0EsTUFBSUYsT0FBTyxDQUFDTyxNQUFSLElBQWtCTixNQUF0QixFQUE4QjtBQUM1QkQsV0FBTyxDQUFDUSxJQUFSLENBQWFKLFlBQWI7QUFDRDs7QUFDRCxRQUFNcEIsS0FBSyxHQUFHZ0IsT0FBTyxDQUFDQyxNQUFELENBQXJCO0FBQ0FBLFFBQU07QUFDTixTQUFPLENBQUNqQixLQUFELEVBQVN5QixNQUFELElBQWU7QUFDNUJILGtCQUFjLENBQUNELFdBQUQsRUFBY0ksTUFBZCxDQUFkO0FBQ0QsR0FGTSxDQUFQO0FBR0QsQzs7Ozs7Ozs7Ozs7O0FDdkJEO0FBQUE7QUFBQTtBQUFPLFNBQVNuQixTQUFULENBQW1CWCxPQUFuQixFQUF1RDtBQUM1RCxTQUFPLE9BQU9BLE9BQVAsS0FBbUIsUUFBbkIsSUFBK0JBLE9BQU8sS0FBSyxJQUFsRDtBQUNEO0FBRU0sU0FBU0UsaUJBQVQsQ0FDTEYsT0FESyxFQUU0QjtBQUNqQyxTQUNFLE9BQU9BLE9BQVAsS0FBbUIsUUFBbkIsSUFDQUEsT0FBTyxLQUFLLElBRFosSUFFQSxPQUFPQSxPQUFPLENBQUNMLElBQWYsS0FBd0IsVUFIMUI7QUFLRCxDIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Jyb3dzZXIvdGVzdDEudHNcIik7XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCwgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL3NyYy9jcmVhdEVsZW1lbnQnO1xuaW1wb3J0IG1vdW50IGZyb20gJy4uL3NyYy9tb3VudCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJy4uL3NyYy91c2VTdGF0ZSc7XG5cbmxldCBfc2V0TmFtZTogYW55O1xubGV0IF9zZXRBZ2U6IGFueTtcbmxldCBfc2V0QjogYW55O1xubGV0IEE6IEZ1bmN0aW9uQ29tcG9uZW50ID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IFtuYW1lLCBzZXROYW1lXSA9IHVzZVN0YXRlKCdhJyk7XG4gIGNvbnN0IFthZ2UsIHNldEFnZV0gPSB1c2VTdGF0ZSgyMClcbiAgX3NldE5hbWUgPSBzZXROYW1lXG4gIF9zZXRBZ2UgPSBzZXRBZ2VcbiAgcmV0dXJuIGAke25hbWV9OiR7YWdlfWA7XG59O1xubGV0IEI6IEZ1bmN0aW9uQ29tcG9uZW50ID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IFssIHNldEJdID0gdXNlU3RhdGUoJycpXG4gIF9zZXRCID0gc2V0QlxuICByZXR1cm4gY3JlYXRlRWxlbWVudChBLCB1bmRlZmluZWQpXG59XG5jb25zdCBiID0gY3JlYXRlRWxlbWVudChCLCB1bmRlZmluZWQpXG5cbm1vdW50KGIsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSBhcyBhbnkpXG5cbl9zZXRBZ2UoMjEpXG5fc2V0TmFtZSgnYWEnKVxuX3NldEIoKVxuIiwiZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIFtwcm9wczogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgRnVuY3Rpb25Qcm9wcyA9IHtcbiAgY2hpbGRyZW4/OiBDaGlsZCB8IENoaWxkW107XG59O1xuXG5leHBvcnQgdHlwZSBVc2VyUHJvcHMgPSBQcm9wcyB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IHR5cGUgRnVuY3Rpb25Db21wb25lbnQ8VCBleHRlbmRzIFVzZXJQcm9wcyA9IHVuZGVmaW5lZD4gPSAoXG4gIHByb3BzOiBUIGV4dGVuZHMgdW5kZWZpbmVkID8gRnVuY3Rpb25Qcm9wcyA6IChUICYgRnVuY3Rpb25Qcm9wcylcbikgPT4gQ2hpbGQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUVsZW1lbnQge1xuICBjaGlsZHJlbj86IENoaWxkIHwgQ2hpbGRbXTtcbiAgcGFyZW50PzogRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGdW5jdGlvbkVsZW1lbnQ8VCBleHRlbmRzIEZ1bmN0aW9uQ29tcG9uZW50PlxuICBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgdHlwZTogVDtcbiAgc3RhdGVzOiBhbnlbXTtcbiAgcHJvcHM6IFQgZXh0ZW5kcyBGdW5jdGlvbkNvbXBvbmVudDxpbmZlciBVPiA/IFUgOiBuZXZlcjtcbiAgcmVuZGVyRWxlbWVudD86IENoaWxkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERPTUVsZW1lbnQgZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIHR5cGU6IHN0cmluZztcbiAgcHJvcHM/OiBQcm9wcztcbn1cblxuZXhwb3J0IHR5cGUgRWxlbWVudCA9IERPTUVsZW1lbnQgfCBGdW5jdGlvbkVsZW1lbnQ8YW55PjtcbmV4cG9ydCB0eXBlIFByaW1pdGl2ZSA9IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQ7XG5leHBvcnQgdHlwZSBDaGlsZCA9IEVsZW1lbnQgfCBQcmltaXRpdmU7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQ8VCBleHRlbmRzIEZ1bmN0aW9uQ29tcG9uZW50PGFueT4+KFxuICB0eXBlOiBULFxuICBwcm9wczogVCBleHRlbmRzIEZ1bmN0aW9uQ29tcG9uZW50PGluZmVyIFU+ID8gVSA6IG5ldmVyLFxuICBjaGlsZHJlbj86IENoaWxkIHwgQ2hpbGRbXVxuKTogRnVuY3Rpb25FbGVtZW50PFQ+O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudDxUIGV4dGVuZHMgc3RyaW5nPihcbiAgdHlwZTogVCxcbiAgcHJvcHM/OiBQcm9wcyxcbiAgY2hpbGRyZW4/OiBDaGlsZCB8IENoaWxkW11cbik6IERPTUVsZW1lbnQ7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50PFQgZXh0ZW5kcyBGdW5jdGlvbkNvbXBvbmVudD4oXG4gIHR5cGU6IFQsXG4gIHByb3BzPzogYW55LFxuICBjaGlsZHJlbj86IENoaWxkIHwgQ2hpbGRbXVxuKTogRnVuY3Rpb25FbGVtZW50PFQ+IHwgRE9NRWxlbWVudCB7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZSxcbiAgICAgIHByb3BzLFxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZSxcbiAgICAgIHN0YXRlczogW10sXG4gICAgICBwcm9wczogcHJvcHMgYXMgYW55LFxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gJy4vY3JlYXRFbGVtZW50JztcbmltcG9ydCB7IHNldFN0YXRlcyB9IGZyb20gJy4vdXNlU3RhdGUnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbkVsZW1lbnQsIGlzRWxlbWVudCB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluZmxhdGUoZWxlbWVudDogRWxlbWVudCwgc3Vic2VxdWVudDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gIGlmIChpc0Z1bmN0aW9uRWxlbWVudChlbGVtZW50KSkge1xuICAgIGNvbnN0IHsgc3RhdGVzLCBwcm9wcywgdHlwZSB9ID0gZWxlbWVudDtcbiAgICBzZXRTdGF0ZXMoc3RhdGVzLCAoaW5kZXg6IG51bWJlciwgdmFsdWU6IHVua25vd24pID0+IHtcbiAgICAgIHN0YXRlc1tpbmRleF0gPSB2YWx1ZVxuICAgICAgaW5mbGF0ZShlbGVtZW50LCB0cnVlKVxuICAgIH0pO1xuICAgIGNvbnN0IHJlbmRlckVsZW1lbnQgPSB0eXBlKFxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMsIHsgY2hpbGRyZW46IGVsZW1lbnQuY2hpbGRyZW4gfSlcbiAgICApO1xuICAgIGlmIChcbiAgICAgIHN1YnNlcXVlbnQgJiZcbiAgICAgIGlzRnVuY3Rpb25FbGVtZW50KHJlbmRlckVsZW1lbnQpICYmXG4gICAgICBpc0Z1bmN0aW9uRWxlbWVudChlbGVtZW50LnJlbmRlckVsZW1lbnQpICYmXG4gICAgICByZW5kZXJFbGVtZW50LnR5cGUgPT09IGVsZW1lbnQucmVuZGVyRWxlbWVudC50eXBlXG4gICAgKSB7XG4gICAgICByZW5kZXJFbGVtZW50LnN0YXRlcyA9IGVsZW1lbnQucmVuZGVyRWxlbWVudC5zdGF0ZXM7XG4gICAgICBjb25zb2xlLmxvZyhyZW5kZXJFbGVtZW50LnN0YXRlcylcbiAgICB9XG4gICAgZWxlbWVudC5yZW5kZXJFbGVtZW50ID0gcmVuZGVyRWxlbWVudDtcbiAgICBpZiAoaXNFbGVtZW50KHJlbmRlckVsZW1lbnQpKSB7XG4gICAgICByZW5kZXJFbGVtZW50LnBhcmVudCA9IGVsZW1lbnQ7XG4gICAgICBpbmZsYXRlKHJlbmRlckVsZW1lbnQsIHN1YnNlcXVlbnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZWxlbWVudC5jaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBlbGVtZW50LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZiAoaXNFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgIGluZmxhdGUoY2hpbGQsIHN1YnNlcXVlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzRWxlbWVudChlbGVtZW50LmNoaWxkcmVuKSkge1xuICAgICAgaW5mbGF0ZShlbGVtZW50LmNoaWxkcmVuLCBzdWJzZXF1ZW50KTtcbiAgICB9IC8vIGVsc2Ugbm90aGluZyB0byBkb1xuICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtZW50LCBDaGlsZCB9IGZyb20gJy4vY3JlYXRFbGVtZW50JztcbmltcG9ydCB7IGlzRWxlbWVudCwgaXNGdW5jdGlvbkVsZW1lbnQgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IGluZmxhdGUgZnJvbSAnLi9pbmZsYXRlJztcblxuZnVuY3Rpb24gX21vdW50KGVsZW1lbnQ6IENoaWxkLCBwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XG4gIGlmIChpc0VsZW1lbnQoZWxlbWVudCkpIHtcbiAgICBtb3VudChlbGVtZW50LCBwYXJlbnQpO1xuICB9IGVsc2Uge1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoZWxlbWVudCkpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3VudChlbGVtZW50OiBFbGVtZW50LCBwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XG4gIGluZmxhdGUoZWxlbWVudCk7XG4gIGlmIChpc0Z1bmN0aW9uRWxlbWVudChlbGVtZW50KSkge1xuICAgIGNvbnN0IHsgcmVuZGVyRWxlbWVudCB9ID0gZWxlbWVudDtcbiAgICBfbW91bnQocmVuZGVyRWxlbWVudCwgcGFyZW50KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQudHlwZSk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGRvbSk7XG4gICAgaWYgKGVsZW1lbnQuY2hpbGRyZW4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgZWxlbWVudC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgX21vdW50KGNoaWxkLCBkb20pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9tb3VudChlbGVtZW50LmNoaWxkcmVuLCBkb20pO1xuICAgIH1cbiAgfVxufVxuIiwibGV0IF9zdGF0ZXM6IGFueVtdID0gW107XG5sZXQgX2luZGV4OiBudW1iZXIgPSAwO1xubGV0IF9zZXRTdGF0ZTogU2V0U3RhdGU7XG5cbnR5cGUgU2V0U3RhdGUgPSAoaW5kZXg6IG51bWJlciwgbmV3VmFsOiB1bmtub3duKSA9PiB2b2lkXG5cbnR5cGUgU2V0U3RhdGVCeVVzZXI8VD4gPSAobmV3VmFsOiBUKSA9PiB2b2lkXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGF0ZXMoc3RhdGVzOiB1bmtub3duW10sIHNldFN0YXRlOiBTZXRTdGF0ZSkge1xuICBfc3RhdGVzID0gc3RhdGVzO1xuICBfaW5kZXggPSAwO1xuICBfc2V0U3RhdGUgPSBzZXRTdGF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlU3RhdGU8VD4oaW5pdGlhbFZhbHVlOiBUKTogW1QsIFNldFN0YXRlQnlVc2VyPFQ+XSB7XG4gIGNvbnN0IF9pbm5lckluZGV4ID0gX2luZGV4XG4gIGNvbnN0IF9pbm5lclNldFN0YXRlID0gX3NldFN0YXRlXG4gIGlmIChfc3RhdGVzLmxlbmd0aCA8PSBfaW5kZXgpIHtcbiAgICBfc3RhdGVzLnB1c2goaW5pdGlhbFZhbHVlKTtcbiAgfVxuICBjb25zdCB2YWx1ZSA9IF9zdGF0ZXNbX2luZGV4XTtcbiAgX2luZGV4Kys7XG4gIHJldHVybiBbdmFsdWUsIChuZXdWYWw6IFQpID0+IHtcbiAgICBfaW5uZXJTZXRTdGF0ZShfaW5uZXJJbmRleCwgbmV3VmFsKVxuICB9XTtcbn1cbiIsImltcG9ydCB7IEZ1bmN0aW9uRWxlbWVudCwgRWxlbWVudCwgQ2hpbGQgfSBmcm9tICcuL2NyZWF0RWxlbWVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VsZW1lbnQoZWxlbWVudDogQ2hpbGQpOiBlbGVtZW50IGlzIEVsZW1lbnQge1xuICByZXR1cm4gdHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnICYmIGVsZW1lbnQgIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uRWxlbWVudChcbiAgZWxlbWVudD86IENoaWxkXG4pOiBlbGVtZW50IGlzIEZ1bmN0aW9uRWxlbWVudDxhbnk+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcgJiZcbiAgICBlbGVtZW50ICE9PSBudWxsICYmXG4gICAgdHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==