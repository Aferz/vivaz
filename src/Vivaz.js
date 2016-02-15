import Builder from './Builder';
import Config from './config/Config';
import { bootstrap, overrideConfig } from './bootstrap/Bootstrap';

function Vivaz( data, config )
{
    let cfg = overrideConfig( config || {} );
    
	return new Builder( data, cfg );
}

Vivaz._version = '0.1.2';

Vivaz._env = 'development';

bootstrap( Vivaz );

export default Vivaz;