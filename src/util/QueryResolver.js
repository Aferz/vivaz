import Util from './Util';

const QueryResolver = Object.create( {

    resolve: function()
    {
        // Called with Builder context
        doWhere.call( this );
        doOrderBy.call( this );
        doGroupBy.call( this );
        return doSelect.call( this );
    }

} );

export default QueryResolver;

let doWhere = function()
{
    if( this.$where.and.length + this.$where.or.length > 0 )
    {
        this.$result = this.$result.filter( function( element )
        {
            var passed = false;
        
            for( var i = 0; i < this.$where.and.length; i++ )
            {
                var where = this.$where.and[i];
                    
                var elementValue = Util.selectNestedObject( element, where.field );
                
                passed = where.resolve( elementValue )

                if( !passed )
                {
                    passed = false;
                    
                    break;   
                }
            }
            
            if( !passed )
            {
                for( var i = 0; i < this.$where.or.length; i++ )
                {
                    var where = this.$where.or[i];
                    
                    var elementValue = Util.selectNestedObject( element, where.field );

                    passed = where.resolve( elementValue )

                    if( passed )
                    {
                        passed = true;
                        
                        break;   
                    }
                }
            }

            return passed;
        }.bind( this ) );
    }

    return this;
}

let doOrderBy = function()
{
    if( this.$orderBy.length > 0 )
    {
        this.$result.sort( function( a, b )
        {
            for( var i = 0; i < this.$orderBy.length; i++ )
            {
                var retval = this.$orderBy[i].resolve( a, b );
                
                if( retval !== 0 )
                {
                    return retval;
                }
            }
        }.bind( this ) );  
    }

    return this;
}

let doGroupBy = function()
{
    if( this.$groupBy.length > 0 )
    {
        var groupedElement = {};
        
        this.$result.map( function( element )
        {
            groupedElement = Util.createGroupsRecursively( this.$groupBy, element, 0, groupedElement );
        }.bind( this ) );
        
        this.$result = groupedElement;           
    }

    return this;
}


let doSelect = function()
{
    if( this.$select == '*' )
    {
        return this;
    }
    
    var elementResult = [];
    
    if( this.$groupBy.length > 0 )
    {
        this.$result = [ this.$result ];
    }   

    this.$result.map( function( element )
    {
        var newElement = {};
        
        for( var i in this.$select )
        {
            Util.createNestedObject( 
                newElement, 
                this.$select[i], 
                Util.selectNestedObject( element, this.$select[i] )
            );
        }
        
        elementResult.push( newElement );

    }.bind( this ) );
    
    this.$result = this.$groupBy.length ? elementResult[0] : elementResult;

    return this;
}