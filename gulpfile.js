/****************
    REQUIRES
****************/
const gulp = require('gulp');
const gulpNodemon = require('gulp-nodemon');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

/****************
      TASKS
****************/
function sass() {
  return gulp.src('./frontend/scss/*.scss')
    .pipe(gulpSass())
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
    proxy: 'http://localhost:8101',
    port: 8102
  });
  done();
}

function watch(done) {
  gulp.watch('./frontend/**/*.ejs').on('change', browserSync.reload);
  gulp.watch('./frontend/**/*.js').on('change', browserSync.reload);
  gulp.watch('./frontend/**/*.css').on('change', browserSync.reload);
  gulp.watch('./frontend/**/*.scss').on('change', sass);
  done();
}

/****************
     EXPORTS
****************/
module.exports = {
  default: gulp.parallel(nodemon, watch, sync)
}
