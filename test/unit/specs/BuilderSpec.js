import Builder from '../../../src/Builder';
import Collection from '../../../src/util/Collection';

describe( 'Builder', function()
{
    var user1 = { id: 1, name: 'Alex', birthdate: '1991-08-29', car: { brand: 'Hyundai' } };
    var user2 = { id: 2, name: 'Tamara', birthdate: '1991-06-19', car: { brand: 'Hyundai' } };
    var users = [ user1, user2 ];

    var builder = function( data, cfg )
    {
        return new Builder( data || { id: 1, name: 'Alex' }, cfg || {} );
    }

    it( 'Instantiation fails if nothing, null, undefined, [] or {} is passed', function()
    {
        expect( function(){ new Builder(); } )
            .toThrow( 'No data supplied!');

        expect( function(){ new Builder( null ); } )
            .toThrow( 'No data supplied!');

        expect( function(){ new Builder( undefined ); } )
            .toThrow( 'No data supplied!');

        expect( function(){ new Builder( [] ); } )
            .toThrow( 'No data supplied!');

        expect( function(){ new Builder( {} ); } )
            .toThrow( 'No data supplied!');
    } );

    it( 'Instantiation', function()
    {
        var b = new Builder( [ { id: 1, name: 'Alex' } ] );
        expect( Array.isArray( b.$original ) ).toBeTruthy();
        expect( b.$original.length ).toBe( 1 );
        expect( b.$result ).toEqual( b.$original );
        expect( b.$select ).toBe( '*' );
        expect( b.$where ).toEqual( { and: [], or: [] } );
        expect( b.$groupBy ).toEqual( [] );
        expect( b.$orderBy ).toEqual( [] );
    } );

    it( 'Clean', function()
    {
        var b = new Builder( { id: 1, name: 'Alex' } ).clean();
        expect( b.$original ).toEqual( [ { id: 1, name: 'Alex' } ] );
        expect( b.$result ).toEqual( b.$original );
        expect( b.$select ).toBe( '*' );
        expect( b.$where ).toEqual( { and: [], or: [] } );
        expect( b.$groupBy ).toEqual( [] );
        expect( b.$orderBy ).toEqual( [] );
    } );

    it( 'Add where clause', function()
    {
        // Where
        expect( builder().where( 'id', 1 ).$where.and[0].name ).toBe( 'where' );
        expect( builder().whereNot( 'id', 1 ).$where.and[0].name ).toBe( 'whereNot' );
        expect( builder().orWhere( 'id', 1 ).$where.or[0].name ).toBe( 'where' );
        expect( builder().orWhereNot( 'id', 1 ).$where.or[0].name ).toBe( 'whereNot' );
        //Where Date
        expect( builder().whereDate( 'id', '1900-01-01' ).$where.and[0].name ).toBe( 'whereDate' );
        expect( builder().whereNotDate( 'id', '1900-01-01' ).$where.and[0].name ).toBe( 'whereNotDate' );
        expect( builder().orWhereDate( 'id', '1900-01-01' ).$where.or[0].name ).toBe( 'whereDate' );
        expect( builder().orWhereNotDate( 'id', '1900-01-01' ).$where.or[0].name ).toBe( 'whereNotDate' );
        // Where Between
        expect( builder().whereBetween( 'id', 1, 2 ).$where.and[0].name ).toBe( 'whereBetween' );
        expect( builder().whereNotBetween( 'id', 1, 2 ).$where.and[0].name ).toBe( 'whereNotBetween' );
        expect( builder().orWhereBetween( 'id', 1, 2 ).$where.or[0].name ).toBe( 'whereBetween' );
        expect( builder().orWhereNotBetween( 'id', 1, 2 ).$where.or[0].name ).toBe( 'whereNotBetween' );
        // Where Count
        expect( builder().whereCount( 'id', 1 ).$where.and[0].name ).toBe( 'whereCount' );
        expect( builder().whereNotCount( 'id', 1 ).$where.and[0].name ).toBe( 'whereNotCount' );
        expect( builder().orWhereCount( 'id', 1 ).$where.or[0].name ).toBe( 'whereCount' );
        expect( builder().orWhereNotCount( 'id', 1 ).$where.or[0].name ).toBe( 'whereNotCount' );
        // Where In
        expect( builder().whereIn( 'id', [ 1 ] ).$where.and[0].name ).toBe( 'whereIn' );
        expect( builder().whereNotIn( 'id', [ 1 ] ).$where.and[0].name ).toBe( 'whereNotIn' );
        expect( builder().orWhereIn( 'id', [ 1 ] ).$where.or[0].name ).toBe( 'whereIn' );
        expect( builder().orWhereNotIn( 'id', [ 1 ] ).$where.or[0].name ).toBe( 'whereNotIn' );
        // Where Like
        expect( builder().whereLike( 'id', /like/ ).$where.and[0].name ).toBe( 'whereLike' );
        expect( builder().whereNotLike( 'id', /like/ ).$where.and[0].name ).toBe( 'whereNotLike' );
        expect( builder().orWhereLike( 'id', /like/ ).$where.or[0].name ).toBe( 'whereLike' );
        expect( builder().orWhereNotLike( 'id', /like/ ).$where.or[0].name ).toBe( 'whereNotLike' );

        var b = builder().where( 'name', 'test' ).where( 'name', 'test2' ).orWhere( 'name', 'test3' ).orWhere( 'name', 'test4' );
        expect( b.$where.and.length ).toBe( 2 );
        expect( b.$where.or.length ).toBe( 2 );
    } );

    it( 'Add "group by" clause', function()
    {
        expect( builder().groupBy( 'field' ).$groupBy[0] ).toBe( 'field' );

        var b = builder().groupBy( 'field' );
        expect( b.$groupBy ).toEqual( [ 'field' ] );
        expect( b.$groupBy.length ).toBe( 1 );

        var b = builder().groupBy( [ 'field', 'field.attr' ] );
        expect( b.$groupBy ).toEqual( [ 'field', 'field.attr' ] );
        expect( b.$groupBy.length ).toBe( 2 );

        var b = builder().groupBy( 'field', 'field.attr' );
        expect( b.$groupBy ).toEqual( [ 'field', 'field.attr' ] );
        expect( b.$groupBy.length ).toBe( 2 );
    } );

    it( 'Add "order by" clause', function()
    {
        expect( builder().orderBy( 'id', 'asc' ).$orderBy[0].name ).toBe( 'orderBy' );
        expect( builder().orderByDate( 'id', 'asc' ).$orderBy[0].name ).toBe( 'orderByDate' );

        var b = builder().orderBy( 'id', 'asc' ).orderBy( 'name', 'desc' ).orderByDate( 'birthdate' );
        expect( b.$orderBy.length ).toBe( 3 );
    } );

    it( 'Add "select" clause', function()
    {
        expect( builder().select( 'field' ).$select[0] ).toBe( 'field' );

        var b = builder().select( 'field' );
        expect( b.$select ).toEqual( [ 'field' ] );
        expect( b.$select.length ).toBe( 1 );

        var b = builder().select( [ 'field', 'field.attr' ] );
        expect( b.$select ).toEqual( [ 'field', 'field.attr' ] );
        expect( b.$select.length ).toBe( 2 );

        var b = builder().select( 'field', 'field.attr' );
        expect( b.$select ).toEqual( [ 'field', 'field.attr' ] );
        expect( b.$select.length ).toBe( 2 );
    } );

    describe( 'Fetch data', function()
    {
        it( 'Get', function()
        {
            var b = builder( users );
            expect( b.get() ).toEqual( users );
            expect( b.$result ).toEqual( users );
        } );

        it( 'First', function()
        {
            var b = builder( users );
            expect( b.first() ).toEqual( user1 );
            expect( b.$result ).toEqual( users );
        } );

        it( 'Last', function()
        {
            var b = builder( users );
            expect( b.last() ).toEqual( user2 );
            expect( b.$result ).toEqual( users );
        } );

        it( 'Count', function()
        {
            var b = builder( users );
            expect( b.count() ).toEqual( 2 );
            expect( b.$result ).toEqual( users );
        } );
    } );

    describe( 'Fetch data grouped by a field', function()
    {
        it( 'Get', function()
        {
            var b = builder( users ).groupBy( 'car.brand' );
            expect( b.get() ).toEqual( { 'Hyundai': [ user1, user2 ] } );
        } );

        it( 'First', function()
        {
            var b = builder( users ).groupBy( 'car.brand' );
            expect( b.first() ).toEqual( { 'Hyundai': [ user1, user2 ] } );
        } );   

        it( 'Last', function()
        {
            var b = builder( users ).groupBy( 'car.brand' );
            expect( b.last() ).toEqual( { 'Hyundai': [ user1, user2 ] } );
        } );   

        it( 'Count', function()
        {
            var b = builder( users ).groupBy( 'car.brand' );
            expect( b.count() ).toEqual( 1 );
        } );   
    } );

    it( 'Collects data', function()
    {
        var b = builder( users );
        expect( b.collect() instanceof Collection ).toBeTruthy();
        expect( b.collect().$data.length ).toBe( 2 );
    } );

    it( 'Can\'t collect grouped result', function()
    {
        var b = builder( users ).groupBy( 'car.brand' );
        expect( function(){ b.collect() } ).toThrow( 'Can\'t make a collection from grouped result.' );
    } );

    it( 'Paginate data', function()
    {
        var b = builder( users ).groupBy( 'name' );
        expect( function(){ b.paginate() } ).toThrow( 'You can\'t paginate a grouped result.' );
    } );

    it( 'To model', function()
    {
        expect( function(){ builder( users ).toModel() } )
            .toThrow( 'Constructor not supplied.' );

        expect( function(){ builder( users ).toModel( undefined ) } )
            .toThrow( 'Constructor not supplied.' );

        expect( function(){ builder( users ).toModel( null ) } )
            .toThrow( 'Constructor not supplied.' );

        expect( function(){ builder( users ).toModel( {} ) } )
            .toThrow( 'Invalid constructor. It has to be a function.' );

        var userModel = function User( car ){ this.car = car; };
        expect( function(){ builder( users ).toModel( userModel, [ 'Car' ] ) } )
            .toThrow( 'Property "car" is already defined in constructor and can\'t be overrided.' );
        
        var userModel = function User( car ){ this.lol = car; this.func = function(){} };
        var userModelInstances = builder( users ).toModel( userModel, [ 'Car' ], true );
        
        expect( userModelInstances.length ).toBe( 2 );
        expect( userModelInstances[0].id ).toEqual( user1.id );
        expect( userModelInstances[0].name ).toEqual( user1.name );
        expect( userModelInstances[0].car ).toEqual( user1.car );
        expect( userModelInstances[0].car.brand ).toEqual( user1.car.brand );
        expect( userModelInstances[0].hasOwnProperty( 'func' ) ).toBeTruthy();
    } );

    it( 'Return date as objects if it\'s activated in config', function()
    {
        var result = builder( users, { datesAsObjects: true, dateFields: [ 'birthdate' ] } ).get();
        console.log( result );
        //expect( result[0].birthdate instanceof Date ).toBeTruthy();
    } );
} );