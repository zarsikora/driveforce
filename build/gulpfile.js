"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
//const browsersync = require("browser-sync").create();
const cp = require("child_process");
const cssnano = require("cssnano");
const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

// BrowserSync
// function browserSync(done) {
//     browsersync.init({
//         proxy: 'localhost/driveforce',
//         open: false,
//         notify: false,
//         ghostMode: false,
//         ui: {
//             port: 8001
//         }
//     });
//     done();
// }

// BrowserSync Reload
// function browserSyncReload(done) {
//     browsersync.reload();
//     done();
// }

// Clean assets
function clean() {
    return del(["./../assets/"]);
}

// CSS task
function css() {
    return gulp
        .src("./wp-content/themes/bones/build/scss/style.scss")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(postcss([autoprefixer()/*, cssnano()*/]))
        .pipe(gulp.dest("./wp-content/themes/bones")) //root theme directory
        //.pipe(browsersync.stream());
}

// Transpile, concatenate and minify scripts
function scripts() {
    return (
        gulp.src([
            // "./node_modules/jquery/dist/jquery.js",
            "./wp-content/themes/bones/build/node_modules/bootstrap/dist/js/bootstrap.bundle.js",
            "./wp-content/themes/bones/build/node_modules/blazy/blazy.js",
            "./wp-content/themes/bones/build/node_modules/paper/dist/paper-core.js",
            "./wp-content/themes/bones/build/node_modules/@barba/core/dist/barba.umd.js",
            "./wp-content/themes/bones/build/node_modules/gsap/dist/gsap.js",
            "./wp-content/themes/bones/build/node_modules/splitting/dist/splitting.js",
            //"./wp-content/themes/bones/build/node_modules/svgxuse/svgxuse.js",
            "./wp-content/themes/bones/build/js/main.js"
            ])
            .pipe(concat('bundle.js'))
            .pipe(plumber())
            .pipe(gulp.dest("./wp-content/themes/bones"))
            //.pipe(browsersync.stream())
    );
}


// Watch files
function watchFiles() {
    gulp.watch("./wp-content/themes/bones/build/scss/**/*", gulp.series(css/*, browserSyncReload*/));
    gulp.watch("./wp-content/themes/bones/build/js/**/*", gulp.series(/*scriptsLint,*/ scripts/*, browserSyncReload*/));
}

// define complex tasks
const js = gulp.series(/*scriptsLint,*/ scripts);
const build = gulp.series(clean, gulp.parallel(css, js));
const watch = gulp.parallel(css, scripts, watchFiles, /*browserSync*/); 

// export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build; 