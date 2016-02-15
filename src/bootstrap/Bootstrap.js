import Config from '../config/Config';
import integrateMoment from '../integrations/Moment';

export function bootstrap( Vivaz )
{
	__initConfig( Vivaz );
	__initIntegrations( Vivaz );
}

export function overrideConfig( userConfig )
{
	let cfg = {};
    
    // Default config 
    for( let prop in Config ) cfg[prop] = Config[prop];
    
    // User config
    for( let prop in userConfig ) cfg[prop] = userConfig[prop];
        
    return cfg;
}

let __initConfig = function( Vivaz )
{
	Vivaz.config = Config;
}

let __initIntegrations = function( Vivaz )
{
	integrateMoment( Vivaz );
}