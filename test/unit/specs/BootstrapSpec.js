import Vivaz from '../../../src/Vivaz';
import { bootstrap } from '../../../src/Bootstrap';

describe( 'Application Bootstrap', function()
{
    bootstrap( Vivaz );

    it( 'Config it\'s installed in Vivaz Constructor', function()
    {
        expect( Vivaz.config ).toBeDefined();
    } );
} );