var del = require("del");
var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("clean:all", function() {
  return del("dist/*");
});

gulp.task("build:scripts", function() {
  var browserified = browserify({
    entries: "./src/index.js",
    debug: true
  });

  return browserified.bundle()
  .pipe(source(`index.js`))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .on("error", console.error)
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest("./dist/scripts/"));
});

gulp.task("build:run", gulp.parallel(["build:scripts"]));
gulp.task("build", gulp.series(["clean:all", "build:run"]));
gulp.task("default", gulp.parallel(["build"]));
