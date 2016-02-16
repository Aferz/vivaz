import Where from './Where';
import Config from '../config/Config';

export default function WhereDate( field, operator, value, $not )
{
    this.name = $not ? 'whereNotDate' : 'whereDate';
    this.not = $not || false;
    
    this.field    = field;
    this.operator = operator;
    this.value    = value;

    // momentjs integration
    this.valueIsMomentObject = false;

    this.resolveArguments().resolveValue();
}

WhereDate.prototype = Object.create( Where.prototype );

WhereDate.prototype.constructor = WhereDate;

WhereDate.prototype.resolveValue = function()
{
    // Moment.js validation
    if( typeof this.value == 'object' && Config.integrations.moment.active === true && 
        this.value.hasOwnProperty( '_isAMomentObject' ) && this.value[ '_isAMomentObject' ] === true )
    {
        this.valueIsMomentObject = true;

        return this;
    }

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
    if( this.valueIsMomentObject )
    {
        var dateValue = this.value._isUTC ? 
            Config.integrations.moment.factory.utc( elementValue ) : 
            Config.integrations.moment.factory( elementValue );
    }
    else
    {
        var dateValue = new Date( elementValue );
    }
    
    if( dateValue.toString() == 'Invalid Date' )
    {
        throw 'Invalid date "' + elementValue + '" in field "' + this.field + '".';
    }
    
    switch( this.operator )
    {
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
}