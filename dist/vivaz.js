(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Builder = __webpack_require__(1);

	var _Builder2 = _interopRequireDefault(_Builder);

	var _Config = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Vivaz(data, config) {
	    var cfg = (0, _Config.overrideConfig)(config || {});

	    return new _Builder2.default(data, cfg);
	}

	Vivaz._version = '0.1.2';

	Vivaz._env = 'development';

	exports.default = Vivaz;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = Builder;

	var _Where = __webpack_require__(2);

	var _Where2 = _interopRequireDefault(_Where);

	var _WhereIn = __webpack_require__(6);

	var _WhereIn2 = _interopRequireDefault(_WhereIn);

	var _WhereDate = __webpack_require__(7);

	var _WhereDate2 = _interopRequireDefault(_WhereDate);

	var _WhereLike = __webpack_require__(8);

	var _WhereLike2 = _interopRequireDefault(_WhereLike);

	var _WhereCount = __webpack_require__(9);

	var _WhereCount2 = _interopRequireDefault(_WhereCount);

	var _WhereBetween = __webpack_require__(10);

	var _WhereBetween2 = _interopRequireDefault(_WhereBetween);

	var _OrderBy = __webpack_require__(11);

	var _OrderBy2 = _interopRequireDefault(_OrderBy);

	var _OrderByDate = __webpack_require__(12);

	var _OrderByDate2 = _interopRequireDefault(_OrderByDate);

	var _Query = __webpack_require__(13);

	var _Query2 = _interopRequireDefault(_Query);

	var _Crawler = __webpack_require__(14);

	var _Crawler2 = _interopRequireDefault(_Crawler);

	var _Paginator = __webpack_require__(15);

	var _Paginator2 = _interopRequireDefault(_Paginator);

	var _Collection = __webpack_require__(16);

	var _Collection2 = _interopRequireDefault(_Collection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Builder(data, cfg) {
	    if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && Object.keys(data).length === 0) {
	        throw "No data supplied!";
	    }

	    this.$config = cfg;

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

	        return _Query2.default.resolve(this).$result;
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

	        var createModelInstance = function createModelInstance(constructor, args) {
	            var a = [''].concat(Array.isArray(args) ? args : [args]);

	            return new (Function.prototype.bind.apply(constructor, a))();
	        };

	        // Check if properties of the results are already defined in constructor
	        // This loop avoid 'ifing' when creating models. Better performance for bigger results
	        var stomp = override || false;
	        var properties = Object.keys(this.$result[0]);
	        var testModel = createModelInstance(modelConstructor, args || []);

	        for (var i = 0; i < properties.length; i++) {
	            if (!stomp && testModel.hasOwnProperty(properties[i])) {
	                throw 'Property "' + properties[i] + '" is already defined in constructor and can\'t be overrided.';
	            }
	        }

	        // Create and populate models
	        var models = [];

	        for (var i = 0; i < this.$result.length; i++) {
	            var newModel = createModelInstance(modelConstructor, args || []);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.overrideConfig = overrideConfig;

	var _Environment = __webpack_require__(4);

	var _Constants = __webpack_require__(5);

	var Config = {

	    debug: false,

	    dateFields: [],

	    dateAsObjects: true,

	    integrations: {
	        moment: {
	            active: false,
	            factory: null
	        }
	    },

	    validOperators: ['=', '===', '!=', '!==', '<', '<=', '>=', '>', '<>'],

	    runningPlatform: _Environment.isBrowser ? _Constants.PLATFORM_BROWSER : _Constants.PLATFORM_NODE
	};

	exports.default = Config;
	function overrideConfig(userConfig) {
	    var cfg = {};

	    // Default config
	    for (var prop in Config) {
	        cfg[prop] = Config[prop];
	    } // User config
	    for (var prop in userConfig) {
	        cfg[prop] = userConfig[prop];
	    }return cfg;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var isBrowser = exports.isBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PLATFORM_NODE = exports.PLATFORM_NODE = 'nodejs';
	var PLATFORM_BROWSER = exports.PLATFORM_BROWSER = 'browser';

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = WhereDate;

	var _Where = __webpack_require__(2);

	var _Where2 = _interopRequireDefault(_Where);

	var _Config = __webpack_require__(3);

	var _Config2 = _interopRequireDefault(_Config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function WhereDate(field, operator, value, $not) {
	    this.name = $not ? 'whereNotDate' : 'whereDate';
	    this.not = $not || false;

	    this.field = field;
	    this.operator = operator;
	    this.value = value;

	    // momentjs integration
	    this.valueIsMomentObject = false;

	    this.resolveArguments().resolveValue();
	}

	WhereDate.prototype = Object.create(_Where2.default.prototype);

	WhereDate.prototype.constructor = WhereDate;

	WhereDate.prototype.resolveValue = function () {
	    // Moment.js validation
	    if (_typeof(this.value) == 'object' && _Config2.default.integrations.moment.active === true && this.value.hasOwnProperty('_isAMomentObject') && this.value['_isAMomentObject'] === true) {
	        this.valueIsMomentObject = true;

	        return this;
	    }

	    var date = new Date(this.value);

	    if (date == 'Invalid Date' || this.value === null || this.value === undefined) {
	        throw 'Value "' + this.value + '" is not a valid date.';
	    }

	    this.value = date;

	    return this;
	};

	WhereDate.prototype.resolve = function (elementValue) {
	    if (this.valueIsMomentObject) {
	        var dateValue = this.value._isUTC ? _Config2.default.integrations.moment.factory.utc(elementValue) : _Config2.default.integrations.moment.factory(elementValue);
	    } else {
	        var dateValue = new Date(elementValue);
	    }

	    if (dateValue.toString() == 'Invalid Date') {
	        throw 'Invalid date "' + elementValue + '" in field "' + this.field + '".';
	    }

	    switch (this.operator) {
	        case '=':
	            var result = dateValue.toISOString() == this.value.toISOString();
	            break;

	        case '!=':
	        case '<>':
	            var result = dateValue.toISOString() != this.value.toISOString();
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
/* 8 */
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = OrderByDate;

	var _OrderBy = __webpack_require__(11);

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Crawler = __webpack_require__(14);

	var _Crawler2 = _interopRequireDefault(_Crawler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Query = Object.create({

	    resolve: function resolve(builder) {
	        this.doWhere(builder);
	        this.doOrderBy(builder);
	        this.doGroupBy(builder);
	        this.doSelect(builder);

	        return builder;
	    },

	    doWhere: function doWhere(builder) {
	        if (builder.$where.and.length + builder.$where.or.length > 0) {
	            builder.$result = builder.$result.filter(function (element) {
	                var passed = false;

	                for (var i = 0; i < builder.$where.and.length; i++) {
	                    var where = builder.$where.and[i];

	                    var elementValue = _Crawler2.default.selectNestedObject(element, where.field);

	                    passed = where.resolve(elementValue);

	                    if (!passed) {
	                        passed = false;

	                        break;
	                    }
	                }

	                if (!passed) {
	                    for (var i = 0; i < builder.$where.or.length; i++) {
	                        var where = builder.$where.or[i];

	                        var elementValue = _Crawler2.default.selectNestedObject(element, where.field);

	                        passed = where.resolve(elementValue);

	                        if (passed) {
	                            passed = true;

	                            break;
	                        }
	                    }
	                }

	                return passed;
	            }.bind(builder));
	        }

	        return builder;
	    },

	    doOrderBy: function doOrderBy(builder) {
	        if (builder.$orderBy.length > 0) {
	            builder.$result.sort(function (a, b) {
	                for (var i = 0; i < builder.$orderBy.length; i++) {
	                    var retval = builder.$orderBy[i].resolve(a, b);

	                    if (retval !== 0) {
	                        return retval;
	                    }
	                }
	            }.bind(builder));
	        }

	        return builder;
	    },

	    doGroupBy: function doGroupBy(builder) {
	        if (builder.$groupBy.length > 0) {
	            var groupedElement = {};

	            builder.$result.map(function (element) {
	                groupedElement = _Crawler2.default.createGroupsRecursively(builder.$groupBy, element, 0, groupedElement);
	            }.bind(builder));

	            builder.$result = groupedElement;
	        }

	        return builder;
	    },

	    doSelect: function doSelect(builder) {
	        if (builder.$select == '*') {
	            return builder;
	        }

	        var elementResult = [];

	        if (builder.$groupBy.length > 0) {
	            builder.$result = [builder.$result];
	        }

	        builder.$result.map(function (element) {
	            var newElement = {};

	            for (var i in builder.$select) {
	                _Crawler2.default.createNestedObject(newElement, builder.$select[i], _Crawler2.default.selectNestedObject(element, builder.$select[i]));
	            }

	            elementResult.push(newElement);
	        }.bind(builder));

	        builder.$result = builder.$groupBy.length ? elementResult[0] : elementResult;

	        return builder;
	    }

	});

	exports.default = Query;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var Crawler = Object.create({

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
	    }

	});

	exports.default = Crawler;

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = Collection;

	var _Crawler = __webpack_require__(14);

	var _Crawler2 = _interopRequireDefault(_Crawler);

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
	                var currentVal = _Crawler2.default.selectNestedObject(this.$data[i], field);

	                if (JSON.stringify(currentVal) === JSON.stringify(value)) {
	                    return true;
	                }
	            }
	        } else {
	            for (var i = 0; i < this.$data.length; i++) {
	                var currentVal = _Crawler2.default.selectNestedObject(this.$data[i], field);

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
	            var currentVal = _Crawler2.default.selectNestedObject(this.$data[i], field);

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
	            var currentVal = new Date(_Crawler2.default.selectNestedObject(this.$data[i], field));

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
	            var currentVal = _Crawler2.default.selectNestedObject(this.$data[i], field);

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
	            var currentVal = new Date(_Crawler2.default.selectNestedObject(this.$data[i], field));

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
	            var currentVal = _Crawler2.default.selectNestedObject(this.$data[i], field);

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
	            var currentValue = _Crawler2.default.selectNestedObject(this.$data[i], field);

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
	            var result = _Crawler2.default.selectNestedObject(a, field) > _Crawler2.default.selectNestedObject(b, field) ? 1 : _Crawler2.default.selectNestedObject(a, field) < _Crawler2.default.selectNestedObject(b, field) ? -1 : 0;

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
	            var currentVal = _Crawler2.default.selectNestedObject(this.$data[i], field);

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

	                _Crawler2.default.setNestedObjectValue(this.$data[index[i]], field, value);
	            }
	        } else if (index < this.$data.length) {
	            _Crawler2.default.setNestedObjectValue(this.$data[index], field, value);
	        }

	        return this;
	    },

	    updateByField: function updateByField(field, valueField, value) {
	        return this.update(this.search(field, valueField), field, value);
	    }
	};

/***/ }
/******/ ])
});
;