import Where from '../../../../src/where/Where';

describe( 'Where Clause', function()
{
    it( 'Instantiation', function()
    {
        expect( function(){ new Where(); } )
            .toThrow( 'No field provided for "where" clause.' );

        expect( function(){ new Where( 'id' ); } )
            .toThrow( 'No correct value provided for "where" clause. For better assertion use whereUndefined() instead.' );

        expect( function(){ new Where( 'id', null ); } )
            .toThrow( 'No correct value provided for "where" clause. For better assertion use whereNull() instead.' );

        expect( function(){ new Where( 'id', undefined ); } )
            .toThrow( 'No correct value provided for "where" clause. For better assertion use whereUndefined() instead.' );

        expect( function(){ new Where( 'id', true ); } )
            .toThrow( 'No correct value provided for "where" clause. For better assertion use whereTrue() instead.' );

        expect( function(){ new Where( 'id', false ); } )
            .toThrow( 'No correct value provided for "where" clause. For better assertion use whereFalse() instead.' );

        expect( function(){ new Where( 'id', '=', null ); } )
            .toThrow( 'No correct value provided for "where" clause. For better assertion use whereNull() instead.' );

        expect( function(){ new Where( 'id', '=', undefined ); } )
            .toThrow( 'No correct value provided for "where" clause. For better assertion use whereUndefined() instead.' );

        expect( function(){ new Where( 'id', '=', true ); } )
            .toThrow( 'No correct value provided for "where" clause. For better assertion use whereTrue() instead.' );

        expect( function(){ new Where( 'id', '=', false ); } )
            .toThrow( 'No correct value provided for "where" clause. For better assertion use whereFalse() instead.' );

        expect( function(){ new Where( 'id', '*', 'value' ); } )
            .toThrow( 'Unrecognized "*" operator for "where" clause.' );

        var w = new Where( 'id', 'value' );
        expect( w.name ).toBe( 'where' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '=' );
        expect( w.value ).toBe( 'value' );
        expect( w.not ).toBeFalsy();

        var w = new Where( 'id', '!=', 'value' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '!=' );
        expect( w.value ).toBe( 'value' );

        // Where Undefined
        var w = new Where( 'id', '===', undefined );
        expect( w.value ).toBeUndefined();

        // Where Null
        var w = new Where( 'id', '!==', null );
        expect( w.value ).toBeNull();

        // Where True
        var w = new Where( 'id', '===', true );
        expect( w.value ).toBeTruthy();

        // Where False
        var w = new Where( 'id', '!==', false );
        expect( w.value ).toBeFalsy();

        var w = new Where( 'id', '!=', 'value', true );
        expect( w.name ).toBe( 'whereNot' );
        expect( w.not ).toBeTruthy();
    } );

    it( 'Resolves correctly', function()
    {
        // Positive
        expect( new Where( 'id', '=', 1 ).resolve( 1 ) ).toBeTruthy();
        expect( new Where( 'id', '!=', 1 ).resolve( 1 ) ).toBeFalsy();
        expect( new Where( 'id', '>', 1 ).resolve( 1 ) ).toBeFalsy();
        expect( new Where( 'id', '<', 1 ).resolve( 1 ) ).toBeFalsy();
        expect( new Where( 'id', '<=', 1 ).resolve( 1 ) ).toBeTruthy();
        expect( new Where( 'id', '>=', 1 ).resolve( 1 ) ).toBeTruthy();

        // Negative
        expect( new Where( 'id', '=', 1, true ).resolve( 1 ) ).not.toBeTruthy();
        expect( new Where( 'id', '!=', 1, true ).resolve( 1 ) ).not.toBeFalsy();
        expect( new Where( 'id', '>', 1, true ).resolve( 1 ) ).not.toBeFalsy();
        expect( new Where( 'id', '<', 1, true ).resolve( 1 ) ).not.toBeFalsy();
        expect( new Where( 'id', '<=', 1, true ).resolve( 1 ) ).not.toBeTruthy();
        expect( new Where( 'id', '>=', 1, true ).resolve( 1 ) ).not.toBeTruthy();

        // Strict
        expect( new Where( 'id', '===', 1 ).resolve( 1 ) ).toBeTruthy();
        expect( new Where( 'id', '===', '1' ).resolve( 1 ) ).toBeFalsy();
        expect( new Where( 'id', '===', 1, true ).resolve( 1 ) ).not.toBeTruthy();
        expect( new Where( 'id', '===', '1', true ).resolve( 1 ) ).not.toBeFalsy();
        expect( new Where( 'id', '!==', 1 ).resolve( 1 ) ).not.toBeTruthy();
        expect( new Where( 'id', '!==', '1' ).resolve( 1 ) ).not.toBeFalsy();
        expect( new Where( 'id', '!==', 1, true ).resolve( 1 ) ).toBeTruthy();
        expect( new Where( 'id', '!==', '1', true ).resolve( 1 ) ).toBeFalsy();

        // Where Undefined
        expect( new Where( 'id', '===', undefined ).resolve( undefined ) ).toBeTruthy();
        expect( new Where( 'id', '!==', undefined ).resolve( undefined ) ).toBeFalsy();
        expect( new Where( 'id', '===', undefined ).resolve( null ) ).toBeFalsy();

        // Where Null
        expect( new Where( 'id', '===', null ).resolve( null ) ).toBeTruthy();
        expect( new Where( 'id', '!==', null ).resolve( null ) ).toBeFalsy();

        // Where True
        expect( new Where( 'id', '===', true ).resolve( true ) ).toBeTruthy();
        expect( new Where( 'id', '!==', true ).resolve( true ) ).toBeFalsy();

        // Where False
        expect( new Where( 'id', '===', false ).resolve( false ) ).toBeTruthy();
        expect( new Where( 'id', '!==', false ).resolve( false ) ).toBeFalsy();
    } );
} );