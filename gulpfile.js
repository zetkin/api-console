var del = require('del');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var babel = require('gulp-babel');

gulp.task('clean', function(cb) {
    return del([
        './.build',
        './static/js'
    ], cb);
});

gulp.task('build', function() {
    return gulp.src('./src/**/*.@(jsx|js)')
        .pipe(babel())
        .pipe(rename(function(path) {
            path.extname = '.js';
        }))
        .pipe(gulp.dest('./.build'))
});

gulp.task('bundle', [ 'build' ], function() {
    return browserify('./.build/main.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./static/js'))
});

gulp.task('default', [ 'bundle' ])

gulp.task('watch', function() {
    return watch('src/**/*.@(js|jsx)', function() {
        runSequence('default');
    });
});
