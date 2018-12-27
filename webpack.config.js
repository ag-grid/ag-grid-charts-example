const path = require('path');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { lstatSync, readdirSync } = require('fs');

const isDirectory = path => lstatSync(path).isDirectory();
const getExamples = path => {
    const files = readdirSync(path);
    const examples = [];
    files.forEach(name => {
        if (name === 'lib') {
            throw new Error("Example folder can't be named 'lib' " +
                "since this is the 'outDir' for both TS and Babel.");
        }
        if (isDirectory(join(path, name))) {
            examples.push({path, name});
        }
    });
    return examples;
};

// Note: empty directories in the source folder will result in a bundling error.
// All directories in source folder should contain a file that serves as an entry,
// as specified below.
const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const moduleExports = getExamples(srcPath).map(example => {
    return {
        entry: join(example.path, example.name, 'index'),
        mode: 'development',
        devtool: 'inline-source-map',
        output: {
            path: join(distPath, example.name),
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
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html'
            })
        ]
    };
});

// console.log(moduleExports);

module.exports = moduleExports;
