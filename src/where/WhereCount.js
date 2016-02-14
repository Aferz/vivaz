import Where from './Where';

export default function WhereCount( field, operator, value, $not )
{
    this.name     = $not ? 'whereNotCount' : 'whereCount';
    this.not      = $not || false;
    
    this.field    = field;
    this.operator = operator;
    this.value    = value;

    this.resolveArguments( arguments );
}

WhereCount.prototype = Object.create( Where.prototype );

WhereCount.prototype.constructor = WhereCount;

WhereCount.prototype.resolve = function( elementValue )
{
    // TODO: Undefined ==? Null
    if( Array.isArray( elementValue ) )
    {
        var length = elementValue.length; 
    }
    else
    {
        var length = elementValue ? 1 : 0;  
    }

    switch( this.operator )
    {
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
}