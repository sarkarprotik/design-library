const gulp = require("gulp")
const sprite = require("gulp-svg-sprite")
const svgmin = require("gulp-svgmin")
const cheerio = require("gulp-cheerio")
const replace = require("gulp-replace")
const spriteConfig = {
  shape: {
    dest: "raw"
  },
  mode: {
    symbol: {
      bust: false,
      render: {
        css: true
      }
    },
    stack: true
  }
}

gulp.task("icons:default", () => {
  return gulp
    .src("src/app/assets/svg/**/*.svg")
    .pipe(
      svgmin({
        js2svg: {
          pretty: true
        }
      })
    )
    .pipe(
      cheerio({
        run: function($) {
          $("[fill]").removeAttr("fill")
          $("[stroke]").removeAttr("stroke")
          $("[style]").removeAttr("style")
        },
        parserOptions: { xmlMode: true }
      })
    )

    .pipe(sprite(spriteConfig))
    .pipe(gulp.dest("build/icons"))
})
gulp.task("icons:extra", () => {
  return gulp
    .src("src/app/assets/svg-extra/**/*.svg")
    .pipe(sprite(spriteConfig))
    .pipe(gulp.dest("build/icons-extra"))
})

gulp.task("icons:other", () => {
  return gulp
    .src("src/app/assets/svg-other/**/*.svg")
    .pipe(sprite(spriteConfig))
    .pipe(gulp.dest("build/icons-other"))
})

gulp.task("icons:flags", () => {
  return gulp
    .src("src/app/assets/svg-flags/**/*.svg")
    .pipe(sprite(spriteConfig))
    .pipe(gulp.dest("build/icons-flags"))
})

gulp.task("icons:other:png", () => {
  return gulp.src("src/app/assets/svg-other/x/*.png").pipe(gulp.dest("build/icons-other/png"))
})

module.exports = {
  series: function() {
    return gulp.series("icons:default", "icons:extra", "icons:other", "icons:flags", "icons:other:png")
  }
}
