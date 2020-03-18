const gulp = require("gulp")

gulp.task("fonts:copy", () => {
  return gulp
    .src("src/app/assets/fonts/*.{eot,woff,woff2,ttf,otf,svg}")
    .pipe(gulp.dest("build/fonts"))
})

module.exports = {
  series: function() {
    return gulp.series("fonts:copy")
  }
}
