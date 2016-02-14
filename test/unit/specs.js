/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// wheres
	__webpack_require__(1);
	__webpack_require__(4);
	__webpack_require__(6);
	__webpack_require__(8);
	__webpack_require__(10);
	__webpack_require__(12);

	// order
	__webpack_require__(14);
	__webpack_require__(16);

	// util
	__webpack_require__(18);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);

	// Builder
	__webpack_require__(27);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Where = __webpack_require__(2);

	var _Where2 = _interopRequireDefault(_Where);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Where Clause', function () {
	    it('Instantiation', function () {
	        expect(function () {
	            new _Where2.default();
	        }).toThrow('No field provided for "where" clause.');

	        expect(function () {
	            new _Where2.default('id');
	        }).toThrow('No correct value provided for "where" clause. For better assertion use whereUndefined() instead.');

	        expect(function () {
	            new _Where2.default('id', null);
	        }).toThrow('No correct value provided for "where" clause. For better assertion use whereNull() instead.');

	        expect(function () {
	            new _Where2.default('id', undefined);
	        }).toThrow('No correct value provided for "where" clause. For better assertion use whereUndefined() instead.');

	        expect(function () {
	            new _Where2.default('id', true);
	        }).toThrow('No correct value provided for "where" clause. For better assertion use whereTrue() instead.');

	        expect(function () {
	            new _Where2.default('id', false);
	        }).toThrow('No correct value provided for "where" clause. For better assertion use whereFalse() instead.');

	        expect(function () {
	            new _Where2.default('id', '=', null);
	        }).toThrow('No correct value provided for "where" clause. For better assertion use whereNull() instead.');

	        expect(function () {
	            new _Where2.default('id', '=', undefined);
	        }).toThrow('No correct value provided for "where" clause. For better assertion use whereUndefined() instead.');

	        expect(function () {
	            new _Where2.default('id', '=', true);
	        }).toThrow('No correct value provided for "where" clause. For better assertion use whereTrue() instead.');

	        expect(function () {
	            new _Where2.default('id', '=', false);
	        }).toThrow('No correct value provided for "where" clause. For better assertion use whereFalse() instead.');

	        expect(function () {
	            new _Where2.default('id', '*', 'value');
	        }).toThrow('Unrecognized "*" operator for "where" clause.');

	        var w = new _Where2.default('id', 'value');
	        expect(w.name).toBe('where');
	        expect(w.field).toBe('id');
	        expect(w.operator).toBe('=');
	        expect(w.value).toBe('value');
	        expect(w.not).toBeFalsy();

	        var w = new _Where2.default('id', '!=', 'value');
	        expect(w.name).toBe('where');
	        expect(w.field).toBe('id');
	        expect(w.operator).toBe('!=');
	        expect(w.value).toBe('value');
	        expect(w.not).toBeFalsy();

	        // Where Undefined
	        var w = new _Where2.default('id', '===', undefined);
	        expect(w.name).toBe('where');
	        expect(w.field).toBe('id');
	        expect(w.operator).toBe('===');
	        expect(w.value).toBeUndefined();
	        expect(w.not).toBeFalsy();

	        // Where Null
	        var w = new _Where2.default('id', '!==', null);
	        expect(w.name).toBe('where');
	        expect(w.field).toBe('id');
	        expect(w.operator).toBe('!==');
	        expect(w.value).toBeNull();
	        expect(w.not).toBeFalsy();

	        // Where True
	        var w = new _Where2.default('id', '===', true);
	        expect(w.name).toBe('where');
	        expect(w.field).toBe('id');
	        expect(w.operator).toBe('===');
	        expect(w.value).toBeTruthy();
	        expect(w.not).toBeFalsy();

	        // Where False
	        var w = new _Where2.default('id', '!==', false);
	        expect(w.name).toBe('where');
	        expect(w.field).toBe('id');
	        expect(w.operator).toBe('!==');
	        expect(w.value).toBeFalsy();
	        expect(w.not).toBeFalsy();

	        var w = new _Where2.default('id', '!=', 'value', true);
	        expect(w.name).toBe('whereNot');
	        expect(w.not).toBeTruthy();
	    });

	    it('Resolves correctly', function () {
	        var user = { id: 1, name: 'Alex', attr1: undefined, attr2: null, attr3: true, attr4: false };

	        // Positive
	        expect(new _Where2.default('id', '=', 1).resolve(user.id)).toBeTruthy();
	        expect(new _Where2.default('id', '!=', 1).resolve(user.id)).toBeFalsy();
	        expect(new _Where2.default('id', '>', 1).resolve(user.id)).toBeFalsy();
	        expect(new _Where2.default('id', '<', 1).resolve(user.id)).toBeFalsy();
	        expect(new _Where2.default('id', '<=', 1).resolve(user.id)).toBeTruthy();
	        expect(new _Where2.default('id', '>=', 1).resolve(user.id)).toBeTruthy();

	        // Negative
	        expect(new _Where2.default('id', '=', 1, true).resolve(user.id)).not.toBeTruthy();
	        expect(new _Where2.default('id', '!=', 1, true).resolve(user.id)).not.toBeFalsy();
	        expect(new _Where2.default('id', '>', 1, true).resolve(user.id)).not.toBeFalsy();
	        expect(new _Where2.default('id', '<', 1, true).resolve(user.id)).not.toBeFalsy();
	        expect(new _Where2.default('id', '<=', 1, true).resolve(user.id)).not.toBeTruthy();
	        expect(new _Where2.default('id', '>=', 1, true).resolve(user.id)).not.toBeTruthy();

	        // Strict
	        expect(new _Where2.default('id', '===', 1).resolve(user.id)).toBeTruthy();
	        expect(new _Where2.default('id', '===', '1').resolve(user.id)).toBeFalsy();
	        expect(new _Where2.default('id', '===', 1, true).resolve(user.id)).not.toBeTruthy();
	        expect(new _Where2.default('id', '===', '1', true).resolve(user.id)).not.toBeFalsy();
	        expect(new _Where2.default('id', '!==', 1).resolve(user.id)).not.toBeTruthy();
	        expect(new _Where2.default('id', '!==', '1').resolve(user.id)).not.toBeFalsy();
	        expect(new _Where2.default('id', '!==', 1, true).resolve(user.id)).toBeTruthy();
	        expect(new _Where2.default('id', '!==', '1', true).resolve(user.id)).toBeFalsy();

	        // Where Undefined
	        expect(new _Where2.default('id', '===', undefined).resolve(user.attr1)).toBeTruthy();
	        expect(new _Where2.default('id', '!==', undefined).resolve(user.attr1)).toBeFalsy();
	        expect(new _Where2.default('id', '===', undefined).resolve(user.attr2)).toBeFalsy();

	        // Where Null
	        expect(new _Where2.default('id', '===', null).resolve(user.attr2)).toBeTruthy();
	        expect(new _Where2.default('id', '!==', null).resolve(user.attr2)).toBeFalsy();

	        // Where True
	        expect(new _Where2.default('id', '===', true).resolve(user.attr3)).toBeTruthy();
	        expect(new _Where2.default('id', '!==', true).resolve(user.attr3)).toBeFalsy();

	        // Where False
	        expect(new _Where2.default('id', '===', false).resolve(user.attr4)).toBeTruthy();
	        expect(new _Where2.default('id', '!==', false).resolve(user.attr4)).toBeFalsy();
	    });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Where;

	var _Config = __webpack_require__(3);

	var _Config2 = _interopRequireDefault(_Config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Where(field, operator, value, $not) {
	    this.name = $not ? 'whereNot' : 'where';
	    this.not = $not || false;

	    this.field = field;
	    this.operator = operator;
	    this.value = value;

	    this.resolveArguments();
	}

	Where.prototype = {

	    field: undefined,

	    operator: undefined,

	    value: undefined,

	    not: false,

	    resolveArguments: function resolveArguments(args) {
	        if (!this.field) {
	            throw 'No field provided for "' + this.name + '" clause.';
	        }

	        if (this.operator === null || this.operator === undefined || this.operator === false || this.operator === true) {
	            invalidOperatorException.call(this, this.operator);
	        }

	        var hasValidOperator = _Config2.default.validOperators.indexOf(this.operator) > -1;

	        if (hasValidOperator) {
	            // This handles .whereUndefined(), whereNull(), whereFalse() or whereTrue()
	            if (this.operator !== '===' && this.operator !== '!==' && (this.value === null || this.value === undefined || this.value === false || this.value === true)) {
	                invalidOperatorException.call(this, this.value);
	            }
	        } else if (!hasValidOperator && this.value === undefined) {
	            this.value = this.operator;
	            this.operator = '=';
	        } else {
	            throw 'Unrecognized "' + this.operator + '" operator for "' + this.name + '" clause.';
	        }

	        return this;
	    },

	    resolve: function resolve(elementValue) {
	        var result = undefined;

	        switch (this.operator) {
	            case '===':
	                result = elementValue === this.value;
	                break;

	            case '=':
	                result = elementValue == this.value;
	                break;

	            case '!==':
	                result = elementValue !== this.value;
	                break;

	            case '!=':
	            case '<>':
	                result = elementValue != this.value;
	                break;

	            case '<=':
	                result = elementValue <= this.value;
	                break;

	            case '<':
	                result = elementValue < this.value;
	                break;

	            case '>=':
	                result = elementValue >= this.value;
	                break;

	            case '>':
	                result = elementValue > this.value;
	                break;
	        }

	        return this.not ? !result : result;
	    }
	};

	var invalidOperatorException = function invalidOperatorException(value) {
	    var text = value === null ? 'whereNull()' : value === undefined ? 'whereUndefined()' : value === true ? 'whereTrue()' : 'whereFalse()';

	    throw 'No correct value provided for "' + this.name + '" clause. For better assertion use ' + text + ' instead.';
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Config = Object.create({}, {

	    validOperators: {
	        value: ['=', '===', '!=', '!==', '<', '<=', '>=', '>', '<>'],
	        writable: false
	    }

	});

	exports.default = Config;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _WhereDate = __webpack_require__(5);

	var _WhereDate2 = _interopRequireDefault(_WhereDate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Where Date Clause', function () {
	    it('Instantiation', function () {
	        expect(function () {
	            new _WhereDate2.default();
	        }).toThrow('No field provided for "whereDate" clause.');

	        expect(function () {
	            new _WhereDate2.default('birthdate', 'not-a-date');
	        }).toThrow('Value "not-a-date" is not a valid date.');

	        expect(function () {
	            new _WhereDate2.default('birthdate', '!=', 'not-a-date');
	        }).toThrow('Value "not-a-date" is not a valid date.');

	        expect(function () {
	            new _WhereDate2.default('birthdate', '*', '1900-01-01');
	        }).toThrow('Unrecognized "*" operator for "whereDate" clause.');

	        var w = new _WhereDate2.default('birthdate', '1900-01-01');
	        expect(w.name).toBe('whereDate');
	        expect(w.field).toBe('birthdate');
	        expect(w.operator).toBe('=');
	        expect(w.value.toString()).toBe(new Date('1900-01-01').toString());
	        expect(w.not).toBeFalsy();

	        var w = new _WhereDate2.default('birthdate', '!=', '1900-01-01');
	        expect(w.name).toBe('whereDate');
	        expect(w.field).toBe('birthdate');
	        expect(w.operator).toBe('!=');
	        expect(w.value.toString()).toBe(new Date('1900-01-01').toString());
	        expect(w.not).toBeFalsy();

	        var w = new _WhereDate2.default('birthdate', '!=', '1900-01-01', true);
	        expect(w.name).toBe('whereNotDate');
	        expect(w.not).toBeTruthy();
	    });

	    it('Resolves correctly', function () {
	        var user = { id: 1, name: 'Alex', birthdate: '1991-08-29T12:00:00.000Z' };

	        expect(new _WhereDate2.default('birthdate', '=', '1991-08-29T12:00:00.000Z').resolve(user.birthdate)).toBeTruthy();
	        expect(new _WhereDate2.default('birthdate', '!=', '1991-08-29T12:00:00.000Z').resolve(user.birthdate)).toBeFalsy();
	        expect(new _WhereDate2.default('birthdate', '>', '1991-08-29T12:00:00.000Z').resolve(user.birthdate)).toBeFalsy();
	        expect(new _WhereDate2.default('birthdate', '<', '1991-08-29T12:00:00.000Z').resolve(user.birthdate)).toBeFalsy();
	        expect(new _WhereDate2.default('birthdate', '<=', '1991-08-29T12:00:00.000Z').resolve(user.birthdate)).toBeTruthy();
	        expect(new _WhereDate2.default('birthdate', '>=', '1991-08-29T12:00:00.000Z').resolve(user.birthdate)).toBeTruthy();

	        expect(new _WhereDate2.default('birthdate', '=', '1991-08-29T12:00:00.000Z', true).resolve(user.birthdate)).not.toBeTruthy();
	        expect(new _WhereDate2.default('birthdate', '!=', '1991-08-29T12:00:00.000Z', true).resolve(user.birthdate)).not.toBeFalsy();
	        expect(new _WhereDate2.default('birthdate', '>', '1991-08-29T12:00:00.000Z', true).resolve(user.birthdate)).not.toBeFalsy();
	        expect(new _WhereDate2.default('birthdate', '<', '1991-08-29T12:00:00.000Z', true).resolve(user.birthdate)).not.toBeFalsy();
	        expect(new _WhereDate2.default('birthdate', '<=', '1991-08-29T12:00:00.000Z', true).resolve(user.birthdate)).not.toBeTruthy();
	        expect(new _WhereDate2.default('birthdate', '>=', '1991-08-29T12:00:00.000Z', true).resolve(user.birthdate)).not.toBeTruthy();
	    });
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = WhereDate;

	var _Where = __webpack_require__(2);

	var _Where2 = _interopRequireDefault(_Where);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function WhereDate(field, operator, value, $not) {
	    this.name = $not ? 'whereNotDate' : 'whereDate';
	    this.not = $not || false;

	    this.field = field;
	    this.operator = operator;
	    this.value = value;

	    this.resolveArguments().resolveValue();
	}

	WhereDate.prototype = Object.create(_Where2.default.prototype);

	WhereDate.prototype.constructor = WhereDate;

	WhereDate.prototype.resolveValue = function () {
	    var date = new Date(this.value);

	    if (date == 'Invalid Date' || this.value === null || this.value === undefined) {
	        throw 'Value "' + this.value + '" is not a valid date.';
	    }

	    this.value = date;

	    return this;
	};

	WhereDate.prototype.resolve = function (elementValue) {
	    var dateValue = new Date(elementValue);

	    if (dateValue == 'Invalid Date') {
	        throw 'Invalid date "' + elementValue + '" in field "' + this.field + '".';
	    }

	    switch (this.operator) {
	        case '=':
	            var result = dateValue.toString() == this.value.toString();
	            break;

	        case '!=':
	        case '<>':
	            var result = dateValue.toString() != this.value.toString();
	            break;

	        case '<=':
	            var result = dateValue <= this.value;
	            break;

	        case '<':
	            var result = dateValue < this.value;
	            break;

	        case '>=':
	            var result = dateValue >= this.value;
	            break;

	        case '>':
	            var result = dateValue > this.value;
	            break;
	    }

	    return this.not ? !result : result;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _WhereBetween = __webpack_require__(7);

	var _WhereBetween2 = _interopRequireDefault(_WhereBetween);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Where Between Clause', function () {
	    it('Instantiation', function () {
	        expect(function () {
	            new _WhereBetween2.default();
	        }).toThrow('No field provided for "whereBetween" clause.');

	        expect(function () {
	            new _WhereBetween2.default('id');
	        }).toThrow('No min value provided for "whereBetween" clause.');

	        expect(function () {
	            new _WhereBetween2.default('id', 50);
	        }).toThrow('No max value provided for "whereBetween" clause.');

	        expect(function () {
	            new _WhereBetween2.default('id', 'NaN', 100);
	        }).toThrow('Min value in "whereBetween" is not a number.');

	        expect(function () {
	            new _WhereBetween2.default('id', 10, 'NaN');
	        }).toThrow('Max value in "whereBetween" is not a number.');

	        expect(function () {
	            new _WhereBetween2.default('id', 100, 50);
	        }).toThrow('Min value has to be lower than max value.');

	        var w = new _WhereBetween2.default('id', 50, 100);
	        expect(w.name).toBe('whereBetween');
	        expect(w.field).toBe('id');
	        expect(w.min).toBe(50);
	        expect(w.max).toBe(100);
	        expect(w.not).toBeFalsy();

	        var w = new _WhereBetween2.default('id', 50, 100, true);
	        expect(w.name).toBe('whereNotBetween');
	        expect(w.field).toBe('id');
	        expect(w.min).toBe(50);
	        expect(w.max).toBe(100);
	        expect(w.not).toBeTruthy();
	    });

	    it('Resolves correctly', function () {
	        var user = { id: 1, name: 'Alex' };

	        expect(new _WhereBetween2.default('id', 1, 20).resolve(user.id)).toBeTruthy();
	        expect(new _WhereBetween2.default('id', 2, 20).resolve(user.id)).toBeFalsy();

	        expect(new _WhereBetween2.default('id', 1, 20, true).resolve(user.id)).toBeFalsy();
	        expect(new _WhereBetween2.default('id', 2, 20, true).resolve(user.id)).toBeTruthy();
	    });
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = WhereBetween;
	function WhereBetween(field, min, max, $not) {
	    this.name = $not ? 'whereNotBetween' : 'whereBetween';
	    this.not = $not || false;

	    this.field = field;
	    this.min = min;
	    this.max = max;

	    this.resolveArguments();
	}

	WhereBetween.prototype = {

	    field: undefined,

	    min: undefined,

	    max: undefined,

	    not: false,

	    resolveArguments: function resolveArguments() {
	        if (!this.field) {
	            throw 'No field provided for "' + this.name + '" clause.';
	        }

	        if (!this.min) {
	            throw 'No min value provided for "' + this.name + '" clause.';
	        }

	        if (!this.max) {
	            throw 'No max value provided for "' + this.name + '" clause.';
	        }

	        if (isNaN(this.min)) {
	            throw 'Min value in "' + this.name + '" is not a number.';
	        }

	        if (isNaN(this.max)) {
	            throw 'Max value in "' + this.name + '" is not a number.';
	        }

	        if (this.min > this.max) {
	            throw 'Min value has to be lower than max value.';
	        }
	    },

	    resolve: function resolve(elementValue) {
	        var result = elementValue >= this.min && elementValue <= this.max;

	        return this.not ? !result : result;
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _WhereCount = __webpack_require__(9);

	var _WhereCount2 = _interopRequireDefault(_WhereCount);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Where Count Clause', function () {
	    it('Instantiation', function () {
	        expect(function () {
	            new _WhereCount2.default();
	        }).toThrow('No field provided for "whereCount" clause.');

	        var w = new _WhereCount2.default('id', 'value');
	        expect(w.name).toBe('whereCount');
	        expect(w.field).toBe('id');
	        expect(w.operator).toBe('=');
	        expect(w.value).toBe('value');
	        expect(w.not).toBeFalsy();

	        var w = new _WhereCount2.default('id', '!=', 'value');
	        expect(w.name).toBe('whereCount');
	        expect(w.field).toBe('id');
	        expect(w.operator).toBe('!=');
	        expect(w.value).toBe('value');
	        expect(w.not).toBeFalsy();

	        expect(function () {
	            new _WhereCount2.default('id', '*', 'value');
	        }).toThrow('Unrecognized "*" operator for "whereCount" clause.');

	        var w = new _WhereCount2.default('id', '!=', 'value', true);
	        expect(w.name).toBe('whereNotCount');
	        expect(w.not).toBeTruthy();
	    });

	    it('Resolves correctly', function () {
	        var user = { id: 1, name: 'Alex', friends: ['Tamara', 'Josh', 'Julian'] };

	        expect(new _WhereCount2.default('friends', '=', 3).resolve(user.friends)).toBeTruthy();
	        expect(new _WhereCount2.default('friends', '!=', 3).resolve(user.friends)).toBeFalsy();
	        expect(new _WhereCount2.default('friends', '>', 3).resolve(user.friends)).toBeFalsy();
	        expect(new _WhereCount2.default('friends', '<', 3).resolve(user.friends)).toBeFalsy();
	        expect(new _WhereCount2.default('friends', '<=', 3).resolve(user.friends)).toBeTruthy();
	        expect(new _WhereCount2.default('friends', '>=', 3).resolve(user.friends)).toBeTruthy();

	        expect(new _WhereCount2.default('friends', '=', 3, true).resolve(user.friends)).not.toBeTruthy();
	        expect(new _WhereCount2.default('friends', '!=', 3, true).resolve(user.friends)).not.toBeFalsy();
	        expect(new _WhereCount2.default('friends', '>', 3, true).resolve(user.friends)).not.toBeFalsy();
	        expect(new _WhereCount2.default('friends', '<', 3, true).resolve(user.friends)).not.toBeFalsy();
	        expect(new _WhereCount2.default('friends', '<=', 3, true).resolve(user.friends)).not.toBeTruthy();
	        expect(new _WhereCount2.default('friends', '>=', 3, true).resolve(user.friends)).not.toBeTruthy();
	    });
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = WhereCount;

	var _Where = __webpack_require__(2);

	var _Where2 = _interopRequireDefault(_Where);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function WhereCount(field, operator, value, $not) {
	    this.name = $not ? 'whereNotCount' : 'whereCount';
	    this.not = $not || false;

	    this.field = field;
	    this.operator = operator;
	    this.value = value;

	    this.resolveArguments(arguments);
	}

	WhereCount.prototype = Object.create(_Where2.default.prototype);

	WhereCount.prototype.constructor = WhereCount;

	WhereCount.prototype.resolve = function (elementValue) {
	    // TODO: Undefined ==? Null
	    if (Array.isArray(elementValue)) {
	        var length = elementValue.length;
	    } else {
	        var length = elementValue ? 1 : 0;
	    }

	    switch (this.operator) {
	        case '=':
	            var result = length == this.value;
	            break;

	        case '!=':
	        case '<>':
	            var result = length != this.value;
	            break;

	        case '<=':
	            var result = length <= this.value;
	            break;

	        case '<':
	            var result = length < this.value;
	            break;

	        case '>=':
	            var result = length >= this.value;
	            break;

	        case '>':
	            var result = length > this.value;
	            break;
	    }

	    return this.not ? !result : result;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _WhereIn = __webpack_require__(11);

	var _WhereIn2 = _interopRequireDefault(_WhereIn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Where In Clause', function () {
	    it('Instantiation', function () {
	        expect(function () {
	            new _WhereIn2.default();
	        }).toThrow('No field provided for "whereIn" clause.');

	        expect(function () {
	            new _WhereIn2.default('id');
	        }).toThrow('No value provided for "whereIn" clause.');

	        var w = new _WhereIn2.default('id', ['value1', 'value2']);
	        expect(w.name).toBe('whereIn');
	        expect(w.field).toBe('id');
	        expect(w.value).toEqual(['value1', 'value2']);
	        expect(w.not).toBeFalsy();

	        var w = new _WhereIn2.default('id', ['value1', 'value2'], true);
	        expect(w.name).toBe('whereNotIn');
	        expect(w.field).toBe('id');
	        expect(w.value).toEqual(['value1', 'value2']);
	        expect(w.not).toBeTruthy();
	    });

	    it('Resolves correctly', function () {
	        var user = { id: 1, name: 'Alex' };
	        var inUsers1 = ['Alex', 'Tamara', 'Josh'];
	        var inUsers2 = ['Jhon', 'Tamara', 'Josh'];

	        expect(new _WhereIn2.default('name', inUsers1).resolve(user.name)).toBeTruthy();
	        expect(new _WhereIn2.default('name', inUsers2).resolve(user.name)).toBeFalsy();

	        expect(new _WhereIn2.default('name', inUsers1, true).resolve(user.name)).not.toBeTruthy();
	        expect(new _WhereIn2.default('name', inUsers2, true).resolve(user.name)).not.toBeFalsy();
	    });
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = WhereIn;
	function WhereIn(field, value, $not) {
	    this.name = $not ? 'whereNotIn' : 'whereIn';
	    this.not = $not || false;

	    this.field = field;
	    this.value = value;

	    this.resolveArguments();
	}

	WhereIn.prototype = {

	    field: undefined,

	    value: undefined,

	    not: false,

	    resolveArguments: function resolveArguments() {
	        if (!this.field) {
	            throw 'No field provided for "' + this.name + '" clause.';
	        }

	        if (!this.value) {
	            throw 'No value provided for "' + this.name + '" clause.';
	        }

	        if (!Array.isArray(this.value)) {
	            this.value = [this.value];
	        }
	    },

	    resolve: function resolve(elementValue) {
	        var result = this.value.indexOf(elementValue) > -1;

	        return this.not ? !result : result;
	    }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _WhereLike = __webpack_require__(13);

	var _WhereLike2 = _interopRequireDefault(_WhereLike);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Where Like Clause', function () {
	    it('Instantiation', function () {
	        expect(function () {
	            new _WhereLike2.default();
	        }).toThrow('No field provided for "whereLike" clause.');

	        expect(function () {
	            new _WhereLike2.default('id');
	        }).toThrow('No expression provided for "whereLike" clause.');

	        var w = new _WhereLike2.default('id', 'expression');
	        expect(w.name).toBe('whereLike');
	        expect(w.field).toBe('id');
	        expect(w.expression).toBe('expression');
	        expect(w.not).toBeFalsy();

	        var w = new _WhereLike2.default('id', /expression/);
	        expect(w.name).toBe('whereLike');
	        expect(w.field).toBe('id');
	        expect(w.expression).toEqual(/expression/);
	        expect(w.not).toBeFalsy();

	        var w = new _WhereLike2.default('id', /expression/, true);
	        expect(w.name).toBe('whereNotLike');
	        expect(w.field).toBe('id');
	        expect(w.expression).toEqual(/expression/);
	        expect(w.not).toBeTruthy();
	    });

	    it('Resolves correctly', function () {
	        var user = { id: 1, name: 'Alex' };

	        expect(new _WhereLike2.default('name', 'Alex').resolve(user.name)).toBeTruthy();
	        expect(new _WhereLike2.default('name', /le/).resolve(user.name)).toBeTruthy();
	        expect(new _WhereLike2.default('name', 'so').resolve(user.name)).toBeFalsy();
	        expect(new _WhereLike2.default('name', /so/).resolve(user.name)).toBeFalsy();

	        expect(new _WhereLike2.default('name', 'Alex', true).resolve(user.name)).not.toBeTruthy();
	        expect(new _WhereLike2.default('name', /le/, true).resolve(user.name)).not.toBeTruthy();
	        expect(new _WhereLike2.default('name', 'so', true).resolve(user.name)).not.toBeFalsy();
	        expect(new _WhereLike2.default('name', /so/, true).resolve(user.name)).not.toBeFalsy();
	    });
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = WhereLike;
	function WhereLike(field, expression, $not) {
	    this.name = $not ? 'whereNotLike' : 'whereLike';
	    this.not = $not || false;

	    this.field = field;
	    this.expression = expression;

	    this.resolveArguments();
	}

	WhereLike.prototype = {

	    field: undefined,

	    expression: undefined,

	    not: false,

	    resolveArguments: function resolveArguments() {
	        if (!this.field) {
	            throw 'No field provided for "' + this.name + '" clause.';
	        }

	        if (!this.expression) {
	            throw 'No expression provided for "' + this.name + '" clause.';
	        }
	    },

	    resolve: function resolve(elementValue) {
	        var result = elementValue.match(this.expression) ? true : false;

	        return this.not ? !result : result;
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _OrderBy = __webpack_require__(15);

	var _OrderBy2 = _interopRequireDefault(_OrderBy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Order By', function () {
	    it('Instantiation', function () {
	        expect(function () {
	            new _OrderBy2.default();
	        }).toThrow('No field provided for "orderBy".');

	        expect(function () {
	            new _OrderBy2.default('id', 'unrecognized');
	        }).toThrow('Unrecognized sort direction "unrecognized".');

	        var o = new _OrderBy2.default('id');
	        expect(o.name).toBe('orderBy');
	        expect(o.field).toBe('id');
	        expect(o.direction).toBe('asc');

	        var o = new _OrderBy2.default('id', 'desc');
	        expect(o.name).toBe('orderBy');
	        expect(o.field).toBe('id');
	        expect(o.direction).toBe('desc');
	    });

	    it('Resolves correctly', function () {
	        var user1 = { id: 1, name: 'Alex' };
	        var user2 = { id: 2, name: 'Tamara' };

	        expect(new _OrderBy2.default('id', 'asc').resolve(user1, user2)).toBe(-1);
	        expect(new _OrderBy2.default('id', 'desc').resolve(user1, user2)).toBe(1);
	    });
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = OrderBy;
	function OrderBy(field, direction) {
	    this.name = 'orderBy';
	    this.field = field;
	    this.direction = direction || 'asc';

	    this.resolveArguments();
	}

	OrderBy.prototype = {

	    field: undefined,

	    direction: undefined,

	    resolveArguments: function resolveArguments() {
	        if (!this.field) {
	            throw 'No field provided for "' + this.name + '".';
	        }

	        if (['asc', 'desc'].indexOf(this.direction) < 0) {
	            throw 'Unrecognized sort direction "' + this.direction + '".';
	        }
	    },

	    resolve: function resolve(elementA, elementB) {
	        var result = elementA[this.field] < elementB[this.field] ? -1 : elementA[this.field] > elementB[this.field] ? 1 : 0;

	        return this.direction == "asc" ? result : -result;
	    }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _OrderByDate = __webpack_require__(17);

	var _OrderByDate2 = _interopRequireDefault(_OrderByDate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Order By Date', function () {
	    it('Instantiation', function () {
	        expect(function () {
	            new _OrderByDate2.default();
	        }).toThrow('No field provided for "orderByDate".');

	        expect(function () {
	            new _OrderByDate2.default('id', 'unrecognized');
	        }).toThrow('Unrecognized sort direction "unrecognized".');

	        var o = new _OrderByDate2.default('id');
	        expect(o.name).toBe('orderByDate');
	        expect(o.field).toBe('id');
	        expect(o.direction).toBe('asc');

	        var o = new _OrderByDate2.default('id', 'desc');
	        expect(o.name).toBe('orderByDate');
	        expect(o.field).toBe('id');
	        expect(o.direction).toBe('desc');
	    });

	    it('Resolves correctly', function () {
	        var user1 = { id: 1, name: 'Alex', birthdate: '1991-08-29T12:00:00Z' };
	        var user2 = { id: 2, name: 'Tamara', birthdate: '1991-06-19T16:00:00Z' };

	        expect(function () {
	            new _OrderByDate2.default('name', 'asc').resolve(user1, user2);
	        }).toThrow('Invalid date "Alex" in field "name".');

	        expect(new _OrderByDate2.default('birthdate', 'asc').resolve(user1, user2)).toBe(1);
	        expect(new _OrderByDate2.default('birthdate', 'desc').resolve(user1, user2)).toBe(-1);
	    });
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = OrderByDate;

	var _OrderBy = __webpack_require__(15);

	var _OrderBy2 = _interopRequireDefault(_OrderBy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function OrderByDate(field, direction) {
	    this.name = 'orderByDate';
	    this.field = field;
	    this.direction = direction || 'asc';

	    this.resolveArguments();
	}

	OrderByDate.prototype = Object.create(_OrderBy2.default.prototype);

	OrderByDate.prototype.constructor = OrderByDate;

	OrderByDate.prototype.resolve = function (elementA, elementB) {
	    var elementADate = new Date(elementA[this.field]);
	    var elementBDate = new Date(elementB[this.field]);

	    if (elementADate == 'Invalid Date') {
	        throw 'Invalid date "' + elementA[this.field] + '" in field "' + this.field + '".';
	    } else if (elementBDate == 'Invalid Date') {
	        throw 'Invalid date "' + elementB[this.field] + '" in field "' + this.field + '".';
	    }

	    var result = elementADate < elementBDate ? -1 : elementADate > elementBDate ? 1 : 0;

	    return this.direction == "asc" ? result : -result;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Builder = __webpack_require__(19);

	var _Builder2 = _interopRequireDefault(_Builder);

	var _QueryResolver = __webpack_require__(23);

	var _QueryResolver2 = _interopRequireDefault(_QueryResolver);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('QueryResolver', function () {
	    var builder = function builder(data) {
	        return new _Builder2.default(data || { id: 1, name: 'Alex' });
	    };

	    it('Perform where clauses', function () {
	        var user1 = { id: 1, name: 'Alex' };
	        var user2 = { id: 2, name: 'Tamara' };
	        var users = [user1, user2];

	        var b = _QueryResolver2.default.resolve.call(builder(users).where('id', 1));
	        expect(b.$result.length).toBe(1);
	        expect(b.$result).toEqual([user1]);

	        var b = _QueryResolver2.default.resolve.call(builder(users).where('id', 1).orWhere('id', 2));
	        expect(b.$result.length).toBe(2);
	        expect(b.$result).toEqual(users);
	    });

	    it('Perform order by clauses', function () {
	        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
	        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Audi' } };
	        var user3 = { id: 3, name: 'Josh', car: { brand: 'Audi' } };
	        var users = [user1, user2, user3];

	        var b = _QueryResolver2.default.resolve.call(builder(users).orderBy('name', 'desc'));
	        expect(Array.isArray(b.$result)).toBeTruthy();
	        expect(b.$result).toEqual([user2, user3, user1]);
	    });

	    it('Perform group by clauses', function () {
	        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
	        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Audi' } };
	        var user3 = { id: 3, name: 'Josh', car: { brand: 'Audi' } };
	        var users = [user1, user2, user3];

	        var b = _QueryResolver2.default.resolve.call(builder(users).groupBy('id'));
	        expect(Array.isArray(b.$result)).toBeFalsy();
	        expect(b.$result).toEqual({ 1: [user1], 2: [user2], 3: [user3] });

	        var b = _QueryResolver2.default.resolve.call(builder(users).groupBy('id', 'name'));
	        expect(Array.isArray(b.$result)).toBeFalsy();
	        expect(b.$result).toEqual({ 1: { 'Alex': [user1] }, 2: { 'Tamara': [user2] }, 3: { 'Josh': [user3] } });

	        var b = _QueryResolver2.default.resolve.call(builder(users).groupBy('car.brand'));
	        expect(b.$result).toEqual({ 'Hyundai': [user1], 'Audi': [user2, user3] });
	    });

	    it('Perform select clause', function () {
	        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
	        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Audi' } };
	        var user3 = { id: 3, name: 'Josh', car: { brand: 'Audi' } };
	        var users = [user1, user2, user3];

	        var b = _QueryResolver2.default.resolve.call(builder(users).select('id'));
	        expect(Array.isArray(b.$result)).toBeTruthy();
	        expect(b.$result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);

	        var b = _QueryResolver2.default.resolve.call(builder(users).select('id', 'car.brand'));
	        expect(Array.isArray(b.$result)).toBeTruthy();
	        expect(b.$result).toEqual([{ id: 1, car: { brand: 'Hyundai' } }, { id: 2, car: { brand: 'Audi' } }, { id: 3, car: { brand: 'Audi' } }]);
	    });
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = Builder;

	var _Where = __webpack_require__(2);

	var _Where2 = _interopRequireDefault(_Where);

	var _WhereIn = __webpack_require__(11);

	var _WhereIn2 = _interopRequireDefault(_WhereIn);

	var _WhereDate = __webpack_require__(5);

	var _WhereDate2 = _interopRequireDefault(_WhereDate);

	var _WhereLike = __webpack_require__(13);

	var _WhereLike2 = _interopRequireDefault(_WhereLike);

	var _WhereCount = __webpack_require__(9);

	var _WhereCount2 = _interopRequireDefault(_WhereCount);

	var _WhereBetween = __webpack_require__(7);

	var _WhereBetween2 = _interopRequireDefault(_WhereBetween);

	var _OrderBy = __webpack_require__(15);

	var _OrderBy2 = _interopRequireDefault(_OrderBy);

	var _OrderByDate = __webpack_require__(17);

	var _OrderByDate2 = _interopRequireDefault(_OrderByDate);

	var _Util = __webpack_require__(20);

	var _Util2 = _interopRequireDefault(_Util);

	var _Paginator = __webpack_require__(21);

	var _Paginator2 = _interopRequireDefault(_Paginator);

	var _Collection = __webpack_require__(22);

	var _Collection2 = _interopRequireDefault(_Collection);

	var _QueryResolver = __webpack_require__(23);

	var _QueryResolver2 = _interopRequireDefault(_QueryResolver);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Builder(data) {
	    if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && Object.keys(data).length === 0) {
	        throw "No data supplied!";
	    }

	    this.$original = !Array.isArray(data) ? [data] : data;

	    this.clean();
	}

	var resolveWhereBoolean = function resolveWhereBoolean(where, $boolean) {
	    if ($boolean === 'and' || $boolean === undefined || $boolean === null) {
	        this.$where.and.push(where);
	    } else if ($boolean === 'or') {
	        this.$where.or.push(where);
	    } else {
	        throw "Unrecognized boolean value '" + $boolean + "'";
	    }

	    return this;
	};

	Builder.prototype = {

	    clean: function clean() {
	        this.$result = this.$original;

	        this.$select = '*';

	        this.$where = { and: [], or: [] };

	        this.$groupBy = [];

	        this.$orderBy = [];

	        return this;
	    },

	    /****************************************************************
	     * SELECT
	     ****************************************************************/
	    select: function select(fields) {
	        if (!fields) {
	            return this;
	        }

	        if (arguments.length > 1) {
	            fields = Array.prototype.slice.call(arguments);
	        } else if (!Array.isArray(fields)) {
	            fields = [fields];
	        }

	        this.$select = fields;

	        return this;
	    },

	    /****************************************************************
	     * GROUP BY
	     ****************************************************************/
	    groupBy: function groupBy(fields) {
	        if (!fields) {
	            return this;
	        }

	        if (arguments.length > 1) {
	            fields = Array.prototype.slice.call(arguments);
	        } else if (!Array.isArray(fields)) {
	            fields = [fields];
	        }

	        this.$groupBy = fields;

	        return this;
	    },

	    /****************************************************************
	     * WHERE
	     ****************************************************************/
	    where: function where(field, operator, value, $boolean, $not) {
	        var where = new _Where2.default(field, operator, value, $not);

	        return resolveWhereBoolean.call(this, where, $boolean);
	    },

	    whereNot: function whereNot(field, operator, value) {
	        return this.where(field, operator, value, 'and', true);
	    },

	    orWhere: function orWhere(field, operator, value) {
	        return this.where(field, operator, value, 'or', false);
	    },

	    orWhereNot: function orWhereNot(field, operator, value) {
	        return this.where(field, operator, value, 'or', true);
	    },

	    whereDate: function whereDate(field, operator, value, $boolean, $not) {
	        var where = new _WhereDate2.default(field, operator, value, $not);

	        return resolveWhereBoolean.call(this, where, $boolean);
	    },

	    whereNotDate: function whereNotDate(field, operator, value) {
	        return this.whereDate(field, operator, value, 'and', true);
	    },

	    orWhereDate: function orWhereDate(field, operator, value) {
	        return this.whereDate(field, operator, value, 'or', false);
	    },

	    orWhereNotDate: function orWhereNotDate(field, operator, value) {
	        return this.whereDate(field, operator, value, 'or', true);
	    },

	    whereIn: function whereIn(field, values, $boolean, $not) {
	        var where = new _WhereIn2.default(field, values, $not);

	        return resolveWhereBoolean.call(this, where, $boolean);
	    },

	    whereNotIn: function whereNotIn(field, values) {
	        return this.whereIn(field, values, 'and', true);
	    },

	    orWhereIn: function orWhereIn(field, values) {
	        return this.whereIn(field, values, 'or', false);
	    },

	    orWhereNotIn: function orWhereNotIn(field, values) {
	        return this.whereIn(field, values, 'or', true);
	    },

	    whereBetween: function whereBetween(field, min, max, $boolean, $not) {
	        var where = new _WhereBetween2.default(field, min, max, $not);

	        return resolveWhereBoolean.call(this, where, $boolean);
	    },

	    whereNotBetween: function whereNotBetween(field, min, max) {
	        return this.whereBetween(field, min, max, 'and', true);
	    },

	    orWhereBetween: function orWhereBetween(field, min, max) {
	        return this.whereBetween(field, min, max, 'or', false);
	    },

	    orWhereNotBetween: function orWhereNotBetween(field, min, max) {
	        return this.whereBetween(field, min, max, 'or', true);
	    },

	    whereCount: function whereCount(field, operator, value, $boolean, $not) {
	        var where = new _WhereCount2.default(field, operator, value, $not);

	        return resolveWhereBoolean.call(this, where, $boolean);
	    },

	    whereNotCount: function whereNotCount(field, operator, value) {
	        return this.whereCount(field, operator, value, 'and', true);
	    },

	    orWhereCount: function orWhereCount(field, operator, value) {
	        return this.whereCount(field, operator, value, 'or', false);
	    },

	    orWhereNotCount: function orWhereNotCount(field, operator, value) {
	        return this.whereCount(field, operator, value, 'or', true);
	    },

	    whereLike: function whereLike(field, expression, $boolean, $not) {
	        var where = new _WhereLike2.default(field, expression, $not);

	        return resolveWhereBoolean.call(this, where, $boolean);
	    },

	    whereNotLike: function whereNotLike(field, expression) {
	        return this.whereLike(field, expression, 'and', true);
	    },

	    orWhereLike: function orWhereLike(field, expression) {
	        return this.whereLike(field, expression, 'or', false);
	    },

	    orWhereNotLike: function orWhereNotLike(field, expression) {
	        return this.whereLike(field, expression, 'or', true);
	    },

	    whereNull: function whereNull(field, $boolean, $not) {
	        var where = new _Where2.default(field, '===', null, $not);

	        return resolveWhereBoolean.call(this, where, $boolean);
	    },

	    whereNotNull: function whereNotNull(field) {
	        return this.whereNull(field, 'and', true);
	    },

	    orWhereNull: function orWhereNull(field) {
	        return this.whereNull(field, 'or', false);
	    },

	    orWhereNotNull: function orWhereNotNull(field) {
	        return this.whereNull(field, 'or', true);
	    },

	    whereUndefined: function whereUndefined(field, $boolean, $not) {
	        var where = new _Where2.default(field, '===', undefined, $not);

	        return resolveWhereBoolean.call(this, where, $boolean);
	    },

	    whereNotUndefined: function whereNotUndefined(field) {
	        return this.whereUndefined(field, 'and', true);
	    },

	    orWhereUndefined: function orWhereUndefined(field) {
	        return this.whereUndefined(field, 'or', false);
	    },

	    orWhereNotUndefined: function orWhereNotUndefined(field) {
	        return this.whereUndefined(field, 'or', true);
	    },

	    whereTrue: function whereTrue(field, $boolean, $not) {
	        var where = new _Where2.default(field, '===', true, $not);

	        return resolveWhereBoolean.call(this, where, $boolean);
	    },

	    whereNotTrue: function whereNotTrue(field) {
	        return this.whereTrue(field, 'and', true);
	    },

	    orWhereTrue: function orWhereTrue(field) {
	        return this.whereTrue(field, 'or', false);
	    },

	    orWhereNotTrue: function orWhereNotTrue(field) {
	        return this.whereTrue(field, 'or', true);
	    },

	    whereFalse: function whereFalse(field, $boolean, $not) {
	        var where = new _Where2.default(field, '===', false, $not);

	        return resolveWhereBoolean.call(this, where, $boolean);
	    },

	    whereNotFalse: function whereNotFalse(field) {
	        return this.whereFalse(field, 'and', true);
	    },

	    orWhereFalse: function orWhereFalse(field) {
	        return this.whereFalse(field, 'or', false);
	    },

	    orWhereNotFalse: function orWhereNotFalse(field) {
	        return this.whereFalse(field, 'or', true);
	    },

	    /****************************************************************
	     * ORDER BY
	     ****************************************************************/
	    orderBy: function orderBy(field, direction) {
	        this.$orderBy.push(new _OrderBy2.default(field, direction));

	        return this;
	    },

	    orderByDesc: function orderByDesc(field) {
	        return this.orderBy(field, 'desc');
	    },

	    orderByDate: function orderByDate(field, direction) {
	        this.$orderBy.push(new _OrderByDate2.default(field, direction));

	        return this;
	    },

	    orderByDateDesc: function orderByDateDesc(field) {
	        return this.orderByDate(field, 'desc');
	    },

	    /****************************************************************
	     * GET
	     ****************************************************************/
	    get: function get() {
	        this.$result = this.$original;

	        return _QueryResolver2.default.resolve.call(this).$result;
	    },

	    first: function first() {
	        if (this.$groupBy.length > 0) {
	            return this.get();
	        }

	        return this.get()[0] || [];
	    },

	    last: function last() {
	        if (this.$groupBy.length > 0) {
	            return this.get();
	        }

	        return this.get()[this.$result.length - 1] || [];
	    },

	    count: function count() {
	        if (this.$groupBy.length > 0) {
	            return 1;
	        }

	        return this.get().length;
	    },

	    paginate: function paginate(itemsPerPage) {
	        if (this.$groupBy.length > 0) {
	            throw "You can\'t paginate a grouped result.";
	        }

	        return new _Paginator2.default(this.get(), itemsPerPage || 5);
	    },

	    collect: function collect() {
	        if (this.$groupBy.length > 0) {
	            throw 'Can\'t make a collection from grouped result.';
	        }

	        return new _Collection2.default(this.get());
	    },

	    toModel: function toModel(modelConstructor, args, override) {
	        if (!modelConstructor) {
	            throw "Constructor not supplied.";
	        }

	        if (typeof modelConstructor !== 'function') {
	            throw "Invalid constructor. It has to be a function.";
	        }

	        if (this.get().length == 0) {
	            return [];
	        }

	        // Check if properties of the results are already defined in constructor
	        // This loop avoid 'ifing' when creating models. Better performance for bigger results
	        var stomp = override || false;
	        var properties = Object.keys(this.$result[0]);
	        var testModel = _Util2.default.createModelInstance(modelConstructor, args || []);

	        for (var i = 0; i < properties.length; i++) {
	            if (!stomp && testModel.hasOwnProperty(properties[i])) {
	                throw 'Property "' + properties[i] + '" is already defined in constructor and can\'t be overrided.';
	            }
	        }

	        // Create and populate models
	        var models = [];

	        for (var i = 0; i < this.$result.length; i++) {
	            var newModel = _Util2.default.createModelInstance(modelConstructor, args || []);

	            for (var p in this.$result[i]) {
	                Object.defineProperty(newModel, p, {
	                    value: this.$result[i][p],
	                    enumerable: true
	                });
	            }

	            models.push(newModel);
	        }

	        return models;
	    }
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = Object.create({

	    createGroupsRecursively: function createGroupsRecursively(groups, element, groupLevel, groupedElement) {
	        if (arguments.length == 2) {
	            groupLevel = 0;
	            groupedElement = {};
	        }

	        var value = this.selectNestedObject(element, groups[groupLevel]);

	        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	            throw 'You can\'t group by an object or array.';
	        }

	        if (groups[groupLevel + 1] === undefined) {
	            if (!groupedElement.hasOwnProperty(value)) {
	                groupedElement[value] = [];
	            }

	            groupedElement[value].push(element);
	        } else {
	            if (!groupedElement.hasOwnProperty(value)) {
	                groupedElement[value] = this.createGroupsRecursively(groups, element, ++groupLevel, {});
	            } else {
	                groupedElement[value] = this.createGroupsRecursively(groups, element, ++groupLevel, groupedElement[value]);
	            }
	        }

	        return groupedElement;
	    },

	    createNestedObject: function createNestedObject(element, keys, value) {
	        if (!Array.isArray(keys)) {
	            keys = this.splitNestedField(keys);
	        }

	        if (keys.length === 1) {
	            element[keys[0]] = value;
	        } else {
	            var key = keys.shift();

	            element[key] = this.createNestedObject(typeof element[key] === 'undefined' ? {} : element[key], keys, value);
	        }

	        return element;
	    },

	    selectNestedObject: function selectNestedObject(element, keys, parentKey, value) {
	        if (!Array.isArray(keys)) {
	            keys = this.splitNestedField(keys);
	        }

	        if (keys.length === 1) {
	            if (!value) {
	                return element[keys[0]];
	            }

	            element[keys[0]] = value;
	            return;
	        } else {
	            var key = keys.shift();

	            if (!element[key]) {
	                throw 'Child "' + key + '" not found in "' + parentKey + '".';
	            } else if (element[key] && _typeof(element[key]) == 'object') {
	                return this.selectNestedObject(element[key], keys, key, value);
	            }

	            throw 'Child "' + keys.shift() + '" not found in "' + key + '" child, because it\'s not an object.';
	        }
	    },

	    setNestedObjectValue: function setNestedObjectValue(element, keys, value) {
	        this.selectNestedObject(element, keys, undefined, value);

	        return element;
	    },

	    splitNestedField: function splitNestedField(field) {
	        return field.indexOf('.') > -1 ? field.split('.') : [field];
	    },

	    createModelInstance: function createModelInstance(constructor, args) {
	        // Adds empty element, to match passed arguments with
	        // constructor arguments
	        var a = [''].concat(Array.isArray(args) ? args : [args]);

	        return new (Function.prototype.bind.apply(constructor, a))();
	    }
	});

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Paginator;
	function Paginator(data, itemsPerPage) {
	    this.totalRecords = data.length;
	    this.recordsPerPage = itemsPerPage;

	    resolvePages.call(this, data, itemsPerPage);
	}

	Paginator.prototype = {

	    totalRecords: undefined,

	    recordsPerPage: undefined,

	    totalPages: undefined,

	    pages: [],

	    currentIndex: 1,

	    page: function page(pageNumber) {
	        if (pageNumber > this.totalPages) {
	            pageNumber = this.totalPages;
	        } else if (pageNumber < 1) {
	            pageNumber = 1;
	        }

	        this.currentIndex = pageNumber || 1;

	        return this.pages[this.currentIndex - 1];
	    },

	    current: function current() {
	        return this.pages[this.currentIndex - 1];
	    },

	    next: function next() {
	        return this.page(this.currentIndex + 1);
	    },

	    previous: function previous() {
	        return this.page(this.currentIndex - 1);
	    }
	};

	var resolvePages = function resolvePages(data, itemsPerPage) {
	    itemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;

	    var pages = [];

	    for (var i = 0; i < data.length; i += itemsPerPage) {
	        pages.push(data.slice(i, i + itemsPerPage));
	    }

	    this.pages = pages;
	    this.totalPages = this.pages.length;

	    return this;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = Collection;

	var _Util = __webpack_require__(20);

	var _Util2 = _interopRequireDefault(_Util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Collection(data) {
	    if (!data) {
	        this.$data = [];
	    } else {
	        this.$data = !Array.isArray(data) ? [data] : data;
	    }
	}

	Collection.prototype = {

	    all: function all() {
	        return this.$data;
	    },

	    avg: function avg(field) {
	        return this.sum(field) / this.$data.length;
	    },

	    contains: function contains(field, value, strict) {
	        // Avoid if in the loop
	        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	            for (var i = 0; i < this.$data.length; i++) {
	                var currentVal = _Util2.default.selectNestedObject(this.$data[i], field);

	                if (JSON.stringify(currentVal) === JSON.stringify(value)) {
	                    return true;
	                }
	            }
	        } else {
	            for (var i = 0; i < this.$data.length; i++) {
	                var currentVal = _Util2.default.selectNestedObject(this.$data[i], field);

	                if (strict === true && currentVal === value) {
	                    return true;
	                }
	                if (!strict && currentVal == value) {
	                    return true;
	                }
	            }
	        }

	        return false;
	    },

	    count: function count() {
	        return this.$data.length;
	    },

	    each: function each(callback) {
	        if (typeof callback !== 'function') {
	            throw "Callback is not a function.";
	        }

	        for (var i = 0; i < this.$data.length; i++) {
	            if (callback(this.$data[i], i) === false) {
	                break;
	            }
	        }
	    },

	    first: function first() {
	        if (this.$data.length === 0) {
	            return {};
	        }

	        return this.$data[0];
	    },

	    last: function last() {
	        if (this.$data.length === 0) {
	            return {};
	        }

	        return this.$data[this.$data.length - 1];
	    },

	    max: function max(field) {
	        if (!field || (typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
	            throw "Invalid field supplied.";
	        }

	        var value = null;

	        for (var i = 0; i < this.$data.length; i++) {
	            var currentVal = _Util2.default.selectNestedObject(this.$data[i], field);

	            if (isNaN(currentVal)) {
	                throw '"' + field + '" is not a number.';
	            }

	            value = !value || currentVal > value ? currentVal : value;
	        }

	        return value;
	    },

	    maxDate: function maxDate(field) {
	        if (!field || (typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
	            throw "Invalid field supplied.";
	        }

	        var value = null;

	        for (var i = 0; i < this.$data.length; i++) {
	            var currentVal = new Date(_Util2.default.selectNestedObject(this.$data[i], field));

	            if (currentVal == 'Invalid Date') {
	                throw '"' + field + '" is not a valid date.';
	            }

	            value = !value || currentVal > value ? currentVal : value;
	        }

	        return value;
	    },

	    min: function min(field) {
	        if (!field || (typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
	            throw "Invalid field supplied.";
	        }

	        var value = null;

	        for (var i = 0; i < this.$data.length; i++) {
	            var currentVal = _Util2.default.selectNestedObject(this.$data[i], field);

	            if (isNaN(currentVal)) {
	                throw '"' + field + '" is not a number.';
	            }

	            value = !value || currentVal < value ? currentVal : value;
	        }

	        return value;
	    },

	    minDate: function minDate(field) {
	        if (!field || (typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
	            throw "Invalid field supplied.";
	        }

	        var value = null;

	        for (var i = 0; i < this.$data.length; i++) {
	            var currentVal = new Date(_Util2.default.selectNestedObject(this.$data[i], field));

	            if (currentVal == 'Invalid Date') {
	                throw '"' + field + '" is not a valid date.';
	            }

	            value = !value || currentVal < value ? currentVal : value;
	        }

	        return value;
	    },

	    pluck: function pluck(field) {
	        var values = [];

	        for (var i = 0; i < this.$data.length; i++) {
	            var currentVal = _Util2.default.selectNestedObject(this.$data[i], field);

	            if (currentVal !== undefined) {
	                values.push(currentVal);
	            }
	        }

	        return values;
	    },

	    pop: function pop() {
	        return this.$data.pop();
	    },

	    random: function random() {
	        return this.$data[Math.floor(Math.random() * this.$data.length)];
	    },

	    search: function search(field, value, strict) {
	        var indexes = [];

	        for (var i = 0; i < this.$data.length; i++) {
	            var currentValue = _Util2.default.selectNestedObject(this.$data[i], field);

	            if (strict === true && value === currentValue) {
	                indexes.push(i);
	            } else if (!strict && value == currentValue) {
	                indexes.push(i);
	            }
	        }

	        return indexes;
	    },

	    shift: function shift() {
	        return this.$data.shift();
	    },

	    sort: function sort(field, order) {
	        this.$data.sort(function (a, b) {
	            var result = _Util2.default.selectNestedObject(a, field) > _Util2.default.selectNestedObject(b, field) ? 1 : _Util2.default.selectNestedObject(a, field) < _Util2.default.selectNestedObject(b, field) ? -1 : 0;

	            return order ? -result : result;
	        });

	        return this;
	    },

	    sortDesc: function sortDesc(field) {
	        return this.sort(field, true);
	    },

	    splice: function splice(index) {
	        if (this.$data.length == 0) {
	            return this;
	        }

	        var items = [];

	        if (Array.isArray(index)) {
	            index.sort(function (a, b) {
	                return b < a;
	            });

	            for (var i = index.length - 1; i >= 0; i--) {
	                if (index[i] >= this.$data.length) continue;

	                items.unshift(this.$data[index[i]]);

	                this.$data.splice(index[i], 1);
	            }
	        } else if (index < this.$data.length) {
	            items.push(this.$data[index]);

	            this.$data.splice(index, 1);
	        }

	        return items;
	    },

	    spliceByValue: function spliceByValue(field, value, strict) {
	        return this.splice(this.search(field, value, strict));
	    },

	    sum: function sum(field) {
	        if (this.$data.length == 0) {
	            return 0;
	        }

	        var value = 0;

	        for (var i = 0; i < this.$data.length; i++) {
	            var currentVal = _Util2.default.selectNestedObject(this.$data[i], field);

	            if (isNaN(currentVal)) {
	                throw currentVal + " is not a number.";
	            }

	            value += currentVal;
	        }

	        return value;
	    },

	    toJson: function toJson() {
	        return JSON.stringify(this.$data);
	    },

	    update: function update(index, field, value) {
	        if (this.$data.length == 0) {
	            return this;
	        }

	        if (Array.isArray(index)) {
	            for (var i = 0; i < index.length; i++) {
	                if (index[i] >= this.$data.length) continue;

	                _Util2.default.setNestedObjectValue(this.$data[index[i]], field, value);
	            }
	        } else if (index < this.$data.length) {
	            _Util2.default.setNestedObjectValue(this.$data[index], field, value);
	        }

	        return this;
	    },

	    updateByField: function updateByField(field, valueField, value) {
	        return this.update(this.search(field, valueField), field, value);
	    }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Util = __webpack_require__(20);

	var _Util2 = _interopRequireDefault(_Util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var QueryResolver = Object.create({

	    resolve: function resolve() {
	        // Called with Builder context
	        doWhere.call(this);
	        doOrderBy.call(this);
	        doGroupBy.call(this);
	        return doSelect.call(this);
	    }

	});

	exports.default = QueryResolver;


	var doWhere = function doWhere() {
	    if (this.$where.and.length + this.$where.or.length > 0) {
	        this.$result = this.$result.filter(function (element) {
	            var passed = false;

	            for (var i = 0; i < this.$where.and.length; i++) {
	                var where = this.$where.and[i];

	                var elementValue = _Util2.default.selectNestedObject(element, where.field);

	                passed = where.resolve(elementValue);

	                if (!passed) {
	                    passed = false;

	                    break;
	                }
	            }

	            if (!passed) {
	                for (var i = 0; i < this.$where.or.length; i++) {
	                    var where = this.$where.or[i];

	                    var elementValue = _Util2.default.selectNestedObject(element, where.field);

	                    passed = where.resolve(elementValue);

	                    if (passed) {
	                        passed = true;

	                        break;
	                    }
	                }
	            }

	            return passed;
	        }.bind(this));
	    }

	    return this;
	};

	var doOrderBy = function doOrderBy() {
	    if (this.$orderBy.length > 0) {
	        this.$result.sort(function (a, b) {
	            for (var i = 0; i < this.$orderBy.length; i++) {
	                var retval = this.$orderBy[i].resolve(a, b);

	                if (retval !== 0) {
	                    return retval;
	                }
	            }
	        }.bind(this));
	    }

	    return this;
	};

	var doGroupBy = function doGroupBy() {
	    if (this.$groupBy.length > 0) {
	        var groupedElement = {};

	        this.$result.map(function (element) {
	            groupedElement = _Util2.default.createGroupsRecursively(this.$groupBy, element, 0, groupedElement);
	        }.bind(this));

	        this.$result = groupedElement;
	    }

	    return this;
	};

	var doSelect = function doSelect() {
	    if (this.$select == '*') {
	        return this;
	    }

	    var elementResult = [];

	    if (this.$groupBy.length > 0) {
	        this.$result = [this.$result];
	    }

	    this.$result.map(function (element) {
	        var newElement = {};

	        for (var i in this.$select) {
	            _Util2.default.createNestedObject(newElement, this.$select[i], _Util2.default.selectNestedObject(element, this.$select[i]));
	        }

	        elementResult.push(newElement);
	    }.bind(this));

	    this.$result = this.$groupBy.length ? elementResult[0] : elementResult;

	    return this;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Collection = __webpack_require__(22);

	var _Collection2 = _interopRequireDefault(_Collection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Collection', function () {
	    var user1 = {
	        id: 1,
	        name: 'Alex',
	        money: 1000,
	        car: { brand: 'Hyundai', model: 'i30', price: 15000 },
	        friends: ['Tamara', 'Josh'],
	        birthdate: '1991-08-29'
	    };

	    var user2 = {
	        id: 2,
	        name: 'Tamara',
	        money: 2000,
	        car: { brand: 'Audi', model: 'A1', price: 20000 },
	        friends: ['Kevin'],
	        birthdate: '1991-06-19'
	    };

	    var user3 = {
	        id: 3,
	        name: 'Josh',
	        money: 3000,
	        car: { brand: 'Audi', model: 'A3', price: 10000 },
	        friends: ['Peter', 'Newton', 'Heisenberg'],
	        birthdate: '1994-02-28'
	    };

	    var users = [user1, user2, user3];

	    var collection = function collection(data) {
	        return new _Collection2.default(data || JSON.parse(JSON.stringify(users)));
	    };

	    it('Instantiation', function () {
	        var c = new _Collection2.default();
	        expect(c.$data).toEqual([]);

	        var c = new _Collection2.default(undefined);
	        expect(c.$data).toEqual([]);

	        var c = new _Collection2.default(null);
	        expect(c.$data).toEqual([]);

	        var c = new _Collection2.default(1);
	        expect(c.$data).toEqual([1]);
	    });

	    it('all', function () {
	        expect(collection().all()).toEqual(users);
	    });

	    it('avg', function () {
	        expect(function () {
	            collection().avg('name');
	        }).toThrow('Alex is not a number.');

	        expect(collection().avg('money')).toBe(2000);
	        expect(collection().avg('car.price')).toBe(45000 / 3);
	    });

	    it('contains', function () {
	        var car = { brand: 'Hyundai', model: 'i30', price: 15000 };

	        expect(collection().contains('name', 'Alex')).toBeTruthy();
	        expect(collection().contains('car.brand', 'Hyundai')).toBeTruthy();
	        expect(collection().contains('car.brand', 'Seat')).toBeFalsy();
	        expect(collection().contains('car', car)).toBeTruthy();
	    });

	    it('count', function () {
	        expect(collection().count()).toBe(3);
	    });

	    it('each', function () {
	        expect(function () {
	            collection().each('string');
	        }).toThrow('Callback is not a function.');

	        collection().each(function (element, index) {
	            expect(element).toEqual(users[index]);
	        });
	    });

	    it('first', function () {
	        expect(collection().first()).toEqual(user1);
	    });

	    it('last', function () {
	        expect(collection().last()).toEqual(user3);
	    });

	    it('max', function () {
	        expect(function () {
	            collection().max();
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().max(null);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().max(undefined);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().max([]);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().max({});
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().max('name');
	        }).toThrow('"name" is not a number.');

	        expect(collection().max('money')).toBe(3000);
	        expect(collection().max('car.price')).toBe(20000);
	    });

	    it('maxDate', function () {
	        expect(function () {
	            collection().maxDate();
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().maxDate(null);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().maxDate(undefined);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().maxDate([]);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().maxDate({});
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().maxDate('name');
	        }).toThrow('"name" is not a valid date.');

	        var birthdate = collection().maxDate('birthdate');
	        expect(birthdate.getMonth()).toBe(1);
	        expect(birthdate.getYear()).toBe(94);
	    });

	    it('min', function () {
	        expect(function () {
	            collection().min();
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().min(null);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().min(undefined);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().min([]);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().min({});
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().min('name');
	        }).toThrow('"name" is not a number.');

	        expect(collection().min('money')).toBe(1000);
	        expect(collection().min('car.price')).toBe(10000);
	    });

	    it('minDate', function () {
	        expect(function () {
	            collection().minDate();
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().minDate(null);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().minDate(undefined);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().minDate([]);
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().minDate({});
	        }).toThrow('Invalid field supplied.');

	        expect(function () {
	            collection().minDate('name');
	        }).toThrow('"name" is not a valid date.');

	        var birthdate = collection().minDate('birthdate');
	        expect(birthdate.getMonth()).toBe(5);
	        expect(birthdate.getYear()).toBe(91);
	    });

	    it('pluck', function () {
	        expect(collection().pluck('name')).toEqual(['Alex', 'Tamara', 'Josh']);
	        expect(collection().pluck('car.price')).toEqual([15000, 20000, 10000]);
	    });

	    it('pop', function () {
	        var item = collection().pop();
	        expect(item).toEqual(user3);

	        var c = collection();
	        c.pop();
	        expect(c.count()).toBe(2);
	        expect(c.$data).toEqual([user1, user2]);
	    });

	    it('random', function () {
	        var rndUser = collection().random();
	        var result = false;
	        for (var i = 0; i < users.length; i++) {
	            if (JSON.stringify(users[i]) === JSON.stringify(rndUser)) {
	                result = true;
	            }
	        }
	        expect(result).toBeTruthy();
	    });

	    it('search', function () {
	        expect(collection().search('name', 'Alex')).toEqual([0]);
	        expect(collection().search('car.brand', 'Audi')).toEqual([1, 2]);
	        expect(collection().search('money', '1000')).toEqual([0]);
	        expect(collection().search('money', '1000', true)).toEqual([]);
	        expect(collection().search('money', 1000, true)).toEqual([0]);
	    });

	    it('shift', function () {
	        var item = collection().shift();
	        expect(item).toEqual(user1);

	        var c = collection();
	        c.shift();
	        expect(c.count()).toBe(2);
	        expect(c.$data).toEqual([user2, user3]);
	    });

	    it('sort', function () {
	        expect(collection().sort('name').$data).toEqual([user1, user3, user2]);
	    });

	    it('sortDesc', function () {
	        expect(collection().sortDesc('name').$data).toEqual([user2, user3, user1]);
	    });

	    it('splice', function () {
	        var c = collection();
	        var items = c.splice(0);
	        expect(items).toEqual([user1]);
	        expect(c.$data).toEqual([user2, user3]);

	        var c = collection();
	        var items = c.splice([1, 2]);
	        expect(items).toEqual([user2, user3]);
	        expect(c.$data).toEqual([user1]);
	    });

	    it('spliceByValue', function () {
	        var c = collection();
	        var items = c.spliceByValue('name', 'Alex');
	        expect(items).toEqual([user1]);
	        expect(c.$data).toEqual([user2, user3]);

	        var c = collection();
	        var items = c.spliceByValue('car.brand', 'Audi');
	        expect(items).toEqual([user2, user3]);
	        expect(c.$data).toEqual([user1]);
	    });

	    it('sum', function () {
	        expect(function () {
	            collection().sum('name');
	        }).toThrow('Alex is not a number.');

	        expect(collection().sum('money')).toBe(6000);
	        expect(collection().sum('car.price')).toBe(45000);
	    });

	    it('toJson', function () {
	        expect(collection().toJson()).toBe(JSON.stringify(users));
	    });

	    it('update', function () {
	        expect(collection().update(0, 'name', 'Peter').$data[0].name).toBe('Peter');

	        var c = collection().update([0, 2], 'car.brand', 'Skoda');
	        expect(c.$data[0].car.brand).toBe('Skoda');
	        expect(c.$data[2].car.brand).toBe('Skoda');
	    });

	    it('updateByField', function () {
	        expect(collection().updateByField('name', 'Alex', 'Jhon').$data[0].name).toBe('Jhon');

	        var c = collection().updateByField('car.brand', 'Audi', 'Skoda');
	        expect(c.$data[0].car.brand).toBe('Hyundai');
	        expect(c.$data[1].car.brand).toBe('Skoda');
	        expect(c.$data[2].car.brand).toBe('Skoda');
	    });
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Paginator = __webpack_require__(21);

	var _Paginator2 = _interopRequireDefault(_Paginator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Paginator', function () {
	    it('Performs Paginator', function () {
	        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
	        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Audi' } };
	        var user3 = { id: 3, name: 'Josh', car: { brand: 'Audi' } };
	        var users = [user1, user2, user3];

	        var p = new _Paginator2.default(users, 2);
	        expect(p.totalRecords).toBe(3);
	        expect(p.recordsPerPage).toBe(2);
	        expect(p.totalPages).toBe(2);
	        expect(p.pages).toEqual([[user1, user2], [user3]]);
	        expect(p.currentIndex).toBe(1);
	        expect(p.current()).toEqual([user1, user2]);
	    });

	    it('Go next & prev', function () {
	        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
	        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Audi' } };
	        var user3 = { id: 3, name: 'Josh', car: { brand: 'Audi' } };
	        var users = [user1, user2, user3];

	        var p = new _Paginator2.default(users, 1);
	        expect(p.currentIndex).toBe(1);
	        expect(p.current()).toEqual([user1]);
	        p.next();
	        expect(p.currentIndex).toBe(2);
	        expect(p.current()).toEqual([user2]);
	        p.next();
	        expect(p.currentIndex).toBe(3);
	        expect(p.current()).toEqual([user3]);
	        p.next();
	        expect(p.currentIndex).toBe(3);
	        expect(p.current()).toEqual([user3]);
	        p.previous();
	        expect(p.currentIndex).toBe(2);
	        expect(p.current()).toEqual([user2]);
	        p.previous();
	        expect(p.currentIndex).toBe(1);
	        expect(p.current()).toEqual([user1]);
	        p.previous();
	        expect(p.currentIndex).toBe(1);
	        expect(p.current()).toEqual([user1]);
	    });
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Util = __webpack_require__(20);

	var _Util2 = _interopRequireDefault(_Util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Util', function () {
	    it('Select nested object', function () {
	        var user = {
	            id: 1,
	            name: 'Alex',
	            car: {
	                brand: 'Hyundai',
	                model: 'i30',
	                year: null,
	                properties: {
	                    doors: undefined,
	                    horsepower: '90cv',
	                    price: {
	                        price: 12000,
	                        currency: 'EUR'
	                    }
	                }
	            }
	        };

	        expect(_Util2.default.selectNestedObject(user, 'name')).toBe('Alex');
	        expect(_Util2.default.selectNestedObject(user, 'car.brand')).toBe('Hyundai');
	        expect(_Util2.default.selectNestedObject(user, 'car.year')).toBe(null);
	        expect(_Util2.default.selectNestedObject(user, 'car.properties.doors')).toBe(undefined);
	        expect(_Util2.default.selectNestedObject(user, 'car.properties.price')).toEqual(user.car.properties.price);

	        expect(function () {
	            _Util2.default.selectNestedObject(user, 'car.properties.horsepower.currency');
	        }).toThrow('Child "currency" not found in "horsepower" child, because it\'s not an object.');

	        expect(function () {
	            _Util2.default.selectNestedObject(user, 'car.properties.noexistsnode.currency');
	        }).toThrow('Child "noexistsnode" not found in "properties".');
	    });

	    it('Create nested object', function () {
	        expect(_Util2.default.createNestedObject({}, 'name')).toEqual({ name: undefined });
	        expect(_Util2.default.createNestedObject({}, 'name', null)).toEqual({ name: null });
	        expect(_Util2.default.createNestedObject({}, 'name', undefined)).toEqual({ name: undefined });
	        expect(_Util2.default.createNestedObject({}, 'name', 'Alex')).toEqual({ name: 'Alex' });
	        expect(_Util2.default.createNestedObject({}, 'user.name', 'Alex')).toEqual({ user: { name: 'Alex' } });
	        expect(_Util2.default.createNestedObject({}, 'user.properties.age')).toEqual({ user: { properties: { age: undefined } } });
	        expect(_Util2.default.createNestedObject({}, 'user.properties.age', null)).toEqual({ user: { properties: { age: null } } });
	        expect(_Util2.default.createNestedObject({}, 'user.properties.age', undefined)).toEqual({ user: { properties: { age: undefined } } });
	        expect(_Util2.default.createNestedObject({}, 'user.properties.age', 'Alex')).toEqual({ user: { properties: { age: 'Alex' } } });
	    });

	    it('Create groups recursively', function () {
	        var user1 = { id: 1, name: 'Alex', age: 24, properties: { last_name: 'Last1' }, object: {}, array: [] };

	        expect(function () {
	            _Util2.default.createGroupsRecursively(['object'], user1);
	        }).toThrow('You can\'t group by an object or array.');

	        expect(function () {
	            _Util2.default.createGroupsRecursively(['array'], user1);
	        }).toThrow('You can\'t group by an object or array.');

	        expect(_Util2.default.createGroupsRecursively(['age'], user1)).toEqual({ '24': [user1] });

	        expect(_Util2.default.createGroupsRecursively(['age', 'name'], user1)).toEqual({ '24': { 'Alex': [user1] } });

	        expect(_Util2.default.createGroupsRecursively(['age', 'name', 'id'], user1)).toEqual({ '24': { 'Alex': { '1': [user1] } } });

	        expect(_Util2.default.createGroupsRecursively(['properties.last_name'], user1)).toEqual({ 'Last1': [user1] });

	        expect(_Util2.default.createGroupsRecursively(['properties.last_name', 'age'], user1)).toEqual({ 'Last1': { '24': [user1] } });
	    });
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Builder = __webpack_require__(19);

	var _Builder2 = _interopRequireDefault(_Builder);

	var _Collection = __webpack_require__(22);

	var _Collection2 = _interopRequireDefault(_Collection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Builder', function () {
	    var builder = function builder(data) {
	        return new _Builder2.default(data || { id: 1, name: 'Alex' });
	    };

	    it('Instantiation', function () {
	        expect(function () {
	            new _Builder2.default();
	        }).toThrow('No data supplied!');

	        expect(function () {
	            new _Builder2.default(null);
	        }).toThrow('No data supplied!');

	        expect(function () {
	            new _Builder2.default(undefined);
	        }).toThrow('No data supplied!');

	        expect(function () {
	            new _Builder2.default([]);
	        }).toThrow('No data supplied!');

	        expect(function () {
	            new _Builder2.default({});
	        }).toThrow('No data supplied!');

	        var b = new _Builder2.default({ id: 1, name: 'Alex' });
	        expect(Array.isArray(b.$original)).toBeTruthy();
	        expect(b.$original.length).toBe(1);

	        var b = new _Builder2.default([{ id: 1, name: 'Alex' }]);
	        expect(Array.isArray(b.$original)).toBeTruthy();
	        expect(b.$original.length).toBe(1);
	        expect(b.$result).toEqual(b.$original);
	        expect(b.$select).toBe('*');
	        expect(b.$where).toEqual({ and: [], or: [] });
	        expect(b.$groupBy).toEqual([]);
	        expect(b.$orderBy).toEqual([]);
	    });

	    it('Clean', function () {
	        var b = new _Builder2.default({ id: 1, name: 'Alex' }).clean();
	        expect(b.$original).toEqual([{ id: 1, name: 'Alex' }]);
	        expect(b.$result).toEqual(b.$original);
	        expect(b.$select).toBe('*');
	        expect(b.$where).toEqual({ and: [], or: [] });
	        expect(b.$groupBy).toEqual([]);
	        expect(b.$orderBy).toEqual([]);
	    });

	    it('Add where clause', function () {
	        // Where
	        expect(builder().where('id', 1).$where.and[0].name).toBe('where');
	        expect(builder().whereNot('id', 1).$where.and[0].name).toBe('whereNot');
	        expect(builder().orWhere('id', 1).$where.or[0].name).toBe('where');
	        expect(builder().orWhereNot('id', 1).$where.or[0].name).toBe('whereNot');
	        //Where Date
	        expect(builder().whereDate('id', '1900-01-01').$where.and[0].name).toBe('whereDate');
	        expect(builder().whereNotDate('id', '1900-01-01').$where.and[0].name).toBe('whereNotDate');
	        expect(builder().orWhereDate('id', '1900-01-01').$where.or[0].name).toBe('whereDate');
	        expect(builder().orWhereNotDate('id', '1900-01-01').$where.or[0].name).toBe('whereNotDate');
	        // Where Between
	        expect(builder().whereBetween('id', 1, 2).$where.and[0].name).toBe('whereBetween');
	        expect(builder().whereNotBetween('id', 1, 2).$where.and[0].name).toBe('whereNotBetween');
	        expect(builder().orWhereBetween('id', 1, 2).$where.or[0].name).toBe('whereBetween');
	        expect(builder().orWhereNotBetween('id', 1, 2).$where.or[0].name).toBe('whereNotBetween');
	        // Where Count
	        expect(builder().whereCount('id', 1).$where.and[0].name).toBe('whereCount');
	        expect(builder().whereNotCount('id', 1).$where.and[0].name).toBe('whereNotCount');
	        expect(builder().orWhereCount('id', 1).$where.or[0].name).toBe('whereCount');
	        expect(builder().orWhereNotCount('id', 1).$where.or[0].name).toBe('whereNotCount');
	        // Where In
	        expect(builder().whereIn('id', [1]).$where.and[0].name).toBe('whereIn');
	        expect(builder().whereNotIn('id', [1]).$where.and[0].name).toBe('whereNotIn');
	        expect(builder().orWhereIn('id', [1]).$where.or[0].name).toBe('whereIn');
	        expect(builder().orWhereNotIn('id', [1]).$where.or[0].name).toBe('whereNotIn');
	        // Where Like
	        expect(builder().whereLike('id', /like/).$where.and[0].name).toBe('whereLike');
	        expect(builder().whereNotLike('id', /like/).$where.and[0].name).toBe('whereNotLike');
	        expect(builder().orWhereLike('id', /like/).$where.or[0].name).toBe('whereLike');
	        expect(builder().orWhereNotLike('id', /like/).$where.or[0].name).toBe('whereNotLike');

	        var b = builder().where('name', 'test').where('name', 'test2').orWhere('name', 'test3').orWhere('name', 'test4');
	        expect(b.$where.and.length).toBe(2);
	        expect(b.$where.or.length).toBe(2);
	    });

	    it('Add group by clause', function () {
	        expect(builder().groupBy('field').$groupBy[0]).toBe('field');

	        var b = builder().groupBy('field');
	        expect(b.$groupBy).toEqual(['field']);
	        expect(b.$groupBy.length).toBe(1);

	        var b = builder().groupBy(['field', 'field.attr']);
	        expect(b.$groupBy).toEqual(['field', 'field.attr']);
	        expect(b.$groupBy.length).toBe(2);

	        var b = builder().groupBy('field', 'field.attr');
	        expect(b.$groupBy).toEqual(['field', 'field.attr']);
	        expect(b.$groupBy.length).toBe(2);
	    });

	    it('Add order by clause', function () {
	        expect(builder().orderBy('id', 'asc').$orderBy[0].name).toBe('orderBy');
	        expect(builder().orderByDate('id', 'asc').$orderBy[0].name).toBe('orderByDate');

	        var b = builder().orderBy('id', 'asc').orderBy('name', 'desc').orderByDate('birthdate');
	        expect(b.$orderBy.length).toBe(3);
	    });

	    it('Add select clause', function () {
	        expect(builder().select('field').$select[0]).toBe('field');

	        var b = builder().select('field');
	        expect(b.$select).toEqual(['field']);
	        expect(b.$select.length).toBe(1);

	        var b = builder().select(['field', 'field.attr']);
	        expect(b.$select).toEqual(['field', 'field.attr']);
	        expect(b.$select.length).toBe(2);

	        var b = builder().select('field', 'field.attr');
	        expect(b.$select).toEqual(['field', 'field.attr']);
	        expect(b.$select.length).toBe(2);
	    });

	    it('Fetch data', function () {
	        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
	        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Hyundai' } };
	        var users = [user1, user2];

	        var b = builder(users);
	        expect(b.get()).toEqual(users);
	        expect(b.$result).toEqual(users);

	        var b = builder(users);
	        expect(b.first()).toEqual(user1);
	        expect(b.$result).toEqual(users);

	        var b = builder(users);
	        expect(b.last()).toEqual(user2);
	        expect(b.$result).toEqual(users);

	        var b = builder(users);
	        expect(b.count()).toEqual(2);
	        expect(b.$result).toEqual(users);

	        var b = builder(users).groupBy('car.brand');
	        expect(b.get()).toEqual({ 'Hyundai': [user1, user2] });

	        var b = builder(users).groupBy('car.brand');
	        expect(b.first()).toEqual({ 'Hyundai': [user1, user2] });

	        var b = builder(users).groupBy('car.brand');
	        expect(b.last()).toEqual({ 'Hyundai': [user1, user2] });

	        var b = builder(users).groupBy('car.brand');
	        expect(b.count()).toEqual(1);

	        // Collection
	        var b = builder(users);
	        expect(b.collect() instanceof _Collection2.default).toBeTruthy();
	        expect(b.collect().$data.length).toBe(2);

	        var b = builder(users).groupBy('car.brand');
	        expect(function () {
	            b.collect();
	        }).toThrow('Can\'t make a collection from grouped result.');
	    });

	    it('Paginate data', function () {
	        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
	        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Hyundai' } };
	        var users = [user1, user2];

	        var b = builder(users).groupBy('name');
	        expect(function () {
	            b.paginate();
	        }).toThrow('You can\'t paginate a grouped result.');
	    });

	    it('To model', function () {
	        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
	        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Hyundai' } };
	        var users = [user1, user2];

	        expect(function () {
	            builder(users).toModel();
	        }).toThrow('Constructor not supplied.');

	        expect(function () {
	            builder(users).toModel(undefined);
	        }).toThrow('Constructor not supplied.');

	        expect(function () {
	            builder(users).toModel(null);
	        }).toThrow('Constructor not supplied.');

	        expect(function () {
	            builder(users).toModel({});
	        }).toThrow('Invalid constructor. It has to be a function.');

	        var userModel = function User(car) {
	            this.car = car;
	        };
	        expect(function () {
	            builder(users).toModel(userModel, ['Car']);
	        }).toThrow('Property "car" is already defined in constructor and can\'t be overrided.');

	        var userModel = function User(car) {
	            this.lol = car;this.func = function () {};
	        };
	        var userModelInstances = builder(users).toModel(userModel, ['Car'], true);

	        expect(userModelInstances.length).toBe(2);
	        expect(userModelInstances[0].id).toEqual(user1.id);
	        expect(userModelInstances[0].name).toEqual(user1.name);
	        expect(userModelInstances[0].car).toEqual(user1.car);
	        expect(userModelInstances[0].car.brand).toEqual(user1.car.brand);
	        expect(userModelInstances[0].hasOwnProperty('func')).toBeTruthy();
	    });
	});

/***/ }
/******/ ]);