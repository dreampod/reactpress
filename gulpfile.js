'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');

//Compiles the SASS
gulp.task('sass', function () {
  gulp.src('./app/resources/sass/app.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/resources/sass/app.scss', ['sass']);
});

//Minifies the output of SASS compilation
gulp.task('minify', function() {
  return gulp.src('./app/assets/css/app.css')
    .pipe(cssnano())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('minify:watch', function () {
  gulp.watch('./app/assets/css/app.css', ['minify']);
});

gulp.task('default', ['sass:watch','minify:watch']);