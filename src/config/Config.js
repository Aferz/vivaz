import isBrowser from '../util/Environment';
import { PLATFORM_NODE, PLATFORM_BROWSER } from './Constants';

const Config = {
    
    integrations: {
        moment: {
            active: false,
            nodehook: null // Only for node. moment function hook.
        }
    },
    
    validOperators: [ '=', '===', '!=', '!==', '<', '<=', '>=', '>', '<>' ],
    
    runningPlatform: isBrowser ? PLATFORM_BROWSER : PLATFORM_NODE
};

export default Config;