module.exports = {
    entry: "./src/Vivaz.js",
    output: {
        path: __dirname,
        filename: '../dist/vivaz.js',
        libraryTarget: "umd"
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
    },
    plugins: []
};