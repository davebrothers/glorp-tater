var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var del = require("del");
var gulp = require("gulp");
var server = require("gulp-webserver");
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var terser = require("gulp-terser");


function buildScript(filename) {
  var browserified = browserify({
    entries: `./dist/scripts/${filename}.js`,
    debug: true
  });

  return browserified
    .bundle()
    .pipe(source(`${filename}.min.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(terser({
      ecma: 5
    }))
    .on("error", console.error)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/scripts/"));
}

gulp.task("clean:all", function() {
  return del("dist/*");
});

gulp.task("copy:markup", function() {
  return gulp.src("./src/index.html").pipe(gulp.dest("./dist"));
});

gulp.task("copy:scripts", function() {
  return gulp.src(["./src/scripts/*.js"]).pipe(gulp.dest("./dist/scripts"));
});

gulp.task("serve:host", function() {
  gulp.src("dist").pipe(
    server({
      livereload: true,
      port: 8000
    })
  );
});

gulp.task("serve:watch", function() {
  return gulp.watch("./src/**/*", gulp.parallel("build"));
});

gulp.task("build:index", function() {
  return buildScript("index");
});
gulp.task("build:worker", function() {
  return buildScript("worker");
});
gulp.task(
  "build",
  gulp.series([
    "clean:all",
    gulp.parallel([
      "build:index",
      "build:worker",
      "copy:scripts",
      "copy:markup"
    ])
  ])
);

gulp.task("default", gulp.parallel(["build"]));
gulp.task(
  "serve",
  gulp.series(["build", gulp.parallel(["serve:host", "serve:watch"])])
);
