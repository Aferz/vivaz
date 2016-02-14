import WhereIn from '../../../../src/where/WhereIn';

describe( 'Where In Clause', function()
{
    it( 'Instantiation', function()
    {
        expect( function(){ new WhereIn(); } )
            .toThrow( 'No field provided for "whereIn" clause.' );

        expect( function(){ new WhereIn( 'id' ); } )
            .toThrow( 'No value provided for "whereIn" clause.' );

        var w = new WhereIn( 'id', [ 'value1', 'value2' ] );
        expect( w.name ).toBe( 'whereIn' );
        expect( w.field ).toBe( 'id' );
        expect( w.value ).toEqual( [ 'value1', 'value2' ] );
        expect( w.not ).toBeFalsy();

        var w = new WhereIn( 'id', [ 'value1', 'value2' ], true );
        expect( w.name ).toBe( 'whereNotIn' );
        expect( w.field ).toBe( 'id' );
        expect( w.value ).toEqual( [ 'value1', 'value2' ] );
        expect( w.not ).toBeTruthy();
    } );

    it( 'Resolves correctly', function()
    {
        var user = { id: 1, name: 'Alex' };
        var inUsers1 = [ 'Alex', 'Tamara', 'Josh' ];
        var inUsers2 = [ 'Jhon', 'Tamara', 'Josh' ];

        expect( new WhereIn( 'name', inUsers1 ).resolve( user.name ) ).toBeTruthy();
        expect( new WhereIn( 'name', inUsers2 ).resolve( user.name ) ).toBeFalsy();

        expect( new WhereIn( 'name', inUsers1, true ).resolve( user.name ) ).not.toBeTruthy();
        expect( new WhereIn( 'name', inUsers2, true ).resolve( user.name ) ).not.toBeFalsy();
    } );
} );