import { isBrowser } from '../util/Environment';
import { PLATFORM_NODE, PLATFORM_BROWSER } from './Constants';

const Config = {
    
    debug: false,

    dateFields: [],

    dateAsObjects: true,

    integrations: {
        moment: {
            active: false,
            factory: null,
        }
    },
    
    validOperators: [ '=', '===', '!=', '!==', '<', '<=', '>=', '>', '<>' ],
    
    runningPlatform: isBrowser ? PLATFORM_BROWSER : PLATFORM_NODE
};

export default Config;

export function overrideConfig( userConfig )
{
	let cfg = {};
    
    // Default config 
    for( let prop in Config ) cfg[prop] = Config[prop];
    
    // User config
    for( let prop in userConfig ) cfg[prop] = userConfig[prop];
        
    return cfg;
}