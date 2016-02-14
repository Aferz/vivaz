export default function OrderBy( field, direction )
{
    this.name      = 'orderBy';
    this.field     = field;
    this.direction = direction || 'asc';

    this.resolveArguments();
}

OrderBy.prototype = {

    field: undefined,
    
    direction: undefined,

    resolveArguments: function()
    {
        if( !this.field )
        {
            throw 'No field provided for "' + this.name + '".';
        }
        
        if( [ 'asc', 'desc' ].indexOf( this.direction ) < 0 )
        {
            throw 'Unrecognized sort direction "' + this.direction + '".';
        }
    },

    resolve: function( elementA, elementB )
    {
        var result = elementA[ this.field ] < elementB[ this.field ] ? -1 : 
                     elementA[ this.field ] > elementB[ this.field ] ? 1 : 
                     0;
            
        return this.direction == "asc" ? result : -result;
    }
}