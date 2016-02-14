import OrderBy from './OrderBy';

export default function OrderByDate( field, direction )
{
    this.name      = 'orderByDate';
    this.field     = field;
    this.direction = direction || 'asc';

    this.resolveArguments();
}

OrderByDate.prototype = Object.create( OrderBy.prototype );

OrderByDate.prototype.constructor = OrderByDate;

OrderByDate.prototype.resolve = function( elementA, elementB )
{
    var elementADate = new Date( elementA[ this.field ] );
    var elementBDate = new Date( elementB[ this.field ] );
    
    if( elementADate == 'Invalid Date' )
    {
        throw 'Invalid date "' + elementA[ this.field ] + '" in field "' + this.field + '".';
    }
    else if( elementBDate == 'Invalid Date' )
    {
        throw 'Invalid date "' + elementB[ this.field ] + '" in field "' + this.field + '".';
    }
    
    var result = elementADate < elementBDate ? -1 : elementADate > elementBDate ? 1 : 0;
        
    return this.direction == "asc" ? result : -result;
}