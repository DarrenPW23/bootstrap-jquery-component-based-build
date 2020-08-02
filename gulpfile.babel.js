'use strict';

import plugins      from 'gulp-load-plugins';
import yargs        from 'yargs';
import gulp         from 'gulp';
import rimraf       from 'rimraf';
import yaml         from 'js-yaml';
import fs           from 'fs';
import livereload   from 'gulp-livereload';
import image        from 'gulp-image';

const $ = plugins({
	pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*'],
	replaceString: /^gulp(-|\.)/
});

const PRODUCTION = !!(yargs.argv.production);
const { COMPATIBILITY,  PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

gulp.task('build',
  gulp.series(clean, gulp.parallel(sass, gulp.series(javascript_vendor, javascript_base, javascript), images))
);

gulp.task('default',
  gulp.series('build', watch)
);

function clean(done) {
	PATHS.clean.forEach(function (value) {
  		rimraf(value, done);
	});
}

function images() {
  return gulp.src(PATHS.img_libs)
    .pipe($.if(PRODUCTION, $.image()))
    .pipe(gulp.dest(PATHS.dist + '/images'));
}

function sass() {
  return gulp.src(PATHS.sass)
    .pipe($.concat('app.css'))
    .pipe($.sass({
      includePaths: PATHS.sass_libs
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      overrideBrowserslist: COMPATIBILITY
    }))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe(livereload())
    .pipe(gulp.dest(PATHS.dist + '/css'));
}

function javascript_vendor() {
  return gulp.src(PATHS.javascript_vendor)
    .pipe($.concat('vendor.js'))
    .pipe($.if(PRODUCTION,$.terser()))
    .pipe(gulp.dest(PATHS.dist + '/js'));
}

function javascript_base() {
  return gulp.src(PATHS.javascript)
    .pipe($.concat('base.js'))
    .pipe($.if(PRODUCTION,$.babel()))
    .pipe($.if(PRODUCTION,$.terser()))
    .pipe(gulp.dest(PATHS.dist + '/js'));
}

function javascript() {
  return gulp.src([PATHS.dist + '/js/vendor.js', PATHS.dist + '/js/base.js'])
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(PATHS.dist + '/js'));
}

function watch() {
  livereload.listen();
  gulp.watch('assets/**/*.scss', sass);
  gulp.watch('assets/**/*.js', gulp.series(javascript_base, javascript));
}
