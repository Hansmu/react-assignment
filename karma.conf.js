var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: [ 'PhantomJS' ],
        singleRun: false,
        frameworks: [ 'mocha', 'chai', 'sinon'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'tests.webpack.js'
        ],
        plugins: [ 'karma-phantomjs-launcher', 'karma-chai', 'karma-mocha', 'karma-sinon',
            'karma-sourcemap-loader', 'karma-webpack', 'karma-mocha-reporter'
        ],
        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ]
        },
        reporters: ['mocha'],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: 'babel-loader'
                    }
                ]
            },
            externals: {
                cheerio: 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
                'react-addons-test-utils': 'react-dom'
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};