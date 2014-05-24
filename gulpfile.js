// Include gulpJs.
var gulp = require( 'gulp' );

// Include project requirements.
var jshint      = require('gulp-jshint'),
    compass     = require('gulp-compass'),
    imagemin    = require('gulp-imagemin'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
	watch       = require('gulp-watch'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    path        = require('path'),
	livereload  = require('gulp-livereload'),
	lr          = require('tiny-lr'),
	server      = lr();

// Static Files
var dir = {
    staticFiles: '**/*.{html,php}'
}
// Set source folders.
var src = {
    scripts: './src/js/*.js',
    sass: './src/sass/**/*.{sass,scss}',
    images: './src/images/**/*',
    fonts: './src/fonts/**/*'
};
// Set assets folders.
var assets = {
    scripts: './assets/js',
    styles: './assets/css',
    images: './assets/images',
    fonts: './assets/fonts'
};

// Lint scripts.
gulp.task('lint', function() {
    return gulp.src( src.scripts )
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
 
// Concatenate & minifyJs.
gulp.task('scripts', function() {
    return gulp.src( src.scripts )
        .pipe(concat('main.js'))
        .pipe(gulp.dest( assets.scripts ))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest( assets.scripts ))
		.pipe(livereload(server))
        .pipe(notify({message: 'Images task complete'}));
});
 
// Compile sass with compass.
gulp.task('sass', function() {
    return gulp.src( src.sass )
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css: assets.styles,
            sass: src.sass,
            img: src.images,
			style: 'expanded', //The output style for the compiled css. Nested, expanded, compact, or compressed.
			comments: false,
			relative: false,
        }))
        .pipe(gulp.dest( assets.styles ))
		.pipe(livereload(server))
        .pipe(notify({message: 'Compass task complete'}));
});

// Copy images files.
gulp.task('images', function() {
 return gulp.src( src.images )
    .pipe(gulp.dest( assets.images ))
    .pipe(imagemin({optimizationLevel: 4, progressive: true, cache: true}))
    .pipe(livereload(server))
    .pipe(notify({message: 'Images copy OK'}));
});
 
// Copy fonts files.
gulp.task('fonts', function() {
 return gulp.src( src.fonts )
    .pipe(gulp.dest( assets.fonts ))
    .pipe(livereload(server))
    .pipe(notify({message: 'Fonts copy OK'}));
});

// Reload browser.
gulp.task('reload-browser', function() {
	gulp.src( dir.staticFiles )
		.pipe(livereload(server))
		.pipe(notify({message: 'Reload complete'}));
});
 
// Watch files for changes.
gulp.task('watch', function() {
    gulp.watch( src.scripts, ['lint', 'scripts'] );
    gulp.watch( src.sass, ['sass'] );
    gulp.watch( src.images, ['images'] );
    gulp.watch( src.fonts, ['fonts'] );
    gulp.watch( dir.staticFiles, ['reload-browser'] );
});
 
// Default task.
gulp.task('default', ['fonts' , 'images', 'lint', 'sass', 'scripts', 'watch']);
