import Builder from '../../../../src/Builder';
import Crawler from '../../../../src/util/Crawler';

describe( 'Crawler', function()
{
    var builder = function( data )
    {
        return new Builder( data || { id: 1, name: 'Alex' } );
    }

    it( 'Select nested object', function()
    {
        var user = { 
            id: 1, 
            name: 'Alex', 
            car: {
                brand: 'Hyundai',
                model: 'i30',
                year: null,
                properties: {
                    doors: undefined,
                    horsepower: '90cv',
                    price: {
                        price: 12000,
                        currency: 'EUR'
                    }
                }
            } 
        }
        
        expect( Crawler.selectNestedObject( user, 'name' ) ).toBe( 'Alex' );
        expect( Crawler.selectNestedObject( user, 'car.brand' ) ).toBe( 'Hyundai' );
        expect( Crawler.selectNestedObject( user, 'car.year' ) ).toBe( null );
        expect( Crawler.selectNestedObject( user, 'car.properties.doors' ) ).toBe( undefined );
        expect( Crawler.selectNestedObject( user, 'car.properties.price' ) ).toEqual( user.car.properties.price );
        
        expect( function(){ Crawler.selectNestedObject( user, 'car.properties.horsepower.currency' ) } )
            .toThrow( 'Child "currency" not found in "horsepower" child, because it\'s not an object.' );

        expect( function(){ Crawler.selectNestedObject( user, 'car.properties.noexistsnode.currency' ) } )
            .toThrow( 'Child "noexistsnode" not found in "properties".' );
    } );

    it( 'Create nested object', function()
    {
        expect( Crawler.createNestedObject( {}, 'name' ) ).toEqual( { name: undefined } );
        expect( Crawler.createNestedObject( {}, 'name', null ) ).toEqual( { name: null } );
        expect( Crawler.createNestedObject( {}, 'name', undefined ) ).toEqual( { name: undefined } );
        expect( Crawler.createNestedObject( {}, 'name', 'Alex' ) ).toEqual( { name: 'Alex' } );
        expect( Crawler.createNestedObject( {}, 'user.name', 'Alex' ) ).toEqual( { user: { name: 'Alex' } } );
        expect( Crawler.createNestedObject( {}, 'user.properties.age' ) ).toEqual( { user: { properties: { age: undefined } } } );
        expect( Crawler.createNestedObject( {}, 'user.properties.age', null ) ).toEqual( { user: { properties: { age: null } } } );
        expect( Crawler.createNestedObject( {}, 'user.properties.age', undefined ) ).toEqual( { user: { properties: { age: undefined } } } );
        expect( Crawler.createNestedObject( {}, 'user.properties.age', 'Alex' ) ).toEqual( { user: { properties: { age: 'Alex' } } } );
    } );
    
    it( 'Create groups recursively', function()
    {
        var user1 = { id: 1, name: 'Alex', age: 24, properties: { last_name: 'Last1' }, object: {}, array: [] };
        
        expect( function(){ Crawler.createGroupsRecursively( [ 'object' ], user1 ) } )
            .toThrow( 'You can\'t group by an object or array.' );
        
        expect( function(){ Crawler.createGroupsRecursively( [ 'array' ], user1 ) } )
            .toThrow( 'You can\'t group by an object or array.' );
        
        expect( Crawler.createGroupsRecursively( [ 'age' ], user1 ) ).toEqual( { '24': [ user1 ] } );
        
        expect( Crawler.createGroupsRecursively( [ 'age', 'name' ], user1 ) ).toEqual( { '24': { 'Alex': [ user1 ] } } );
        
        expect( Crawler.createGroupsRecursively( [ 'age', 'name', 'id' ], user1 ) ).toEqual( { '24': { 'Alex': { '1' : [ user1 ] } } } );

        expect( Crawler.createGroupsRecursively( [ 'properties.last_name' ], user1 ) ).toEqual( { 'Last1': [ user1 ] } );

        expect( Crawler.createGroupsRecursively( [ 'properties.last_name', 'age' ], user1 ) ).toEqual( { 'Last1': { '24': [ user1 ] } } );
    } );
} );