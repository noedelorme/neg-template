/**************************************
  MODULE IMPORT
**************************************/
const gulp = require('gulp');
const gulpNodemon = require('gulp-nodemon');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const config = require('./config.json');


/**************************************
  TASKS
**************************************/
function buildStyles() {
  return gulp.src('./frontend/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./frontend/css/'));
}

function nodemon(done) {
  let running = false;

  return gulpNodemon({
      script: './backend/index.js',
      watch: ['./backend/**/*.*']
    })
    .on('start', function() {
      if(!running) {
        done();
      }
      running = true;
    })
    .on('restart', function() {
      setTimeout(function() {
        browserSync.reload();
      }, 500);
    });
}

function sync(done) {
  browserSync.init(null, {
    proxy: config.adress+":"+config.port,
    port: config.port
  });
  done();
}

function watch(done) {
  gulp.watch('./frontend/**/*.ejs').on('change', browserSync.reload);
  gulp.watch('./frontend/**/*.js').on('change', browserSync.reload);
  gulp.watch('./frontend/**/*.css').on('change', browserSync.reload);
  gulp.watch('./frontend/**/*.scss').on('change', buildStyles);
  done();
}


/**************************************
  EXPORTS
**************************************/
module.exports = {
  default: gulp.parallel(nodemon, watch, sync)
}
