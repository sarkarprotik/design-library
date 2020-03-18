const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename")

gulp.task("styles:compile-raw", () => {
  return gulp
    .src("src/app/**/{build,tool,widget}.scss")
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename(path => path.basename += "-raw"))
    .on("error", (err) => {
      console.log(err.toString())
    })
    .pipe(gulp.dest("build/css"))
})

gulp.task("styles:compile", () => {
  return gulp
    .src("src/app/**/{build,tool,widget}.scss")
    .pipe(sass({outputStyle: "compressed"}))
    .pipe(autoprefixer({
      cascade: false
    }))
    .on("error", (err) => {
      console.log(err.toString())
    })
    .pipe(gulp.dest("build/css"))
})

module.exports = {
  series: function() {
    return gulp.series("styles:compile-raw","styles:compile")
  }
}
