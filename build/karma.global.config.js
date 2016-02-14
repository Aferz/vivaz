module.exports = {
    basePath: '.',
    frameworks: [
        'jasmine'
    ],
    files: [
        '../test/unit/specs.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: [ 
        'progress'
    ],
    port: 5500,
    colors: true,
    autoWatch: false,
    browsers: [ 
        'Chrome', 
        'Firefox', 
        'Safari', 
        'PhantomJS'
    ],
    singleRun: false,
    concurrency: Infinity
}