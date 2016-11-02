/* globals require */

// imports

var gulp = require('gulp');

var babel = require('gulp-babel');
var concat = require('gulp-concat-util');
var del = require('del');
var jade = require('gulp-jade');
var jest = require('gulp-jest-iojs');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var moment = require('moment');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var zip = require('gulp-zip');

// reloadable configuration

function getConfig() {
  var config = require('./config.json');

  // dynamically generated config items
  config.CopyrightYear = moment().year();
  return config;
}

// clean tasks

gulp.task('clean-build', function() {
  return del(['build/**/*']);
});

gulp.task('clean-dev', function() {
  return del(['tmp/**/*']);
});

gulp.task('clean-css', function() {
  return del(['tmp/**/*.css']);
});

gulp.task('clean-js', function() {
  return del(['tmp/**/*.js']);
});

// test tasks

gulp.task('test-js', ['clean-js'], function() {
  return gulp.src('__tests__')
    .pipe(jshint())
    .pipe(jest({
      scriptPreprocessor: 'test/support/preprocessor.js',
      testDirectoryName: 'test',
      testPathIgnorePatterns: [
        'node_modules',
        'test/support'
      ],
      moduleFileExtensions: [
        'js',
        'json'
      ]
    }));
});

// asset tasks

gulp.task('copy-fonts', function() {
  var config = getConfig();
  return gulp.src([
    'node_modules/font-awesome/fonts/**/*',
    'node_modules/bootstrap-sass/assets/fonts/**/*'
  ])
    .pipe(rename({
      dirname: ''
    }))
    .pipe(gulp.dest('build/' + config.FontPath));
});

gulp.task('copy-scripts', function() {
  var config = getConfig();
  return gulp.src([
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/dexie/dist/dexie.min.js',
    'node_modules/moment/min/moment.min.js',
    'node_modules/es5-shim/es5-shim.min.js',
    'node_modules/es6-shim/es6-shim.min.js'
  ])
    .pipe(rename({
      dirname: ''
    }))
    .pipe(gulp.dest('build/' + config.ScriptPath));
});

gulp.task('copy-include', function() {
  return gulp.src('include/**/*')
    .pipe(gulp.dest('build'));
});

// compilation tasks

gulp.task('compile-css', ['clean-css'], function() {
  return gulp.src([
    // order is important here
    'style/**/main.scss',
    'style/**/*.scss'
  ]).pipe(concat.header('\n/* file: <%= file.path %> */\n'))
    .pipe(concat('app.scss'))
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('tmp'));
});

gulp.task('compile-html', function() {
  var config = getConfig();
  return gulp.src(['html/**/*.jade', '!html/includes/**/*'])
    .pipe(plumber())
    .pipe(jade({
      locals: config
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('compile-js', ['test-js'], function() {
  return gulp.src([
    // order is important here
    'script/modules/**/*.js',
    'script/main.js',
    'script/**/*.js'
  ]).pipe(sourceMaps.init())
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('tmp'));
});

// minification tasks

gulp.task('minify-css', ['compile-css'], function() {
  var config = getConfig();
  return gulp.src('tmp/app.css')
    .pipe(plumber())
    .pipe(minifyCss())
    .pipe(gulp.dest('build/' + config.StylePath));
});

gulp.task('minify-js', ['compile-js'], function() {
  var config = getConfig();
  return gulp.src('tmp/app.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/' + config.ScriptPath));
});

// development tasks

gulp.task('dev-css', ['compile-css'], function() {
  var config = getConfig();
  return gulp.src('tmp/app.css')
    .pipe(gulp.dest('build/' + config.StylePath));
});

gulp.task('dev-js-map', ['compile-js'], function() {
  var config = getConfig();
  return gulp.src('tmp/app.js.map')
    .pipe(gulp.dest('build/' + config.ScriptPath));
});

gulp.task('dev-js', ['dev-js-map'], function() {
  var config = getConfig();
  return gulp.src('tmp/app.js')
    .pipe(gulp.dest('build/' + config.ScriptPath));
});

// watch tasks

gulp.task('watch-css', ['dev-css'], function() {
  gulp.watch('style/**/*.scss', ['dev-css']);
});

gulp.task('watch-html', ['compile-html'], function() {
  gulp.watch('html/**/*.jade', ['compile-html']);
});

gulp.task('watch-js', ['dev-js'], function() {
  gulp.watch('script/**/*.js', ['dev-js']);
  gulp.watch('test/**/*.js', ['dev-js']);
});

gulp.task('watch-include', ['copy-include'], function() {
  gulp.watch('include/**/*', ['copy-include']);
});

gulp.task('watch-config', function() {
  gulp.watch(['config.json'], ['build-dev']);
});

// server tasks

gulp.task('serve-dev', ['dev-css', 'dev-js'], function() {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
});

// aggregate asset tasks

gulp.task('assets', [
  'copy-include',
  'copy-fonts',
  'copy-scripts'
]);

// aggregate build tasks

gulp.task('build', [
  'assets',
  'minify-css',
  'minify-js',
  'compile-html'
]);

gulp.task('clean', [
  'clean-build',
  'clean-dev'
]);

gulp.task('dev', [
  'assets',
  'watch-css',
  'watch-js',
  'watch-html',
  'watch-include',
  'watch-config',
  'serve-dev'
]);

gulp.task('build-dev', [
  'dev-css',
  'compile-html',
  'dev-js'
]);

// base task

gulp.task('default', ['build']);
