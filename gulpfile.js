const  gulp = require('gulp'),
        babel = require('gulp-babel'),
        autoprefixer =  require('autoprefixer'),
        browserSync = require('browser-sync').create(),
        cssnano = require('cssnano'),
        plumber = require('gulp-plumber'),
        imagemin = require('gulp-imagemin'),
        pug = require('gulp-pug'),
        rename = require('gulp-rename'),
        sass = require('gulp-sass'),
        rucksack = require('rucksack-css'),
        postcss = require('gulp-postcss');


//SERVER
gulp.task('server', () => {
  browserSync.init({
    server:{
      baseDir: './dist'
    }
  })
}) 

//CSS
gulp.task('css', () => {
  let plugins = [
    rucksack(),
    autoprefixer({ 
      versions: [' last 2 browsers']
    }),
    cssnano({core: true})
  ];
  let sassOptions = {
    outputStyle: 'expanded',
    // sourceComments: true
  }
  gulp.src('./src/sass/*.sass')
    .pipe(plumber())
    .pipe(sass(sassOptions))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css/'))
    // .pipe(browserSync.stream({ match: './dist/**/*.css' }));

})

//HTML
gulp.task('html', () => {
  gulp.src('./src/views/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
})

//IMAGES
gulp.task('images', () => {
  return gulp.src('./src/images/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images/'))
})

//SCRIPTS
gulp.task('scripts', () => {
  return gulp.src('./src/js/*.js')
    .pipe(babel())    
    .pipe(gulp.dest('./dist/js/'));
})

//WATCH
gulp.task('watch', () => {
  gulp.watch('./src/sass/**/**/*.sass', ['css']);
  gulp.watch('./src/views/**/**/**/*.pug', ['html']).on('change', browserSync.reload);;
  gulp.watch('./src/js/**/**/**/*.js', ['scripts']);
  gulp.watch('./src/images/**/**/**/*.*', ['images']);


})

//DEFAULT
gulp.task('default', ['html', 'css', 'scripts', 'images', 'server', 'watch']);
