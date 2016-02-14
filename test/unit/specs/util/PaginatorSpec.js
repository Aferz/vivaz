import Paginator from '../../../../src/util/Paginator';

describe( 'Paginator', function()
{
    it( 'Performs Paginator', function()
    {
        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Audi' } };
        var user3 = { id: 3, name: 'Josh', car: { brand: 'Audi' } };
        var users = [ user1, user2, user3 ];
        
        var p = new Paginator( users, 2 );
        expect( p.totalRecords ).toBe( 3 );
        expect( p.recordsPerPage ).toBe( 2 );
        expect( p.totalPages ).toBe( 2 );
        expect( p.pages ).toEqual( [ [ user1, user2 ], [ user3 ] ] );
        expect( p.currentIndex ).toBe( 1 );
        expect( p.current() ).toEqual( [ user1, user2 ] );
    } );
    
    it( 'Go next & prev', function()
    {
        var user1 = { id: 1, name: 'Alex', car: { brand: 'Hyundai' } };
        var user2 = { id: 2, name: 'Tamara', car: { brand: 'Audi' } };
        var user3 = { id: 3, name: 'Josh', car: { brand: 'Audi' } };
        var users = [ user1, user2, user3 ];
        
        var p = new Paginator( users, 1 );
        expect( p.currentIndex ).toBe( 1 );
        expect( p.current() ).toEqual( [ user1 ] );
        p.next();
        expect( p.currentIndex ).toBe( 2 );
        expect( p.current() ).toEqual( [ user2 ] );
        p.next();
        expect( p.currentIndex ).toBe( 3 );
        expect( p.current() ).toEqual( [ user3 ] );
        p.next();
        expect( p.currentIndex ).toBe( 3 );
        expect( p.current() ).toEqual( [ user3 ] );
        p.previous();
        expect( p.currentIndex ).toBe( 2 );
        expect( p.current() ).toEqual( [ user2 ] );
        p.previous();
        expect( p.currentIndex ).toBe( 1 );
        expect( p.current() ).toEqual( [ user1 ] );
        p.previous();
        expect( p.currentIndex ).toBe( 1 );
        expect( p.current() ).toEqual( [ user1 ] );
    } );
} );