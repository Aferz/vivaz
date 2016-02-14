module.exports = {
    entry: "./test/unit/specs/index.js",
    output: {
        path: __dirname,
        filename: "../test/unit/specs.js"
    },
    module: {
        loaders: [ {
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                cacheDirectory: true,
                presets: [ 'es2015' ]
            }
        } ]
    }    
};