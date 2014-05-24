/* jshint node:true */
var gulp = require( 'gulp' );

// Include project requirements.
var jshint      = require('gulp-jshint'),
    compass     = require('gulp-compass'),
    minifyCSS   = require('gulp-minify-css'),
    imagemin    = require('gulp-imagemin'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename');

// Set source folders.
var src = {
    scripts: 'src/js/*.js',
    sass: ['src/sass/*.scss', 'src/sass/*.scss'],
    images: 'src/images/**/*',
    fonts: 'src/fonts/**/*'
};
// Set assets folders.
var assets = {
    scripts: 'asssets/js/*.js',
    styles: 'asssets/css/*.css',
    images: 'asssets/images/**/*',
    fonts: 'asssets/fonts/**/*'
};

// Lint Task
gulp.task('lint', function() {
    return gulp.src( src.scripts )
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
 
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src( src.scripts )
        .pipe(concat('main.js'))
        .pipe(gulp.dest( assets.scripts ))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest( assets.scripts ));
});
 
// Compile Sass with Compass
gulp.task('sass', function() {
    return gulp.src( src.sass )
        .pipe(compass({
            // config_file: './src/config.rb',
            css: assets.styles,
            sass: src.sass,
            img: src.images
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest( assets.styles ));
});

// Copy images files
gulp.task('images', function() {
 return gulp.src( src.images )
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest( assets.images ));
});
 
// Copy fonts files
gulp.task('fonts', function() {
 return gulp.src( src.fonts )
    .pipe(gulp.dest( assets.fonts ));
});
 
 
// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch( src.scripts, ['lint', 'scripts']);
    gulp.watch( src.sass, ['sass']);
    gulp.watch( src.images, ['images']);
    gulp.watch( src.fonts, ['fonts']);
});
 
// Default Task
gulp.task('default', ['fonts' , 'images', 'lint', 'sass', 'scripts', 'watch']);