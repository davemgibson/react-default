"use strict"

var gulp = require('gulp');
var connect = require('gulp-connect');
var open=require('gulp-open');
var browserify=require('browserify');
var reactify=require('reactify');
var babelify = require('babelify');
var source=require('vinyl-source-stream');
var concat=require('gulp-concat');

var config={
	port:9001,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: ['./src/**/*.js','./src/**/*.jsx'],
		images: './src/images/*',
		dist: './dist',
		mainJs: './src/main.jsx',
		css:[
			'./src/css/main.css',
			'./src/css/toastr.min.css',
            'node_modules/react-select/dist/react-select.min.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
		]
	}
	
	
}

gulp.task('connect',function(){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload:true
		
	});
});

gulp.task('open',['connect'],function(){
	gulp.src('dist/index.html')
		.pipe(open({uri: config.devBaseUrl+':'+config.port+'/'}));
});

gulp.task('html',function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});
gulp.task('js',function(){
	browserify({
        extensions: ['.js', '.jsx'],
        entries: ['src/main.jsx']
    })
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		.on('error',console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist+'/scripts'))
		.pipe(connect.reload());
});
gulp.task('css',function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist+'/css'))
        .pipe(connect.reload());
});
gulp.task('images',function(){
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist+'/images'));
});

gulp.task('watch',function(){
	gulp.watch(config.paths.html,['html']);
	gulp.watch(config.paths.js,['js']);
    gulp.watch(config.paths.css,['css']);
});

gulp.task('default',['html','js','css','images','open','watch']);
