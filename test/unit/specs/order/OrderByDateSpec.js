import OrderByDate from '../../../../src/order/OrderByDate';

describe( 'Order By Date', function()
{
    it( 'Instantiation', function()
    {
        expect( function(){ new OrderByDate(); } )
            .toThrow( 'No field provided for "orderByDate".' );

        expect( function(){ new OrderByDate( 'id', 'unrecognized' ); } )
            .toThrow( 'Unrecognized sort direction "unrecognized".' );
        
        var o = new OrderByDate( 'id' );
        expect( o.name ).toBe( 'orderByDate' );
        expect( o.field ).toBe( 'id' );
        expect( o.direction ).toBe( 'asc' );
        
        var o = new OrderByDate( 'id', 'desc' );
        expect( o.name ).toBe( 'orderByDate' );
        expect( o.field ).toBe( 'id' );
        expect( o.direction ).toBe( 'desc' );
    } );

    it( 'Resolves correctly', function()
    {
        var user1 = { id: 1, name: 'Alex', birthdate: '1991-08-29T12:00:00Z' };
        var user2 = { id: 2, name: 'Tamara', birthdate: '1991-06-19T16:00:00Z' };
        
        expect( function(){ 
            new OrderByDate( 'name', 'asc' )
                .resolve( user1, user2 ) 
        } ).toThrow( 'Invalid date "Alex" in field "name".' );
        
        expect( new OrderByDate( 'birthdate', 'asc' ).resolve( user1, user2 ) ).toBe( 1 );
        expect( new OrderByDate( 'birthdate', 'desc' ).resolve( user1, user2 ) ).toBe( -1 );
    } );
} );