export const isBrowser = 
    typeof window !== 'undefined' && 
    Object.prototype.toString.call( window ) !== '[object Object]';