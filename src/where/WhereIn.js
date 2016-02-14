export default function WhereIn( field, value, $not )
{
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
    
    resolveArguments: function()
    {
        if( !this.field )
        {
            throw 'No field provided for "' + this.name + '" clause.';
        }

        if( !this.value )
        {
            throw 'No value provided for "' + this.name + '" clause.';
        }

        if( !Array.isArray( this.value ) )
        {
            this.value = [ this.value ];
        }
    },

    resolve: function( elementValue )
    {
        var result = this.value.indexOf( elementValue ) > -1;
        
        return this.not ? !result : result;
    }
}