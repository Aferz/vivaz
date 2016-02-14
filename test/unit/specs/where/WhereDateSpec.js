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
        expect( w.value.toString() ).toBe( new Date( '1900-01-01' ).toString() );
        expect( w.not ).toBeFalsy();

        var w = new WhereDate( 'birthdate', '!=', '1900-01-01' );
        expect( w.name ).toBe( 'whereDate' );
        expect( w.field ).toBe( 'birthdate' );
        expect( w.operator ).toBe( '!=' );
        expect( w.value.toString() ).toBe( new Date( '1900-01-01' ).toString() );
        expect( w.not ).toBeFalsy();

        var w = new WhereDate( 'birthdate', '!=', '1900-01-01', true );
        expect( w.name ).toBe( 'whereNotDate' );
        expect( w.not ).toBeTruthy();
    } );

    it( 'Resolves correctly', function()
    {
        var user = { id: 1, name: 'Alex', birthdate: '1991-08-29T12:00:00.000Z' };

        expect( new WhereDate( 'birthdate', '=', '1991-08-29T12:00:00.000Z' ).resolve( user.birthdate ) ).toBeTruthy();
        expect( new WhereDate( 'birthdate', '!=', '1991-08-29T12:00:00.000Z' ).resolve( user.birthdate ) ).toBeFalsy();
        expect( new WhereDate( 'birthdate', '>', '1991-08-29T12:00:00.000Z' ).resolve( user.birthdate ) ).toBeFalsy();
        expect( new WhereDate( 'birthdate', '<', '1991-08-29T12:00:00.000Z' ).resolve( user.birthdate ) ).toBeFalsy();
        expect( new WhereDate( 'birthdate', '<=', '1991-08-29T12:00:00.000Z' ).resolve( user.birthdate ) ).toBeTruthy();
        expect( new WhereDate( 'birthdate', '>=', '1991-08-29T12:00:00.000Z' ).resolve( user.birthdate ) ).toBeTruthy();

        expect( new WhereDate( 'birthdate', '=', '1991-08-29T12:00:00.000Z', true ).resolve( user.birthdate ) ).not.toBeTruthy();
        expect( new WhereDate( 'birthdate', '!=', '1991-08-29T12:00:00.000Z', true ).resolve( user.birthdate ) ).not.toBeFalsy();
        expect( new WhereDate( 'birthdate', '>', '1991-08-29T12:00:00.000Z', true ).resolve( user.birthdate ) ).not.toBeFalsy();
        expect( new WhereDate( 'birthdate', '<', '1991-08-29T12:00:00.000Z', true ).resolve( user.birthdate ) ).not.toBeFalsy();
        expect( new WhereDate( 'birthdate', '<=', '1991-08-29T12:00:00.000Z', true ).resolve( user.birthdate ) ).not.toBeTruthy();
        expect( new WhereDate( 'birthdate', '>=', '1991-08-29T12:00:00.000Z', true ).resolve( user.birthdate ) ).not.toBeTruthy();
    } );
} );