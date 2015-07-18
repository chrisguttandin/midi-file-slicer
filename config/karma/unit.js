'use strict';

var browserify = require('../../package.json').browserify;

module.exports = function (config) {

    config.set({

        basePath: '../../',

        browserify: {
            transform: browserify.transform
        },

        browsers: [
            'ChromeCanary',
            'FirefoxDeveloper'
        ],

        files: [
            'src/midi-file-slicer.js',
            {
                included: false,
                pattern: 'src/**/*.js',
                served: false,
                watched: true,
            },
            {
                included: false,
                pattern: 'test/fixtures/**',
                served: true,
                watched: true,
            },
            'test/unit/**/*.js'
        ],

        frameworks: [
            'browserify',
            'mocha',
            'sinon-chai' // implicitly uses chai too
        ],

        preprocessors: {
            'src/midi-file-slicer.js': 'browserify',
            'test/unit/**/*.js': 'browserify'
        }

    });

};
