// Expects the `_` directory to be present and have `main.js` or `main.ts` in it,
// that's used as the entry point.

const path = require('path');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { existsSync } = require('fs');
const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const moduleExports = existsSync(join(srcPath, '_'))
    ? [
        {
            entry: join(srcPath, '_', 'main'),
            mode: 'development',
            target: 'electron-main',
            devtool: 'eval-source-map',
            output: {
                path: join(distPath, '_'),
                filename: 'main.js'
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.json']
            },
            module: {
                rules: [{
                    test: /\.(tsx?)|(js)$/,
                    use: ['babel-loader'],
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
            }
        },
        {
            entry: join(srcPath, '_', 'renderer'),
            mode: 'development',
            target: 'electron-renderer',
            devtool: 'eval-source-map',
            output: {
                path: join(distPath, '_'),
                filename: 'renderer.js'
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.json']
            },
            module: {
                rules: [{
                    test: /\.(tsx?)|(js)$/,
                    use: ['babel-loader'],
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
                })
            ]
        }
    ] : [];

// console.log(moduleExports);

module.exports = moduleExports;
