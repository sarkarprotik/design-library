const gulp = require("gulp")
const rename = require("gulp-rename")

gulp.task("data:copy", () => {
  return gulp.src("src/data/**/*.json").pipe(gulp.dest("build/data"))
})

module.exports = {
  series: function() {
    return gulp.series("data:copy")
  }
}
