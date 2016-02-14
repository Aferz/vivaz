import Builder from './Builder';
import Config from './config/Config';

export default function Vivaz( data, config )
{
    let cfg = _initConfig( config || {} );
    
	return new Builder( data, cfg );
}

Vivaz._version = '0.1.2';

Vivaz._env = 'development';

Vivaz.config = Config;

var _initConfig = function( userConfig )
{
    let cfg = {};
    
    // Default config 
    for( let prop in Config ) cfg[prop] = Config[prop];
    
    // User config
    for( let prop in userConfig ) cfg[prop] = userConfig[prop];
        
    return cfg;
}