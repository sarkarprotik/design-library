const gulp = require("gulp")
const include = require("gulp-file-include")
const babel = require("gulp-babel")
const terser = require("gulp-terser")
const rename = require("gulp-rename")

gulp.task("webcomponents:copy", () => {
  return gulp
    .src("src/app/s4s-*/**/s4s-*.js")
    .pipe(include())
    .pipe(rename(path => path.basename += "-raw"))
    .pipe(gulp.dest("build"))
})

gulp.task("webcomponents:compile", () => {
  return gulp
    .src("src/app/s4s-*/**/s4s-*.js")
    .pipe(include())
    .pipe(terser())
    .on("error", (err) => {
      console.log(err.toString())
    })
    .pipe(gulp.dest("build"))
})

gulp.task("webcomponents:es5", () => {
  return gulp
    .src("src/app/s4s-*/**/s4s-*.js")
    .pipe(include())
    .pipe(babel({
      presets: ["@babel/env"]
    }))
    .pipe(rename(path => path.basename += "-es5"))
    .pipe(gulp.dest("build"))
})

module.exports = {
  series: function() {
    return gulp.series("webcomponents:copy", "webcomponents:compile", "webcomponents:es5")
  }
}
