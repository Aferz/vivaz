import Builder from '../../../../src/Builder';
import Query from '../../../../src/util/Query';

describe( 'Query', function()
{
    var builder = function( data )
    {
        return new Builder( data || { id: 1, name: 'Alex' } );
    }

    it( 'Perform where clauses', function()
    {
        var user1 = { id: 1, name: 'Alex' };
        var user2 = { id: 2, name: 'Tamara' };
        var users = [ user1, user2 ];

        var b = Query.resolve( builder( users ).where( 'id', 1 ) );
        expect( b.$result.length ).toBe( 1 );
        expect( b.$result ).toEqual( [ user1 ] );
        
        var b = Query.resolve( builder( users ).where( 'id', 1 ).orWhere( 'id', 2 ) );
        expect( b.$result.length ).toBe( 2 );
        expect( b.$result ).toEqual( users );
    } );

    it( 'Perform order by clauses', function()
    {
        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Audi' } };
        var user3 = { id: 3, name: 'Josh', car: { brand: 'Audi' } };
        var users = [ user1, user2, user3 ];

        var b = Query.resolve( builder( users ).orderBy( 'name', 'desc' ) );
        expect( Array.isArray( b.$result ) ).toBeTruthy();
        expect( b.$result ).toEqual( [ user2, user3, user1 ] );
    } );

    it( 'Perform group by clauses', function()
    {
        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Audi' } };
        var user3 = { id: 3, name: 'Josh', car: { brand: 'Audi' } };
        var users = [ user1, user2, user3 ];

        var b = Query.resolve( builder( users ).groupBy( 'id' ) );
        expect( Array.isArray( b.$result ) ).toBeFalsy();
        expect( b.$result ).toEqual( { 1: [ user1 ], 2: [ user2 ], 3: [ user3 ] } );

        var b = Query.resolve( builder( users ).groupBy( 'id', 'name' ) );
        expect( Array.isArray( b.$result ) ).toBeFalsy();
        expect( b.$result ).toEqual( { 1: { 'Alex': [ user1 ] }, 2: { 'Tamara' : [ user2 ] }, 3: { 'Josh': [ user3 ] } } );

        var b = Query.resolve( builder( users ).groupBy( 'car.brand' ) );
        expect( b.$result ).toEqual( { 'Hyundai': [ user1 ], 'Audi' : [ user2, user3 ] } );
    } );

    it( 'Perform select clause', function()
    {
        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Audi' } };
        var user3 = { id: 3, name: 'Josh', car: { brand: 'Audi' } };
        var users = [ user1, user2, user3 ];

        var b = Query.resolve( builder( users ).select( 'id' ) );
        expect( Array.isArray( b.$result ) ).toBeTruthy();
        expect( b.$result ).toEqual( [ { id: 1 }, { id: 2 }, { id: 3 } ] );

        var b = Query.resolve( builder( users ).select( 'id', 'car.brand' ) );
        expect( Array.isArray( b.$result ) ).toBeTruthy();
        expect( b.$result ).toEqual( [ { id: 1, car: { brand: 'Hyundai' } }, { id: 2, car: { brand: 'Audi' } }, { id: 3, car: { brand: 'Audi' } } ] );
    } );
} );