const gulp = require("gulp")
const include = require("gulp-file-include")
const babel = require("gulp-babel")
const uglify = require("gulp-uglify")
const terser = require("gulp-terser")
const rename = require("gulp-rename")

gulp.task("js:babel", async () => {
  return gulp
    .src("src/test.js")
    .pipe(babel({
      presets: ["@babel/env"]
    }))
    .pipe(gulp.dest("build"))
    .pipe(gulp.dest("dist"))
})

gulp.task("js:compile", () => {
  return gulp
    .src("src/app/**/{build,tool,widget}.js")
    .pipe(include())
    .pipe(babel({
      presets: ["@babel/env"]
    }))
    .pipe(rename(path => path.basename += "-raw"))
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .on("error", (err) => {
      console.log(err.toString())
    })
    .pipe(rename(path => path.basename = path.basename.replace("-raw", "")))
    .pipe(gulp.dest("build/js"))
})

gulp.task("js:watch", () => {
  return gulp
    .src("src/app/**/{build,tool,widget}.js")
    .pipe(include())
    .pipe(rename(path => path.basename += "-raw"))
    .pipe(gulp.dest("build/js"))
    .pipe(terser())
    .pipe(rename(path => path.basename = path.basename.replace("-raw", "")))
    .pipe(gulp.dest("build/js"))
})

module.exports = {
  series: function() {
    return gulp.series("js:compile")
  }
}
