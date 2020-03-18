const gulp = require("gulp")
const nodemon = require("gulp-nodemon")

gulp.task("webserver:watch", async () => {
  gulp.watch(["src/app/**/*.scss"], gulp.series("styles"))
  gulp.watch(["src/app/**/*.js"], gulp.series("js:watch", "webcomponents:copy"))
})

gulp.task("webserver:start", async () => {
  return nodemon({
    script: "./app.js",
    ext: "js hbs json",
    ignore: ["src/app/**/*.js", "gulpfile.js", "{build,dist}/**"],
    verbose: false,
  })
})

module.exports = {
  series: function() {
    return gulp.series("webserver:start", "webserver:watch")
  }
}
