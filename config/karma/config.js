module.exports = (config) => {

    config.set({

        basePath: '../../',

        files: [
            'test/unit/**/*.js'
        ],

        frameworks: [
            'mocha',
            'sinon-chai'
        ],

        preprocessors: {
            'test/unit/**/*.js': 'webpack'
        },

        webpack: {
            module: {
                loaders: [
                    {
                        loader: 'json-loader',
                        test: /\.json$/
                    }, {
                        loader: 'ts-loader',
                        test: /\.ts?$/
                    }
                ]
            },
            resolve: {
                extensions: [ '.js', '.ts' ]
            }
        },

        webpackMiddleware: {
            noInfo: true
        }

    });

    if (process.env.TRAVIS) {

        config.set({

            browsers: [
                'ChromeSauceLabs',
                'FirefoxSauceLabs'
            ],

            captureTimeout: 120000,

            customLaunchers: {
                ChromeSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'chrome',
                    platform: 'OS X 10.11'
                },
                FirefoxSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'firefox',
                    platform: 'OS X 10.11'
                }
            },

            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER

        });

    } else {

        config.set({

            browsers: [
                'ChromeCanaryHeadless',
                'FirefoxDeveloperHeadless'
            ]

        });

    }

};
