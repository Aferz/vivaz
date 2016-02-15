import { isBrowser } from '../util/Environment';
import { PLATFORM_NODE, PLATFORM_BROWSER } from './Constants';

const Config = {
    
    integrations: {
        moment: {
            active: false,
            factory: undefined,
        }
    },
    
    validOperators: [ '=', '===', '!=', '!==', '<', '<=', '>=', '>', '<>' ],
    
    runningPlatform: isBrowser ? PLATFORM_BROWSER : PLATFORM_NODE
};

export default Config;