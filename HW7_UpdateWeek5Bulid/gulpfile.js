// 宣告變數 方便使用
var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
mixins = require('postcss-mixins'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();

gulp.task('default', function () {
  console.log('Hello Gulp');
  gulp.start('watch');
});

gulp.task('styles', function () {
  console.log('css task');
  return gulp.src('./app/css/style.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/css/temp'));
});

gulp.task('cssInject', ['styles'], function (){
  return gulp.src('./app/css/style.css')
    .pipe(browserSync.stream());
});

// 監聽事件
gulp.task('watch', function () {

  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function () {
    browserSync.reload();
  });

  watch('./app/css/*.css', function () {
    gulp.start('cssInject');
  });
});
