import Crawler from './Crawler';

const Query = Object.create( {

    resolve: function( builder )
    {
        this.doWhere( builder );
        this.doOrderBy( builder );
        this.doGroupBy( builder );
        this.doSelect( builder );
        
        return builder;
    },
    
    doWhere: function( builder )
    {
        if( builder.$where.and.length + builder.$where.or.length > 0 )
        {
            builder.$result = builder.$result.filter( function( element )
            {
                var passed = false;
            
                for( var i = 0; i < builder.$where.and.length; i++ )
                {
                    var where = builder.$where.and[i];
                        
                    var elementValue = Crawler.selectNestedObject( element, where.field );
                    
                    passed = where.resolve( elementValue )

                    if( !passed )
                    {
                        passed = false;
                        
                        break;   
                    }
                }
                
                if( !passed )
                {
                    for( var i = 0; i < builder.$where.or.length; i++ )
                    {
                        var where = builder.$where.or[i];
                        
                        var elementValue = Crawler.selectNestedObject( element, where.field );

                        passed = where.resolve( elementValue )

                        if( passed )
                        {
                            passed = true;
                            
                            break;   
                        }
                    }
                }

                return passed;
            }.bind( builder ) );
        }

        return builder;
    },

    doOrderBy: function( builder )
    {
        if( builder.$orderBy.length > 0 )
        {
            builder.$result.sort( function( a, b )
            {
                for( var i = 0; i < builder.$orderBy.length; i++ )
                {
                    var retval = builder.$orderBy[i].resolve( a, b );
                    
                    if( retval !== 0 )
                    {
                        return retval;
                    }
                }
            }.bind( builder ) );  
        }

        return builder;
    },

    doGroupBy: function( builder )
    {
        if( builder.$groupBy.length > 0 )
        {
            var groupedElement = {};
            
            builder.$result.map( function( element )
            {
                groupedElement = Crawler.createGroupsRecursively( builder.$groupBy, element, 0, groupedElement );
            }.bind( builder ) );
            
            builder.$result = groupedElement;           
        }

        return builder;
    },

    doSelect: function( builder )
    {
        if( builder.$select == '*' )
        {
            return builder;
        }
        
        var elementResult = [];
        
        if( builder.$groupBy.length > 0 )
        {
            builder.$result = [ builder.$result ];
        }   

        builder.$result.map( function( element )
        {
            var newElement = {};
            
            for( var i in builder.$select )
            {
                Crawler.createNestedObject( 
                    newElement, 
                    builder.$select[i], 
                    Crawler.selectNestedObject( element, builder.$select[i] )
                );
            }
            
            elementResult.push( newElement );

        }.bind( builder ) );
        
        builder.$result = builder.$groupBy.length ? elementResult[0] : elementResult;

        return builder;
    }

} );

export default Query;