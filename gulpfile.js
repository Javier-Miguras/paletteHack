const {src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const ColorThief = require('colorthief');

//CSS

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');


//JS

const terser = require('gulp-terser-js');
const uglifyjs = require('uglify-js');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyjs, console);

function css(done){
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber()) 
        .pipe(sass())   
        .pipe( postcss([ autoprefixer(), cssnano() ]) ) //minifica css
        .pipe(sourcemaps.write('.')) 
        .pipe(dest("build/css")); 


    done(); 
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev(done){

    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", javascript)

    done();
}




exports.css = css;
exports.javascript = javascript;
exports.dev = parallel(javascript, dev);