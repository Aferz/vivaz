import WhereCount from '../../../../src/where/WhereCount';

describe( 'Where Count Clause', function()
{
    it( 'Instantiation', function()
    {
        expect( function(){ new WhereCount(); } )
            .toThrow( 'No field provided for "whereCount" clause.' );

        expect( function(){ new WhereCount( 'id', '*', 'value' ); } )
            .toThrow( 'Unrecognized "*" operator for "whereCount" clause.' );

        var w = new WhereCount( 'id', 'value' );
        expect( w.name ).toBe( 'whereCount' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '=' );
        expect( w.value ).toBe( 'value' );
        expect( w.not ).toBeFalsy();

        var w = new WhereCount( 'id', '!=', 'value' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '!=' );
        expect( w.value ).toBe( 'value' );

        var w = new WhereCount( 'id', '!=', 'value', true );
        expect( w.name ).toBe( 'whereNotCount' );
        expect( w.not ).toBeTruthy();
    } );

    it( 'Resolves correctly', function()
    {
        expect( new WhereCount( 'friends', '=', 3 ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).toBeTruthy();
        expect( new WhereCount( 'friends', '!=', 3 ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).toBeFalsy();
        expect( new WhereCount( 'friends', '>', 3 ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).toBeFalsy();
        expect( new WhereCount( 'friends', '<', 3 ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).toBeFalsy();
        expect( new WhereCount( 'friends', '<=', 3 ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).toBeTruthy();
        expect( new WhereCount( 'friends', '>=', 3 ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).toBeTruthy();

        expect( new WhereCount( 'friends', '=', 3, true ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).not.toBeTruthy();
        expect( new WhereCount( 'friends', '!=', 3, true ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).not.toBeFalsy();
        expect( new WhereCount( 'friends', '>', 3, true ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).not.toBeFalsy();
        expect( new WhereCount( 'friends', '<', 3, true ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).not.toBeFalsy();
        expect( new WhereCount( 'friends', '<=', 3, true ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).not.toBeTruthy();
        expect( new WhereCount( 'friends', '>=', 3, true ).resolve( [ 'Tamara', 'Josh', 'Julian' ] ) ).not.toBeTruthy();
    } );
} );