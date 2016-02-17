import WhereLike from '../../../../src/where/WhereLike';

describe( 'Where Like Clause', function()
{
    it( 'Instantiation', function()
    {
        expect( function(){ new WhereLike(); } )
            .toThrow( 'No field provided for "whereLike" clause.' );

        expect( function(){ new WhereLike( 'id' ); } )
            .toThrow( 'No expression provided for "whereLike" clause.' );

        var w = new WhereLike( 'id', 'expression' );
        expect( w.name ).toBe( 'whereLike' );
        expect( w.field ).toBe( 'id' );
        expect( w.expression ).toBe( 'expression' );
        expect( w.not ).toBeFalsy();
        
        var w = new WhereLike( 'id', /expression/ );
        expect( w.expression ).toEqual( /expression/ );

        var w = new WhereLike( 'id', /expression/, true );
        expect( w.name ).toBe( 'whereNotLike' );
        expect( w.not ).toBeTruthy();
    } );

    it( 'Resolves correctly', function()
    {
        var user = { id: 1, name: 'Alex' };

        expect( new WhereLike( 'name', 'Alex' ).resolve( 'Alex' ) ).toBeTruthy();
        expect( new WhereLike( 'name', /le/ ).resolve( 'Alex' ) ).toBeTruthy();
        expect( new WhereLike( 'name', 'so' ).resolve( 'Alex' ) ).toBeFalsy();
        expect( new WhereLike( 'name', /so/ ).resolve( 'Alex' ) ).toBeFalsy();
        
        expect( new WhereLike( 'name', 'Alex', true ).resolve( 'Alex' ) ).not.toBeTruthy();
        expect( new WhereLike( 'name', /le/, true ).resolve( 'Alex' ) ).not.toBeTruthy();
        expect( new WhereLike( 'name', 'so', true ).resolve( 'Alex' ) ).not.toBeFalsy();
        expect( new WhereLike( 'name', /so/, true ).resolve( 'Alex' ) ).not.toBeFalsy();
    } );
} );