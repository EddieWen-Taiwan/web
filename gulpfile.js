var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');

gulp.task( 'default', ['style', 'js', 'html'] );

gulp.task( 'style', function() {
	return gulp.src(['css/reset.css', 'css/main.css'])
		.pipe( concat('all.min.css') )
		.pipe( cssmin({
			keepSpecialComments: 0
		}) )
		.pipe( gulp.dest('build') );
});

gulp.task( 'js', function() {
	return gulp.src('build/bundle.js')
		.pipe( concat('bundle.min.js') )
		.pipe( uglify() )
		.pipe( gulp.dest('build') );
});

gulp.task( 'html', function() {
	return gulp.src('index.html')
		.pipe( htmlReplace({
			'css': 'build/all.min.css',
			'js': 'build/bundle.min.js'
		}) )
		.pipe( gulp.dest() );
});

// WEB SERVER
var connect = require('gulp-connect');

gulp.task( 'server', function() {
	connect.server();
});