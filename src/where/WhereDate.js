import Where from './Where';

export default function WhereDate( field, operator, value, $not )
{
    this.name = $not ? 'whereNotDate' : 'whereDate';
    this.not = $not || false;
    
    this.field    = field;
    this.operator = operator;
    this.value    = value;

    this.resolveArguments().resolveValue();
}

WhereDate.prototype = Object.create( Where.prototype );

WhereDate.prototype.constructor = WhereDate;

WhereDate.prototype.resolveValue = function()
{
    var date = new Date( this.value );
    
    if( date == 'Invalid Date' || this.value === null || this.value === undefined )
    {
        throw 'Value "' + this.value + '" is not a valid date.';
    }
    
    this.value = date;
    
    return this;
}

WhereDate.prototype.resolve = function( elementValue )
{
    var dateValue = new Date( elementValue );
    
    if( dateValue == 'Invalid Date' )
    {
        throw 'Invalid date "' + elementValue + '" in field "' + this.field + '".';
    }

    switch( this.operator )
    {
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
}