/* globals require */
// imports
// var uglify = require('gulp-uglify');
var gulp = require('gulp'), babel = require('gulp-babel'), concat = require('gulp-concat-util'), del = require('del'),
    pug = require('gulp-pug'), jshint = require('gulp-jshint'), minifyCss = require('gulp-minify-css'),
    moment = require('moment'), plumber = require('gulp-plumber'), rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')), sourceMaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver');

var task = gulp.task, series = gulp.series, parallel = gulp.parallel;

// reloadable configuration

function getConfig() {
    var config = require('./config.json');

    // dynamically generated config items
    config.CopyrightYear = moment().year();
    return config;
}

// clean tasks

task('clean-build', function postCleanBuild() {
    return del(['build/**/*']);
});

task('clean-dev', function postCleanDev() {
    return del(['tmp/**/*']);
});

task('clean-css', function postCleanCss() {
    return del(['tmp/**/*.css']);
});

task('clean-js', function postCleanJs() {
    return del(['tmp/**/*.js']);
});

// asset tasks

task('copy-fonts', function postCopyFonts() {
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

task('copy-scripts', function postCopyScripts() {
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

task('copy-include', function postCopyInclude() {
    return gulp.src('include/**/*')
        .pipe(gulp.dest('build'));
});

// compilation tasks

task('compile-css', series('clean-css', function postCompileCss() {
    return gulp.src([
        // order is important here
        'style/**/main.scss',
        'style/**/*.scss'
    ]).pipe(concat.header('\n/* file: <%= file.path %> */\n'))
        .pipe(concat('app.scss'))
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('tmp'));
}));

task('compile-html', function postCompileHtml() {
    var config = getConfig();
    return gulp.src(['html/**/*.pug', '!html/includes/**/*'])
        .pipe(plumber())
        .pipe(pug({
            locals: config
        }))
        .pipe(gulp.dest('build'));
});

task('compile-js', function postCompileJs() {
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

task('minify-css', series('compile-css', function postMinifyCss() {
    var config = getConfig();
    return gulp.src('tmp/app.css')
        .pipe(plumber())
        .pipe(minifyCss())
        .pipe(gulp.dest('build/' + config.StylePath));
}));

task('minify-js', series('compile-js', function postMinifyJs() {
    var config = getConfig();
    return gulp.src('tmp/app.js')
        .pipe(plumber())
        // .pipe(uglify())
        .pipe(gulp.dest('build/' + config.ScriptPath));
}));

// development tasks

task('dev-css', series('compile-css', function postDevCss() {
    var config = getConfig();
    return gulp.src('tmp/app.css')
        .pipe(gulp.dest('build/' + config.StylePath));
}));

task('dev-js-map', series('compile-js', function postDevJsMap() {
    var config = getConfig();
    return gulp.src('tmp/app.js.map')
        .pipe(gulp.dest('build/' + config.ScriptPath));
}));

task('dev-js', series('dev-js-map', function postDevJs() {
    var config = getConfig();
    return gulp.src('tmp/app.js')
        .pipe(gulp.dest('build/' + config.ScriptPath));
}));

// watch tasks

task('watch-css', series('dev-css', function postWatchCss() {
    gulp.watch('style/**/*.scss', parallel('dev-css'));
}));

task('watch-html', series('compile-html', function postWatchHtml() {
    gulp.watch('html/**/*.pug', parallel('compile-html'));
}));

task('watch-js', series('dev-js', function postWatchJs() {
    gulp.watch('script/**/*.js', parallel('dev-js'));
}));

task('watch-include', series('copy-include', function postWatchInclude() {
    gulp.watch('include/**/*', parallel('copy-include'));
}));

task('watch-config', function postWatchConfig() {
    gulp.watch('config.json', parallel('build-dev'));
});

// server tasks

task('serve-dev', function postServeDev() {
    gulp.src('build')
        .pipe(webserver({
            open: true
        }));
});

// aggregate asset tasks

task('assets', parallel(
    'copy-include',
    'copy-fonts',
    'copy-scripts'
));

// aggregate build tasks

task('build', parallel(
    'assets',
    'minify-css',
    'minify-js',
    'compile-html'
));

task('clean', parallel(
    'clean-build',
    'clean-dev'
));

task('dev', series(
    'assets',
    parallel(
        'serve-dev',
        'watch-css',
        'watch-js',
        'watch-html',
        'watch-include',
        'watch-config'
    )
));

task('build-dev', parallel(
    'dev-css',
    'compile-html',
    'dev-js'
));

// base task

task('default', series('build'));
