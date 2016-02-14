import Collection from '../../../../src/util/Collection';

describe( 'Collection', function()
{
    var user1 = { 
        id: 1, 
        name: 'Alex', 
        money: 1000,
        car: { brand: 'Hyundai', model: 'i30', price: 15000 },
        friends: [ 'Tamara', 'Josh' ],
        birthdate: '1991-08-29'
    };

    var user2 = { 
        id: 2, 
        name: 'Tamara', 
        money: 2000,
        car: { brand: 'Audi', model: 'A1', price: 20000 },
        friends: [ 'Kevin' ],
        birthdate: '1991-06-19'
    };

    var user3 = { 
        id: 3, 
        name: 'Josh', 
        money: 3000,
        car: { brand: 'Audi', model: 'A3', price: 10000 },
        friends: [ 'Peter', 'Newton', 'Heisenberg' ],
        birthdate: '1994-02-28'
    };

    var users = [ user1, user2, user3 ];

    var collection = function( data )
    {
        return new Collection( data || JSON.parse(JSON.stringify(users)) );
    }

    it( 'Instantiation', function()
    {
        var c = new Collection();
        expect( c.$data ).toEqual( [] );

        var c = new Collection( undefined );
        expect( c.$data ).toEqual( [] );

        var c = new Collection( null );
        expect( c.$data ).toEqual( [] );

        var c = new Collection( 1 );
        expect( c.$data ).toEqual( [1] );
    } );

    it( 'all', function()
    {
        expect( collection().all() ).toEqual( users );
    } );

    it( 'avg', function()
    {
        expect( function(){ collection().avg( 'name' ) } )
            .toThrow( 'Alex is not a number.' );

        expect( collection().avg( 'money' ) ).toBe( 2000 );
        expect( collection().avg( 'car.price' ) ).toBe( 45000 / 3 );
    } );

    it( 'contains', function()
    {
        var car = { brand: 'Hyundai', model: 'i30', price: 15000 };
        
        expect( collection().contains( 'name', 'Alex' ) ).toBeTruthy();
        expect( collection().contains( 'car.brand', 'Hyundai' ) ).toBeTruthy();
        expect( collection().contains( 'car.brand', 'Seat' ) ).toBeFalsy();
        expect( collection().contains( 'car', car ) ).toBeTruthy();
    } );

    it( 'count', function()
    {
        expect( collection().count() ).toBe( 3 );
    } );

    it( 'each', function()
    {
        expect( function(){ collection().each( 'string' ) } )
            .toThrow( 'Callback is not a function.' );

        collection().each( function( element, index ){
            expect( element ).toEqual( users[ index ] );
        } );
    } );

    it( 'first', function()
    {
        expect( collection().first() ).toEqual( user1 );
    } );

    it( 'last', function()
    {
        expect( collection().last() ).toEqual( user3 );
    } );

    it( 'max', function()
    {
        expect( function(){ collection().max() } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().max( null ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().max( undefined ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().max( [] ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().max( {} ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().max( 'name' ) } )
            .toThrow( '"name" is not a number.' );

        expect( collection().max( 'money' ) ).toBe( 3000 );
        expect( collection().max( 'car.price' ) ).toBe( 20000 );
    } );

    it( 'maxDate', function()
    {
        expect( function(){ collection().maxDate() } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().maxDate( null ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().maxDate( undefined ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().maxDate( [] ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().maxDate( {} ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().maxDate( 'name' ) } )
            .toThrow( '"name" is not a valid date.' );

        var birthdate = collection().maxDate( 'birthdate' );
        expect( birthdate.getMonth() ).toBe( 1 );
        expect( birthdate.getYear() ).toBe( 94 );
    } );

    it( 'min', function()
    {
        expect( function(){ collection().min() } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().min( null ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().min( undefined ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().min( [] ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().min( {} ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().min( 'name' ) } )
            .toThrow( '"name" is not a number.' );

        expect( collection().min( 'money' ) ).toBe( 1000 );
        expect( collection().min( 'car.price' ) ).toBe( 10000 );
    } );

    it( 'minDate', function()
    {
        expect( function(){ collection().minDate() } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().minDate( null ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().minDate( undefined ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().minDate( [] ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().minDate( {} ) } )
            .toThrow( 'Invalid field supplied.' );

        expect( function(){ collection().minDate( 'name' ) } )
            .toThrow( '"name" is not a valid date.' );
        
        var birthdate = collection().minDate( 'birthdate' );
        expect( birthdate.getMonth() ).toBe( 5 );
        expect( birthdate.getYear() ).toBe( 91 );
    } );

    it( 'pluck', function()
    {
        expect( collection().pluck( 'name' ) ).toEqual( [ 'Alex', 'Tamara', 'Josh' ] );
        expect( collection().pluck( 'car.price' ) ).toEqual( [ 15000, 20000, 10000 ] );
    } );

    it( 'pop', function()
    {
        var item = collection().pop();
        expect( item ).toEqual( user3 );

        var c = collection();
        c.pop();
        expect( c.count() ).toBe( 2 );
        expect( c.$data ).toEqual( [ user1, user2 ] );
    } );

    it( 'random', function()
    {
        var rndUser = collection().random();
        var result = false;
        for( var i = 0; i < users.length; i++ )
        {
            if( JSON.stringify( users[i] ) === JSON.stringify( rndUser ) )
            {
                result = true;
            }
        }
        expect( result ).toBeTruthy();
    } );

    it( 'search', function()
    {
        expect( collection().search( 'name', 'Alex' ) ).toEqual( [ 0 ] );
        expect( collection().search( 'car.brand', 'Audi' ) ).toEqual( [ 1, 2 ] );
        expect( collection().search( 'money', '1000' ) ).toEqual( [ 0 ] );
        expect( collection().search( 'money', '1000', true ) ).toEqual( [] );
        expect( collection().search( 'money', 1000, true ) ).toEqual( [ 0 ] );
    } );

    it( 'shift', function()
    {
        var item = collection().shift();
        expect( item ).toEqual( user1 );

        var c = collection();
        c.shift();
        expect( c.count() ).toBe( 2 );
        expect( c.$data ).toEqual( [ user2, user3 ] );
    } );

    it( 'sort', function()
    {
        expect( collection().sort( 'name' ).$data ).toEqual( [ user1, user3, user2 ] );
    } );

    it( 'sortDesc', function()
    {
        expect( collection().sortDesc( 'name' ).$data ).toEqual( [ user2, user3, user1 ] );
    } );

    it( 'splice', function()
    {
        var c = collection();
        var items = c.splice( 0 );
        expect( items ).toEqual( [ user1 ] );
        expect( c.$data ).toEqual( [ user2, user3 ] );

        var c = collection();
        var items = c.splice( [ 1, 2 ] );
        expect( items ).toEqual( [ user2, user3 ] );
        expect( c.$data ).toEqual( [ user1 ] );
    } );

    it( 'spliceByValue', function()
    {
        var c = collection();
        var items = c.spliceByValue( 'name', 'Alex' );
        expect( items ).toEqual( [ user1 ] );
        expect( c.$data ).toEqual( [ user2, user3 ] );

        var c = collection();
        var items = c.spliceByValue( 'car.brand', 'Audi' );
        expect( items ).toEqual( [ user2, user3 ] );
        expect( c.$data ).toEqual( [ user1 ] );
    } );

    it( 'sum', function()
    {
        expect( function(){ collection().sum( 'name' ) } )
            .toThrow( 'Alex is not a number.' );
            
        expect( collection().sum( 'money' ) ).toBe( 6000 );
        expect( collection().sum( 'car.price' ) ).toBe( 45000 );
    } );

    it( 'toJson', function()
    {
        expect( collection().toJson() ).toBe( JSON.stringify( users ) );
    } );

    it( 'update', function()
    {
        expect( collection().update( 0, 'name', 'Peter' ).$data[0].name ).toBe( 'Peter' );

        var c = collection().update( [ 0, 2 ], 'car.brand', 'Skoda' );
        expect( c.$data[0].car.brand ).toBe( 'Skoda' );
        expect( c.$data[2].car.brand ).toBe( 'Skoda' );
    } );

    it( 'updateByField', function()
    {
        expect( collection().updateByField( 'name', 'Alex', 'Jhon' ).$data[0].name ).toBe( 'Jhon' );

        var c = collection().updateByField( 'car.brand', 'Audi', 'Skoda' );
        expect( c.$data[0].car.brand ).toBe( 'Hyundai' );
        expect( c.$data[1].car.brand ).toBe( 'Skoda' );
        expect( c.$data[2].car.brand ).toBe( 'Skoda' );
    } );
} );