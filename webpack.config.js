
// Plugins and such
const webpack = require('webpack');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const jsonImporter = require('node-sass-json-importer');

module.exports = ({ BUILD }) => {

    const PROD = process.env.NODE_ENV == 'production';

    const entryApp = [
        'babel-polyfill',
        path.join(__dirname, './src/index.jsx'),
        path.join(__dirname, './src/styles/main.scss')
    ];

    if (!BUILD) {
        entryApp.push(
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/dev-server'
        );
    }

    const plugins = [
        new copyWebpackPlugin([
            {
                context: path.join(__dirname, './src/images'),
                from: '**/*',
                to: path.join(__dirname, './dist/images')
            },
            {
                context: path.join(__dirname, './src'),
                from: 'index.html',
                to: path.join(__dirname, './dist')
            }
        ]),
        new extractTextPlugin({
            filename: 'main.css',
            disable: false,
            allChunks: true
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ];

    if (!BUILD) {

        // Hot module replacement for dev
        plugins.push(new webpack.HotModuleReplacementPlugin());

    } else {

        // Uglify JS for prod
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            },
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }));

    }

    return {
        devtool: (!PROD) ? 'cheap-source-map' : '', // the best source map for dev. no map for prod
        devServer: {
            contentBase: path.join(__dirname, './dist'), // static files (index.html) to serve on URL
            publicPath: '/static/', // put bundled JS here
            watchContentBase: true, // watch dist folder for changes and refresh
            historyApiFallback: true, // show index.html for 404s
            hot: true, // reload modules without reloading page
            // inline: true, // inline the webpack stuff that allows for refresh on change
            port: 3000, // pick a port
            watchOptions: {
                poll: 1000 // check for changes every second
            }
        },
        entry: {
            app: entryApp
        },
        output: {
            path: PROD ? path.join(__dirname, '/build/static/') : path.join(__dirname, '/dist/static/'),
            publicPath: '/static/',
            filename: '[name].bundle.js'
        },
        node: {
            Buffer: false // this helps with stylelint
        },
        resolve: {
            modules: [
                path.join(__dirname, './node_modules'),
                path.join(__dirname, './src/scripts'),
                path.join(__dirname, './src/styles')
            ],
            extensions: [
                '.js',
                '.jsx',
                '.scss',
                '.css'
            ]
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?/,
                    exclude: /(node_modules)/,
                    use: ['babel-loader', 'eslint-loader']
                },
                {
                    test: /\.scss$/,
                    use: ['css-hot-loader'].concat(extractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    importLoaders: 1
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: () => [
                                        require('postcss-cssnext'),
                                        require('postcss-reporter')({ clearMessages: true })
                                    ]
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    importer: jsonImporter,
                                    includePaths: [
                                        path.resolve(__dirname, 'node_modules/bourbon-neat/core')
                                    ],
                                    outputStyle: (!BUILD) ? "expanded" : "compressed",
                                    outFile: 'main.css',
                                    sourceMap: true,
                                    sourceMapContents: true
                                }
                            }
                        ]
                    }))
                },
                {   // compile css in the same way, without the sass loader
                    test: /\.css/,
                    use: ['css-hot-loader'].concat(extractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    importLoaders: 1
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => [
                                        require('postcss-cssnext'),
                                        require('postcss-reporter')({ clearMessages: true })
                                    ]
                                }
                            },
                        ]
                    }))
                }
            ]
        },
        plugins: plugins
    }
};