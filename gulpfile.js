var del = require('del');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var sass = require('gulp-sass');


gulp.task('clean', function(cb) {
    return del([
        './.build',
        './static/js'
    ], cb);
});

gulp.task('buildCss', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./static/css'));
});

gulp.task('buildJs', function() {
    return gulp.src('./src/js/**/*.@(jsx|js)')
        .pipe(babel())
        .pipe(rename(function(path) {
            path.extname = '.js';
        }))
        .pipe(gulp.dest('./.build'))
});

gulp.task('bundleJs', [ 'buildJs' ], function() {
    return browserify('./.build/main.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./static/js'))
});

gulp.task('default', [ 'bundleJs', 'buildCss' ])

gulp.task('watch', function() {
    watch('src/js/**/*.@(js|jsx)', function() {
        return runSequence('bundleJs');
    });

    watch('src/scss/**/*.scss', function() {
        return runSequence('buildCss');
    });
});
