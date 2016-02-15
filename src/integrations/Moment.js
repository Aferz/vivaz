import isBrowser from '../util/Environment';

export default function( Vivaz )
{
	// Trying to get moment from browser window object
	if( isBrowser && typeof window.moment !== undefined )
	{
		Vivaz.config.integrations = {
	        moment: {
	            active: true,
	            factory: window.moment,
	        }
	    }
	}

	// Trying to get moment from node global object
	else if( typeof global.moment !== undefined )
	{
		Vivaz.config.integrations = {
	        moment: {
	            active: true,
	            factory: global.moment,
	        }
	    }
	}

	// else, it must to be defined manually
}