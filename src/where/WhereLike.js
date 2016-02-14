export default function WhereLike( field, expression, $not )
{
    this.name = $not ? 'whereNotLike' : 'whereLike';
    this.not = $not || false;

    this.field      = field;
    this.expression = expression;
    
    this.resolveArguments();
}

WhereLike.prototype = {
    
    field: undefined,

    expression: undefined,

    not: false,
    
    resolveArguments: function()
    {
        if( !this.field )
        {
            throw 'No field provided for "' + this.name + '" clause.';
        }

        if( !this.expression )
        {
            throw 'No expression provided for "' + this.name + '" clause.';
        }
    },

    resolve: function( elementValue )
    {
        var result = elementValue.match( this.expression ) ? true : false;
            
        return this.not ? !result : result;
    }
}