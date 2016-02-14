import WhereCount from '../../../../src/where/WhereCount';

describe( 'Where Count Clause', function()
{
    it( 'Instantiation', function()
    {
        expect( function(){ new WhereCount(); } )
            .toThrow( 'No field provided for "whereCount" clause.' );

        var w = new WhereCount( 'id', 'value' );
        expect( w.name ).toBe( 'whereCount' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '=' );
        expect( w.value ).toBe( 'value' );
        expect( w.not ).toBeFalsy();

        var w = new WhereCount( 'id', '!=', 'value' );
        expect( w.name ).toBe( 'whereCount' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '!=' );
        expect( w.value ).toBe( 'value' );
        expect( w.not ).toBeFalsy();

        expect( function(){ new WhereCount( 'id', '*', 'value' ); } )
            .toThrow( 'Unrecognized "*" operator for "whereCount" clause.' );

        var w = new WhereCount( 'id', '!=', 'value', true );
        expect( w.name ).toBe( 'whereNotCount' );
        expect( w.not ).toBeTruthy();
    } );

    it( 'Resolves correctly', function()
    {
        var user = { id: 1, name: 'Alex', friends: [ 'Tamara', 'Josh', 'Julian' ] };

        expect( new WhereCount( 'friends', '=', 3 ).resolve( user.friends ) ).toBeTruthy();
        expect( new WhereCount( 'friends', '!=', 3 ).resolve( user.friends ) ).toBeFalsy();
        expect( new WhereCount( 'friends', '>', 3 ).resolve( user.friends ) ).toBeFalsy();
        expect( new WhereCount( 'friends', '<', 3 ).resolve( user.friends ) ).toBeFalsy();
        expect( new WhereCount( 'friends', '<=', 3 ).resolve( user.friends ) ).toBeTruthy();
        expect( new WhereCount( 'friends', '>=', 3 ).resolve( user.friends ) ).toBeTruthy();

        expect( new WhereCount( 'friends', '=', 3, true ).resolve( user.friends ) ).not.toBeTruthy();
        expect( new WhereCount( 'friends', '!=', 3, true ).resolve( user.friends ) ).not.toBeFalsy();
        expect( new WhereCount( 'friends', '>', 3, true ).resolve( user.friends ) ).not.toBeFalsy();
        expect( new WhereCount( 'friends', '<', 3, true ).resolve( user.friends ) ).not.toBeFalsy();
        expect( new WhereCount( 'friends', '<=', 3, true ).resolve( user.friends ) ).not.toBeTruthy();
        expect( new WhereCount( 'friends', '>=', 3, true ).resolve( user.friends ) ).not.toBeTruthy();
    } );
} );