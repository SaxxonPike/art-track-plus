/* globals require */
// imports
var uglify = require('gulp-uglify');
const gulp = require('gulp'), babel = require('gulp-babel'), concat = require('gulp-concat-util'), del = require('del'),
    pug = require('gulp-pug'), jshint = require('gulp-jshint'), minifyCss = require('gulp-minify-css'),
    moment = require('moment'), plumber = require('gulp-plumber'), rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')), sourceMaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver');

const task = gulp.task, series = gulp.series, parallel = gulp.parallel, src = gulp.src, dest = gulp.dest,
    watch = gulp.watch;

// reloadable configuration

function getConfig() {
    const config = require('./config.json');

    // dynamically generated config items
    config.CopyrightYear = moment().year();
    config.BuildTime = moment().utc().format();
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
    const config = getConfig();
    return src([
        'node_modules/font-awesome/fonts/**/*',
        'node_modules/bootstrap-sass/assets/fonts/**/*'
    ])
        .pipe(rename({
            dirname: ''
        }))
        .pipe(dest('build/' + config.FontPath));
});

task('copy-scripts', function postCopyScripts() {
    const config = getConfig();
    return src([
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/dexie/dist/dexie.min.js',
        'node_modules/moment/min/moment.min.js',
        'node_modules/jquery-slimscroll/jquery.slimscroll.js',
        'node_modules/plusastab/src/plusastab.joelpurra.js',
        'node_modules/jquery-emulatetab/src/emulatetab.joelpurra.js',
        // 'node_modules/es5-shim/es5-shim.min.js',
        // 'node_modules/es6-shim/es6-shim.min.js'
    ])
        .pipe(rename({
            dirname: ''
        }))
        .pipe(dest('build/' + config.ScriptPath));
});

task('copy-include', function postCopyInclude() {
    return src('include/**/*')
        .pipe(dest('build'));
});

// compilation tasks

task('compile-css', series('clean-css', function postCompileCss() {
    return src([
        // order is important here
        'style/**/main.scss',
        'style/**/*.scss'
    ]).pipe(concat.header('\n/* file: <%= file.path %> */\n'))
        .pipe(concat('app.scss'))
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('tmp'));
}));

task('compile-html', function postCompileHtml() {
    const config = getConfig();
    return src(['html/**/*.pug', '!html/includes/**/*'])
        .pipe(plumber())
        .pipe(pug({
            locals: config
        }))
        .pipe(dest('build'));
});

task('compile-js', function postCompileJs() {
    return src([
        // order is important here
        'script/modules/**/*.js',
        'script/main.js',
        'script/**/*.js'
    ]).pipe(sourceMaps.init())
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(babel({
            presets: [[
                '@babel/preset-env',
                {
                    'useBuiltIns': 'entry',
                    'corejs': 3.23
                }
            ]]
        }))
        .pipe(concat('app.js'))
        .pipe(sourceMaps.write('.'))
        .pipe(dest('tmp'));
});

// minification tasks

task('minify-css', series('compile-css', function postMinifyCss() {
    const config = getConfig();
    return src('tmp/app.css')
        .pipe(plumber())
        .pipe(minifyCss())
        .pipe(dest('build/' + config.StylePath));
}));

task('minify-js', series('compile-js', function postMinifyJs() {
    const config = getConfig();
    return src('tmp/app.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(dest('build/' + config.ScriptPath));
}));

// development tasks

task('dev-css', series('compile-css', function postDevCss() {
    const config = getConfig();
    return src('tmp/app.css')
        .pipe(dest('build/' + config.StylePath));
}));

task('dev-js-map', series('compile-js', function postDevJsMap() {
    const config = getConfig();
    return src('tmp/app.js.map')
        .pipe(dest('build/' + config.ScriptPath));
}));

task('dev-js', series('dev-js-map', function postDevJs() {
    const config = getConfig();
    return src('tmp/app.js')
        .pipe(dest('build/' + config.ScriptPath));
}));

// watch tasks

task('watch-css', series('dev-css', function postWatchCss() {
    watch('style/**/*.scss', parallel('dev-css'));
}));

task('watch-html', series('compile-html', function postWatchHtml() {
    watch('html/**/*.pug', parallel('compile-html'));
}));

task('watch-js', series('dev-js', function postWatchJs() {
    watch('script/**/*.js', parallel('dev-js'));
}));

task('watch-include', series('copy-include', function postWatchInclude() {
    watch('include/**/*', parallel('copy-include'));
}));

task('watch-config', function postWatchConfig() {
    watch('config.json', parallel('build-dev'));
});

// server tasks

task('serve', function postServe() {
    src('build')
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
        'serve',
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
