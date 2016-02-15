import Vivaz from '../../../src/Vivaz';
import Config from '../../../src/config/Config';
import Builder from '../../../src/Builder';

describe( 'Get builder from Vivaz', function()
{
    it( 'Initialization', function()
    {
        var builder = Vivaz( { id: 1 } );
        expect( builder instanceof Builder ).toBeTruthy();
    } );

    it( 'Configuration', function()
    {
        var builder = Vivaz( { id: 1 } );
        expect( builder.$config ).toEqual( Config );

        var builder = Vivaz( { id: 1 }, { newProp: 'xxx' } );
        expect( builder.$config.newProp ).toEqual( 'xxx' );
        expect( builder.$config.runningPlatform ).toEqual( Config.runningPlatform );

        var builder = Vivaz( { id: 1 }, { runningPlatform: 'xxx' } );
        expect( builder.$config.runningPlatform ).toEqual( 'xxx' );

        // Modify config options for every query
        Vivaz.config.runningPlatform = 'xxx';
        var builder = Vivaz( { id: 1 } );
        expect( builder.$config.runningPlatform ).toEqual( 'xxx' );                
    } );
} );