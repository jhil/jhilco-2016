'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'uglify-save-license']
});

function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

gulp.task('images', function () {
    return gulp.src('images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], {read: false})
        .pipe($.rimraf());
});

gulp.task('build', ['html', 'images', 'fonts', 'icons']);
