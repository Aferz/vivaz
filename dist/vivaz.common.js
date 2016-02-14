/*!
 * Vivaz.js v0.1.2
 * (c) 2016 Alejandro Fernandez
 * Released under the MIT License.
 */
'use strict';

var Config = Object.create({}, {

    validOperators: {
        value: ['=', '===', '!=', '!==', '<', '<=', '>=', '>', '<>'],
        writable: false
    }

});

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

    resolveArguments: function (args) {
        if (!this.field) {
            throw 'No field provided for "' + this.name + '" clause.';
        }

        if (this.operator === null || this.operator === undefined || this.operator === false || this.operator === true) {
            invalidOperatorException.call(this, this.operator);
        }

        var hasValidOperator = Config.validOperators.indexOf(this.operator) > -1;

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

    resolve: function (elementValue) {
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

var invalidOperatorException = function (value) {
    var text = value === null ? 'whereNull()' : value === undefined ? 'whereUndefined()' : value === true ? 'whereTrue()' : 'whereFalse()';

    throw 'No correct value provided for "' + this.name + '" clause. For better assertion use ' + text + ' instead.';
};

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

    resolveArguments: function () {
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

    resolve: function (elementValue) {
        var result = this.value.indexOf(elementValue) > -1;

        return this.not ? !result : result;
    }
};

function WhereDate(field, operator, value, $not) {
    this.name = $not ? 'whereNotDate' : 'whereDate';
    this.not = $not || false;

    this.field = field;
    this.operator = operator;
    this.value = value;

    this.resolveArguments().resolveValue();
}

WhereDate.prototype = Object.create(Where.prototype);

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

    resolveArguments: function () {
        if (!this.field) {
            throw 'No field provided for "' + this.name + '" clause.';
        }

        if (!this.expression) {
            throw 'No expression provided for "' + this.name + '" clause.';
        }
    },

    resolve: function (elementValue) {
        var result = elementValue.match(this.expression) ? true : false;

        return this.not ? !result : result;
    }
};

function WhereCount(field, operator, value, $not) {
    this.name = $not ? 'whereNotCount' : 'whereCount';
    this.not = $not || false;

    this.field = field;
    this.operator = operator;
    this.value = value;

    this.resolveArguments(arguments);
}

WhereCount.prototype = Object.create(Where.prototype);

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

    resolveArguments: function () {
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

    resolve: function (elementValue) {
        var result = elementValue >= this.min && elementValue <= this.max;

        return this.not ? !result : result;
    }
};

function OrderBy(field, direction) {
    this.name = 'orderBy';
    this.field = field;
    this.direction = direction || 'asc';

    this.resolveArguments();
}

OrderBy.prototype = {

    field: undefined,

    direction: undefined,

    resolveArguments: function () {
        if (!this.field) {
            throw 'No field provided for "' + this.name + '".';
        }

        if (['asc', 'desc'].indexOf(this.direction) < 0) {
            throw 'Unrecognized sort direction "' + this.direction + '".';
        }
    },

    resolve: function (elementA, elementB) {
        var result = elementA[this.field] < elementB[this.field] ? -1 : elementA[this.field] > elementB[this.field] ? 1 : 0;

        return this.direction == "asc" ? result : -result;
    }
};

function OrderByDate(field, direction) {
    this.name = 'orderByDate';
    this.field = field;
    this.direction = direction || 'asc';

    this.resolveArguments();
}

OrderByDate.prototype = Object.create(OrderBy.prototype);

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

var Util = Object.create({

    createGroupsRecursively: function (groups, element, groupLevel, groupedElement) {
        if (arguments.length == 2) {
            groupLevel = 0;
            groupedElement = {};
        }

        var value = this.selectNestedObject(element, groups[groupLevel]);

        if (typeof value === 'object') {
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

    createNestedObject: function (element, keys, value) {
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

    selectNestedObject: function (element, keys, parentKey, value) {
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
            } else if (element[key] && typeof element[key] == 'object') {
                return this.selectNestedObject(element[key], keys, key, value);
            }

            throw 'Child "' + keys.shift() + '" not found in "' + key + '" child, because it\'s not an object.';
        }
    },

    setNestedObjectValue: function (element, keys, value) {
        this.selectNestedObject(element, keys, undefined, value);

        return element;
    },

    splitNestedField: function (field) {
        return field.indexOf('.') > -1 ? field.split('.') : [field];
    },

    createModelInstance: function (constructor, args) {
        // Adds empty element, to match passed arguments with
        // constructor arguments
        var a = [''].concat(Array.isArray(args) ? args : [args]);

        return new (Function.prototype.bind.apply(constructor, a))();
    }
});

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

    page: function (pageNumber) {
        if (pageNumber > this.totalPages) {
            pageNumber = this.totalPages;
        } else if (pageNumber < 1) {
            pageNumber = 1;
        }

        this.currentIndex = pageNumber || 1;

        return this.pages[this.currentIndex - 1];
    },

    current: function () {
        return this.pages[this.currentIndex - 1];
    },

    next: function () {
        return this.page(this.currentIndex + 1);
    },

    previous: function () {
        return this.page(this.currentIndex - 1);
    }
};

var resolvePages = function (data, itemsPerPage) {
    itemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;

    var pages = [];

    for (var i = 0; i < data.length; i += itemsPerPage) {
        pages.push(data.slice(i, i + itemsPerPage));
    }

    this.pages = pages;
    this.totalPages = this.pages.length;

    return this;
};

function Collection(data) {
    if (!data) {
        this.$data = [];
    } else {
        this.$data = !Array.isArray(data) ? [data] : data;
    }
}

Collection.prototype = {

    all: function () {
        return this.$data;
    },

    avg: function (field) {
        return this.sum(field) / this.$data.length;
    },

    contains: function (field, value, strict) {
        // Avoid if in the loop
        if (typeof value === 'object') {
            for (var i = 0; i < this.$data.length; i++) {
                var currentVal = Util.selectNestedObject(this.$data[i], field);

                if (JSON.stringify(currentVal) === JSON.stringify(value)) {
                    return true;
                }
            }
        } else {
            for (var i = 0; i < this.$data.length; i++) {
                var currentVal = Util.selectNestedObject(this.$data[i], field);

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

    count: function () {
        return this.$data.length;
    },

    each: function (callback) {
        if (typeof callback !== 'function') {
            throw "Callback is not a function.";
        }

        for (var i = 0; i < this.$data.length; i++) {
            if (callback(this.$data[i], i) === false) {
                break;
            }
        }
    },

    first: function () {
        if (this.$data.length === 0) {
            return {};
        }

        return this.$data[0];
    },

    last: function () {
        if (this.$data.length === 0) {
            return {};
        }

        return this.$data[this.$data.length - 1];
    },

    max: function (field) {
        if (!field || typeof field === 'object') {
            throw "Invalid field supplied.";
        }

        var value = null;

        for (var i = 0; i < this.$data.length; i++) {
            var currentVal = Util.selectNestedObject(this.$data[i], field);

            if (isNaN(currentVal)) {
                throw '"' + field + '" is not a number.';
            }

            value = !value || currentVal > value ? currentVal : value;
        }

        return value;
    },

    maxDate: function (field) {
        if (!field || typeof field === 'object') {
            throw "Invalid field supplied.";
        }

        var value = null;

        for (var i = 0; i < this.$data.length; i++) {
            var currentVal = new Date(Util.selectNestedObject(this.$data[i], field));

            if (currentVal == 'Invalid Date') {
                throw '"' + field + '" is not a valid date.';
            }

            value = !value || currentVal > value ? currentVal : value;
        }

        return value;
    },

    min: function (field) {
        if (!field || typeof field === 'object') {
            throw "Invalid field supplied.";
        }

        var value = null;

        for (var i = 0; i < this.$data.length; i++) {
            var currentVal = Util.selectNestedObject(this.$data[i], field);

            if (isNaN(currentVal)) {
                throw '"' + field + '" is not a number.';
            }

            value = !value || currentVal < value ? currentVal : value;
        }

        return value;
    },

    minDate: function (field) {
        if (!field || typeof field === 'object') {
            throw "Invalid field supplied.";
        }

        var value = null;

        for (var i = 0; i < this.$data.length; i++) {
            var currentVal = new Date(Util.selectNestedObject(this.$data[i], field));

            if (currentVal == 'Invalid Date') {
                throw '"' + field + '" is not a valid date.';
            }

            value = !value || currentVal < value ? currentVal : value;
        }

        return value;
    },

    pluck: function (field) {
        var values = [];

        for (var i = 0; i < this.$data.length; i++) {
            var currentVal = Util.selectNestedObject(this.$data[i], field);

            if (currentVal !== undefined) {
                values.push(currentVal);
            }
        }

        return values;
    },

    pop: function () {
        return this.$data.pop();
    },

    random: function () {
        return this.$data[Math.floor(Math.random() * this.$data.length)];
    },

    search: function (field, value, strict) {
        var indexes = [];

        for (var i = 0; i < this.$data.length; i++) {
            var currentValue = Util.selectNestedObject(this.$data[i], field);

            if (strict === true && value === currentValue) {
                indexes.push(i);
            } else if (!strict && value == currentValue) {
                indexes.push(i);
            }
        }

        return indexes;
    },

    shift: function () {
        return this.$data.shift();
    },

    sort: function (field, order) {
        this.$data.sort(function (a, b) {
            var result = Util.selectNestedObject(a, field) > Util.selectNestedObject(b, field) ? 1 : Util.selectNestedObject(a, field) < Util.selectNestedObject(b, field) ? -1 : 0;

            return order ? -result : result;
        });

        return this;
    },

    sortDesc: function (field) {
        return this.sort(field, true);
    },

    splice: function (index) {
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

    spliceByValue: function (field, value, strict) {
        return this.splice(this.search(field, value, strict));
    },

    sum: function (field) {
        if (this.$data.length == 0) {
            return 0;
        }

        var value = 0;

        for (var i = 0; i < this.$data.length; i++) {
            var currentVal = Util.selectNestedObject(this.$data[i], field);

            if (isNaN(currentVal)) {
                throw currentVal + " is not a number.";
            }

            value += currentVal;
        }

        return value;
    },

    toJson: function () {
        return JSON.stringify(this.$data);
    },

    update: function (index, field, value) {
        if (this.$data.length == 0) {
            return this;
        }

        if (Array.isArray(index)) {
            for (var i = 0; i < index.length; i++) {
                if (index[i] >= this.$data.length) continue;

                Util.setNestedObjectValue(this.$data[index[i]], field, value);
            }
        } else if (index < this.$data.length) {
            Util.setNestedObjectValue(this.$data[index], field, value);
        }

        return this;
    },

    updateByField: function (field, valueField, value) {
        return this.update(this.search(field, valueField), field, value);
    }
};

var QueryResolver = Object.create({

    resolve: function () {
        // Called with Builder context
        doWhere.call(this);
        doOrderBy.call(this);
        doGroupBy.call(this);
        return doSelect.call(this);
    }

});

var doWhere = function () {
    if (this.$where.and.length + this.$where.or.length > 0) {
        this.$result = this.$result.filter(function (element) {
            var passed = false;

            for (var i = 0; i < this.$where.and.length; i++) {
                var where = this.$where.and[i];

                var elementValue = Util.selectNestedObject(element, where.field);

                passed = where.resolve(elementValue);

                if (!passed) {
                    passed = false;

                    break;
                }
            }

            if (!passed) {
                for (var i = 0; i < this.$where.or.length; i++) {
                    var where = this.$where.or[i];

                    var elementValue = Util.selectNestedObject(element, where.field);

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

var doOrderBy = function () {
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

var doGroupBy = function () {
    if (this.$groupBy.length > 0) {
        var groupedElement = {};

        this.$result.map(function (element) {
            groupedElement = Util.createGroupsRecursively(this.$groupBy, element, 0, groupedElement);
        }.bind(this));

        this.$result = groupedElement;
    }

    return this;
};

var doSelect = function () {
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
            Util.createNestedObject(newElement, this.$select[i], Util.selectNestedObject(element, this.$select[i]));
        }

        elementResult.push(newElement);
    }.bind(this));

    this.$result = this.$groupBy.length ? elementResult[0] : elementResult;

    return this;
};

function Builder(data) {
    if (!data || typeof data === 'object' && Object.keys(data).length === 0) {
        throw "No data supplied!";
    }

    this.$original = !Array.isArray(data) ? [data] : data;

    this.clean();
}

var resolveWhereBoolean = function (where, $boolean) {
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

    clean: function () {
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
    select: function (fields) {
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
    groupBy: function (fields) {
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
    where: function (field, operator, value, $boolean, $not) {
        var where = new Where(field, operator, value, $not);

        return resolveWhereBoolean.call(this, where, $boolean);
    },

    whereNot: function (field, operator, value) {
        return this.where(field, operator, value, 'and', true);
    },

    orWhere: function (field, operator, value) {
        return this.where(field, operator, value, 'or', false);
    },

    orWhereNot: function (field, operator, value) {
        return this.where(field, operator, value, 'or', true);
    },

    whereDate: function (field, operator, value, $boolean, $not) {
        var where = new WhereDate(field, operator, value, $not);

        return resolveWhereBoolean.call(this, where, $boolean);
    },

    whereNotDate: function (field, operator, value) {
        return this.whereDate(field, operator, value, 'and', true);
    },

    orWhereDate: function (field, operator, value) {
        return this.whereDate(field, operator, value, 'or', false);
    },

    orWhereNotDate: function (field, operator, value) {
        return this.whereDate(field, operator, value, 'or', true);
    },

    whereIn: function (field, values, $boolean, $not) {
        var where = new WhereIn(field, values, $not);

        return resolveWhereBoolean.call(this, where, $boolean);
    },

    whereNotIn: function (field, values) {
        return this.whereIn(field, values, 'and', true);
    },

    orWhereIn: function (field, values) {
        return this.whereIn(field, values, 'or', false);
    },

    orWhereNotIn: function (field, values) {
        return this.whereIn(field, values, 'or', true);
    },

    whereBetween: function (field, min, max, $boolean, $not) {
        var where = new WhereBetween(field, min, max, $not);

        return resolveWhereBoolean.call(this, where, $boolean);
    },

    whereNotBetween: function (field, min, max) {
        return this.whereBetween(field, min, max, 'and', true);
    },

    orWhereBetween: function (field, min, max) {
        return this.whereBetween(field, min, max, 'or', false);
    },

    orWhereNotBetween: function (field, min, max) {
        return this.whereBetween(field, min, max, 'or', true);
    },

    whereCount: function (field, operator, value, $boolean, $not) {
        var where = new WhereCount(field, operator, value, $not);

        return resolveWhereBoolean.call(this, where, $boolean);
    },

    whereNotCount: function (field, operator, value) {
        return this.whereCount(field, operator, value, 'and', true);
    },

    orWhereCount: function (field, operator, value) {
        return this.whereCount(field, operator, value, 'or', false);
    },

    orWhereNotCount: function (field, operator, value) {
        return this.whereCount(field, operator, value, 'or', true);
    },

    whereLike: function (field, expression, $boolean, $not) {
        var where = new WhereLike(field, expression, $not);

        return resolveWhereBoolean.call(this, where, $boolean);
    },

    whereNotLike: function (field, expression) {
        return this.whereLike(field, expression, 'and', true);
    },

    orWhereLike: function (field, expression) {
        return this.whereLike(field, expression, 'or', false);
    },

    orWhereNotLike: function (field, expression) {
        return this.whereLike(field, expression, 'or', true);
    },

    whereNull: function (field, $boolean, $not) {
        var where = new Where(field, '===', null, $not);

        return resolveWhereBoolean.call(this, where, $boolean);
    },

    whereNotNull: function (field) {
        return this.whereNull(field, 'and', true);
    },

    orWhereNull: function (field) {
        return this.whereNull(field, 'or', false);
    },

    orWhereNotNull: function (field) {
        return this.whereNull(field, 'or', true);
    },

    whereUndefined: function (field, $boolean, $not) {
        var where = new Where(field, '===', undefined, $not);

        return resolveWhereBoolean.call(this, where, $boolean);
    },

    whereNotUndefined: function (field) {
        return this.whereUndefined(field, 'and', true);
    },

    orWhereUndefined: function (field) {
        return this.whereUndefined(field, 'or', false);
    },

    orWhereNotUndefined: function (field) {
        return this.whereUndefined(field, 'or', true);
    },

    whereTrue: function (field, $boolean, $not) {
        var where = new Where(field, '===', true, $not);

        return resolveWhereBoolean.call(this, where, $boolean);
    },

    whereNotTrue: function (field) {
        return this.whereTrue(field, 'and', true);
    },

    orWhereTrue: function (field) {
        return this.whereTrue(field, 'or', false);
    },

    orWhereNotTrue: function (field) {
        return this.whereTrue(field, 'or', true);
    },

    whereFalse: function (field, $boolean, $not) {
        var where = new Where(field, '===', false, $not);

        return resolveWhereBoolean.call(this, where, $boolean);
    },

    whereNotFalse: function (field) {
        return this.whereFalse(field, 'and', true);
    },

    orWhereFalse: function (field) {
        return this.whereFalse(field, 'or', false);
    },

    orWhereNotFalse: function (field) {
        return this.whereFalse(field, 'or', true);
    },

    /****************************************************************
     * ORDER BY
     ****************************************************************/
    orderBy: function (field, direction) {
        this.$orderBy.push(new OrderBy(field, direction));

        return this;
    },

    orderByDesc: function (field) {
        return this.orderBy(field, 'desc');
    },

    orderByDate: function (field, direction) {
        this.$orderBy.push(new OrderByDate(field, direction));

        return this;
    },

    orderByDateDesc: function (field) {
        return this.orderByDate(field, 'desc');
    },

    /****************************************************************
     * GET
     ****************************************************************/
    get: function () {
        this.$result = this.$original;

        return QueryResolver.resolve.call(this).$result;
    },

    first: function () {
        if (this.$groupBy.length > 0) {
            return this.get();
        }

        return this.get()[0] || [];
    },

    last: function () {
        if (this.$groupBy.length > 0) {
            return this.get();
        }

        return this.get()[this.$result.length - 1] || [];
    },

    count: function () {
        if (this.$groupBy.length > 0) {
            return 1;
        }

        return this.get().length;
    },

    paginate: function (itemsPerPage) {
        if (this.$groupBy.length > 0) {
            throw "You can\'t paginate a grouped result.";
        }

        return new Paginator(this.get(), itemsPerPage || 5);
    },

    collect: function () {
        if (this.$groupBy.length > 0) {
            throw 'Can\'t make a collection from grouped result.';
        }

        return new Collection(this.get());
    },

    toModel: function (modelConstructor, args, override) {
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
        var testModel = Util.createModelInstance(modelConstructor, args || []);

        for (var i = 0; i < properties.length; i++) {
            if (!stomp && testModel.hasOwnProperty(properties[i])) {
                throw 'Property "' + properties[i] + '" is already defined in constructor and can\'t be overrided.';
            }
        }

        // Create and populate models
        var models = [];

        for (var i = 0; i < this.$result.length; i++) {
            var newModel = Util.createModelInstance(modelConstructor, args || []);

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

function Vivaz(data) {
	return new Builder(data);
}

Vivaz._version = '0.1.2';

module.exports = Vivaz;