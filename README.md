# app-scaffold

Referenced Packages:
- [bootstrap-sass][bootstrap-sass]
  - A fantastic base layout framework from [Twitter][bootstrap]
- [del][del]
  - For getting a clean start every build
- [font-awesome][gulp-font-awesome]
  - Nifty icons from [Font Awesome][font-awesome]
- [gulp][gulp]
  - [gulp-babel][babel]
    - For JavaScript compilation
  - [gulp-concat-util][concat]
    - For concatenating JS and CSS files for processing
  - [gulp-jade][jade]
    - For generating HTML easily
  - [gulp-jest-iojs][jest-iojs]
    - Because I don't want build issues on Windows out of the box with `gulp-jest`.
  - [gulp-minify-css][minify-css]
    - For minimizing redundant CSS blocks (using [clean-css][clean-css])
  - [gulp-plumber][plumber]
    - For the really weird "watch error handling" in Gulp 3
  - [gulp-sass][sass]
    - Because [SASS][sasslang] is better than [LESS][lesslang]
  - [gulp-sourcemaps][sourcemaps]
    - For debugging on minified builds
  - [gulp-uglify][uglify]
    - For minification of JS using [UglifyJS2][uglifyjs2]
  - [gulp-webserver][webserver]
    - For serving the content (since CORS via file URI is flaky)

[bootstrap]: http://getbootstrap.com/
[bootstrap-sass]: https://github.com/twbs/bootstrap-sass
[font-awesome]: https://fortawesome.github.io/Font-Awesome/
[gulp-font-awesome]: https://www.npmjs.com/package/font-awesome
[gulp]: http://gulpjs.com/
[del]: https://www.npmjs.com/package/del
[babel]: https://babeljs.io/
[concat]: https://github.com/mgcrea/gulp-concat-util
[jade]: http://jade-lang.com/
[jest-iojs]: https://www.npmjs.com/package/gulp-jest-iojs
[clean-css]: https://github.com/jakubpawlowicz/clean-css
[minify-css]: https://www.npmjs.com/package/gulp-minify-css
[plumber]: https://www.npmjs.com/package/gulp-plumber
[sass]: https://www.npmjs.com/package/gulp-sass
[sasslang]: http://sass-lang.com/
[lesslang]: http://lesscss.org/
[sourcemaps]: https://www.npmjs.com/package/gulp-sourcemaps
[uglify]: https://www.npmjs.com/package/gulp-uglify
[uglifyjs2]: https://github.com/mishoo/UglifyJS2
[webserver]: https://www.npmjs.com/package/gulp-webserver
