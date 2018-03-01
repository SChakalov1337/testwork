var gulp       =require('gulp'),
	sass       =require('gulp-sass'),
	browserSync=require('browser-sync');
	/*concat     =require('gulp-concat'),
	uglify     =require('gulp-uglifyjs'),
	cssnano    =require('gulp-cssnano'),
	rename     =require('gulp-rename');*/

gulp.task('sass',function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}));
});
/*gulp.task('scripts',function(){
	return gulp.src('app/libs/jquery/jquery.min.js')
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});*/
/*gulp.task('css-libs',['sass'],function(
	return gulp.src('app/css/main.css');
	.pipe(cssnano())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('app/css'));
	));*/

gulp.task('browser-sync',function(){
	browserSync({
		server:{
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch',['browser-sync','sass'],function(){
	gulp.watch('app/sass/**/*.sass',['sass']);
	gulp.watch('app/*.html',	browserSync.reload);
	gulp.watch('app/css/**/*.css',	browserSync.reload);
	gulp.watch('app/js/**/*.js',	browserSync.reload);
});