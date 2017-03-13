var path = require('path');
var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var minifyCSS = require('gulp-minify-css');
var runSequence = require('run-sequence');
var git = require('gulp-git');
var clean = require('gulp-clean');

var config = {
	bootstrapDir: './bower_components/bootstrap-sass',
	jqueryDir: './bower_components/jquery',
	distDir: './',
	srcDir: './scss',
};

gulp.task('styles', function() {
	gulp.src(config.srcDir + '/style.scss')
	    .pipe(sass({
		    includePaths: [config.bootstrapDir + '/assets/stylesheets'],
	    }))
	    .pipe(minifyCSS({keepSpecialComments: 1}))
	    .pipe(gulp.dest(config.distDir));
});

gulp.task('javascripts', function() {
	gulp.src(config.jqueryDir + '/dist/jquery.min.js')
	    .pipe(gulp.dest(config.distDir + '/javascripts'));
	gulp.src(config.bootstrapDir + '/assets/javascripts/bootstrap.min.js')
	    .pipe(gulp.dest(config.distDir + '/javascripts'));
});

gulp.task('fonts', function() {
	return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
	    .pipe(gulp.dest(config.distDir + '/fonts'));
});

gulp.task('watch', function() {
	gulp.watch(config.srcDir + '**/*.html', ['html']);
	gulp.watch(config.srcDir + '**/*.scss', ['styles']);
	gulp.watch(config.srcDir + '**/*.js', ['javascripts']);
});

gulp.task('clean', function(callback) {
	return gulp.src('dist/*', {read: false})
	    .pipe(clean());
});

gulp.task('build', function(callback) {
	runSequence('clean', ['styles', 'javascripts', 'fonts'], callback);
});


gulp.task('start', function(callback) {
	runSequence('build', 'watch', callback);
});
