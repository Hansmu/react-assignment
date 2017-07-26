var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: [ 'PhantomJS' ],
        singleRun: true,
        frameworks: [ 'mocha' ],
        files: [
            'tests.webpack.js'
        ],
        plugins: [ 'karma-phantomjs-launcher', 'karma-chai', 'karma-mocha',
            'karma-sourcemap-loader', 'karma-webpack', 'karma-coverage',
            'karma-mocha-reporter'
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
                        use: 'babel-loader'
                    }
                ]
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};