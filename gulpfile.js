var babel = require("gulp-babel");
var connect = require("gulp-connect");
var del = require("del");
var gulp = require("gulp");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var terser = require("gulp-terser");

gulp.task("build:scripts", () => {
  return gulp
    .src("./src/scripts/*.js")
    .pipe(gulp.dest("./dist/scripts/"))
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead"
            }
          ]
        ]
      })
    )
    .pipe(
      terser({
        keep_fnames: false,
        mangle: true
      })
    )
    .pipe(rename(path => (path.basename += ".min")))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/scripts"));
});

gulp.task("clean:all", function() {
  return del("dist/*");
});

gulp.task("copy:markup", function() {
  return gulp.src("./src/index.html").pipe(gulp.dest("./dist"));
});

gulp.task("serve:host", () =>
  connect.server({
    livereload: true,
    port: 8000,
    root: "./dist"
  })
);

gulp.task("serve:watch", function() {
  return gulp.watch("./src/**/*", gulp.parallel("build"));
});

gulp.task(
  "build",
  gulp.series(["clean:all", gulp.parallel(["build:scripts", "copy:markup"])])
);

gulp.task("default", gulp.parallel(["build"]));
gulp.task(
  "serve",
  gulp.series(["build", gulp.parallel(["serve:host", "serve:watch"])])
);
