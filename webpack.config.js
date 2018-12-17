var path = require('path');

module.exports = {
    entry: './src/index',
    mode: 'development',
    // mode: 'production',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.(tsx?)|(js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    }
};
