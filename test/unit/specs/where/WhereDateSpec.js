import WhereDate from '../../../../src/where/WhereDate';

describe( 'Where Date Clause', function()
{
    it( 'Instantiation', function()
    {
        expect( function(){ new WhereDate(); } )
            .toThrow( 'No field provided for "whereDate" clause.' );

        expect( function(){ new WhereDate( 'birthdate', 'not-a-date' ); } )
            .toThrow( 'Value "not-a-date" is not a valid date.' );
        
        expect( function(){ new WhereDate( 'birthdate', '!=', 'not-a-date' ); } )
            .toThrow( 'Value "not-a-date" is not a valid date.' );

        expect( function(){ new WhereDate( 'birthdate', '*', '1900-01-01' ); } )
            .toThrow( 'Unrecognized "*" operator for "whereDate" clause.' );

        var w = new WhereDate( 'birthdate', '1900-01-01' );
        expect( w.name ).toBe( 'whereDate' );
        expect( w.field ).toBe( 'birthdate' );
        expect( w.operator ).toBe( '=' );
        expect( w.value.getTime() ).toBe( new Date( '1900-01-01' ).getTime() );
        expect( w.not ).toBeFalsy();

        var w = new WhereDate( 'birthdate', '!=', '1900-01-01' );
        expect( w.field ).toBe( 'birthdate' );
        expect( w.operator ).toBe( '!=' );
        expect( w.value.getTime() ).toBe( new Date( '1900-01-01' ).getTime() );

        var w = new WhereDate( 'birthdate', '!=', '1900-01-01', true );
        expect( w.name ).toBe( 'whereNotDate' );
        expect( w.not ).toBeTruthy();
    } );

    it( 'Resolves correctly', function()
    {
        expect( new WhereDate( 'birthdate', '=', '1991-08-29' ).resolve( '1991-08-29' ) ).toBeTruthy();
        expect( new WhereDate( 'birthdate', '!=', '1991-08-29' ).resolve( '1991-08-29' ) ).toBeFalsy();
        expect( new WhereDate( 'birthdate', '>', '1991-08-29' ).resolve( '1991-08-29' ) ).toBeFalsy();
        expect( new WhereDate( 'birthdate', '<', '1991-08-29' ).resolve( '1991-08-29' ) ).toBeFalsy();
        expect( new WhereDate( 'birthdate', '<=', '1991-08-29' ).resolve( '1991-08-29' ) ).toBeTruthy();
        expect( new WhereDate( 'birthdate', '>=', '1991-08-29' ).resolve( '1991-08-29' ) ).toBeTruthy();

        expect( new WhereDate( 'birthdate', '=', '1991-08-29', true ).resolve( '1991-08-29' ) ).not.toBeTruthy();
        expect( new WhereDate( 'birthdate', '!=', '1991-08-29', true ).resolve( '1991-08-29' ) ).not.toBeFalsy();
        expect( new WhereDate( 'birthdate', '>', '1991-08-29', true ).resolve( '1991-08-29' ) ).not.toBeFalsy();
        expect( new WhereDate( 'birthdate', '<', '1991-08-29', true ).resolve( '1991-08-29' ) ).not.toBeFalsy();
        expect( new WhereDate( 'birthdate', '<=', '1991-08-29', true ).resolve( '1991-08-29' ) ).not.toBeTruthy();
        expect( new WhereDate( 'birthdate', '>=', '1991-08-29', true ).resolve( '1991-08-29' ) ).not.toBeTruthy();
    } );
} );