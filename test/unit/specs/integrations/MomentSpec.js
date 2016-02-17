import Vivaz from '../../../../src/Vivaz';
import { isBrowser } from '../../../../src/util/Environment';
import WhereDate from '../../../../src/where/WhereDate';

describe( 'Integration - MomentJS', function()
{
    it( 'Integrates momentjs into Vivaz(Browser)', function()
    {
        expect( Vivaz.config.integrations.moment.active ).toBeTruthy();
        expect( Vivaz.config.integrations.moment.factory ).toEqual( window.moment );
    } );

    it( 'WhereDate accepts a moment object', function()
    {
        var w = new WhereDate( 'birthdate', moment( '1991-01-01' ) );
        expect( w.value ).toEqual( moment( '1991-01-01' ) );
    } );

    it( 'WhereDate resolves correctly a moment object', function()
    {
        var date = moment( '1991-08-29' );
        expect( new WhereDate( 'birthdate', date ).resolve( '1991-08-29' ) ).toBeTruthy();
    } );

    it( 'WhereDate resolves correctly a moment object(UTC)', function()
    {
        var date = moment.utc( '1991-08-29' );
        expect( new WhereDate( 'birthdate', date ).resolve( '1991-08-29' ) ).toBeTruthy();
    } );

    it( 'WhereDate resolves correctly a moment object(UTC)', function()
    {
        var date = moment.utc( '1991-08-29' );
        expect( new WhereDate( 'birthdate', date ).resolve( '1991-08-29' ) ).toBeTruthy();
    } );

    it( 'Fetch data', function()
    {
        var date = moment.utc( '1991-08-29' );
        expect( new WhereDate( 'birthdate', date ).resolve( '1991-08-29' ) ).toBeTruthy();
    } );
} );