import Where from './where/Where';
import WhereIn from './where/WhereIn';
import WhereDate from './where/WhereDate';
import WhereLike from './where/WhereLike';
import WhereCount from './where/WhereCount';
import WhereBetween from './where/WhereBetween';

import OrderBy from './order/OrderBy';
import OrderByDate from './order/OrderByDate';

import Util from './util/Util';
import Paginator from './util/Paginator';
import Collection from './util/Collection';
import QueryResolver from './util/QueryResolver';

export default function Builder( data )
{
    if( !data || ( typeof data === 'object' && Object.keys( data ).length === 0 ) )
    {
        throw "No data supplied!";
    }
    
    this.$original = !Array.isArray( data ) ? [data] : data;
    
    this.clean();
}

var resolveWhereBoolean = function( where, $boolean )
{
    if( $boolean === 'and' || $boolean === undefined || $boolean === null )
    {
        this.$where.and.push( where )
    }
    else if( $boolean === 'or' )
    {
        this.$where.or.push( where )
    }
    else
    {
        throw "Unrecognized boolean value '" + $boolean + "'";
    }

    return this;
}

Builder.prototype = {
    
    clean: function()
    {
        this.$result = this.$original;

        this.$select = '*';
        
        this.$where = { and: [], or: [] };
        
        this.$groupBy = [];
        
        this.$orderBy = [];

        return this;
    },
    
    /****************************************************************
     * SELECT
     ****************************************************************/
    select: function( fields )
    {
        if( !fields )
        {
            return this;
        }
        
        if( arguments.length > 1 )
        {
            fields = Array.prototype.slice.call( arguments );
        }
        else if( !Array.isArray( fields ) )
        {
            fields = [ fields ]; 
        }
        
        this.$select = fields;

        return this;
    },

    /****************************************************************
     * GROUP BY
     ****************************************************************/
    groupBy: function( fields )
    {
        if( !fields )
        {
            return this;
        }
        
        if( arguments.length > 1 )
        {
            fields = Array.prototype.slice.call( arguments );
        }
        else if( !Array.isArray( fields ) )
        {
            fields = [ fields ]; 
        }
        
        this.$groupBy = fields;

        return this;
    },

    /****************************************************************
     * WHERE
     ****************************************************************/
    where: function( field, operator, value, $boolean, $not )
    {
        var where = new Where( field, operator, value, $not );

        return resolveWhereBoolean.call( this, where, $boolean );
    },
    
    whereNot: function( field, operator, value )
    {
        return this.where( field, operator, value, 'and', true );
    },
    
    orWhere: function( field, operator, value )
    {
        return this.where( field, operator, value, 'or', false );
    },
    
    orWhereNot: function( field, operator, value )
    {
        return this.where( field, operator, value, 'or', true );
    },
    
    whereDate: function( field, operator, value, $boolean, $not )
    {
        var where = new WhereDate( field, operator, value, $not );

        return resolveWhereBoolean.call( this, where, $boolean );
    },
    
    whereNotDate: function( field, operator, value )
    {
        return this.whereDate( field, operator, value, 'and', true );
    },
    
    orWhereDate: function( field, operator, value )
    {
        return this.whereDate( field, operator, value, 'or', false );
    },
    
    orWhereNotDate: function( field, operator, value )
    {
        return this.whereDate( field, operator, value, 'or', true );
    },
    
    whereIn: function( field, values, $boolean, $not )
    {
        var where = new WhereIn( field, values, $not );

        return resolveWhereBoolean.call( this, where, $boolean );
    },
    
    whereNotIn: function( field, values )
    {
        return this.whereIn( field, values, 'and', true );
    },
    
    orWhereIn: function( field, values )
    {
        return this.whereIn( field, values, 'or', false );
    },
    
    orWhereNotIn: function( field, values )
    {
        return this.whereIn( field, values, 'or', true );
    },
    
    whereBetween: function( field, min, max, $boolean, $not )
    {
        var where = new WhereBetween( field, min, max, $not );

        return resolveWhereBoolean.call( this, where, $boolean );
    },
    
    whereNotBetween: function( field, min, max )
    {
        return this.whereBetween( field, min, max, 'and', true );
    },
    
    orWhereBetween: function( field, min, max )
    {
        return this.whereBetween( field, min, max, 'or', false );
    },
    
    orWhereNotBetween: function( field, min, max )
    {
        return this.whereBetween( field, min, max, 'or', true );
    },
    
    whereCount: function( field, operator, value, $boolean, $not )
    {
        var where = new WhereCount( field, operator, value, $not );

        return resolveWhereBoolean.call( this, where, $boolean );
    },
    
    whereNotCount: function( field, operator, value )
    {
        return this.whereCount( field, operator, value, 'and', true );
    },
    
    orWhereCount: function( field, operator, value )
    {
        return this.whereCount( field, operator, value, 'or', false );
    },
    
    orWhereNotCount: function( field, operator, value )
    {
        return this.whereCount( field, operator, value, 'or', true );
    },
    
    whereLike: function( field, expression, $boolean, $not )
    {
        var where = new WhereLike( field, expression, $not );

        return resolveWhereBoolean.call( this, where, $boolean );
    },
    
    whereNotLike: function( field, expression )
    {
        return this.whereLike( field, expression, 'and', true );
    },
    
    orWhereLike: function( field, expression )
    {
        return this.whereLike( field, expression, 'or', false );
    },
    
    orWhereNotLike: function( field, expression )
    {
        return this.whereLike( field, expression, 'or', true );
    },
    
    whereNull: function( field, $boolean, $not )
    {
        var where = new Where( field, '===', null, $not );

        return resolveWhereBoolean.call( this, where, $boolean );
    },
    
    whereNotNull: function( field )
    {
        return this.whereNull( field, 'and', true );
    },
    
    orWhereNull: function( field )
    {
        return this.whereNull( field, 'or', false );
    },
    
    orWhereNotNull: function( field )
    {
        return this.whereNull( field, 'or', true );
    },
    
    whereUndefined: function( field, $boolean, $not )
    {
        var where = new Where( field, '===', undefined, $not );

        return resolveWhereBoolean.call( this, where, $boolean );
    },
    
    whereNotUndefined: function( field )
    {
        return this.whereUndefined( field, 'and', true );
    },
    
    orWhereUndefined: function( field )
    {
        return this.whereUndefined( field, 'or', false );
    },
    
    orWhereNotUndefined: function( field )
    {
        return this.whereUndefined( field, 'or', true );
    },
    
    whereTrue: function( field, $boolean, $not )
    {
        var where = new Where( field, '===', true, $not );

        return resolveWhereBoolean.call( this, where, $boolean );
    },
    
    whereNotTrue: function( field )
    {
        return this.whereTrue( field, 'and', true );
    },
    
    orWhereTrue: function( field )
    {
        return this.whereTrue( field, 'or', false );
    },
    
    orWhereNotTrue: function( field )
    {
        return this.whereTrue( field, 'or', true );
    },

    whereFalse: function( field, $boolean, $not )
    {
        var where = new Where( field, '===', false, $not );

        return resolveWhereBoolean.call( this, where, $boolean );
    },
    
    whereNotFalse: function( field )
    {
        return this.whereFalse( field, 'and', true );
    },
    
    orWhereFalse: function( field )
    {
        return this.whereFalse( field, 'or', false );
    },
    
    orWhereNotFalse: function( field )
    {
        return this.whereFalse( field, 'or', true );
    },

    /****************************************************************
     * ORDER BY
     ****************************************************************/
    orderBy: function( field, direction )
    {
        this.$orderBy.push( new OrderBy( field, direction ) );
        
        return this;
    },

    orderByDesc: function( field )
    {
        return this.orderBy( field, 'desc' );
    },
    
    orderByDate: function( field, direction )
    {
        this.$orderBy.push( new OrderByDate( field, direction ) );
        
        return this;
    },

    orderByDateDesc: function( field )
    {
        return this.orderByDate( field, 'desc' );
    },
    
    /****************************************************************
     * GET
     ****************************************************************/
    get: function()
    {
        this.$result = this.$original;

        return QueryResolver.resolve.call( this ).$result;
    },

    first: function()
    {
        if( this.$groupBy.length > 0 )
        {
            return this.get();
        }
        
        return this.get()[0] || [];
    },
    
    last: function()
    {
        if( this.$groupBy.length > 0 )
        {
            return this.get();
        }
        
        return this.get()[ this.$result.length - 1 ] || [];
    },
    
    count: function()
    {
        if( this.$groupBy.length > 0 )
        {
            return 1;
        }
        
        return this.get().length;
    },

    paginate: function( itemsPerPage )
    {
        if( this.$groupBy.length > 0 )
        {
            throw "You can\'t paginate a grouped result.";
        }
        
        return new Paginator( this.get(), itemsPerPage || 5 );
    },

    collect: function()
    {
        if( this.$groupBy.length > 0 )
        {
            throw 'Can\'t make a collection from grouped result.';
        }

        return new Collection( this.get() );
    },
    
    toModel: function( modelConstructor, args, override )
    {
        if( !modelConstructor )
        {
            throw "Constructor not supplied.";
        }

        if( typeof modelConstructor !== 'function' )
        {
            throw "Invalid constructor. It has to be a function."
        }

        if( this.get().length == 0 )
        {
            return [];
        }

        // Check if properties of the results are already defined in constructor
        // This loop avoid 'ifing' when creating models. Better performance for bigger results
        var stomp      = override || false;
        var properties = Object.keys( this.$result[0] );
        var testModel  = Util.createModelInstance( modelConstructor, args || [] );
        
        for( var i = 0; i < properties.length; i++ )
        {
            if( !stomp && testModel.hasOwnProperty( properties[i] ) )
            {
                throw 'Property "' + properties[i] + '" is already defined in constructor and can\'t be overrided.';
            }
        }

        // Create and populate models
        var models = [];

        for( var i = 0; i < this.$result.length; i++ )
        {
            var newModel = Util.createModelInstance( modelConstructor, args || [] );
            
            for( var p in this.$result[i] )
            {
                Object.defineProperty( newModel, p, {
                    value: this.$result[i][p],
                    enumerable: true
                } );
            }

            models.push( newModel );
        }
        
        return models;
    },
};