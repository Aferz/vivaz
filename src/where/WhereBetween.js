export default function WhereBetween( field, min, max, $not )
{
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

    resolveArguments: function()
    {
        if( !this.field )
        {
            throw 'No field provided for "' + this.name + '" clause.';
        }

        if( !this.min )
        {
            throw 'No min value provided for "' + this.name + '" clause.';
        }
        
        if( !this.max )
        {
            throw 'No max value provided for "' + this.name + '" clause.';
        }
        
        if( isNaN( this.min ) )
        {
            throw 'Min value in "' + this.name + '" is not a number.';
        }
        
        if( isNaN( this.max ) )
        {
            throw 'Max value in "' + this.name + '" is not a number.';
        }
        
        if( this.min > this.max )
        {
            throw 'Min value has to be lower than max value.';
        }
    },

    resolve: function( elementValue )
    {
        var result = elementValue >= this.min && elementValue <= this.max;
        
        return this.not ? !result : result;
    }
}