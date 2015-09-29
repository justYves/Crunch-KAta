var path = require('path');
module.exports = function (config) {

    var filesCollection = [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap.min.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'pre-build/app.js',
        'build/**.js',
        'test/*.test.js'
    ];

    var excludeFiles = [
        'tests/karma.conf.js'
    ];

    var configObj = {
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        basePath: path.join(__dirname, '../'),
        files: filesCollection,
        logLevel: config.LOG_DEBUG,
        exclude: excludeFiles,
    };

    config.set(configObj);

};