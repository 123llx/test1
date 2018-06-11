//引入
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var server = require('gulp-webserver');
var uglify = require('gulp-uglify');
var path = require('path');
var url = require('url');
var fs = require('fs');
//开发环境css
gulp.task('devcss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
})

//线上环境css
gulp.task('buildcss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('build'))
})

//线上环境js
gulp.task('uglify', function() {
    gulp.src(['src/js/**/*.js', '!src/js/**/*.min.js'])
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'))
})

//服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            // host:,
            open: true,
            livereload: true,
            fallback: 'index.html',
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return
                }
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(pathname.join(__dirname, 'src', pathname)));
            }
        }))
})