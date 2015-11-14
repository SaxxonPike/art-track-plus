// configuration

var config = require('./config.json');

// imports

var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat-util');
var del = require('del');
var jade = require('gulp-jade');
var jest = require('gulp-jest-iojs');
var minifyCss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

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
    .pipe(jest({
      scriptPreprocessor: "test/support/preprocessor.js",
      testDirectoryName: "test",
      testPathIgnorePatterns: [
        "node_modules",
        "test/support"
      ],
      moduleFileExtensions: [
        "js",
        "json"
      ]
  }));
});

// asset tasks

gulp.task('copy-font-awesome', function() {
  return gulp.src('node_modules/font-awesome/fonts/**/*')
    .pipe(gulp.dest('build/' + config.FontPath));
});

gulp.task('copy-bootstrap', function() {
  return gulp.src('node_modules/bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest('build/' + config.FontPath));
});

gulp.task('copy-jquery', function() {
  return gulp.src('node_modules/jquery/dist/jquery.min.*')
    .pipe(gulp.dest('build/' + config.ScriptPath));
});

gulp.task('copy-dexie', function() {
  return gulp.src('node_modules/dexie/dist/latest/Dexie.min.*')
    .pipe(gulp.dest('build/' + config.ScriptPath));
});

gulp.task('copy-include', function() {
  return gulp.src('include/**/*')
    .pipe(gulp.dest('build'));
});

// compilation tasks

gulp.task('compile-css', ['clean-css'], function() {
  return gulp.src([
      // always process main.scss first
      'style/**/main.scss',
      'style/**/*.scss'
    ]).pipe(concat.header('\n/* file: <%= file.path %> */\n'))
    .pipe(concat('app.scss'))
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('tmp'));
});

gulp.task('compile-html', function() {
  return gulp.src(['html/**/*.jade', '!html/includes/**/*'])
    .pipe(plumber())
    .pipe(jade({ locals: config }))
    .pipe(gulp.dest('build'));
});

gulp.task('compile-js', ['test-js'], function() {
  return gulp.src([
      // always process main.js first
      'script/main.js',
      'script/**/*.js'
    ]).pipe(sourceMaps.init())
    .pipe(plumber())
    .pipe(babel())
    .pipe(concat.header('\n// file: <%= file.path %>\n'))
    .pipe(concat('app.js'))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('tmp'));
});

// minification tasks

gulp.task('minify-css', ['compile-css'], function() {
  return gulp.src('tmp/app.css')
    .pipe(plumber())
    .pipe(minifyCss())
    .pipe(gulp.dest('build/' + config.StylePath));
});

gulp.task('minify-js', ['compile-js'], function() {
  return gulp.src('tmp/app.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/' + config.ScriptPath));
});

// development tasks

gulp.task('dev-css', ['compile-css'], function() {
  return gulp.src('tmp/app.css')
    .pipe(gulp.dest('build/' + config.StylePath));
});

gulp.task('dev-js-map', ['compile-js'], function() {
  return gulp.src('tmp/app.js.map')
    .pipe(gulp.dest('build/' + config.ScriptPath));
});

gulp.task('dev-js', ['dev-js-map'], function() {
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
  'copy-bootstrap',
  'copy-font-awesome',
  'copy-jquery',
  'copy-dexie'
]);

// aggregate build tasks

gulp.task('build', ['assets', 'minify-css', 'minify-js', 'compile-html']);
gulp.task('clean', ['clean-build', 'clean-dev']);
gulp.task('dev', ['assets', 'watch-css', 'watch-js', 'watch-html', 'serve-dev']);
gulp.task('build-dev', ['dev-css', 'compile-html', 'dev-js']);

// base task

gulp.task('default', ['build']);
