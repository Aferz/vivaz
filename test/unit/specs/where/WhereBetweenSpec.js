import WhereBetween from '../../../../src/where/WhereBetween';

describe( 'Where Between Clause', function()
{
    it( 'Instantiation', function()
    {
        expect( function(){ new WhereBetween(); } )
            .toThrow( 'No field provided for "whereBetween" clause.' );

        expect( function(){ new WhereBetween( 'id' ); } )
            .toThrow( 'No min value provided for "whereBetween" clause.' );
        
        expect( function(){ new WhereBetween( 'id', 50 ); } )
            .toThrow( 'No max value provided for "whereBetween" clause.' );
        
        expect( function(){ new WhereBetween( 'id', 'NaN', 100 ); } )
            .toThrow( 'Min value in "whereBetween" is not a number.' );
        
        expect( function(){ new WhereBetween( 'id', 10, 'NaN' ); } )
            .toThrow( 'Max value in "whereBetween" is not a number.' );

        expect( function(){ new WhereBetween( 'id', 100, 50 ); } )
            .toThrow( 'Min value has to be lower than max value.' );
        
        var w = new WhereBetween( 'id', 50, 100 );
        expect( w.name ).toBe( 'whereBetween' );
        expect( w.field ).toBe( 'id' );
        expect( w.min ).toBe( 50 );
        expect( w.max ).toBe( 100 );
        expect( w.not ).toBeFalsy();
        
        var w = new WhereBetween( 'id', 50, 100, true );
        expect( w.name ).toBe( 'whereNotBetween' );
        expect( w.not ).toBeTruthy();
    } );

    it( 'Resolves correctly', function()
    {
        expect( new WhereBetween( 'id', 1, 20 ).resolve( 1 ) ).toBeTruthy();
        expect( new WhereBetween( 'id', 2, 20 ).resolve( 1 ) ).toBeFalsy();
        
        expect( new WhereBetween( 'id', 1, 20, true ).resolve( 1 ) ).toBeFalsy();
        expect( new WhereBetween( 'id', 2, 20, true ).resolve( 1 ) ).toBeTruthy();
    } );
} );