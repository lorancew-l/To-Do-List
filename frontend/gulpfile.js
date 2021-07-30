const gulp = require('gulp')
const requireDir = require('require-dir')
const tasks = requireDir('./tasks')

gulp.task('buildStyles', tasks.buildStyles)
gulp.task('watchScss', () => {
  gulp.watch(['src/scss/**/*.scss'], gulp.series('buildStyles'))
})
