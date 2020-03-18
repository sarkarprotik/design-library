const gulp = require("gulp")

gulp.task("images:copy", () => {
  return gulp
    .src("src/app/assets/images/*.{jpg,png,gif,svg,ico,webp}")
    .pipe(gulp.dest("build/images"))
})

gulp.task("favicons:copy", () => {
  return gulp
    .src("src/app/assets/favicons/*.*")
    .pipe(gulp.dest("build/favicons"))
})

module.exports = {
  series: function() {
    return gulp.series("images:copy", "favicons:copy")
  }
}
