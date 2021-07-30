const {src, dest} = require('gulp');
const sass = require('gulp-sass');
const bulk = require('gulp-sass-bulk-importer');
const prefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const concat = require('gulp-concat');


module.exports = function buildStyles() {
  return src('src/scss/**/*.scss')
    .pipe(bulk())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(prefixer({
      overrideBrowserslist: ['last 8 versions'],
      browsers: [
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 11',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6',
      ],
    }))
    .pipe(clean({format: 'beautify'}))
    .pipe(concat('style.css'))
    .pipe(dest('src/css/'))
}