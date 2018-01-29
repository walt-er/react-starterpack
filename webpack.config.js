
// Plugins and such
const webpack = require('webpack');
const extractCSS = require('extract-text-webpack-plugin');

module.exports = function() {

    // Check for production flag
    var PROD = process.env.NODE_ENV === 'production';

    return {

        // Node server for quick local dev
        devServer: {
            contentBase: './dist', // static files (index.html) to serve on URL
            watchContentBase: true, // watch dist folder for changes and refresh
            publicPath: PROD ? '/build/' : '/dist/', // put bundled JS here
            historyApiFallback: true, // show index.html for 404s
            inline: true, // inline the webpack stuff that allows for refresh on change
            port: 8080, // pick a port
            watchOptions: {
                poll: 1000 // check for changes every second
            }
        },

        // Sourcemaps: simpler and faster one for development, slower and more secure one for production
        devtool: PROD ? 'none' : 'cheap-module-eval-source-map',

        // File extensions that can be omitted in import and require statements
        resolve: {
            extensions: [
                '.js',
                '.json'
            ]
        },

        // Entry point(s)
        entry: [
            '.app/app.js',
            '.css/main.scss'
        ],

        // Destination for bundles
        output: {
            filename: 'bundle.js',
            path: PROD ? __dirname + '/build' : __dirname + '/dist',
        },

        // Rules for bundling
        module: {

            rules: [

                // Linting
                {
                    enforce: 'pre', // Lint before Babel
                    test: /\.js$/,
                    exclude:  __dirname + '/node_modules',
                    loader: 'eslint-loader',
                    options: {
                        // Use stricter linting rules when building for production
                        configFile: PROD ? __dirname + '/.eslintrc-prod' : __dirname + '/.eslintrc'
                    }
                },

                // Babel for ES6
                {
                    test: /\.js$/,
                    exclude:  __dirname + '/node_modules',
                    loader: 'babel-loader'
                },

                // SCSS
                {
                    test: /\.scss$/,
                    loader: extractCSS.extract({
                        fallback: 'style-loader',
                        use: 'css-loader!sass-loader',
                    })
                }
            ]
        },

        plugins: [

            new extractCSS('styles.css'),

            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),

            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            })
           ]
    }
};