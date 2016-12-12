var gulp        = require('gulp');

var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');

var concatCss   = require('gulp-concat-css');

var run         = require('gulp-run');

var src  = './src';
var dest = './build';

gulp.task('js', function() {
    return browserify({entries: src + '/js/app.jsx', debug: true})
        .transform("babelify", { presets: ["es2015", "latest", "react"] })
        .bundle()
        .pipe(source('app.js'))
        // .pipe(buffer())
        // //.pipe(sourcemaps.init())
        // .pipe(uglify())
        // //.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(dest));
        //.pipe(livereload());
});

gulp.task('html', function() {
  gulp.src(src + '/html/*.html')
      .pipe(gulp.dest(dest));
});

gulp.task('images', function() {
  gulp.src(src + '/images/*')
      .pipe(gulp.dest(dest + '/images'));
});

gulp.task('css', function() {
  gulp.src(src + '/css/*.css')
  .pipe(concatCss('app.css', {rebaseUrls: false}))
  .pipe(gulp.dest(dest + '/css'));
});

gulp.task('fonts', function() {
    gulp.src('bower_components/bootstrap/dist/fonts/**/*')
    .pipe(gulp.dest(dest + '/fonts'));
});

gulp.task('electron', function() {
    gulp.src(src + '/elec/*')
    .pipe(gulp.dest(dest));
});


gulp.task('watch', ['serve'], function() {
  gulp.watch(src + '/js/**/*', ['js']);
  gulp.watch(src + '/css/**/*.css', ['css']);
  gulp.watch(src + '/html/*.html', ['html']);
  gulp.watch(src + '/images/*', ['images']);
});

gulp.task('serve', ['html', 'js', 'css', 'images', 'electron'], function() {
  run('electron build/main.js').exec();
});

gulp.task('default', ['watch', 'fonts', 'serve']);