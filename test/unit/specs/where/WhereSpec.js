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
        expect( w.name ).toBe( 'where' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '!=' );
        expect( w.value ).toBe( 'value' );
        expect( w.not ).toBeFalsy();

        // Where Undefined
        var w = new Where( 'id', '===', undefined );
        expect( w.name ).toBe( 'where' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '===' );
        expect( w.value ).toBeUndefined();
        expect( w.not ).toBeFalsy();

        // Where Null
        var w = new Where( 'id', '!==', null );
        expect( w.name ).toBe( 'where' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '!==' );
        expect( w.value ).toBeNull();
        expect( w.not ).toBeFalsy();

        // Where True
        var w = new Where( 'id', '===', true );
        expect( w.name ).toBe( 'where' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '===' );
        expect( w.value ).toBeTruthy();
        expect( w.not ).toBeFalsy();

        // Where False
        var w = new Where( 'id', '!==', false );
        expect( w.name ).toBe( 'where' );
        expect( w.field ).toBe( 'id' );
        expect( w.operator ).toBe( '!==' );
        expect( w.value ).toBeFalsy();
        expect( w.not ).toBeFalsy();

        var w = new Where( 'id', '!=', 'value', true );
        expect( w.name ).toBe( 'whereNot' );
        expect( w.not ).toBeTruthy();
    } );

    it( 'Resolves correctly', function()
    {
        var user = { id: 1, name: 'Alex', attr1: undefined, attr2: null, attr3: true, attr4: false };

        // Positive
        expect( new Where( 'id', '=', 1 ).resolve( user.id ) ).toBeTruthy();
        expect( new Where( 'id', '!=', 1 ).resolve( user.id ) ).toBeFalsy();
        expect( new Where( 'id', '>', 1 ).resolve( user.id ) ).toBeFalsy();
        expect( new Where( 'id', '<', 1 ).resolve( user.id ) ).toBeFalsy();
        expect( new Where( 'id', '<=', 1 ).resolve( user.id ) ).toBeTruthy();
        expect( new Where( 'id', '>=', 1 ).resolve( user.id ) ).toBeTruthy();

        // Negative
        expect( new Where( 'id', '=', 1, true ).resolve( user.id ) ).not.toBeTruthy();
        expect( new Where( 'id', '!=', 1, true ).resolve( user.id ) ).not.toBeFalsy();
        expect( new Where( 'id', '>', 1, true ).resolve( user.id ) ).not.toBeFalsy();
        expect( new Where( 'id', '<', 1, true ).resolve( user.id ) ).not.toBeFalsy();
        expect( new Where( 'id', '<=', 1, true ).resolve( user.id ) ).not.toBeTruthy();
        expect( new Where( 'id', '>=', 1, true ).resolve( user.id ) ).not.toBeTruthy();

        // Strict
        expect( new Where( 'id', '===', 1 ).resolve( user.id ) ).toBeTruthy();
        expect( new Where( 'id', '===', '1' ).resolve( user.id ) ).toBeFalsy();
        expect( new Where( 'id', '===', 1, true ).resolve( user.id ) ).not.toBeTruthy();
        expect( new Where( 'id', '===', '1', true ).resolve( user.id ) ).not.toBeFalsy();
        expect( new Where( 'id', '!==', 1 ).resolve( user.id ) ).not.toBeTruthy();
        expect( new Where( 'id', '!==', '1' ).resolve( user.id ) ).not.toBeFalsy();
        expect( new Where( 'id', '!==', 1, true ).resolve( user.id ) ).toBeTruthy();
        expect( new Where( 'id', '!==', '1', true ).resolve( user.id ) ).toBeFalsy();

        // Where Undefined
        expect( new Where( 'id', '===', undefined ).resolve( user.attr1 ) ).toBeTruthy();
        expect( new Where( 'id', '!==', undefined ).resolve( user.attr1 ) ).toBeFalsy();
        expect( new Where( 'id', '===', undefined ).resolve( user.attr2 ) ).toBeFalsy();

        // Where Null
        expect( new Where( 'id', '===', null ).resolve( user.attr2 ) ).toBeTruthy();
        expect( new Where( 'id', '!==', null ).resolve( user.attr2 ) ).toBeFalsy();

        // Where True
        expect( new Where( 'id', '===', true ).resolve( user.attr3 ) ).toBeTruthy();
        expect( new Where( 'id', '!==', true ).resolve( user.attr3 ) ).toBeFalsy();

        // Where False
        expect( new Where( 'id', '===', false ).resolve( user.attr4 ) ).toBeTruthy();
        expect( new Where( 'id', '!==', false ).resolve( user.attr4 ) ).toBeFalsy();
    } );
} );