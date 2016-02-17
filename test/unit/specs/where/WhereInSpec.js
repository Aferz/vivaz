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
        expect( w.not ).toBeTruthy();
    } );

    it( 'Resolves correctly', function()
    {
        expect( new WhereIn( 'name', [ 'Tamara', 'Alex' ] ).resolve( 'Alex' ) ).toBeTruthy();
        expect( new WhereIn( 'name', [ 'Tamara', 'Jhon' ] ).resolve( 'Alex' ) ).toBeFalsy();

        expect( new WhereIn( 'name', [ 'Tamara', 'Alex' ], true ).resolve( 'Alex' ) ).not.toBeTruthy();
        expect( new WhereIn( 'name', [ 'Tamara', 'Jhon' ], true ).resolve( 'Alex' ) ).not.toBeFalsy();
    } );
} );