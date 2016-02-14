var fs      = require( 'fs' );
var zlib    = require( 'zlib' );
var rollup  = require( 'rollup' );
var uglify  = require( 'uglify-js' );
var babel   = require( 'rollup-plugin-babel' );
var version = process.env.VERSION || require( '../package.json' ).version;

var banner =
    '/*!\n' +
    ' * Vivaz.js v' + version + '\n' +
    ' * (c) ' + new Date().getFullYear() + ' Alejandro Fernandez\n' +
    ' * Released under the MIT License.\n' +
    ' */';
    
var main = fs
    .readFileSync( 'src/Vivaz.js', 'utf-8' )
    .replace( /Vivaz\._version = '[\d\.]+'/, "Vivaz._version = '" + version + "'" );

fs.writeFileSync( 'src/Vivaz.js', main );

// Common JS
rollup.rollup( {
    entry: 'src/index.js',
    plugins: [
        babel( { presets: [ 'es2015-loose-rollup' ] } )
    ]
} )
.then( function( bundle )
{
    return write( 'dist/vivaz.common.js', bundle.generate( {
        format: 'cjs',
        banner: banner
    } ).code );
} )

// Standalone Dev Build
.then( function()
{
    return rollup.rollup({
        entry: 'src/index.js',
        plugins: [
            babel( { presets: [ 'es2015-loose-rollup' ] } )
        ]
    } );
} )
.then( function( bundle )
{
    return write( 'dist/vivaz.js', bundle.generate( {
        format: 'umd',
        banner: banner,
        moduleName: 'Vivaz'
    } ).code );
} )

// Standalone Production Build
.then( function()
{
    return rollup.rollup({
        entry: 'src/index.js',
        plugins: [
            babel( { presets: [ 'es2015-loose-rollup' ] } )
        ]
    } );
} )
.then( function( bundle )
{
    var code = bundle.generate( {
        format: 'umd',
        moduleName: 'Vivaz'
    } ).code;
    
    var minified = banner + '\n' + uglify.minify( code, {
        fromString: true
    } ).code;
    
    return write( 'dist/vivaz.min.js', minified );
} )
.catch( logError );

function write( dest, code )
{
    return new Promise( function( resolve, reject )
    {
        fs.writeFile( dest, code, function( err )
        {
            if( err )
            {
                return reject( err );
            }
            
            console.log( blue( dest ) + ' ' + getSize( code ) );
            
            resolve();
        } );
    } );
}

function getSize( code )
{
   return ( code.length / 1024 ).toFixed(2) + 'kb';
}

function logError( e )
{
   console.log( e );
}

function blue( str )
{
   return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}