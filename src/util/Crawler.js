const Crawler = Object.create( {
    
    createGroupsRecursively: function( groups, element, groupLevel, groupedElement )
    {
        if( arguments.length == 2 )
        {
            groupLevel = 0;
            groupedElement = {};
        } 

        var value = this.selectNestedObject( element, groups[ groupLevel ] );
        
        if( typeof value === 'object' )
        {
            throw 'You can\'t group by an object or array.';
        }
        
        if( groups[ groupLevel + 1 ] === undefined )
        {
            if( !groupedElement.hasOwnProperty( value ) )
            {
                groupedElement[ value ] = [];
            }
            
            groupedElement[ value ].push( element );
        }
        else
        {
            if( !groupedElement.hasOwnProperty( value ) )
            {
                groupedElement[ value ] = this.createGroupsRecursively( groups, element, ++groupLevel, {} );
            }
            else
            {
                groupedElement[ value ] = this.createGroupsRecursively( groups, element, ++groupLevel, groupedElement[ value ] );
            }
        }
        
        return groupedElement;
    },
    
    createNestedObject: function( element, keys, value )
    {
        if( !Array.isArray( keys ) )
        {
            keys = this.splitNestedField( keys );
        }

        if( keys.length === 1 )
        {
            element[ keys[0] ] = value;
        }
        else
        {
            var key = keys.shift();
          
            element[ key ] = this.createNestedObject( 
                typeof element[ key ] === 'undefined' ? {} : element[ key ], 
                keys, 
                value
            );
        }

        return element;
    },
    
    selectNestedObject: function( element, keys, parentKey, value )
    {
        if( !Array.isArray( keys ) )
        {
            keys = this.splitNestedField( keys );
        }

        if( keys.length === 1 )
        {
            if( !value )
            {
                return element[ keys[0] ];
            }

            element[ keys[0] ] = value;
            return;
        }
        else
        {
            var key = keys.shift();
            
            if( !element[ key ] )
            {
                throw 'Child "' + key + '" not found in "' + parentKey + '".';
            }
            else if( element[ key ] && typeof element[ key ] == 'object' )
            {
                return this.selectNestedObject( element[ key ], keys, key, value );
            }
            
            throw 'Child "' + keys.shift() + '" not found in "' + key + '" child, because it\'s not an object.';
        }
    },

    setNestedObjectValue: function( element, keys, value )
    {
        this.selectNestedObject( element, keys, undefined, value );

        return element;
    },

    splitNestedField: function( field )
    {
        return field.indexOf( '.' ) > -1 ? field.split( '.' ) : [ field ];
    }
    
} );

export default Crawler;