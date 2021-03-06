var gulp       =require('gulp'),
	sass       =require('gulp-sass'),
	browserSync=require('browser-sync'),

	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'); // Подключаем библиотеку кеширования
	/*concat     =require('gulp-concat'),
	uglify     =require('gulp-uglifyjs'),
	cssnano    =require('gulp-cssnano'),
	rename     =require('gulp-rename');*/
const autoprefixer = require('gulp-autoprefixer');

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
gulp.task('default', () =>
    gulp.src('app/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);
gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);