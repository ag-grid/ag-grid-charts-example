const path = require('path');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { lstatSync, readdirSync, existsSync } = require('fs');

const isDirectory = path => lstatSync(path).isDirectory();
const getExamples = path => {
    const files = readdirSync(path);
    const examples = [];
    files.forEach(name => {
        if (name === 'lib') {
            throw new Error("Example folder can't be named 'lib' " +
                "since this is the 'outDir' for TS.");
        }

        if (name === 'electron-example') {
            // exclude this example as it is structured in a different way
            return;
        }

        if (isDirectory(join(path, name))) {
            examples.push({ path, name });
        }
    });
    return examples;
};

// Note: empty directories in the source folder will result in a bundling error.
// All directories in source folder should contain a file that serves as an entry,
// as specified below.
const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');
// If we have the `_` directory in the `srcPath`, process only that.
// No need to re-bundle all the examples when one typically works
// on a single example at a time. This example is supposed to be
// in the `_` directory that should be given a proper name when
// one is done working on the example.
const activeExampleName = '_';
const hasActiveExample = existsSync(join(srcPath, activeExampleName));
const examples = hasActiveExample ? [{ path: srcPath, name: activeExampleName }] : getExamples(srcPath);

const moduleExports = examples.map(example => {
    return {
        entry: join(example.path, example.name, 'index'),
        mode: 'development',
        target: 'web',
        devtool: 'inline-source-map',
        output: {
            path: join(distPath, example.name),
            filename: 'app.bundle.js'
        },
        watch: hasActiveExample,
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        onlyCompileBundledFiles: true,
                        transpileOnly: !hasActiveExample
                    }
                }],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
                exclude: /node_modules/
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html'
            }),
        ]
    };
});

// console.log(moduleExports);

module.exports = moduleExports;
