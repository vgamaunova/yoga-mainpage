var gulp = require('gulp'),
    arg = require('yargs').argv,
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    browserSync = require("browser-sync"),
    vfs = require('vinyl-fs'),
    argv = require('yargs').argv,
    reload = browserSync.reload,
    connect = require('gulp-connect'),
    concat = require('gulp-concat');


var path = {
    build: {
        html: 'assets/',
        js: 'assets/js/',
        css: 'assets/style/',
        img: 'assets/images/',
        fonts: 'assets/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        sass: 'src/style/*.scss',
        img: 'src/images/*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        sass: 'src/style/**/*.scss',
        img: 'src/images/*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './assets'
};



gulp.task('connect', function() {
  connect.server({
    port: 5002,
    root: './assets',
    livereload: true
  });
});
gulp.task('sass', function () {
    var minify = (arg.minifycss === true);

    gulp.src(path.src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpIf(minify, minifyCSS({keepBreaks: true})))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('html', function () {
    gulp.src(path.src.html) 
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});


gulp.task('js', function () {
    // --minifyjs
    var minify = (arg.minifyjs === true);
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulpIf(minify, uglify()))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});
gulp.task('images', function () {
    return vfs.src(path.src.img, {followSymlinks: false})
        .pipe(vfs.dest(path.build.img));
  });

gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('build', [
    'html',
    'js',
    'sass',
    'fonts',
    'images'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('images');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});
gulp.task('default', [
    'build',
    'connect',
    'watch'
]);