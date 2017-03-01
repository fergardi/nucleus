// https://github.com/Nikku/karma-browserify
module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    // frameworks to use
    frameworks: ['browserify', 'jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'node_modules/vue/dist/vue.js',
      'test/unit/**/*.js'
    ],
    // list of files to exclude
    exclude: [

    ],
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['spec'],
    // preprocessorst to use
    preprocessors: {
      'test/unit/**/*.js': ['browserify']
    },
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    browserify: {
      debug: true,
      // needed to enable mocks
      plugin: [require('proxyquireify').plugin]
    },
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  })
}
