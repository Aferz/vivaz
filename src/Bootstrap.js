import Config from './config/Config';
import integrateMoment from './integrations/Moment';

export function bootstrap( Vivaz )
{
	__initConfig( Vivaz );
	__initIntegrations( Vivaz );
}

let __initConfig = function( Vivaz )
{
	Vivaz.config = Config;
}

let __initIntegrations = function( Vivaz )
{
	integrateMoment( Vivaz );
}