const gulp = require("gulp")
const include = require("gulp-file-include")
const sass = require("gulp-sass")

gulp.task("vendor:css", () => {
  return gulp
    .src("src/app/assets/vendor/vendor.scss")
    .pipe(sass())
    .on("error", (err) => {
      console.log(err.toString())
    })
    .pipe(gulp.dest("build/css"))
})

gulp.task("vendor:js", () => {
  return gulp
    .src("src/app/assets/vendor/vendor.js")
    .pipe(include())
    .on("error", (err) => {
      console.log(err.toString())
    })
    .pipe(gulp.dest("build/js"))
})

gulp.task("vendor:customer", () => {
  return gulp
    .src("src/app/assets/vendor/customer-lib/customer.js")
    .pipe(include())
    .on("error", (err) => {
      console.log(err.toString())
    })
    .pipe(gulp.dest("build/js"))
})

module.exports = {
  series: function() {
    return gulp.series("vendor:css", "vendor:js", "vendor:customer")
  }
}
