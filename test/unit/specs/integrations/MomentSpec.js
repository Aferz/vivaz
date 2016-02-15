import Vivaz from '../../../../src/Vivaz';
import { isBrowser } from '../../../../src/util/Environment';

describe( 'Integrations - MomentJS', function()
{
    var data = [
        { id: 1, name: 'Alex', birthdate: '1991-08-29' },
        { id: 2, name: 'Tamara', birthdate: '1991-06-19' }
    ];
    
    if( isBrowser && window.moment != undefined )
    {
        it( 'Detects momentjs on browser and injects into Vivaz', function()
        {
            
        } );
    }
} );