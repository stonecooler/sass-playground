var gulp = require('gulp')

var connect = require('gulp-connect');

var sass = require('gulp-sass');
var dartsass = require('dart-sass');

sass.compiler = dartsass;


function webserverStart(cb) {
    connect.server({
        root: 'web',
        livereload: true
      });
    cb();
}
function webserverStop(cb){
    connect.serverClose();
    cb();
}
function webserverReload(){
    return gulp.src('./web/**/*.html')
        .pipe(connect.reload());
}


function watchChanges(cb){
    gulp.watch(['./web/**/*.html','./web/**/*.scss'],{delay:500},gulp.series(sassy, webserverReload));
    cb();
}

function sassy(){
    return gulp.src('./web/scss/styles*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./web/css/'));
}

exports.default = gulp.series(webserverStop,webserverStart,sassy,watchChanges);

