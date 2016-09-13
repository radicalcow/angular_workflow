module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	
	grunt.initConfig({
		'pkg': grunt.file.readJSON('package.json'),
		'concat': {
			'dist': {
				'src': ['source/**/*.js'],
				'dest': 'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
			}
		},
		'less':{
			'compile':{
				'files':{
					'dist/<%= pkg.namelower %>-<%= pkg.version %>.css': 'less/theme.less'
				}
			}
		},
		'watch':{
			'less':{
				'files':'less/**/*.less',
				'tasks':['less'],
				'options':{'livereload':true}
			},
			'scripts':{
				'files':'source/**/*.js',
				'tasks':['concat'],
				'options':{'livereload':true}
			}
		}
	});
	
	grunt.registerTask('default',[
		'watch'
	]);
};