import OrderBy from '../../../../src/order/OrderBy';

describe( 'Order By', function()
{
    it( 'Instantiation', function()
    {
        expect( function(){ new OrderBy(); } )
            .toThrow( 'No field provided for "orderBy".' );

        expect( function(){ new OrderBy( 'id', 'unrecognized' ); } )
            .toThrow( 'Unrecognized sort direction "unrecognized".' );
        
        var o = new OrderBy( 'id' );
        expect( o.name ).toBe( 'orderBy' );
        expect( o.field ).toBe( 'id' );
        expect( o.direction ).toBe( 'asc' );
        
        var o = new OrderBy( 'id', 'desc' );
        expect( o.name ).toBe( 'orderBy' );
        expect( o.field ).toBe( 'id' );
        expect( o.direction ).toBe( 'desc' );
    } );

    it( 'Resolves correctly', function()
    {
        var user1 = { id: 1, name: 'Alex' };
        var user2 = { id: 2, name: 'Tamara' };
        
        expect( new OrderBy( 'id', 'asc' ).resolve( user1, user2 ) ).toBe( -1 );
        expect( new OrderBy( 'id', 'desc' ).resolve( user1, user2 ) ).toBe( 1 );
    } );
} );