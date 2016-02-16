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

	// else, print warning if moment is activated manually without
	// a factory supplied
	else if( Vivaz.config.debug === true && 
		Vivaz.config.integrations.moment.active === true &&
		Vivaz.config.integrations.moment.factory !== null )
	{
		// TODO Url in wiki
		console.warn( 'Integration with moment.js is activated but there is no moment factory loaded. Auto switch-off integration with moment.js. More info: ...' );

		Vivaz.config.integrations.moment.active = false;
	}
}