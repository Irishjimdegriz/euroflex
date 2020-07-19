const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const htmlMin = require('gulp-htmlmin');

function bs() {
  serveSass();
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.sass", serveSass);
  watch("./sass/**/*.scss", serveSass);
  watch("./js/*.js").on('change', browserSync.reload);
};

function serveSass() {
  return src("./sass/**/*.sass", "./scss/**/*.scss")
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
    }))
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
};

function buildCSS(done) {
  src('css/**/**.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest('dist/css'));
  done();
}

function buildJS(done) {
  src(['js/**.js', '!js/**.min.js'])
  .pipe(minify({ext:{src:'-debug.js', min:'.min.js'}}))
  .pipe(dest('dist/js'));

  src('js/**.min.js')
  .pipe(dest('dist/js'));

  done();
}

function buildHTML(done) {
  src('**.html')
  .pipe(htmlMin({collapsewhitespace: true}))
  .pipe(dest('dist/'));

  done();
}

function PHP(done) {
  src('**.php')
  .pipe(dest('dist/'));

  src('phpmailer/**/**')
  .pipe(dest('dist/phpmailer/'));

  done();
}

function fonts(done) {
  src('fonts/**/**')
  .pipe(dest('dist/fonts'));

  done();
}


exports.serve = bs;
exports.build = series(buildCSS, buildJS, buildHTML, PHP, fonts);