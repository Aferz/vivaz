var globalConfig = require( './karma.global.config' );

module.exports = function( config )
{
    globalConfig.logLevel = config.LOG_INFO;
    globalConfig.browsers = [ 'PhantomJS' ];
    globalConfig.singleRun = true;
    
    config.set( globalConfig );
}