/**
 * Created by stefan on 19-02-2019.
 * gulp-clean is replaced by gulp-rimraf
 * http://learningwithjb.com/posts/cleaning-our-build-folder-with-gulp
 *     
 */

/* jshint node: true */
"use strict";

const gulp = require('gulp'),
      prettyError = require('gulp-prettyerror'),
      watch = require('gulp-watch'),
      prefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      cleancss = require('gulp-clean-css'),
      rimraf = require('rimraf')

/**
 *
 * @type {{dist: {bower: string, html: string, php: string, js: string, css: string, img: string, fonts: string},
 * src: {bower: string, twig: string, yml: string, theme: string, js: string, style: string, img: string,
 * fonts: string}, watch: {twig: string, yml: string, theme: string, js: string, style: string, img: string,
 * fonts: string}, clean: string}}
 * 
*/

/**
 * Variables
 *   
*/
const path = {
    dist: {
        bower:'dist/bower_components/',
        twig: 'dist/templates/',
        yml: 'dist/',
        theme: 'dist',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/images/',
        fonts: 'dist/fonts/',
        png: 'dist'
    },
    src: {
        bower: 'bower_components/**/*.*',
        twig: 'templates/**/*.twig',
        yml: '*.yml',
        theme: '*.theme',
        js: 'js/**/*.js',
        style: 'sass/styles.sass',
        img: 'images/**/*.*',
        fonts: 'fonts/**/*.*',
        png: '*.png'
    },
    watch: {
        twig: 'templates/**/*.twig',
        yml: '*.yml',
        theme: '*.theme',
        js: 'js/**/*.js',
        style: 'sass/**/*.sass',
        img: 'images/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    clean: './dist'
};

/**
 * clean task
 *   
*/
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


/**
 * task
 *   
*/
gulp.task('bower:dist', function () {
    gulp.src(path.src.bower)
        .pipe(gulp.dest(path.dist.bower));
});


gulp.task('twig:dist', function () {
    gulp.src(path.src.twig)
        .pipe(gulp.dest(path.dist.twig));
});


gulp.task('yml:dist', function () {
    gulp.src(path.src.yml)
        .pipe(gulp.dest(path.dist.yml));
});

gulp.task('theme:dist', function () {
    gulp.src(path.src.theme)
        .pipe(gulp.dest(path.dist.theme));
});

gulp.task('js:dist', function () {
    gulp.src(path.src.js)
        .pipe(prettyError())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('style:dist', function () {
    gulp.src(path.src.style)
        .pipe(prettyError())
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss({compatibility: 'ie9'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('img:dist', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('fonts:dist', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('png:dist', function () {
    gulp.src(path.src.png)
        .pipe(gulp.dest(path.dist.png));
});

gulp.task('dist', [
    'bower:dist',
    'twig:dist',
    'yml:dist',
    'theme:dist',
    'js:dist',
    'style:dist',
    'fonts:dist',
    'img:dist',
    'png:dist'
]);

/**
 * Watch
 *   
*/

gulp.task('watch', function(){
    watch([path.watch.twig], function(event, cb) {
        gulp.start('twig:dist');
    });
    watch([path.watch.yml], function(event, cb) {
        gulp.start('yml:dist');
    });
    watch([path.watch.theme], function(event, cb) {
        gulp.start('theme:dist');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:dist');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:dist');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:dist');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:dist');
    });
});


gulp.task('default', ['dist', 'watch']);