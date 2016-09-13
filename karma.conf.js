module.exports = function(config){
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		plugins: ['karma-jasmine','karma-phantomjs-launcher'],
		exclude: [
		],
		preprocessors: {
			
		},
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['PhantomJS'],
		singleRun: true
	});
};