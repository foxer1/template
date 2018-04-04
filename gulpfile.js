var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');
    del = require('del');
    cleanCSS = require('gulp-clean-css');
    browserSync = require('browser-sync');

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('app-sass', function () {
    gulp.src('app/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// gulp.task('libs-sass', function () {
//     gulp.src(['node_modules/slick-carousel/slick/slick.scss',
//         'node_modules/slick-carousel/slick/slick-theme.scss'
//     ])
//         .pipe(sass())
//         .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(browserSync.stream());
// });

// gulp.task('minify-css', function () {
//     return gulp.src('app/fonts/*.css')
//         .pipe(cleanCSS({ compatibility: 'ie8' }))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(browserSync.stream());
// });

// gulp.task('libs-scripts', function () {
//     return gulp.src([
//         'node_modules/jquery/dist/jquery.min.js',
//         'node_modules/foundation-sites/dist/js/foundation.min.js',
//         'node_modules/slick-carousel/slick/slick.min.js',

//     ])
//         .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
//         .pipe(uglify()) // Сжимаем JS файл
//         .pipe(gulp.dest('dist/js')) // Выгружаем в папку app/js
//         .pipe(browserSync.stream());
// });

gulp.task('app-scripts', function () {
    return gulp.src([
        'app/js/script.js'
    ])
        .pipe(concat('app.js')) // Собираем их в кучу в новом файле app.min.js
        .pipe(gulp.dest('dist/js')); // Выгружаем в папку app/js
});


gulp.task('fonts', function () {
    return gulp.src(['app/fonts/*.+(eot|ttf|svg|woff)',
    'node_modules/slick-carousel/slick/fonts/*.+(eot|ttf|svg|woff)'
    ])
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', ['app-sass']).on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('clean', function () {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('serve', ['clean', 'app-sass', 'minify-css', 'fonts'], function () {

});

gulp.task('build', ['app-sass', 'app-scripts', 'fonts'], function () {

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch', 'build', 'browserSync']);
gulp.task('clear', function () {
    return cache.clearAll();
})