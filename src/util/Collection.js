import Crawler from './Crawler';

export default function Collection( data )
{
    if( !data )
    {
        this.$data = [];
    }
    else
    {
        this.$data = !Array.isArray( data ) ? [ data ] : data;
    }
}

Collection.prototype = {

    all: function()
    {
        return this.$data;
    },

    avg: function( field )
    {
        return this.sum( field ) / this.$data.length;
    },

    contains: function( field, value, strict )
    {
        // Avoid if in the loop
        if( typeof value === 'object' )
        {
            for( var i = 0; i < this.$data.length; i++ )
            {
                var currentVal = Crawler.selectNestedObject( this.$data[i], field );
                
                if( JSON.stringify( currentVal ) === JSON.stringify( value ) )
                {
                    return true;
                }
            }
        }
        else
        {
            for( var i = 0; i < this.$data.length; i++ )
            {
                var currentVal = Crawler.selectNestedObject( this.$data[i], field );
                
                if( strict === true && currentVal === value )
                {
                    return true;
                }
                if( !strict && currentVal == value )
                {
                    return true;
                }
            }
        }

        return false;
    },

    count: function()
    {
        return this.$data.length;
    },

    each: function( callback )
    {
        if( typeof callback !== 'function' )
        {
            throw "Callback is not a function.";
        }

        for( var i = 0; i < this.$data.length; i++ )
        {
            if( callback( this.$data[i], i ) === false )
            {
                break;
            }
        }
    },

    first: function()
    {
        if( this.$data.length === 0 )
        {
            return {};
        }

        return this.$data[0];
    },

    last: function()
    {
        if( this.$data.length === 0 )
        {
            return {};
        }

        return this.$data[ this.$data.length - 1 ];
    },

    max: function( field )
    {
        if( !field || typeof field === 'object' )
        {
            throw "Invalid field supplied."
        }

        var value = null;

        for( var i = 0; i < this.$data.length; i++ )
        {
            var currentVal = Crawler.selectNestedObject( this.$data[i], field );

            if( isNaN( currentVal ) )
            {
                throw '"' + field + '" is not a number.';
            }

            value = !value || currentVal > value ? currentVal : value;
        }

        return value;
    },

    maxDate: function( field )
    {
        if( !field || typeof field === 'object' )
        {
            throw "Invalid field supplied."
        }

        var value = null;

        for( var i = 0; i < this.$data.length; i++ )
        {
            var currentVal = new Date( Crawler.selectNestedObject( this.$data[i], field ) );

            if( currentVal == 'Invalid Date' )
            {
                throw '"' + field + '" is not a valid date.';
            }
            
            value = !value || currentVal > value ? currentVal : value;
        }

        return value;
    },

    min: function( field )
    {
        if( !field || typeof field === 'object' )
        {
            throw "Invalid field supplied."
        }

        var value = null;

        for( var i = 0; i < this.$data.length; i++ )
        {
            var currentVal = Crawler.selectNestedObject( this.$data[i], field );

            if( isNaN( currentVal ) )
            {
                throw '"' + field + '" is not a number.';
            }
            
            value = !value || currentVal < value ? currentVal : value;
        }

        return value;
    },

    minDate: function( field )
    {
        if( !field || typeof field === 'object' )
        {
            throw "Invalid field supplied."
        }

        var value = null;

        for( var i = 0; i < this.$data.length; i++ )
        {
            var currentVal = new Date( Crawler.selectNestedObject( this.$data[i], field ) );

            if( currentVal == 'Invalid Date' )
            {
                throw '"' + field + '" is not a valid date.';
            }

            value = !value || currentVal < value ? currentVal : value;
        }
        
        return value;
    },

    pluck: function( field )
    {
        var values = [];

        for( var i = 0; i < this.$data.length; i++ )
        {
            var currentVal = Crawler.selectNestedObject( this.$data[i], field );
            
            if( currentVal !== undefined )
            {
                values.push( currentVal );
            }
        }

        return values;
    },

    pop: function()
    {
        return this.$data.pop();
    },

    random: function()
    {
        return this.$data[ Math.floor( Math.random() * this.$data.length ) ];
    },

    search: function( field, value, strict )
    {
        var indexes = [];

        for( var i = 0; i < this.$data.length; i++ )
        {
            var currentValue = Crawler.selectNestedObject( this.$data[i], field );

            if( strict === true && value === currentValue )
            {
                indexes.push( i );
            }
            else if( !strict && value == currentValue )
            {
                indexes.push( i )
            }
        }

        return indexes;
    },

    shift: function()
    {
        return this.$data.shift();
    },

    sort: function( field, order )
    {
        this.$data.sort( function( a, b )
        {
            var result = Crawler.selectNestedObject( a, field ) > Crawler.selectNestedObject( b, field ) ? 1 :
                         Crawler.selectNestedObject( a, field ) < Crawler.selectNestedObject( b, field ) ? -1 :
                         0;

            return order ? -result : result;
        } );

        return this;
    },

    sortDesc: function( field )
    {
        return this.sort( field, true );
    },

    splice: function( index )
    {
        if( this.$data.length == 0 )
        {
            return this;
        }

        var items = [];

        if( Array.isArray( index ) )
        {
            index.sort( function( a, b )
            { 
                return b < a; 
            } );

            for( var i = index.length - 1; i >= 0; i-- )
            {
                if( index[i] >= this.$data.length ) continue;
                
                items.unshift( this.$data[ index[i] ] );

                this.$data.splice( index[i], 1 );
            }
        }
        else if( index < this.$data.length )
        {
            items.push( this.$data[ index ] );

            this.$data.splice( index, 1 );
        }

        return items;
    },

    spliceByValue: function( field, value, strict )
    {
        return this.splice( this.search( field, value, strict ) );
    },

    sum: function( field )
    {
        if( this.$data.length == 0 )
        {
            return 0;
        }

        var value = 0;

        for( var i = 0; i < this.$data.length; i++ )
        {
            var currentVal = Crawler.selectNestedObject( this.$data[i], field );

            if( isNaN( currentVal ) )
            {
                throw currentVal + " is not a number.";
            }

            value += currentVal;
        }

        return value;
    },

    toJson: function()
    {
        return JSON.stringify( this.$data );
    },

    update: function( index, field, value )
    {
        if( this.$data.length == 0 )
        {
            return this;
        }

        if( Array.isArray( index ) )
        {
            for( var i = 0; i < index.length; i++ )
            {
                if( index[i] >= this.$data.length ) continue;

                Crawler.setNestedObjectValue( this.$data[ index[i] ], field, value );
            }
        }
        else if( index < this.$data.length )
        {
            Crawler.setNestedObjectValue( this.$data[ index ], field, value );
        }

        return this;
    },

    updateByField: function( field, valueField, value )
    {
        return this.update( this.search( field, valueField ), field, value );
    },
}