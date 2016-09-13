module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc');
	
	grunt.initConfig({
		'pkg': grunt.file.readJSON('package.json'),
		'meta': {
			'jsFilesForTesting': [
				'libs/jquery/jquery.js',
				'libs/angular/angular.js',
				'libs/angular-route/angular-route.js',
				'libs/angular-sanitize/angular-sanitize.js',
				'libs/angular-mocks/angular-mocks.js',
				'libs/restangular/dist/restangular.js',
				'libs/underscore/underscore.js',
				'libs/underscore/underscore.js',
				'test/**/*Spec.js'
			]
		},
		'karma': {
			'development':{
				'configFile': 'karma.conf.js',
				'options': {
					'files': [
						'<%= meta.jsFilesForTesting %>',
						'source/**/*.js'
					]
				}
			},
			'dist':{
				'options':{
					'configFile': 'karma.conf.js',
					'files':[
						'<%= meta.jsFilesForTesting %>',
						'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
					]
				}
			},
			'minified':{
				'options':{
					'configFile': 'karma.conf.js',
					'files':[
						'<%= meta.jsFilesForTesting %>',
						'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js'
					]
				}
			}
		},
		'jshint': {
			'beforeconcat': ['source/**/*.js']
		},
		'concat': {
			'dist': {
				'src': ['source/**/*.js'],
				'dest': 'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
			}
		},
		'less': {
			'compile': {
				'files': {
					'dist/<%= pkg.namelower %>-<%= pkg.version %>.css': 'less/theme.less'
				}
			}
		},
		'uglify': {
			'options':{
				'mangle':false
			},
			'dist':{
				'files': {
					'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.namelower %>-<%= pkg.version %>.js']
				}
			}
		},
		'jsdoc':{
			'src': ['source/**/*.js'],
			'options': {
				'destination':'doc'
			}
		},
		'cssmin':{
			'target':{
				'files':{
					'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.css': 'dist/<%= pkg.namelower %>-<%= pkg.version %>.css'
				}
			}
		},
		'watch':{
			'less':{
				'files':'less/**/*.less',
				'tasks':['less','cssmin'],
				'options': {
					'livereload': true
				}
			},
			'scripts':{
				'files':'source/**/*.js',
				'tasks':['jshint','concat','uglify'],
				'options':{
					'livereload': true
				}
			}
		}
	});
	
	grunt.registerTask('test', ['karma:development']);
	grunt.registerTask('build',
						[
							'jshint',
							'karma:development',
							'concat',
							'karma:dist',
							'uglify',
							'less',
							'cssmin',
							'karma:minified',
							'jsdoc'
						]);
};