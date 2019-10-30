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
/******/ 	return __webpack_require__(__webpack_require__.s = "./browser/test.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./browser/test.ts":
/*!*************************!*\
  !*** ./browser/test.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_creatElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/creatElement */ "./src/creatElement.ts");
/* harmony import */ var _src_mount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/mount */ "./src/mount.ts");



let Header = function (props) {
  return Object(_src_creatElement__WEBPACK_IMPORTED_MODULE_0__["default"])('div', undefined, props.text);
};

let Footer = function (props) {
  return Object(_src_creatElement__WEBPACK_IMPORTED_MODULE_0__["default"])('div', undefined, props.text);
};

let App = function (props) {
  return Object(_src_creatElement__WEBPACK_IMPORTED_MODULE_0__["default"])('section', undefined, [Object(_src_creatElement__WEBPACK_IMPORTED_MODULE_0__["default"])(Header, {
    text: 'this is header'
  }), Object(_src_creatElement__WEBPACK_IMPORTED_MODULE_0__["default"])(Footer, {
    text: 'this is footer'
  })]);
};

const app = Object(_src_creatElement__WEBPACK_IMPORTED_MODULE_0__["default"])(App, undefined);
Object(_src_mount__WEBPACK_IMPORTED_MODULE_1__["default"])(app, document.getElementById('app'));
console.log(app);

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


function inflate(element) {
  if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isFunctionElement"])(element)) {
    const {
      states,
      props,
      type
    } = element;
    Object(_useState__WEBPACK_IMPORTED_MODULE_0__["setStates"])(states);
    const renderElement = type(Object.assign({}, props, {
      children: element.children
    })); // if (
    //   isFunctionElement(renderElement) &&
    //   isFunctionElement(element.renderElement) &&
    //   renderElement.type === element.renderElement.type
    // ) {
    //   renderElement.states = element.renderElement.states;
    // }

    element.renderElement = renderElement;

    if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isElement"])(renderElement)) {
      renderElement.parent = element;
      inflate(renderElement);
    }
  } else {
    if (element.children instanceof Array) {
      element.children.forEach(child => {
        if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isElement"])(child)) {
          inflate(child);
        }
      });
    } else if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isElement"])(element.children)) {
      inflate(element.children);
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
function setStates(states) {
  _states = states;
  _index = 0;
}
function useState(initialValue) {
  if (_states.length <= _index) {
    _states.push(initialValue);
  }

  const value = _states[_index];
  _index++;
  return [value];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYnJvd3Nlci90ZXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9jcmVhdEVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZmxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdW50LnRzIiwid2VicGFjazovLy8uL3NyYy91c2VTdGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6WyJIZWFkZXIiLCJwcm9wcyIsImNyZWF0ZUVsZW1lbnQiLCJ1bmRlZmluZWQiLCJ0ZXh0IiwiRm9vdGVyIiwiQXBwIiwiYXBwIiwibW91bnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29uc29sZSIsImxvZyIsInR5cGUiLCJjaGlsZHJlbiIsInN0YXRlcyIsImluZmxhdGUiLCJlbGVtZW50IiwiaXNGdW5jdGlvbkVsZW1lbnQiLCJzZXRTdGF0ZXMiLCJyZW5kZXJFbGVtZW50IiwiT2JqZWN0IiwiYXNzaWduIiwiaXNFbGVtZW50IiwicGFyZW50IiwiQXJyYXkiLCJmb3JFYWNoIiwiY2hpbGQiLCJfbW91bnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiU3RyaW5nIiwiZG9tIiwiX3N0YXRlcyIsIl9pbmRleCIsInVzZVN0YXRlIiwiaW5pdGlhbFZhbHVlIiwibGVuZ3RoIiwicHVzaCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFp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LGFBQU8sQ0FBQ0gsUUFBUixDQUFpQlksT0FBakIsQ0FBeUJDLEtBQUssSUFBSTtBQUNoQ0MsY0FBTSxDQUFDRCxLQUFELEVBQVFLLEdBQVIsQ0FBTjtBQUNELE9BRkQ7QUFHRCxLQUpELE1BSU87QUFDTEosWUFBTSxDQUFDWCxPQUFPLENBQUNILFFBQVQsRUFBbUJrQixHQUFuQixDQUFOO0FBQ0Q7QUFDRjtBQUNGLEM7Ozs7Ozs7Ozs7OztBQzVCRDtBQUFBO0FBQUE7QUFBQSxJQUFJQyxPQUFjLEdBQUcsRUFBckI7QUFDQSxJQUFJQyxNQUFjLEdBQUcsQ0FBckI7QUFFTyxTQUFTZixTQUFULENBQW1CSixNQUFuQixFQUFrQztBQUN2Q2tCLFNBQU8sR0FBR2xCLE1BQVY7QUFDQW1CLFFBQU0sR0FBRyxDQUFUO0FBQ0Q7QUFFTSxTQUFTQyxRQUFULENBQWtCQyxZQUFsQixFQUFxQztBQUMxQyxNQUFJSCxPQUFPLENBQUNJLE1BQVIsSUFBa0JILE1BQXRCLEVBQThCO0FBQzVCRCxXQUFPLENBQUNLLElBQVIsQ0FBYUYsWUFBYjtBQUNEOztBQUNELFFBQU1HLEtBQUssR0FBR04sT0FBTyxDQUFDQyxNQUFELENBQXJCO0FBQ0FBLFFBQU07QUFDTixTQUFPLENBQUNLLEtBQUQsQ0FBUDtBQUNELEM7Ozs7Ozs7Ozs7OztBQ2JEO0FBQUE7QUFBQTtBQUFPLFNBQVNoQixTQUFULENBQW1CTixPQUFuQixFQUF1RDtBQUM1RCxTQUFPLE9BQU9BLE9BQVAsS0FBbUIsUUFBbkIsSUFBK0JBLE9BQU8sS0FBSyxJQUFsRDtBQUNEO0FBRU0sU0FBU0MsaUJBQVQsQ0FDTEQsT0FESyxFQUVpQztBQUN0QyxTQUNFLE9BQU9BLE9BQVAsS0FBbUIsUUFBbkIsSUFDQUEsT0FBTyxLQUFLLElBRFosSUFFQSxPQUFPQSxPQUFPLENBQUNKLElBQWYsS0FBd0IsVUFIMUI7QUFLRCxDIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Jyb3dzZXIvdGVzdC50c1wiKTtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50LCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi4vc3JjL2NyZWF0RWxlbWVudCc7XG5pbXBvcnQgbW91bnQgZnJvbSAnLi4vc3JjL21vdW50JztcblxubGV0IEhlYWRlcjogRnVuY3Rpb25Db21wb25lbnQ8eyB0ZXh0OiBzdHJpbmcgfT4gPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHVuZGVmaW5lZCwgcHJvcHMudGV4dClcbn1cblxubGV0IEZvb3RlcjogRnVuY3Rpb25Db21wb25lbnQ8eyB0ZXh0OiBzdHJpbmcgfT4gPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHVuZGVmaW5lZCwgcHJvcHMudGV4dClcbn1cblxubGV0IEFwcDogRnVuY3Rpb25Db21wb25lbnQ8dW5kZWZpbmVkPiA9IGZ1bmN0aW9uIChwcm9wcykge1xuICByZXR1cm4gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicsIHVuZGVmaW5lZCwgW1xuICAgIGNyZWF0ZUVsZW1lbnQoSGVhZGVyLCB7IHRleHQ6ICd0aGlzIGlzIGhlYWRlcicgfSksXG4gICAgY3JlYXRlRWxlbWVudChGb290ZXIsIHsgdGV4dDogJ3RoaXMgaXMgZm9vdGVyJyB9KSxcbiAgXSlcbn1cblxuY29uc3QgYXBwID0gY3JlYXRlRWxlbWVudChBcHAsIHVuZGVmaW5lZClcblxubW91bnQoYXBwLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykgYXMgYW55KVxuXG5jb25zb2xlLmxvZyhhcHApXG4iLCJleHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgW3Byb3BzOiBzdHJpbmddOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBGdW5jdGlvblByb3BzID0ge1xuICBjaGlsZHJlbj86IENoaWxkIHwgQ2hpbGRbXTtcbn07XG5cbmV4cG9ydCB0eXBlIFVzZXJQcm9wcyA9IFByb3BzIHwgdW5kZWZpbmVkO1xuXG5leHBvcnQgdHlwZSBGdW5jdGlvbkNvbXBvbmVudDxUIGV4dGVuZHMgVXNlclByb3BzPiA9IChcbiAgcHJvcHM6IFQgZXh0ZW5kcyB1bmRlZmluZWQgPyBGdW5jdGlvblByb3BzIDogKFQgJiBGdW5jdGlvblByb3BzKVxuKSA9PiBDaGlsZDtcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlRWxlbWVudCB7XG4gIGNoaWxkcmVuPzogQ2hpbGQgfCBDaGlsZFtdO1xuICBwYXJlbnQ/OiBFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZ1bmN0aW9uRWxlbWVudDxUIGV4dGVuZHMgRnVuY3Rpb25Db21wb25lbnQ8YW55Pj5cbiAgZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIHR5cGU6IFQ7XG4gIHN0YXRlczogYW55W107XG4gIHByb3BzOiBUIGV4dGVuZHMgRnVuY3Rpb25Db21wb25lbnQ8aW5mZXIgVT4gPyBVIDogbmV2ZXI7XG4gIHJlbmRlckVsZW1lbnQ/OiBDaGlsZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBET01FbGVtZW50IGV4dGVuZHMgQmFzZUVsZW1lbnQge1xuICB0eXBlOiBzdHJpbmc7XG4gIHByb3BzPzogUHJvcHM7XG59XG5cbmV4cG9ydCB0eXBlIEVsZW1lbnQgPSBET01FbGVtZW50IHwgRnVuY3Rpb25FbGVtZW50PGFueT47XG5leHBvcnQgdHlwZSBQcmltaXRpdmUgPSBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkO1xuZXhwb3J0IHR5cGUgQ2hpbGQgPSBFbGVtZW50IHwgUHJpbWl0aXZlO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50PFQgZXh0ZW5kcyBGdW5jdGlvbkNvbXBvbmVudDxhbnk+PihcbiAgdHlwZTogVCxcbiAgcHJvcHM6IFQgZXh0ZW5kcyBGdW5jdGlvbkNvbXBvbmVudDxpbmZlciBVPiA/IFUgOiBuZXZlcixcbiAgY2hpbGRyZW4/OiBDaGlsZCB8IENoaWxkW11cbik6IEZ1bmN0aW9uRWxlbWVudDxUPjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoXG4gIHR5cGU6IHN0cmluZyxcbiAgcHJvcHM/OiBQcm9wcyxcbiAgY2hpbGRyZW4/OiBDaGlsZCB8IENoaWxkW11cbik6IERPTUVsZW1lbnQ7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50PFQgZXh0ZW5kcyBGdW5jdGlvbkNvbXBvbmVudDxhbnk+PihcbiAgdHlwZTogc3RyaW5nIHwgVCxcbiAgcHJvcHM/OiBhbnksXG4gIGNoaWxkcmVuPzogQ2hpbGQgfCBDaGlsZFtdXG4pOiBGdW5jdGlvbkVsZW1lbnQ8VD4gfCBET01FbGVtZW50IHtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlLFxuICAgICAgcHJvcHMsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlLFxuICAgICAgc3RhdGVzOiBbXSxcbiAgICAgIHByb3BzOiBwcm9wcyBhcyBhbnksXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtZW50IH0gZnJvbSAnLi9jcmVhdEVsZW1lbnQnO1xuaW1wb3J0IHsgc2V0U3RhdGVzIH0gZnJvbSAnLi91c2VTdGF0ZSc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uRWxlbWVudCwgaXNFbGVtZW50IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5mbGF0ZShlbGVtZW50OiBFbGVtZW50KSB7XG4gIGlmIChpc0Z1bmN0aW9uRWxlbWVudChlbGVtZW50KSkge1xuICAgIGNvbnN0IHsgc3RhdGVzLCBwcm9wcywgdHlwZSB9ID0gZWxlbWVudDtcbiAgICBzZXRTdGF0ZXMoc3RhdGVzKTtcbiAgICBjb25zdCByZW5kZXJFbGVtZW50ID0gdHlwZShcbiAgICAgIE9iamVjdC5hc3NpZ24oe30sIHByb3BzLCB7IGNoaWxkcmVuOiBlbGVtZW50LmNoaWxkcmVuIH0pXG4gICAgKTtcbiAgICAvLyBpZiAoXG4gICAgLy8gICBpc0Z1bmN0aW9uRWxlbWVudChyZW5kZXJFbGVtZW50KSAmJlxuICAgIC8vICAgaXNGdW5jdGlvbkVsZW1lbnQoZWxlbWVudC5yZW5kZXJFbGVtZW50KSAmJlxuICAgIC8vICAgcmVuZGVyRWxlbWVudC50eXBlID09PSBlbGVtZW50LnJlbmRlckVsZW1lbnQudHlwZVxuICAgIC8vICkge1xuICAgIC8vICAgcmVuZGVyRWxlbWVudC5zdGF0ZXMgPSBlbGVtZW50LnJlbmRlckVsZW1lbnQuc3RhdGVzO1xuICAgIC8vIH1cbiAgICBlbGVtZW50LnJlbmRlckVsZW1lbnQgPSByZW5kZXJFbGVtZW50O1xuICAgIGlmIChpc0VsZW1lbnQocmVuZGVyRWxlbWVudCkpIHtcbiAgICAgIHJlbmRlckVsZW1lbnQucGFyZW50ID0gZWxlbWVudDtcbiAgICAgIGluZmxhdGUocmVuZGVyRWxlbWVudCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChlbGVtZW50LmNoaWxkcmVuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGVsZW1lbnQuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGlmIChpc0VsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgICAgaW5mbGF0ZShjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNFbGVtZW50KGVsZW1lbnQuY2hpbGRyZW4pKSB7XG4gICAgICBpbmZsYXRlKGVsZW1lbnQuY2hpbGRyZW4pO1xuICAgIH0gLy8gZWxzZSBub3RoaW5nIHRvIGRvXG4gIH1cbn1cbiIsImltcG9ydCB7IEVsZW1lbnQsIENoaWxkIH0gZnJvbSAnLi9jcmVhdEVsZW1lbnQnO1xuaW1wb3J0IHsgaXNFbGVtZW50LCBpc0Z1bmN0aW9uRWxlbWVudCB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgaW5mbGF0ZSBmcm9tICcuL2luZmxhdGUnO1xuXG5mdW5jdGlvbiBfbW91bnQoZWxlbWVudDogQ2hpbGQsIHBhcmVudDogSFRNTEVsZW1lbnQpIHtcbiAgaWYgKGlzRWxlbWVudChlbGVtZW50KSkge1xuICAgIG1vdW50KGVsZW1lbnQsIHBhcmVudCk7XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhlbGVtZW50KSkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1vdW50KGVsZW1lbnQ6IEVsZW1lbnQsIHBhcmVudDogSFRNTEVsZW1lbnQpIHtcbiAgaW5mbGF0ZShlbGVtZW50KTtcbiAgaWYgKGlzRnVuY3Rpb25FbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgY29uc3QgeyByZW5kZXJFbGVtZW50IH0gPSBlbGVtZW50O1xuICAgIF9tb3VudChyZW5kZXJFbGVtZW50LCBwYXJlbnQpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudC50eXBlKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZG9tKTtcbiAgICBpZiAoZWxlbWVudC5jaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBlbGVtZW50LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBfbW91bnQoY2hpbGQsIGRvbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgX21vdW50KGVsZW1lbnQuY2hpbGRyZW4sIGRvbSk7XG4gICAgfVxuICB9XG59XG4iLCJsZXQgX3N0YXRlczogYW55W10gPSBbXTtcbmxldCBfaW5kZXg6IG51bWJlciA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGF0ZXMoc3RhdGVzOiBhbnlbXSkge1xuICBfc3RhdGVzID0gc3RhdGVzO1xuICBfaW5kZXggPSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlU3RhdGUoaW5pdGlhbFZhbHVlOiBhbnkpIHtcbiAgaWYgKF9zdGF0ZXMubGVuZ3RoIDw9IF9pbmRleCkge1xuICAgIF9zdGF0ZXMucHVzaChpbml0aWFsVmFsdWUpO1xuICB9XG4gIGNvbnN0IHZhbHVlID0gX3N0YXRlc1tfaW5kZXhdO1xuICBfaW5kZXgrKztcbiAgcmV0dXJuIFt2YWx1ZV07XG59XG4iLCJpbXBvcnQgeyBGdW5jdGlvbkVsZW1lbnQsIEVsZW1lbnQsIENoaWxkIH0gZnJvbSAnLi9jcmVhdEVsZW1lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNFbGVtZW50KGVsZW1lbnQ6IENoaWxkKTogZWxlbWVudCBpcyBFbGVtZW50IHtcbiAgcmV0dXJuIHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0JyAmJiBlbGVtZW50ICE9PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbkVsZW1lbnQoXG4gIGVsZW1lbnQ/OiBDaGlsZFxuKTogZWxlbWVudCBpcyBGdW5jdGlvbkVsZW1lbnQ8YW55LCBhbnk+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcgJiZcbiAgICBlbGVtZW50ICE9PSBudWxsICYmXG4gICAgdHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==