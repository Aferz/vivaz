import Builder from './Builder';
import { overrideConfig } from './config/Config';

function Vivaz( data, config )
{
    let cfg = overrideConfig( config || {} );
    
	return new Builder( data, cfg );
}

Vivaz._version = '0.1.2';

Vivaz._env = 'development';

export default Vivaz;