const gulp = require("gulp")
const sassLint = require("gulp-stylelint")
 
gulp.task("stylelint:default", function () {
  const gulpStylelint = require('gulp-stylelint');

  return gulp
    .src('src/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

module.exports = {
  series: function() {
    return gulp.series("stylelint:default")
  }
}
