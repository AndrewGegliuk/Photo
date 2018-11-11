var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');



//Server
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 3001,
            baseDir: "build"
        }
    });


    gulp.watch('build/**/*').on('change', browserSync.reload);

});

//Pug
gulp.task('pug', function(){
    return gulp.src('src/pug/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});


//Scss
gulp.task('sass', function () {
    return gulp.src('src/static/scss/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 10 versions']
    }))
      .pipe(rename('main.min.css'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/css'));
  });

//Js
gulp.task('js', function(){
    return gulp.src([
        'src/static/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
})

//Copy Fonts
gulp.task('copy:fonts', function() {
    return gulp.src('./src/static/font/**/*.*')
      .pipe(gulp.dest('build/fonts'));
  });
  
//Copy images
  gulp.task('copy:img', function() {
    return gulp.src('./src/static/img/**/*.*')
      .pipe(gulp.dest('build/img'));
  });

//Copy 
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:img'));

gulp.task('watch', function(){
    gulp.watch('src/pug/**/*.png')

  })


//Watchers 
gulp.task('watch', function() {
gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
gulp.watch('src/static/**/*.scss', gulp.series('sass'));
gulp.watch('src/static/js/**/*.js', gulp.series('js'))
});  

gulp.task('default', gulp.series(
    gulp.parallel('pug', 'sass', 'js', 'copy'),
    gulp.parallel('watch', 'server')
    )
  ); 