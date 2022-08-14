'use strict';

let gulp = require('gulp'),
 sass = require('gulp-sass')(require('node-sass')),
 uglify = require('gulp-uglify'),
 prefixer = require('gulp-autoprefixer'),
 cleanCSS = require('gulp-clean-css'),
 concat = require('gulp-concat'),
 pdf = require('gulp-html-pdf'),
 watch = require('gulp-watch'),
 browserSync = require('browser-sync'),
 reload = browserSync.reload;

const path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
}




//Задача для сборки
gulp.task('sass', function () {
  return gulp.src('src/style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
	.pipe(prefixer())
	.pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css/'))
	.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html') //Выберем файлы по нужному пути
        .pipe(gulp.dest('build/')) //Выплюнем их в папку build
		.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js', function () {
    gulp.src('src/js/**/*.js') //Найдем наш main файл
        .pipe(uglify()) //Сожмем наш js
        .pipe(gulp.dest('build/js/')); //Выплюнем готовый файл в build
});

gulp.task('pdf', function() {
	return gulp.src('src/pdf/**/*.html')
	.pipe(pdf())
	.pipe(gulp.dest('build/pdf/'));
});

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "nalt"
};


gulp.task('webserver', function () {
    browserSync(config);
});


//Задача, после запуска которой, gulp будет следить за изменениями файлов
gulp.task('watch', function(){
    watch(['src/**/*.html'], function(event, cb) {
        gulp.start('html');
    });
    watch(['src/style/**/*.scss'], function(event, cb) {
        gulp.start('sass');
    });
    watch(['src/js/**/*.js'], function(event, cb) {
        gulp.start('js');
    });
});


gulp.task('default', gulp.series('html', 'sass', 'webserver', 'watch'));