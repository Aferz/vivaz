import Vivaz from '../../../../src/Vivaz';

describe( 'Integrations - MomentJS', function()
{
    var data = [
        { id: 1, name: 'Alex', birthdate: '1991-08-29' },
        { id: 2, name: 'Tamara', birthdate: '1991-06-19' }
    ];
    
    it( 'Integration in browser', function()
    {
        console.log( Vivaz( { id: 1 } ) );
        //var g = typeof window === undefined ? global : window; // Node or Browser
        
        //g.moment = require( 'moment' );
        
        //expect( typeof global.moment === 'function' ).toBeTruthy();
    } );
} );